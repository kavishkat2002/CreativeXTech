import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase";

let cachedEodReports: Array<{
  id: string;
  employeeId: string;
  employeeName: string;
  supervisorName: string;
  deliverablesCount: string;
  accomplishments: string;
  blockers?: string | null;
  submittedAt: string;
  status: "pending_review" | "signed_off";
}> = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    reports: cachedEodReports,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, employeeName, supervisorName, deliverablesCount, accomplishments, blockers } = body;

    if (!employeeId || !accomplishments) {
      return NextResponse.json(
        { error: "Missing required fields for EOD report" },
        { status: 400 }
      );
    }

    const reportId = `eod-${Date.now()}`;
    const newReport = {
      id: reportId,
      employeeId,
      employeeName: employeeName || "Employee",
      supervisorName: supervisorName || "Supervisor",
      deliverablesCount: deliverablesCount || "0/0",
      accomplishments: String(accomplishments).trim(),
      blockers: blockers ? String(blockers).trim() : null,
      submittedAt: new Date().toISOString(),
      status: "pending_review" as const,
    };

    cachedEodReports.unshift(newReport);

    const insertError = await supabaseInsert("ems_eod_reports", {
      id: reportId,
      employee_id: employeeId,
      employee_name: employeeName || "Employee",
      supervisor_name: supervisorName || "Supervisor",
      deliverables_count: deliverablesCount || "0/0",
      accomplishments: String(accomplishments).trim(),
      blockers: blockers ? String(blockers).trim() : null,
      submitted_at: newReport.submittedAt,
    });

    if (insertError) {
      console.warn("[ems-eod] Supabase EOD insert note:", insertError);
    }

    return NextResponse.json({
      success: true,
      report: newReport,
      persistedToSupabase: !insertError,
      message: insertError
        ? "EOD report logged locally (Supabase table setup pending)"
        : "EOD report securely stored in Supabase database",
    });
  } catch (err: any) {
    console.error("[ems-eod] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit EOD report" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, status, signedOffBy, signedOffAt, supervisorNotes } = body;
    if (!reportId) {
      return NextResponse.json({ error: "Missing reportId" }, { status: 400 });
    }

    cachedEodReports = cachedEodReports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status: status || ("signed_off" as const),
          signedOffBy: signedOffBy || "Supervisor",
          signedOffAt: signedOffAt || new Date().toISOString(),
          supervisorNotes: supervisorNotes || undefined,
        };
      }
      return r;
    });

    return NextResponse.json({ success: true, updatedReportId: reportId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

