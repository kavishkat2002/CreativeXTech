import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase";
import { Resend } from "resend";

// @ts-ignore
import { env } from "cloudflare:workers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, tier } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and work email are required." },
        { status: 400 }
      );
    }

    const insertError = await supabaseInsert("contact_submissions", {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: `CreativeOS Demo Request: ${tier || "Unspecified Tier"}`,
      message: `CreativeOS Demo Walkthrough Request\nName: ${name}\nEmail: ${email}\nTier: ${tier || "Unspecified"}`,
    });

    if (insertError) {
      console.warn("[creativeos-demo] Supabase insert error:", insertError);
    }

    // Try sending email via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY || (env as any)?.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "CreativeOS Inquiries <onboarding@resend.dev>",
          to: "tkavishka101@gmail.com",
          subject: `CreativeOS Demo Request from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nTier: ${tier || "N/A"}\nSource: CreativeOS Product Showcase`,
        });
      } catch (err) {
        console.warn("[creativeos-demo] Resend send warning:", err);
      }
    }

    return NextResponse.json({ ok: true, message: "Demo request recorded successfully." });
  } catch (error) {
    console.error("[creativeos-demo] Handler error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email info@creativexlab.online directly." },
      { status: 500 }
    );
  }
}

