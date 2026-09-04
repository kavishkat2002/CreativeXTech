import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase";
import { Resend } from "resend";

// @ts-ignore
import { env } from "cloudflare:workers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, date, time, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const insertError = await supabaseInsert("contact_submissions", {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      preferred_date: date || null,
      preferred_time: time || null,
      message: String(message).trim(),
    });

    if (insertError) {
      console.error("[contact] Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again or email us directly." },
        { status: 500 }
      );
    }

    // Try sending email via Resend
    const resendApiKey = process.env.RESEND_API_KEY || (env as any)?.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "CreativeXTech Contact Form <onboarding@resend.dev>",
          to: "tkavishka101@gmail.com",
          subject: `New Submission: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nDate: ${date || "N/A"}\nTime: ${time || "N/A"}\n\nMessage:\n${message}`,
        });
      } catch (emailError) {
        console.error("[contact] Resend email error:", emailError);
      }
    } else {
      console.warn("[contact] RESEND_API_KEY is not set. Skipping email notification.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
