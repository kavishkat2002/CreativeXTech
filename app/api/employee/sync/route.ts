import { NextRequest, NextResponse } from "next/server";
import { supabaseSelect, supabaseUpsert, supabaseDelete } from "@/lib/supabase";
import { Employee, INITIAL_EMPLOYEES } from "@/lib/employee-data";

// In-memory cache to guarantee state consistency across rapid reads/writes
let inMemoryEmployeeCache: Employee[] | null = null;

export async function GET() {
  try {
    const rows = await supabaseSelect<any>("ems_employees", { order: "created_at.asc" });
    if (rows && rows.length > 0) {
      let needsDatabaseFix = false;
      // Map database row snake_case back to Employee object format
      const employees: Employee[] = rows.map((r) => {
        const seedEmp = INITIAL_EMPLOYEES.find((e) => e.id === r.id);
        let correctedName = r.name;
        let correctedEmail = r.email;
        let correctedPassword = r.password;
        let correctedPhone = r.phone;
        let correctedDesignation = r.designation;
        if (
          r.id === "emp-bdi-001" ||
          r.name === "Kavindu Senanayake" ||
          r.email === "intern.bd@creativexlab.online"
        ) {
          correctedName = "Ikram Lantra";
          correctedEmail = "ikram@creativex.online";
          correctedPassword = "CreativexIkram041";
          correctedPhone = "+94 77 690 2960";
          if (
            r.name !== "Ikram Lantra" ||
            r.email !== "ikram@creativex.online" ||
            r.password !== "CreativexIkram041" ||
            r.phone !== "+94 77 690 2960"
          ) {
            needsDatabaseFix = true;
          }
        }
        if (
          r.id === "emp-sup-001" ||
          r.name === "Dinithi Perera" ||
          r.name === "Thimathi Dissanayaka" ||
          r.email === "supervisor.bd@creativexlab.online" ||
          r.email === "thimathi@creativexlab.online"
        ) {
          correctedName = "Thimathi Dissanayaka";
          correctedEmail = "thimathi@creativexlab.online";
          correctedPassword = "thimathi@2001";
          correctedDesignation = "Head Of Engineering and Business Development";
        }

        let correctedSupervisor = (r.supervisor_name || "")
          .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
          .replace(/Dinithi/gi, "Thimathi Dissanayaka")
          .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
          .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
          .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
          .trim();
        if (r.id === "emp-bdi-001" && (!correctedSupervisor || correctedSupervisor.toLowerCase().includes("dinithi"))) {
          correctedSupervisor = "Thimathi Dissanayaka (Head Of Engineering and Business Development)";
        }
        if (r.id === "emp-sup-001") {
          correctedSupervisor = "";
        }

        return {
          id: r.id,
          employeeId: r.employee_id || r.id,
          name: correctedName,
          email: correctedEmail,
          password: correctedPassword,
          role: r.role || "employee",
          designation: correctedDesignation,
          department: r.department,
          supervisorId: r.supervisor_id || "",
          supervisorName: correctedSupervisor,
          joiningDate: r.joining_date || "",
          contractType: r.contract_type || "",
          workLocation: r.work_location || "",
          phone: correctedPhone || "",
          allocatedTerritory: r.allocated_territory || "",
          status: r.status || "active",
          avatar: r.avatar,
          bio: r.bio || "",
          kpis: Array.isArray(r.kpis) && r.kpis.length > 0 ? r.kpis : seedEmp?.kpis || [],
          weeklyReviews: Array.isArray(r.weekly_reviews) && r.weekly_reviews.length > 0 ? r.weekly_reviews : seedEmp?.weeklyReviews || [],
          attendance: Array.isArray(r.attendance) && r.attendance.length > 0 ? r.attendance : seedEmp?.attendance || [],
          leads: Array.isArray(r.leads) ? r.leads : seedEmp?.leads || [],
          checklist: Array.isArray(r.checklist) ? r.checklist : seedEmp?.checklist || [],
          eodReports: Array.isArray(r.eod_reports)
            ? r.eod_reports
            : Array.isArray(r.eodReports)
            ? r.eodReports
            : seedEmp?.eodReports || [],
        };
      });

      // If Supabase database still holds the legacy credentials, persist the corrected record to DB
      if (needsDatabaseFix) {
        supabaseUpsert("ems_employees", [
          {
            id: "emp-bdi-001",
            name: "Ikram Lantra",
            email: "ikram@creativex.online",
            password: "CreativexIkram041",
            phone: "+94 77 690 2960",
          },
        ]).catch(() => {});
      }

      // Ensure any initial team profile not yet in the DB is available
      const existingIds = new Set(employees.map((e) => e.id));
      INITIAL_EMPLOYEES.forEach((seed) => {
        if (!existingIds.has(seed.id)) {
          employees.push(seed);
        }
      });

      inMemoryEmployeeCache = employees;
      return NextResponse.json({
        success: true,
        source: "supabase",
        employees,
      });
    }
  } catch (err: any) {
    console.warn("[ems-sync] Supabase read note:", err.message);
  }

  // If in-memory cache exists from recent supervisor/intern updates, serve it
  if (inMemoryEmployeeCache && inMemoryEmployeeCache.length > 0) {
    return NextResponse.json({
      success: true,
      source: "cache",
      employees: inMemoryEmployeeCache,
    });
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

    // Instantly update in-memory cache so subsequent GETs reflect new KPIs and leads
    inMemoryEmployeeCache = listToSync;

    const dbRows = listToSync.map((emp) => {
      const isIkram =
        emp.id === "emp-bdi-001" ||
        emp.name === "Kavindu Senanayake" ||
        emp.email === "intern.bd@creativexlab.online";
      const isThimathi =
        emp.id === "emp-sup-001" ||
        emp.name === "Dinithi Perera" ||
        emp.name === "Thimathi Dissanayaka" ||
        emp.email === "supervisor.bd@creativexlab.online" ||
        emp.email === "thimathi@creativexlab.online";
      return {
        id: emp.id,
        employee_id: emp.employeeId,
        name: isIkram ? "Ikram Lantra" : isThimathi ? "Thimathi Dissanayaka" : emp.name,
        email: isIkram ? "ikram@creativex.online" : isThimathi ? "thimathi@creativexlab.online" : emp.email,
        password: isIkram ? "CreativexIkram041" : isThimathi ? "thimathi@2001" : emp.password,
        role: emp.role,
        designation: isThimathi ? "Head Of Engineering and Business Development" : emp.designation,
        department: emp.department,
        supervisor_id: emp.supervisorId,
        supervisor_name: isThimathi
          ? ""
          : (emp.supervisorName || "")
              .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
              .replace(/Dinithi/gi, "Thimathi Dissanayaka")
              .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
              .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
              .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
              .trim(),
        joining_date: emp.joiningDate,
        contract_type: emp.contractType,
        work_location: emp.workLocation,
        phone: isIkram ? "+94 77 690 2960" : emp.phone,
        allocated_territory: emp.allocatedTerritory || null,
        status: emp.status,
        avatar: emp.avatar || null,
        bio: emp.bio || null,
        kpis: emp.kpis || [],
        weekly_reviews: emp.weeklyReviews || [],
        attendance: emp.attendance || [],
        leads: emp.leads || [],
        checklist: emp.checklist || [],
        eod_reports: emp.eodReports || [],
        updated_at: new Date().toISOString(),
      };
    });

    // 1. Upsert each employee individually so one conflict never blocks others
    let empErrors: string[] = [];
    for (const empRow of dbRows) {
      const err = await supabaseUpsert("ems_employees", empRow, "id");
      if (err) {
        empErrors.push(`${empRow.id}: ${err}`);
        console.warn(`[ems-sync] ems_employees upsert note for ${empRow.id}:`, err);
      }
    }

    // 2. Also sync leads into ems_leads table and clean up deleted ones
    for (const emp of listToSync) {
      if (Array.isArray(emp.leads)) {
        const keepLeadIds = new Set(emp.leads.map((l) => l.id));
        try {
          const existingLeads = await supabaseSelect<any>("ems_leads", {
            employee_id: `eq.${emp.id}`,
          });
          for (const el of existingLeads) {
            if (!keepLeadIds.has(el.id)) {
              await supabaseDelete("ems_leads", "id", el.id);
            }
          }
        } catch {}

        if (emp.leads.length > 0) {
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
            assigned_by: l.assignedBy || null,
            assigned_to: l.assignedTo || emp.id,
            updated_at: new Date().toISOString(),
          }));
          for (const lr of leadRows) {
            await supabaseUpsert("ems_leads", lr, "id").catch(() => null);
          }
        }
      }

      // 3. Also sync workflow tasks into ems_workflow_tasks table and clean up deleted ones
      if (Array.isArray(emp.checklist)) {
        const keepTaskIds = new Set(emp.checklist.map((t) => t.id));
        try {
          const existingTasks = await supabaseSelect<any>("ems_workflow_tasks", {
            employee_id: `eq.${emp.id}`,
          });
          for (const et of existingTasks) {
            if (!keepTaskIds.has(et.id)) {
              await supabaseDelete("ems_workflow_tasks", "id", et.id);
            }
          }
        } catch {}

        if (emp.checklist.length > 0) {
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
            assigned_by: t.assignedBy || null,
            assigned_to: t.assignedTo || emp.id,
            updated_at: new Date().toISOString(),
          }));
          for (const tr of taskRows) {
            await supabaseUpsert("ems_workflow_tasks", tr, "id").catch(() => null);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount: listToSync.length,
      action: action || "upsert",
      persistedToSupabase: empErrors.length === 0,
      errors: empErrors.length > 0 ? empErrors : undefined,
      message: empErrors.length > 0 ? `Synced with warnings: ${empErrors.join("; ")}` : "Successfully synced to Supabase database",
    });
  } catch (err: any) {
    console.error("[ems-sync] Error saving to Supabase:", err);
    return NextResponse.json(
      { error: err.message || "Failed to sync with Supabase" },
      { status: 500 }
    );
  }
}

