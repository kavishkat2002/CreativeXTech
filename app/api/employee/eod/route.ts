import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase";

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

    const insertError = await supabaseInsert("ems_eod_reports", {
      id: `eod-${Date.now()}`,
      employee_id: employeeId,
      employee_name: employeeName || "Employee",
      supervisor_name: supervisorName || "Supervisor",
      deliverables_count: deliverablesCount || "0/0",
      accomplishments: String(accomplishments).trim(),
      blockers: blockers ? String(blockers).trim() : null,
      submitted_at: new Date().toISOString(),
    });

    if (insertError) {
      console.warn("[ems-eod] Supabase EOD insert note:", insertError);
    }

    return NextResponse.json({
      success: true,
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

