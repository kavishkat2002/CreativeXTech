import { NextRequest, NextResponse } from "next/server";
import { supabaseSelect, supabaseUpsert } from "@/lib/supabase";
import { Employee, INITIAL_EMPLOYEES } from "@/lib/employee-data";

export async function GET() {
  try {
    const rows = await supabaseSelect<any>("ems_employees", { order: "created_at.asc" });
    if (rows && rows.length > 0) {
      // Map database row snake_case back to Employee object format
      const employees: Employee[] = rows.map((r) => ({
        id: r.id,
        employeeId: r.employee_id || r.id,
        name: r.name,
        email: r.email,
        password: r.password,
        role: r.role || "employee",
        designation: r.designation,
        department: r.department,
        supervisorId: r.supervisor_id || "",
        supervisorName: r.supervisor_name || "",
        joiningDate: r.joining_date || "",
        contractType: r.contract_type || "",
        workLocation: r.work_location || "",
        phone: r.phone || "",
        allocatedTerritory: r.allocated_territory || "",
        status: r.status || "active",
        avatar: r.avatar,
        bio: r.bio || "",
        kpis: Array.isArray(r.kpis) ? r.kpis : [],
        weeklyReviews: Array.isArray(r.weekly_reviews) ? r.weekly_reviews : [],
        attendance: Array.isArray(r.attendance) ? r.attendance : [],
        leads: Array.isArray(r.leads) ? r.leads : [],
        checklist: Array.isArray(r.checklist) ? r.checklist : [],
      }));

      return NextResponse.json({
        success: true,
        source: "supabase",
        employees,
      });
    }
  } catch (err: any) {
    console.warn("[ems-sync] Supabase read note:", err.message);
  }

  // Fallback to initial seed if table not yet initialized in Supabase
  return NextResponse.json({
    success: true,
    source: "fallback",
    employees: INITIAL_EMPLOYEES,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employees, employee, action } = body;

    const listToSync: Employee[] = employees || (employee ? [employee] : []);

    if (listToSync.length === 0) {
      return NextResponse.json(
        { error: "No employee data supplied for sync" },
        { status: 400 }
      );
    }

    const dbRows = listToSync.map((emp) => ({
      id: emp.id,
      employee_id: emp.employeeId,
      name: emp.name,
      email: emp.email,
      password: emp.password,
      role: emp.role,
      designation: emp.designation,
      department: emp.department,
      supervisor_id: emp.supervisorId,
      supervisor_name: emp.supervisorName,
      joining_date: emp.joiningDate,
      contract_type: emp.contractType,
      work_location: emp.workLocation,
      phone: emp.phone,
      allocated_territory: emp.allocatedTerritory || null,
      status: emp.status,
      avatar: emp.avatar || null,
      bio: emp.bio || null,
      kpis: emp.kpis || [],
      weekly_reviews: emp.weeklyReviews || [],
      attendance: emp.attendance || [],
      leads: emp.leads || [],
      checklist: emp.checklist || [],
      updated_at: new Date().toISOString(),
    }));

    // 1. Upsert into ems_employees table
    const empError = await supabaseUpsert("ems_employees", dbRows, "id");
    if (empError) {
      console.warn("[ems-sync] ems_employees upsert note:", empError);
    }

    // 2. Also upsert leads into ems_leads table for relational queries if present
    for (const emp of listToSync) {
      if (emp.leads && emp.leads.length > 0) {
        const leadRows = emp.leads.map((l) => ({
          id: l.id,
          employee_id: emp.id,
          client_name: l.clientName,
          contact_person: l.contactPerson,
          channel: l.channel,
          corridor: l.corridor,
          deal_value: l.dealValue,
          stage: l.stage,
          next_follow_up: l.nextFollowUp,
          notes: l.notes,
          updated_at: new Date().toISOString(),
        }));
        await supabaseUpsert("ems_leads", leadRows, "id").catch(() => null);
      }

      // 3. Also upsert workflow tasks into ems_workflow_tasks table
      if (emp.checklist && emp.checklist.length > 0) {
        const taskRows = emp.checklist.map((t) => ({
          id: t.id,
          employee_id: emp.id,
          task: t.task,
          time_slot: t.timeSlot,
          completed: t.completed,
          category: t.category,
          priority: t.priority || "normal",
          shift_block: t.shiftBlock || "morning",
          notes: t.notes || null,
          completed_at: t.completedAt || null,
          updated_at: new Date().toISOString(),
        }));
        await supabaseUpsert("ems_workflow_tasks", taskRows, "id").catch(() => null);
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount: listToSync.length,
      action: action || "upsert",
      persistedToSupabase: !empError,
      message: empError ? "Cached locally (Supabase table setup pending)" : "Successfully synced to Supabase database",
    });
  } catch (err: any) {
    console.error("[ems-sync] Error saving to Supabase:", err);
    return NextResponse.json(
      { error: err.message || "Failed to sync with Supabase" },
      { status: 500 }
    );
  }
}

