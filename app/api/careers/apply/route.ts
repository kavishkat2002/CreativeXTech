import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseInsert } from "@/lib/supabase";
import { getJob } from "@/lib/careers";
import { analyzeApplicationATS } from "@/lib/ats";

// @ts-expect-error cloudflare:workers is provided by Wrangler runtime
import { env } from "cloudflare:workers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      job_id,
      job_slug,
      job_title,
      applicant_name,
      applicant_email,
      phone,
      linkedin_url,
      portfolio_url,
      years_experience,
      resume_filename,
      resume_url,
      resume_text,
      cover_letter,
      job_snapshot,
    } = body;

    if (!job_slug || !applicant_name || !applicant_email) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: job_slug, applicant_name, and applicant_email are required.",
        },
        { status: 400 }
      );
    }

    const trimmedCoverLetter = cover_letter ? String(cover_letter).trim() : "";
    if (trimmedCoverLetter.length < 100) {
      return NextResponse.json(
        {
          error:
            "Cover letter is required and must be at least 100 characters.",
        },
        { status: 400 }
      );
    }

    const effectiveResumeText =
      (resume_text ? String(resume_text).trim() : "") || trimmedCoverLetter;

    // Fetch authoritative job posting (or fall back to snapshot if created dynamically)
    const liveJob = (await getJob(String(job_slug))) ?? job_snapshot;
    if (!liveJob) {
      return NextResponse.json(
        { error: "Job posting not found." },
        { status: 404 }
      );
    }

    // Re-run ATS engine server-side for integrity
    const atsResult = analyzeApplicationATS(liveJob, effectiveResumeText, {
      coverLetter: trimmedCoverLetter,
      yearsExperience:
        typeof years_experience === "number" ? years_experience : undefined,
    });

    const applicationRecord = {
      job_id: job_id || liveJob.id || null,
      job_slug: String(job_slug),
      job_title: String(job_title || liveJob.title),
      applicant_name: String(applicant_name).trim(),
      applicant_email: String(applicant_email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      linkedin_url: linkedin_url ? String(linkedin_url).trim() : null,
      portfolio_url: portfolio_url ? String(portfolio_url).trim() : null,
      years_experience:
        typeof years_experience === "number" ? years_experience : null,
      resume_filename: resume_filename ? String(resume_filename) : null,
      resume_url: resume_url ? String(resume_url) : null,
      resume_text: effectiveResumeText,
      cover_letter: trimmedCoverLetter,
      ats_score: atsResult.score,
      ats_status: atsResult.verdict,
      ats_matched_skills: atsResult.matchedSkills,
      ats_missing_skills: atsResult.missingSkills,
      ats_bonus_skills: atsResult.bonusSkills,
      ats_jd_matches: atsResult.jdRequirementMatches,
      ats_signals: atsResult.detectedSignals,
      ats_summary: atsResult.summary,
      status: atsResult.verdict === "shortlisted" ? "shortlisted" : "new",
    };

    const insertError = await supabaseInsert(
      "job_applications",
      applicationRecord
    );

    if (insertError) {
      console.error("[careers/apply] Supabase insert error:", insertError);
      return NextResponse.json(
        { error: insertError },
        { status: 500 }
      );
    }

    // Optional Resend email notification (non-blocking if not configured)
    const resendApiKey =
      process.env.RESEND_API_KEY || (env as { RESEND_API_KEY?: string })?.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "CreativeXTech Careers <onboarding@resend.dev>",
          to: "tkavishka101@gmail.com",
          subject: `[ATS ${atsResult.score}% · ${atsResult.verdict.toUpperCase()}] ${applicationRecord.job_title} — ${applicationRecord.applicant_name}`,
          text: [
            `Role: ${applicationRecord.job_title}`,
            `Applicant: ${applicationRecord.applicant_name} (${applicationRecord.applicant_email})`,
            `Phone: ${applicationRecord.phone || "N/A"}`,
            `LinkedIn: ${applicationRecord.linkedin_url || "N/A"}`,
            `Portfolio: ${applicationRecord.portfolio_url || "N/A"}`,
            ``,
            `--- ATS ANALYSIS ---`,
            `ATS Score: ${atsResult.score}% (Threshold: ${atsResult.threshold}%)`,
            `ATS Verdict: ${atsResult.verdict.toUpperCase()}`,
            `Matched Skills: ${atsResult.matchedSkills.join(", ") || "None"}`,
            `Missing Skills: ${atsResult.missingSkills.join(", ") || "None"}`,
            `JD Match Coverage: ${atsResult.jdMatchPercentage}%`,
            `Summary: ${atsResult.summary}`,
          ].join("\n"),
        });
      } catch (emailErr) {
        console.warn("[careers/apply] Optional email send failed:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        ats: atsResult,
        application: applicationRecord,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[careers/apply] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to process job application." },
      { status: 500 }
    );
  }
}

