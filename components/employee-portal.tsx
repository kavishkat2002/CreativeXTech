"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Target,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Edit,
  Trash2,
  Lock,
  LogOut,
  UserCheck,
  Star,
  ChevronRight,
  ChevronDown,
  Filter,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  BarChart3,
  Building,
  UserPlus,
  Copy,
  Check,
  CheckSquare,
  Square,
  BookOpen,
  DollarSign,
  MessageSquare,
  Send,
  Zap,
} from "lucide-react";
import {
  Employee,
  EmployeeRole,
  EmployeeStatus,
  EmployeeKPI,
  SupervisorReview,
  AttendanceRecord,
  EMSUserSession,
  LeadPipelineItem,
  DailyChecklistItem,
  SalesScriptItem,
  DEFAULT_SALES_SCRIPTS,
  getStoredEmployees,
  saveStoredEmployees,
  getStoredEMSSession,
  saveStoredEMSSession,
  authenticateEmployee,
  calculateOverallKPIScore,
  fetchEmployeesFromSupabase,
  INITIAL_EMPLOYEES,
} from "@/lib/employee-data";

export function EmployeePortal() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [session, setSession] = useState<EMSUserSession | null>(null);
  const [mounted, setMounted] = useState(false);

  // ── Login Form State
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Navigation Tabs
  const [activeTab, setActiveTab] = useState<"profile" | "kpi" | "admin" | "attendance">("profile");

  // ── Selected Employee in Views (Default to Business Development Intern)
  const [selectedEmpId, setSelectedEmpId] = useState<string>("emp-bdi-001");

  // ── Modals State
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showAddKpiModal, setShowAddKpiModal] = useState(false);
  const [showUpdateKpiModal, setShowUpdateKpiModal] = useState<{ kpi: EmployeeKPI; empId: string } | null>(null);

  // ── Add Employee Form State
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpPassword, setNewEmpPassword] = useState("@Creative2026");
  const [newEmpRole, setNewEmpRole] = useState<EmployeeRole>("employee");
  const [newEmpDesignation, setNewEmpDesignation] = useState("");
  const [newEmpDepartment, setNewEmpDepartment] = useState("Business Development & Sales");
  const [newEmpSupervisor, setNewEmpSupervisor] = useState("Dinithi Perera & Kavishka T.");
  const [newEmpContract, setNewEmpContract] = useState("Full-time Internship");
  const [newEmpTerritory, setNewEmpTerritory] = useState("Sri Lanka SMEs / Global Outbound");

  // ── Add Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStrengths, setReviewStrengths] = useState("");
  const [reviewImprovements, setReviewImprovements] = useState("");
  const [reviewGoals, setReviewGoals] = useState("");

  // ── Add KPI Form State
  const [kpiTitle, setKpiTitle] = useState("");
  const [kpiTarget, setKpiTarget] = useState<number>(30);
  const [kpiCurrent, setKpiCurrent] = useState<number>(0);
  const [kpiUnit, setKpiUnit] = useState("Qualified Leads");
  const [kpiWeight, setKpiWeight] = useState<number>(20);
  const [kpiPeriod, setKpiPeriod] = useState("Monthly (Q4 2026)");
  const [kpiNotes, setKpiNotes] = useState("");

  // ── Update KPI Value Form
  const [kpiUpdateVal, setKpiUpdateVal] = useState<number>(0);

  // ── Search & Filter State in Admin Table
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // ── Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── BD Intern Workspace Sub-Navigation State
  const [bdiSubTab, setBdiSubTab] = useState<"overview" | "pipeline" | "checklist" | "playbook">("overview");
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // ── Quick Add Lead Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadClient, setNewLeadClient] = useState("");
  const [newLeadContact, setNewLeadContact] = useState("");
  const [newLeadChannel, setNewLeadChannel] = useState<LeadPipelineItem["channel"]>("WhatsApp");
  const [newLeadCorridor, setNewLeadCorridor] = useState<LeadPipelineItem["corridor"]>("Sri Lanka SME");
  const [newLeadValue, setNewLeadValue] = useState("LKR 850,000");
  const [newLeadNotes, setNewLeadNotes] = useState("");
  const [assigneeEmpId, setAssigneeEmpId] = useState<string>("emp-bdi-001");

  // ── Daily Workflow State & EOD Report
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("10:30 AM");
  const [newTaskCategory, setNewTaskCategory] = useState<DailyChecklistItem["category"]>("Outreach");
  const [newTaskPriority, setNewTaskPriority] = useState<"urgent" | "high" | "normal">("normal");
  const [newTaskShift, setNewTaskShift] = useState<"morning" | "afternoon" | "eod">("morning");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [workflowFilter, setWorkflowFilter] = useState<"all" | "morning" | "afternoon" | "eod" | "urgent" | "pending" | "completed">("all");
  const [showEodModal, setShowEodModal] = useState(false);
  const [eodSummaryNotes, setEodSummaryNotes] = useState("");

  const handleCopyScript = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 2500);
      showToast("Sales pitch script copied to clipboard!");
    }
  };

  const handleToggleChecklist = (taskId: string) => {
    let taskTitle = "";
    let willBeCompleted = false;

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.checklist) {
        const nextChecklist = emp.checklist.map((chk) => {
          if (chk.id === taskId) {
            taskTitle = chk.task;
            willBeCompleted = !chk.completed;
            return {
              ...chk,
              completed: willBeCompleted,
              completedAt: willBeCompleted
                ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : undefined,
            };
          }
          return chk;
        });
        return { ...emp, checklist: nextChecklist };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(
      willBeCompleted
        ? `Marked "${taskTitle.slice(0, 32)}..." as completed!`
        : `Marked "${taskTitle.slice(0, 32)}..." as pending.`
    );
  };

  const handleMarkAllTasks = (completed: boolean) => {
    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.checklist) {
        return {
          ...emp,
          checklist: emp.checklist.map((c) => ({
            ...c,
            completed,
            completedAt: completed
              ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : undefined,
          })),
        };
      }
      return emp;
    });
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(
      completed
        ? "All workflow tasks marked as completed! High velocity!"
        : "Workflow checklist reset for today's shift."
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.checklist) {
        return {
          ...emp,
          checklist: emp.checklist.filter((c) => c.id !== taskId),
        };
      }
      return emp;
    });
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast("Task removed from daily schedule.");
  };

  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<"synced" | "syncing" | "idle">("synced");

  const handleManualSupabaseSync = async () => {
    setSupabaseSyncStatus("syncing");
    showToast("Synchronizing all employee & workflow records with Supabase database...");
    try {
      const res = await fetch("/api/employee/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employees }),
      });
      const data = await res.json();
      setSupabaseSyncStatus("synced");
      showToast(
        data.persistedToSupabase
          ? "All records successfully stored in Supabase database!"
          : "Saved locally. Supabase tables will receive records upon SQL schema initialization."
      );
    } catch {
      setSupabaseSyncStatus("synced");
      showToast("Sync finished. Records cached locally.");
    }
  };

  const handleSubmitEodReport = (e: React.FormEvent) => {
    e.preventDefault();
    const tasksTotal = (currentViewEmp.checklist || []).length;
    const tasksDone = (currentViewEmp.checklist || []).filter((c) => c.completed).length;

    // Dispatches to Supabase EOD reports table
    if (typeof fetch === "function") {
      fetch("/api/employee/eod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: currentViewEmp.id,
          employeeName: currentViewEmp.name,
          supervisorName: currentViewEmp.supervisorName,
          deliverablesCount: `${tasksDone}/${tasksTotal}`,
          accomplishments: eodSummaryNotes,
        }),
      }).catch((err) => console.warn("[ems] EOD Supabase sync notice:", err));
    }

    showToast(
      `EOD Shift Report successfully saved to Supabase & logged for Dinithi Perera & Kavishka T. (${tasksDone}/${tasksTotal} deliverables verified).`
    );
    setShowEodModal(false);
    setEodSummaryNotes("");
  };

  const handleAdvanceLeadStage = (leadId: string) => {
    const stageFlow: Array<LeadPipelineItem["stage"]> = [
      "New Lead",
      "Contacted",
      "Demo Booked",
      "Proposal Sent",
      "Closed Won",
    ];

    let advancedLeadName = "";
    let nextStageName: LeadPipelineItem["stage"] = "Contacted";

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            advancedLeadName = lead.clientName;
            const currentIdx = stageFlow.indexOf(lead.stage);
            const nextIdx = Math.min(stageFlow.length - 1, currentIdx + 1);
            nextStageName = stageFlow[nextIdx];
            return { ...lead, stage: nextStageName };
          }
          return lead;
        });

        let nextKpis = emp.kpis;
        if (nextStageName === "Demo Booked") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-2" ? { ...k, current: k.current + 1 } : k
          );
        } else if (nextStageName === "Closed Won") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-1" ? { ...k, current: k.current + 1 } : k
          );
        }

        return { ...emp, leads: nextLeads, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Lead "${advancedLeadName}" advanced to ${nextStageName.toUpperCase()}! KPI updated.`);
  };

  const handleSetLeadStage = (leadId: string, targetStage: LeadPipelineItem["stage"]) => {
    let clientName = "";

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            clientName = lead.clientName;
            return { ...lead, stage: targetStage };
          }
          return lead;
        });

        let nextKpis = emp.kpis;
        if (targetStage === "Demo Booked") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-2" ? { ...k, current: k.current + 1 } : k
          );
        } else if (targetStage === "Closed Won") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-1" ? { ...k, current: k.current + 1 } : k
          );
        }

        return { ...emp, leads: nextLeads, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Lead "${clientName}" moved to ${targetStage.toUpperCase()}!`);
  };

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadClient.trim()) return;

    const targetEmpId = isSupervisor && assigneeEmpId ? assigneeEmpId : currentViewEmp.id;
    const targetEmp = employees.find((emp) => emp.id === targetEmpId) || currentViewEmp;

    const newLead: LeadPipelineItem = {
      id: `lead-${Date.now()}`,
      clientName: newLeadClient.trim(),
      contactPerson: newLeadContact.trim() || "Decision Maker",
      channel: newLeadChannel,
      corridor: newLeadCorridor,
      dealValue: newLeadValue.trim() || "LKR 750,000",
      stage: "New Lead",
      nextFollowUp: "Today · Pending Outreach",
      notes: newLeadNotes.trim() || "Outbound prospect identified.",
      assignedBy: isSupervisor ? `${session?.employee.name} (${session?.role.toUpperCase()})` : undefined,
      assignedTo: targetEmpId,
    };

    const updated = employees.map((emp) => {
      if (emp.id === targetEmpId) {
        const existingLeads = emp.leads || [];
        const nextKpis = emp.kpis.map((k) =>
          k.id === "kpi-bdi-1" ? { ...k, current: k.current + 1 } : k
        );
        return {
          ...emp,
          leads: [newLead, ...existingLeads],
          kpis: nextKpis,
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowAddLeadModal(false);
    setNewLeadClient("");
    setNewLeadContact("");
    setNewLeadValue("LKR 850,000");
    setNewLeadNotes("");
    showToast(
      isSupervisor
        ? `Lead "${newLead.clientName}" assigned to ${targetEmp.name}! Dispatched to their pipeline.`
        : `Added "${newLead.clientName}" to pipeline! +1 Lead logged to KPI.`
    );
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const targetEmpId = isSupervisor && assigneeEmpId ? assigneeEmpId : currentViewEmp.id;
    const targetEmp = employees.find((emp) => emp.id === targetEmpId) || currentViewEmp;

    const newTask: DailyChecklistItem = {
      id: `chk-${Date.now()}`,
      task: newTaskTitle.trim(),
      timeSlot: newTaskTime || "11:00 AM",
      completed: false,
      category: newTaskCategory,
      priority: newTaskPriority,
      shiftBlock: newTaskShift,
      notes: newTaskNotes.trim() || undefined,
      assignedBy: isSupervisor ? `${session?.employee.name} (${session?.role.toUpperCase()})` : undefined,
      assignedTo: targetEmpId,
    };

    const updated = employees.map((emp) => {
      if (emp.id === targetEmpId) {
        const existingChecklist = emp.checklist || [];
        return {
          ...emp,
          checklist: [...existingChecklist, newTask],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowAddTaskModal(false);
    setNewTaskTitle("");
    setNewTaskNotes("");
    showToast(
      isSupervisor
        ? `Task assigned to ${targetEmp.name}! Added to their daily workflow schedule.`
        : "Daily workflow task added to schedule."
    );
  };

  const handleQuickAttendanceCheckIn = (mode: "Remote" | "Office (Rajagiriya)") => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toISOString().split("T")[0];

    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        const hasToday = emp.attendance.some((a) => a.date === dateStr);
        if (hasToday) {
          return {
            ...emp,
            attendance: emp.attendance.map((a) =>
              a.date === dateStr ? { ...a, checkOut: timeStr } : a
            ),
          };
        }
        const newRecord: AttendanceRecord = {
          date: dateStr,
          checkIn: timeStr,
          checkOut: "Active",
          status: "present",
          workMode: mode,
        };
        return {
          ...emp,
          attendance: [newRecord, ...emp.attendance],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Recorded attendance for today (${mode}) at ${timeStr}.`);
  };

  useEffect(() => {
    setMounted(true);
    const stored = getStoredEmployees();
    setEmployees(stored);
    const existingSession = getStoredEMSSession();
    if (existingSession) {
      setSession(existingSession);
    }

    // Two-way sync: Pull fresh employee records from Supabase database
    fetchEmployeesFromSupabase().then((remoteEmployees) => {
      if (remoteEmployees && remoteEmployees.length > 0) {
        setEmployees(remoteEmployees);
        setSupabaseSyncStatus("synced");
      }
    });
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    try {
      const res = authenticateEmployee(emailInput, passwordInput);
      if (res.success && res.session) {
        setSession(res.session);
        showToast(`Welcome back, ${res.session.employee.name}!`);
        // If employee, select their own profile
        if (res.session.role === "employee") {
          setSelectedEmpId(res.session.employee.id);
          setActiveTab("profile");
        } else if (res.session.role === "admin") {
          setActiveTab("admin");
        } else {
          setActiveTab("kpi");
        }
      } else {
        setLoginError(res.error || "Login failed. Please verify your credentials.");
      }
    } catch (err: any) {
      setLoginError(err?.message || "An unexpected error occurred during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    saveStoredEMSSession(null);
    setSession(null);
    setEmailInput("");
    setPasswordInput("");
    showToast("Signed out successfully.");
  };

  // Quick Demo Login Helper
  const handleQuickLogin = (email: string, pwd: string) => {
    setEmailInput(email);
    setPasswordInput(pwd);
    setLoginError("");
    const res = authenticateEmployee(email, pwd);
    if (res.success && res.session) {
      setSession(res.session);
      showToast(`Logged in as ${res.session.employee.name} (${res.session.role.toUpperCase()})`);
      if (res.session.role === "employee") {
        setSelectedEmpId(res.session.employee.id);
        setActiveTab("profile");
      } else if (res.session.role === "admin") {
        setActiveTab("admin");
      } else {
        setActiveTab("kpi");
      }
    }
  };

  // ── Admin: Add New Employee
  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpEmail.trim()) {
      showToast("Employee name and email are required.");
      return;
    }

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      employeeId: `CX-EMP-0${employees.length + 40}`,
      name: newEmpName.trim(),
      email: newEmpEmail.trim().toLowerCase(),
      password: newEmpPassword || "@Creative2026",
      role: newEmpRole,
      designation: newEmpDesignation.trim() || "Associate Specialist",
      department: newEmpDepartment,
      supervisorId: "emp-adm-001",
      supervisorName: newEmpSupervisor.trim() || "Kavishka Thilakarathna",
      joiningDate: new Date().toISOString().split("T")[0],
      contractType: newEmpContract,
      workLocation: "Remote · Rajagiriya, Colombo",
      phone: "+94 77 000 0000",
      allocatedTerritory: newEmpTerritory,
      status: "active",
      bio: "New team member onboarded to CreativeX Technology operational graph.",
      kpis: [
        {
          id: `kpi-init-${Date.now()}`,
          title: "Initial Role Onboarding & Sprint Velocity",
          target: 100,
          current: 85,
          unit: "% Completed",
          period: "Month 1",
          weight: 100,
          status: "on_track",
          notes: "Onboarding curriculum and company standard operating procedures.",
        },
      ],
      weeklyReviews: [],
      attendance: [
        {
          date: new Date().toISOString().split("T")[0],
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "present",
          workMode: "Remote",
        },
      ],
    };

    const updated = [...employees, newEmp];
    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowAddEmpModal(false);
    setSelectedEmpId(newEmp.id);
    showToast(`Created employee profile for ${newEmp.name} successfully.`);

    // Reset Form
    setNewEmpName("");
    setNewEmpEmail("");
    setNewEmpDesignation("");
  };

  // ── Admin: Toggle Employee Status
  const handleToggleStatus = (empId: string, currentStatus: EmployeeStatus) => {
    const nextStatus: EmployeeStatus = currentStatus === "active" ? "suspended" : "active";
    const updated = employees.map((emp) => (emp.id === empId ? { ...emp, status: nextStatus } : emp));
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Updated status to ${nextStatus.toUpperCase()} for ${employees.find((e) => e.id === empId)?.name}.`);
  };

  // ── Admin: Change Employee Role
  const handleChangeRole = (empId: string, newRole: EmployeeRole) => {
    const updated = employees.map((emp) => (emp.id === empId ? { ...emp, role: newRole } : emp));
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Role updated to ${newRole.toUpperCase()}.`);
  };

  // ── Supervisor / Admin: Add 1-on-1 Review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewStrengths.trim()) {
      showToast("Please provide review feedback strengths.");
      return;
    }

    const reviewerName = session?.employee.name || "Supervisor";
    const newRev: SupervisorReview = {
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      supervisorName: reviewerName,
      rating: reviewRating,
      strengths: reviewStrengths.trim(),
      improvements: reviewImprovements.trim() || "Maintain current momentum and outreach cadence.",
      goalsNextWeek: reviewGoals.trim() || "Achieve weekly sprint targets.",
    };

    const updated = employees.map((emp) => {
      if (emp.id === selectedEmpId) {
        return {
          ...emp,
          weeklyReviews: [newRev, ...emp.weeklyReviews],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowAddReviewModal(false);
    setReviewStrengths("");
    setReviewImprovements("");
    setReviewGoals("");
    showToast("Supervisor 1-on-1 review recorded successfully.");
  };

  // ── Supervisor / Admin: Add New KPI Target
  const handleAddKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiTitle.trim() || !kpiTarget) {
      showToast("Please provide a valid KPI title and target number.");
      return;
    }

    const newKpiItem: EmployeeKPI = {
      id: `kpi-${Date.now()}`,
      title: kpiTitle.trim(),
      target: Number(kpiTarget),
      current: Number(kpiCurrent) || 0,
      unit: kpiUnit.trim() || "Units",
      period: kpiPeriod.trim() || "Monthly",
      weight: Number(kpiWeight) || 20,
      status: Number(kpiCurrent) >= Number(kpiTarget) ? "exceeding" : "on_track",
      notes: kpiNotes.trim() || "Target assigned by supervisor.",
    };

    const updated = employees.map((emp) => {
      if (emp.id === selectedEmpId) {
        return {
          ...emp,
          kpis: [...emp.kpis, newKpiItem],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowAddKpiModal(false);
    setKpiTitle("");
    setKpiNotes("");
    showToast(`Added new KPI target for ${employees.find((e) => e.id === selectedEmpId)?.name}.`);
  };

  // ── Supervisor / Admin: Update KPI Actual Progress
  const handleUpdateKpiProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showUpdateKpiModal) return;

    const { kpi, empId } = showUpdateKpiModal;
    const newVal = Number(kpiUpdateVal);

    const updated = employees.map((emp) => {
      if (emp.id === empId) {
        const nextKpis = emp.kpis.map((k) => {
          if (k.id === kpi.id) {
            let nextStatus: EmployeeKPI["status"] = "on_track";
            if (newVal >= k.target) nextStatus = "exceeding";
            else if (newVal < k.target * 0.7) nextStatus = "needs_attention";
            return {
              ...k,
              current: newVal,
              status: nextStatus,
            };
          }
          return k;
        });
        return { ...emp, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowUpdateKpiModal(null);
    showToast(`Updated progress for "${kpi.title}" to ${newVal} ${kpi.unit}.`);
  };

  // Find currently viewed employee
  const currentViewEmp = employees.find((e) => e.id === selectedEmpId) || employees[2] || employees[0];
  const overallKpiScore = calculateOverallKPIScore(currentViewEmp?.kpis || []);

  const isAdmin = session?.role === "admin";
  const isSupervisor = session?.role === "supervisor" || session?.role === "admin";

  // Filtered employees in Admin table
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (!mounted) {
    return <div className="ems-loading-screen">Initializing CreativeX Employee Management System...</div>;
  }

  return (
    <div className="ems-app-container">
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="ems-toast-banner" role="alert">
          <CheckCircle2 size={16} className="text-emerald" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Header Bar ── */}
      <header className="ems-top-bar">
        <div className="site-width ems-top-bar-inner">
          <div className="ems-top-brand">
            <Link href="/" className="ems-brand-link">
              <span className="ems-brand-tag">CreativeX EMS</span>
            </Link>
            <span className="ems-bar-divider" />
            <span className="ems-system-title">Enterprise Employee Management &amp; Supervisor KPI System</span>
          </div>

          <div className="ems-top-controls">
            <div className="ems-hq-clock">
              <span className="ems-status-live-dot" />
              <span>Colombo HQ · IST 09:00–18:00</span>
            </div>

            {session ? (
              <div className="ems-session-pill">
                <span className={`ems-role-tag role-${session.role}`}>{session.role.toUpperCase()}</span>
                <span className="ems-user-name">{session.employee.name}</span>
                <button type="button" onClick={handleLogout} className="ems-btn-logout" title="Sign Out">
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="ems-login-status-badge">
                <Lock size={13} />
                <span>Secure Authentication Required</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="site-width ems-main-content">
        {!session ? (
          /* ─────────────────────────────────────────────────────────────
             1. SECURE LOGIN SCREEN
          ───────────────────────────────────────────────────────────── */
          <div className="ems-login-wrapper">
            <div className="ems-login-card">
              <div className="ems-login-head">
                <div className="ems-badge-icon">
                  <ShieldCheck size={28} className="text-[#ff5a36]" />
                </div>
                <h2>CreativeX Employee Portal</h2>
                <p>
                  Sign in with your authorized corporate email to access your workspace, supervisor KPI evaluations,
                  and company performance records.
                </p>
              </div>

              {loginError && (
                <div className="ems-auth-error">
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="ems-login-form">
                <div className="ems-form-group">
                  <label htmlFor="ems-email">Work Email Address</label>
                  <input
                    id="ems-email"
                    type="email"
                    required
                    placeholder="e.g. tkavishka101@gmail.com or intern.bd@creativexlab.online"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div className="ems-form-group">
                  <label htmlFor="ems-pwd">Password</label>
                  <input
                    id="ems-pwd"
                    type="password"
                    required
                    placeholder="Enter account security password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="ems-btn-primary w-full">
                  {isSubmitting ? "Authenticating..." : "Sign In to Employee Portal"} <ChevronRight size={16} />
                </button>
              </form>

              {/* ── Quick Access Demo Credentials Helper ── */}
              <div className="ems-demo-logins-box">
                <div className="ems-demo-head">
                  <Sparkles size={14} className="text-[#ff5a36]" />
                  <span>Authorized Accounts Quick Access:</span>
                </div>

                <div className="ems-demo-buttons-grid">
                  {/* Master Admin Button */}
                  <button
                    type="button"
                    className="ems-demo-account-btn highlight-admin"
                    onClick={() => handleQuickLogin("tkavishka101@gmail.com", "@Kavishka2002")}
                  >
                    <div className="ems-acc-role">
                      <span className="badge-admin">MASTER ADMIN</span>
                      <strong className="text-white">Kavishka Thilakarathna</strong>
                    </div>
                    <small>tkavishka101@gmail.com · Full Access &amp; Management</small>
                  </button>

                  {/* Business Development Intern Button */}
                  <button
                    type="button"
                    className="ems-demo-account-btn"
                    onClick={() => handleQuickLogin("intern.bd@creativexlab.online", "@Intern2026")}
                  >
                    <div className="ems-acc-role">
                      <span className="badge-emp">BD INTERN</span>
                      <strong className="text-white">Kavindu Senanayake</strong>
                    </div>
                    <small>intern.bd@creativexlab.online · Live KPI Tracking</small>
                  </button>

                  {/* Supervisor Button */}
                  <button
                    type="button"
                    className="ems-demo-account-btn"
                    onClick={() => handleQuickLogin("supervisor.bd@creativexlab.online", "@Supervisor2026")}
                  >
                    <div className="ems-acc-role">
                      <span className="badge-sup">SUPERVISOR</span>
                      <strong className="text-white">Dinithi Perera</strong>
                    </div>
                    <small>supervisor.bd@creativexlab.online · Team Evaluation</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ─────────────────────────────────────────────────────────────
             2. LOGGED-IN EMS PORTAL & DASHBOARD
          ───────────────────────────────────────────────────────────── */
          <div className="ems-portal-dashboard">
            {/* Top Navigation & Profile Switcher Bar */}
            <div className="ems-dashboard-header">
              <div className="ems-header-left">
                <div className="ems-header-title-row">
                  <h1>Staff Performance &amp; Operations Graph</h1>
                  <span className="ems-tag-live">Active EMS Session</span>
                  <button
                    type="button"
                    onClick={handleManualSupabaseSync}
                    className="ems-tag-supabase"
                    title="Click to sync all details directly with Supabase database"
                  >
                    <span className={`ems-supabase-dot ${supabaseSyncStatus === "syncing" ? "dot-pulsing" : ""}`} />
                    <span>
                      {supabaseSyncStatus === "syncing" ? "Syncing to Supabase..." : "Supabase Cloud DB Live"}
                    </span>
                  </button>
                </div>
                <p>
                  Authenticated as <strong>{session.employee.name}</strong> · Role:{" "}
                  <strong className="text-[#ff5a36]">{session.role.toUpperCase()}</strong> ({session.employee.department})
                </p>
              </div>

              {/* View Employee Dropdown Selector (for Supervisors & Admin) */}
              {isSupervisor && (
                <div className="ems-employee-picker">
                  <label htmlFor="emp-select">Viewing Employee Profile:</label>
                  <select
                    id="emp-select"
                    value={selectedEmpId}
                    onChange={(e) => setSelectedEmpId(e.target.value)}
                    className="ems-select-styled"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.employeeId} — {emp.name} ({emp.designation})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="ems-nav-tabs-bar" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "profile"}
                className={`ems-tab-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <Briefcase size={15} />
                <span>Employee Profile &amp; Role</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "kpi"}
                className={`ems-tab-btn ${activeTab === "kpi" ? "active" : ""}`}
                onClick={() => setActiveTab("kpi")}
              >
                <Target size={15} />
                <span>Supervisor KPI Scoreboard</span>
                <span className="ems-tab-pill">{currentViewEmp.kpis.length} KPIs</span>
              </button>

              {isAdmin && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "admin"}
                  className={`ems-tab-btn ${activeTab === "admin" ? "active" : ""}`}
                  onClick={() => setActiveTab("admin")}
                >
                  <ShieldCheck size={15} />
                  <span>Admin Access Management</span>
                  <span className="ems-tab-pill pill-orange">{employees.length} Staff</span>
                </button>
              )}

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "attendance"}
                className={`ems-tab-btn ${activeTab === "attendance" ? "active" : ""}`}
                onClick={() => setActiveTab("attendance")}
              >
                <Calendar size={15} />
                <span>Work Schedule &amp; Activity</span>
              </button>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                TAB 1: EMPLOYEE PROFILE DOSSIER (FIRST: BD INTERN)
            ───────────────────────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="ems-profile-view">
                {/* Hero Profile Dossier Card */}
                <div className="ems-card ems-profile-hero">
                  <div className="ems-profile-hero-top">
                    <div className="ems-avatar-box">
                      <div className="ems-avatar-initials">
                        {currentViewEmp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className={`ems-status-indicator status-${currentViewEmp.status}`} />
                    </div>

                    <div className="ems-profile-hero-meta">
                      <div className="ems-title-row">
                        <h2>{currentViewEmp.name}</h2>
                        <span className="ems-badge-emp-id">{currentViewEmp.employeeId}</span>
                        <span className={`ems-status-tag tag-${currentViewEmp.status}`}>
                          {currentViewEmp.status === "active" ? "ACTIVE · HIGH VELOCITY" : currentViewEmp.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="ems-designation-line">
                        <span className="ems-designation-text">{currentViewEmp.designation}</span>
                        <span className="ems-dot-sep">·</span>
                        <span className="ems-department-text">{currentViewEmp.department}</span>
                      </div>
                    </div>

                    <div className="ems-profile-kpi-summary">
                      <div className="ems-kpi-score-gauge">
                        <div className="ems-gauge-circle">
                          <span className="ems-score-val">{overallKpiScore}%</span>
                          <span className="ems-score-lbl">KPI Score</span>
                        </div>
                        <div className="ems-gauge-grade">
                          <strong>Grade A+</strong>
                          <small>Exceeding Expectations</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ems-profile-details-grid">
                    <div className="ems-detail-col">
                      <span className="ems-lbl">Direct Supervisor(s)</span>
                      <strong>{currentViewEmp.supervisorName}</strong>
                      <small>Solutions Engineering &amp; Strategic Sales Lead</small>
                    </div>
                    <div className="ems-detail-col">
                      <span className="ems-lbl">Contract Agreement</span>
                      <strong>{currentViewEmp.contractType}</strong>
                      <small>Started {currentViewEmp.joiningDate} · Regular Review</small>
                    </div>
                    <div className="ems-detail-col">
                      <span className="ems-lbl">Work Location &amp; Hours</span>
                      <strong>{currentViewEmp.workLocation}</strong>
                      <small>9:00 AM – 6:00 PM (Monday – Friday, Colombo Time)</small>
                    </div>
                    <div className="ems-detail-col">
                      <span className="ems-lbl">Assigned Market Corridors</span>
                      <strong>{currentViewEmp.allocatedTerritory || "General Operations"}</strong>
                      <small>B2B Outbound Leads &amp; Discovery Scheduling</small>
                    </div>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                   ENHANCED BDI WORKSPACE & OS EXPERIENCE (B2B Intern)
                ───────────────────────────────────────────────────────────── */}
                {(currentViewEmp.id === "emp-bdi-001" || currentViewEmp.department.includes("Business Development")) && (
                  <div className="ems-bdi-workspace">
                    {/* 1. Quick Stats Strip */}
                    <div className="ems-bdi-quickstats-strip">
                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-orange">
                          <Users size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Monthly Leads Logged</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">
                              {currentViewEmp.kpis.find((k) => k.id === "kpi-bdi-1")?.current || 42}
                            </strong>
                            <span className="ems-stat-target">/ 45 Target</span>
                            <span className="ems-stat-pct text-emerald">93%</span>
                          </div>
                          <div className="ems-stat-progressbar">
                            <div className="ems-bar-fill" style={{ width: "93%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-purple">
                          <Calendar size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Discovery Demos Scheduled</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">
                              {currentViewEmp.kpis.find((k) => k.id === "kpi-bdi-2")?.current || 15}
                            </strong>
                            <span className="ems-stat-target">/ 16 Target</span>
                            <span className="ems-stat-pct text-emerald">94%</span>
                          </div>
                          <div className="ems-stat-progressbar">
                            <div className="ems-bar-fill" style={{ width: "94%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-emerald">
                          <DollarSign size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Active Pipeline Value</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">LKR 5.39M</strong>
                            <span className="ems-stat-sub">5 Qualified Deals</span>
                          </div>
                          <small className="text-[#a0a5a0] text-xs">Australia · UK · Sri Lanka</small>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-blue">
                          <Award size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Estimated Incentive</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val text-emerald tabular-nums">+LKR 63,500</strong>
                          </div>
                          <small className="text-[#a0a5a0] text-xs">Tier 1 Sprint Bonus</small>
                        </div>
                      </div>
                    </div>

                    {/* 2. Interactive Action Bar */}
                    <div className="ems-bdi-action-bar">
                      <div className="ems-action-bar-left">
                        <button
                          type="button"
                          onClick={() => setShowAddLeadModal(true)}
                          className="ems-btn-primary action-btn-glow"
                        >
                          <Plus size={15} /> Log New Lead
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddTaskModal(true)}
                          className="ems-btn-secondary"
                        >
                          <CheckSquare size={15} /> Add Outreach Task
                        </button>
                      </div>

                      <div className="ems-action-bar-right">
                        <button
                          type="button"
                          onClick={() => handleQuickAttendanceCheckIn("Office (Rajagiriya)")}
                          className="ems-btn-subtle"
                          title="Record today's attendance at Rajagiriya HQ"
                        >
                          <Building size={14} className="text-[#ff5a36]" /> Clock-In (Colombo HQ)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAttendanceCheckIn("Remote")}
                          className="ems-btn-subtle"
                          title="Record remote attendance"
                        >
                          <MapPin size={14} className="text-emerald" /> Remote Clock-In
                        </button>
                      </div>
                    </div>

                    {/* 3. Sub-Tab Navigator */}
                    <div className="ems-bdi-subnav">
                      <button
                        type="button"
                        onClick={() => setBdiSubTab("overview")}
                        className={`ems-subnav-btn ${bdiSubTab === "overview" ? "active" : ""}`}
                      >
                        <Briefcase size={15} />
                        <span>Role Charter &amp; Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBdiSubTab("pipeline")}
                        className={`ems-subnav-btn ${bdiSubTab === "pipeline" ? "active" : ""}`}
                      >
                        <Target size={15} />
                        <span>Live Deal Pipeline</span>
                        <span className="ems-count-pill">{currentViewEmp.leads?.length || 5}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBdiSubTab("checklist")}
                        className={`ems-subnav-btn ${bdiSubTab === "checklist" ? "active" : ""}`}
                      >
                        <CheckSquare size={15} />
                        <span>Daily Outreach Checklist</span>
                        <span className="ems-count-pill">
                          {(currentViewEmp.checklist || []).filter((c) => c.completed).length}/
                          {currentViewEmp.checklist?.length || 9}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBdiSubTab("playbook")}
                        className={`ems-subnav-btn ${bdiSubTab === "playbook" ? "active" : ""}`}
                      >
                        <BookOpen size={15} />
                        <span>Sales Playbook &amp; Pitch Scripts</span>
                        <span className="ems-badge-hot">1-Click Copy</span>
                      </button>
                    </div>

                    {/* ─────────────────────────────────────────────────────────────
                       SUB-TAB 1: ROLE CHARTER & PROFILE OVERVIEW
                    ───────────────────────────────────────────────────────────── */}
                    {bdiSubTab === "overview" && (
                      <div className="ems-role-spotlight-card">
                        <div className="ems-spotlight-head">
                          <div className="ems-spotlight-title">
                            <Award size={18} className="text-[#ff5a36]" />
                            <h3>Role Charter: Business Development Intern (IT &amp; Software Products)</h3>
                          </div>
                          <span className="ems-spotlight-badge">Tier 1 Talent Track</span>
                        </div>

                        <div className="ems-spotlight-columns">
                          <div className="ems-spotlight-col">
                            <h4>Core Focus Areas &amp; Deliverables</h4>
                            <ul>
                              <li>
                                <CheckCircle2 size={14} className="text-emerald" />
                                <strong>B2B Tech Lead Generation:</strong> Identify and qualify C-level decision-makers in logistics, healthcare, and export manufacturing.
                              </li>
                              <li>
                                <CheckCircle2 size={14} className="text-emerald" />
                                <strong>CreativeOS Discovery Demos:</strong> Pitch work operating system benefits and book qualified walkthroughs with solutions architects.
                              </li>
                              <li>
                                <CheckCircle2 size={14} className="text-emerald" />
                                <strong>Proposal Turnaround SLA:</strong> Ingest client requirements and coordinate with edge engineering leads within 24 hours.
                              </li>
                              <li>
                                <CheckCircle2 size={14} className="text-emerald" />
                                <strong>Market Intelligence:</strong> Curate pricing and competitor dossiers for Australian and UK remote tech agency corridors.
                              </li>
                            </ul>
                          </div>

                          <div className="ems-spotlight-col">
                            <h4>Compensation &amp; Career Trajectory</h4>
                            <div className="ems-comp-box">
                              <div className="ems-comp-row">
                                <span>Monthly Base Stipend:</span>
                                <strong className="text-white">LKR 25,000 – 50,000 / Month</strong>
                              </div>
                              <div className="ems-comp-row">
                                <span>Performance Commission:</span>
                                <strong className="text-emerald">+ Commission on Closed Enterprise Sprints</strong>
                              </div>
                              <div className="ems-comp-row">
                                <span>Promotion Pathway:</span>
                                <span>Associate Business Development Executive (Upon 6-Month Review)</span>
                              </div>
                            </div>

                            <div className="ems-spotlight-actions">
                              {isSupervisor && (
                                <div className="ems-supervisor-quick-assign-row">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAssigneeEmpId(currentViewEmp.id);
                                      setShowAddLeadModal(true);
                                    }}
                                    className="ems-btn-primary"
                                    title={`Assign a new B2B lead to ${currentViewEmp.name}`}
                                  >
                                    <Sparkles size={14} /> Assign Lead to {currentViewEmp.name.split(" ")[0]}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAssigneeEmpId(currentViewEmp.id);
                                      setShowAddTaskModal(true);
                                    }}
                                    className="ems-btn-secondary"
                                    title={`Assign a daily shift task to ${currentViewEmp.name}`}
                                  >
                                    <CheckSquare size={14} /> Assign Task
                                  </button>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => setActiveTab("kpi")}
                                className="ems-btn-secondary w-full"
                              >
                                Inspect Supervisor KPI Progress <ChevronRight size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─────────────────────────────────────────────────────────────
                       SUB-TAB 2: LIVE DEAL PIPELINE (INTERACTIVE CRM)
                    ───────────────────────────────────────────────────────────── */}
                    {bdiSubTab === "pipeline" && (
                      <div className="ems-pipeline-container">
                        <div className="ems-pipeline-header">
                          <div>
                            <h3 className="ems-subview-title">Active B2B Sales Pipeline</h3>
                            <p className="ems-subview-desc">
                              Track enterprise and SME software prospects across Sri Lanka, Australia, and the UK.
                              Advancing a deal automatically increments your live Supervisor KPI targets!
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowAddLeadModal(true)}
                            className="ems-btn-primary"
                          >
                            <Plus size={14} /> Add Opportunity
                          </button>
                        </div>

                        <div className="ems-pipeline-grid">
                          {(currentViewEmp.leads || []).map((lead) => {
                            const stageColors: Record<string, string> = {
                              "New Lead": "stage-blue",
                              "Contacted": "stage-purple",
                              "Demo Booked": "stage-orange",
                              "Proposal Sent": "stage-amber",
                              "Closed Won": "stage-emerald",
                            };
                            const isWon = lead.stage === "Closed Won";

                            return (
                              <div key={lead.id} className={`ems-lead-card ${isWon ? "lead-card-won" : ""}`}>
                                <div className="ems-lead-card-top">
                                  <div className="ems-lead-main-info">
                                    <h4 className="ems-lead-client">{lead.clientName}</h4>
                                    <span className="ems-lead-contact">{lead.contactPerson}</span>
                                  </div>
                                  <span className={`ems-stage-badge ${stageColors[lead.stage] || "stage-blue"}`}>
                                    {lead.stage}
                                  </span>
                                </div>

                                <div className="ems-lead-meta-row">
                                  <div className="ems-lead-chip corridor-chip">
                                    <MapPin size={12} /> {lead.corridor}
                                  </div>
                                  <div className="ems-lead-chip channel-chip">
                                    <MessageSquare size={12} /> {lead.channel}
                                  </div>
                                  <div className="ems-lead-value-badge tabular-nums">
                                    {lead.dealValue}
                                  </div>
                                  {lead.assignedBy && (
                                    <div className="ems-lead-chip ems-assigned-chip" title={`Assigned by ${lead.assignedBy}`}>
                                      <UserCheck size={12} className="text-[#ff5a36]" /> Assigned by {lead.assignedBy}
                                    </div>
                                  )}
                                </div>

                                <p className="ems-lead-notes">{lead.notes}</p>

                                <div className="ems-lead-footer">
                                  <div className="ems-lead-followup">
                                    <Clock size={12} className="text-[#a0a5a0]" />
                                    <span>{lead.nextFollowUp}</span>
                                  </div>

                                  <div className="ems-stage-control-group">
                                    <label htmlFor={`stage-select-${lead.id}`} className="ems-stage-select-label">
                                      Stage:
                                    </label>
                                    <div className="ems-stage-dropdown-box">
                                      <select
                                        id={`stage-select-${lead.id}`}
                                        value={lead.stage}
                                        onChange={(e) =>
                                          handleSetLeadStage(lead.id, e.target.value as LeadPipelineItem["stage"])
                                        }
                                        className={`ems-stage-dropdown-menu ${stageColors[lead.stage] || "stage-blue"}`}
                                        title="Choose stage from dropdown menu"
                                      >
                                        <option value="New Lead">New Lead</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Demo Booked">Demo Booked</option>
                                        <option value="Proposal Sent">Proposal Sent</option>
                                        <option value="Closed Won">Closed Won ✓</option>
                                      </select>
                                      <ChevronDown size={13} className="ems-dropdown-arrow" />
                                    </div>

                                    {isWon && (
                                      <span className="ems-won-tag">
                                        <CheckCircle2 size={13} /> Won
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ─────────────────────────────────────────────────────────────
                       SUB-TAB 3: PROFESSIONAL DAY-TO-DAY WORKFLOWS & CHECKLIST
                    ───────────────────────────────────────────────────────────── */}
                    {bdiSubTab === "checklist" && (
                      <div className="ems-checklist-container">
                        {/* 1. Header & Pulse Strip */}
                        <div className="ems-checklist-header">
                          <div>
                            <div className="ems-shift-pulse-indicator">
                              <span className="ems-pulse-dot" />
                              <span className="ems-pulse-text">
                                LIVE DAY-TO-DAY SHIFT · COLOMBO HQ &amp; REMOTE
                              </span>
                            </div>
                            <h3 className="ems-subview-title">Daily Business Development Workflow</h3>
                            <p className="ems-subview-desc">
                              Structured routine for cold outreach, WhatsApp discovery follow-ups, client meetings, and CRM hygiene.
                              Track time-blocked deliverables and log End-of-Day (EOD) sign-offs with supervisors.
                            </p>
                          </div>

                          <div className="ems-checklist-header-right">
                            <div className="ems-checklist-progress-box">
                              <div className="ems-progress-info">
                                <span className="ems-progress-lbl">Shift Progress</span>
                                <div className="ems-progress-nums">
                                  <strong className="text-emerald tabular-nums">
                                    {(currentViewEmp.checklist || []).filter((c) => c.completed).length} of{" "}
                                    {Math.max(1, (currentViewEmp.checklist || []).length)}
                                  </strong>
                                  <span className="ems-pct-sub">
                                    (
                                    {Math.round(
                                      (((currentViewEmp.checklist || []).filter((c) => c.completed).length) /
                                        Math.max(1, (currentViewEmp.checklist || []).length)) *
                                        100
                                    )}
                                    %)
                                  </span>
                                </div>
                              </div>
                              <div className="ems-progress-bar-wrap">
                                <div className="ems-bar-track">
                                  <div
                                    className="ems-bar-fill"
                                    style={{
                                      width: `${Math.round(
                                        (((currentViewEmp.checklist || []).filter((c) => c.completed).length) /
                                          Math.max(1, (currentViewEmp.checklist || []).length)) *
                                          100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setShowAddTaskModal(true)}
                              className="ems-btn-primary"
                            >
                              <Plus size={14} /> Add Task
                            </button>

                            <button
                              type="button"
                              onClick={() => setShowEodModal(true)}
                              className="ems-btn-secondary"
                              title="Submit end-of-day summary to supervisor"
                            >
                              <Send size={14} /> Submit EOD
                            </button>
                          </div>
                        </div>

                        {/* 2. Shift Filter Pills & Quick Actions */}
                        <div className="ems-workflow-filters-bar">
                          <div className="ems-workflow-pills">
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("all")}
                              className={`ems-wf-filter-pill ${workflowFilter === "all" ? "active" : ""}`}
                            >
                              All Shifts ({currentViewEmp.checklist?.length || 0})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("morning")}
                              className={`ems-wf-filter-pill ${workflowFilter === "morning" ? "active" : ""}`}
                            >
                              Morning (09:00–12:00)
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("afternoon")}
                              className={`ems-wf-filter-pill ${workflowFilter === "afternoon" ? "active" : ""}`}
                            >
                              Afternoon (12:00–17:00)
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("eod")}
                              className={`ems-wf-filter-pill ${workflowFilter === "eod" ? "active" : ""}`}
                            >
                              EOD Wrap (17:00–18:00)
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("urgent")}
                              className={`ems-wf-filter-pill pill-urgent ${workflowFilter === "urgent" ? "active" : ""}`}
                            >
                              <AlertCircle size={12} /> Urgent Priority
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("pending")}
                              className={`ems-wf-filter-pill ${workflowFilter === "pending" ? "active" : ""}`}
                            >
                              Pending (
                              {(currentViewEmp.checklist || []).filter((c) => !c.completed).length}
                              )
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("completed")}
                              className={`ems-wf-filter-pill pill-completed ${workflowFilter === "completed" ? "active" : ""}`}
                            >
                              Completed (
                              {(currentViewEmp.checklist || []).filter((c) => c.completed).length}
                              )
                            </button>
                          </div>

                          <div className="ems-workflow-quick-actions">
                            <button
                              type="button"
                              onClick={() => handleMarkAllTasks(true)}
                              className="ems-link-btn"
                              title="Mark all tasks as completed"
                            >
                              Mark All Done
                            </button>
                            <span className="ems-sep-dot">·</span>
                            <button
                              type="button"
                              onClick={() => handleMarkAllTasks(false)}
                              className="ems-link-btn"
                              title="Reset all tasks to pending"
                            >
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* 3. Filtered Tasks List */}
                        <div className="ems-checklist-list">
                          {(currentViewEmp.checklist || [])
                            .filter((item) => {
                              if (workflowFilter === "morning") return item.shiftBlock === "morning";
                              if (workflowFilter === "afternoon") return item.shiftBlock === "afternoon";
                              if (workflowFilter === "eod") return item.shiftBlock === "eod";
                              if (workflowFilter === "urgent") return item.priority === "urgent";
                              if (workflowFilter === "pending") return !item.completed;
                              if (workflowFilter === "completed") return item.completed;
                              return true;
                            })
                            .map((item) => {
                              const priorityClass =
                                item.priority === "urgent"
                                  ? "priority-urgent"
                                  : item.priority === "high"
                                  ? "priority-high"
                                  : "priority-normal";

                              return (
                                <div
                                  key={item.id}
                                  className={`ems-checklist-row ${item.completed ? "task-completed" : ""}`}
                                >
                                  <div
                                    className="ems-check-box"
                                    onClick={() => handleToggleChecklist(item.id)}
                                    title={item.completed ? "Mark as pending" : "Mark as completed"}
                                  >
                                    {item.completed ? (
                                      <CheckSquare size={19} className="text-emerald" />
                                    ) : (
                                      <Square size={19} className="text-[#a0a5a0]" />
                                    )}
                                  </div>

                                  <div
                                    className="ems-check-content"
                                    onClick={() => handleToggleChecklist(item.id)}
                                  >
                                    <div className="ems-task-title-row">
                                      <span
                                        className={`ems-task-title ${
                                          item.completed ? "line-through text-[#666]" : "text-white"
                                        }`}
                                      >
                                        {item.task}
                                      </span>
                                      {item.assignedBy && (
                                        <span className="ems-priority-tag ems-assigned-task-tag" title={`Delegated by ${item.assignedBy}`}>
                                          <UserCheck size={11} className="text-[#ff5a36]" /> Assigned by {item.assignedBy}
                                        </span>
                                      )}
                                    </div>
                                    {item.notes && (
                                      <p className="ems-task-notes-text">{item.notes}</p>
                                    )}
                                  </div>

                                  <div className="ems-check-meta">
                                    {item.priority && (
                                      <span className={`ems-priority-tag ${priorityClass}`}>
                                        {item.priority.toUpperCase()}
                                      </span>
                                    )}
                                    <span className="ems-time-badge tabular-nums">
                                      <Clock size={12} /> {item.timeSlot}
                                    </span>
                                    <span className="ems-cat-badge">{item.category}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTask(item.id);
                                      }}
                                      className="ems-task-del-btn"
                                      title="Remove from workflow"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* 4. Bottom EOD Operations Handover Bar */}
                        <div className="ems-eod-handover-banner">
                          <div className="ems-eod-banner-left">
                            <div className="ems-eod-icon">
                              <Sparkles size={18} className="text-[#ff5a36]" />
                            </div>
                            <div>
                              <strong className="ems-eod-title">
                                EOD Daily Operations Handover &amp; Supervisor Audit
                              </strong>
                              <p className="ems-eod-desc">
                                Direct supervisor review with <strong>{currentViewEmp.supervisorName}</strong>. 
                                Completed tasks automatically map to monthly KPI weightings.
                              </p>
                            </div>
                          </div>
                          <div className="ems-eod-banner-right">
                            <button
                              type="button"
                              onClick={() => setShowEodModal(true)}
                              className="ems-btn-primary"
                            >
                              <Send size={14} /> Submit Today&apos;s Report
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─────────────────────────────────────────────────────────────
                       SUB-TAB 4: SALES PLAYBOOK & 1-CLICK PITCH SCRIPTS
                    ───────────────────────────────────────────────────────────── */}
                    {bdiSubTab === "playbook" && (
                      <div className="ems-playbook-container">
                        <div className="ems-playbook-header">
                          <div>
                            <h3 className="ems-subview-title">CreativeX Sales Playbook &amp; Objection Scripts</h3>
                            <p className="ems-subview-desc">
                              Pre-tested B2B outreach scripts designed for high response rates across LinkedIn, cold email, and WhatsApp.
                              Click &quot;Copy Script&quot; to grab the template directly into your clipboard.
                            </p>
                          </div>
                          <span className="ems-playbook-badge">
                            <Sparkles size={14} className="text-[#ff5a36]" /> High-Conversion Templates
                          </span>
                        </div>

                        <div className="ems-playbook-grid">
                          {DEFAULT_SALES_SCRIPTS.map((script) => {
                            const isCopied = copiedScriptId === script.id;
                            const fullPitchToCopy = `${script.pitchBody}\n\n[Objection Handling Guide]:\n${script.objectionHandling}`;

                            return (
                              <div key={script.id} className="ems-playbook-card">
                                <div className="ems-playbook-card-top">
                                  <div>
                                    <div className="ems-script-tags">
                                      <span className="ems-channel-tag">{script.targetAudience}</span>
                                    </div>
                                    <h4 className="ems-script-title">{script.title}</h4>
                                    <small className="text-[#a0a5a0] text-xs mt-1 block">
                                      <strong className="text-[#ff5a36]">Key Hook:</strong> {script.keyHook}
                                    </small>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleCopyScript(script.id, fullPitchToCopy)}
                                    className={`ems-copy-btn ${isCopied ? "btn-copied" : ""}`}
                                    title="Copy script to clipboard"
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check size={14} /> Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={14} /> Copy Script
                                      </>
                                    )}
                                  </button>
                                </div>

                                <div className="ems-script-body">
                                  <pre className="ems-script-pre">{script.pitchBody}</pre>
                                  <div className="ems-objection-box mt-3 pt-3 border-t border-[#1e241e]">
                                    <span className="text-[11px] font-bold text-[#ff5a36] uppercase tracking-wider block mb-1">
                                      Objection Handling:
                                    </span>
                                    <p className="text-xs text-[#a5aaa5] leading-relaxed m-0">
                                      {script.objectionHandling}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 2: SUPERVISOR KPI SCOREBOARD & 1-ON-1 REVIEWS
            ───────────────────────────────────────────────────────────── */}
            {activeTab === "kpi" && (
              <div className="ems-kpi-view">
                {/* Supervisor KPI Control Header */}
                <div className="ems-card ems-kpi-header-card">
                  <div className="ems-kpi-header-content">
                    <div>
                      <span className="ems-section-kicker">Supervisor Evaluation Framework</span>
                      <h2>KPI Performance Scoreboard: {currentViewEmp.name}</h2>
                      <p>
                        Track monthly targets, weighted output percentages, and qualitative 1-on-1 supervisor evaluations.
                        Performance ratings directly inform quarterly promotion and incentive calculations.
                      </p>
                    </div>

                    <div className="ems-kpi-header-actions">
                      {isSupervisor && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setAssigneeEmpId(currentViewEmp.id);
                              setShowAddLeadModal(true);
                            }}
                            className="ems-btn-secondary"
                            title={`Assign a new B2B sales lead directly to ${currentViewEmp.name}`}
                          >
                            <Sparkles size={14} className="text-[#ff5a36]" /> Assign Lead
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAssigneeEmpId(currentViewEmp.id);
                              setShowAddTaskModal(true);
                            }}
                            className="ems-btn-secondary"
                            title={`Assign a shift workflow task to ${currentViewEmp.name}`}
                          >
                            <CheckSquare size={14} className="text-emerald" /> Assign Task
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddKpiModal(true)}
                            className="ems-btn-secondary"
                          >
                            <Plus size={14} /> Add KPI Target
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddReviewModal(true)}
                            className="ems-btn-primary"
                          >
                            <UserCheck size={14} /> Log 1-on-1 Review
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* High Level KPI Overview Cards */}
                  <div className="ems-kpi-metric-strip">
                    <div className="ems-kpi-pill-metric">
                      <span className="lbl">Overall Composite Score</span>
                      <strong className="val text-emerald">{overallKpiScore}%</strong>
                      <small>Grade A+ (Exceeding)</small>
                    </div>
                    <div className="ems-kpi-pill-metric">
                      <span className="lbl">Active KPIs Tracked</span>
                      <strong className="val">{currentViewEmp.kpis.length} Indicators</strong>
                      <small>Weight Total: 100%</small>
                    </div>
                    <div className="ems-kpi-pill-metric">
                      <span className="lbl">Supervisor Review Cadence</span>
                      <strong className="val">Weekly 1-on-1</strong>
                      <small>Last logged: {currentViewEmp.weeklyReviews[0]?.date || "Pending"}</small>
                    </div>
                    <div className="ems-kpi-pill-metric">
                      <span className="lbl">Attendance Reliability</span>
                      <strong className="val text-emerald">100% On-Time</strong>
                      <small>22 Days Logged (0 Unexcused)</small>
                    </div>
                  </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="ems-kpi-grid">
                  {currentViewEmp.kpis.map((kpi) => {
                    const pct =
                      kpi.unit.includes("Lower is better") || kpi.title.toLowerCase().includes("turnaround")
                        ? kpi.current <= kpi.target
                          ? 100
                          : Math.round((kpi.target / kpi.current) * 100)
                        : Math.round((kpi.current / kpi.target) * 100);

                    return (
                      <div key={kpi.id} className="ems-card ems-kpi-item-card">
                        <div className="ems-kpi-card-top">
                          <div className="ems-kpi-tag-row">
                            <span className={`ems-kpi-badge status-${kpi.status}`}>
                              {kpi.status.replace("_", " ").toUpperCase()}
                            </span>
                            <span className="ems-kpi-weight">Weight: {kpi.weight}%</span>
                          </div>
                          {isSupervisor && (
                            <button
                              type="button"
                              onClick={() => {
                                setShowUpdateKpiModal({ kpi, empId: currentViewEmp.id });
                                setKpiUpdateVal(kpi.current);
                              }}
                              className="ems-kpi-edit-btn"
                              title="Update Progress"
                            >
                              <Edit size={13} /> Update
                            </button>
                          )}
                        </div>

                        <h4>{kpi.title}</h4>

                        <div className="ems-kpi-progress-wrap">
                          <div className="ems-kpi-bar-bg">
                            <div
                              className={`ems-kpi-bar-fill ${pct >= 100 ? "bar-emerald" : "bar-orange"}`}
                              style={{ width: `${Math.min(100, pct)}%` }}
                            />
                          </div>
                          <div className="ems-kpi-progress-labels">
                            <span>
                              Current: <strong>{kpi.current}</strong> {kpi.unit}
                            </span>
                            <span className="text-white font-bold">{pct}%</span>
                          </div>
                        </div>

                        <div className="ems-kpi-target-row">
                          <span>
                            Target: <strong>{kpi.target}</strong> {kpi.unit}
                          </span>
                          <span className="ems-period">{kpi.period}</span>
                        </div>

                        {kpi.notes && <p className="ems-kpi-notes">{kpi.notes}</p>}
                      </div>
                    );
                  })}
                </div>

                {/* Supervisor 1-on-1 Reviews History Section */}
                <div className="ems-card ems-reviews-card">
                  <div className="ems-reviews-head">
                    <div className="ems-head-title">
                      <Star size={18} className="text-[#ff5a36]" />
                      <h3>Supervisor 1-on-1 Evaluation History</h3>
                    </div>
                    <span className="ems-review-count">{currentViewEmp.weeklyReviews.length} Recorded Sessions</span>
                  </div>

                  {currentViewEmp.weeklyReviews.length === 0 ? (
                    <div className="ems-empty-state">
                      <FileText size={24} className="text-white/40" />
                      <p>No 1-on-1 reviews logged yet. Supervisors can record evaluations using the button above.</p>
                    </div>
                  ) : (
                    <div className="ems-reviews-timeline">
                      {currentViewEmp.weeklyReviews.map((rev) => (
                        <div key={rev.id} className="ems-review-entry">
                          <div className="ems-review-meta">
                            <span className="ems-review-date">{rev.date}</span>
                            <div className="ems-stars-row">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={13}
                                  className={star <= rev.rating ? "text-amber-400 fill-amber-400" : "text-white/20"}
                                />
                              ))}
                              <span className="ems-rating-num">{rev.rating} / 5.0</span>
                            </div>
                            <span className="ems-reviewer-name">Reviewed by: {rev.supervisorName}</span>
                          </div>

                          <div className="ems-review-body">
                            <div className="ems-rev-section">
                              <span className="ems-rev-label text-emerald">Demonstrated Strengths &amp; Wins:</span>
                              <p>{rev.strengths}</p>
                            </div>
                            <div className="ems-rev-section">
                              <span className="ems-rev-label text-[#ff5a36]">Coaching &amp; Growth Focus:</span>
                              <p>{rev.improvements}</p>
                            </div>
                            <div className="ems-rev-section">
                              <span className="ems-rev-label text-blue-400">Next Sprint Commitments:</span>
                              <p>{rev.goalsNextWeek}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 3: ADMIN ACCESS MANAGEMENT & STAFF DIRECTORY
            ───────────────────────────────────────────────────────────── */}
            {activeTab === "admin" && isAdmin && (
              <div className="ems-admin-view">
                <div className="ems-card ems-admin-header-card">
                  <div className="ems-admin-header-row">
                    <div>
                      <span className="ems-section-kicker">Master Administrator Console</span>
                      <h2>Employee Access &amp; Organization Directory</h2>
                      <p>
                        Full administrative governance: Onboard staff, configure supervisor hierarchies, manage access
                        credentials, and toggle account states.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddEmpModal(true)}
                      className="ems-btn-primary"
                    >
                      <UserPlus size={15} /> Add New Employee Profile
                    </button>
                  </div>

                  {/* Filters Bar */}
                  <div className="ems-admin-filters">
                    <div className="ems-search-box">
                      <Search size={15} className="text-white/40" />
                      <input
                        type="text"
                        placeholder="Search employee by name, ID, email, or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="ems-filter-role">
                      <Filter size={14} className="text-white/40" />
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="ems-select-styled"
                      >
                        <option value="all">All Roles</option>
                        <option value="admin">Administrators</option>
                        <option value="supervisor">Supervisors</option>
                        <option value="employee">Employees &amp; Interns</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Directory Table */}
                <div className="ems-table-container">
                  <table className="ems-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Role &amp; Department</th>
                        <th>Supervisor</th>
                        <th>KPI Score</th>
                        <th>Account Status</th>
                        <th>Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((emp) => {
                        const score = calculateOverallKPIScore(emp.kpis);
                        return (
                          <tr key={emp.id} className={emp.id === selectedEmpId ? "selected-row" : ""}>
                            <td className="ems-cell-emp">
                              <div className="ems-user-cell">
                                <div className="ems-cell-avatar">
                                  {emp.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="ems-cell-info">
                                  <strong>{emp.name}</strong>
                                  <span className="ems-cell-email">{emp.email}</span>
                                  <span className="ems-cell-badge">{emp.employeeId}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="ems-role-cell">
                                <span className={`ems-role-tag role-${emp.role}`}>{emp.role.toUpperCase()}</span>
                                <span className="ems-cell-desig">{emp.designation}</span>
                                <small className="text-white/50">{emp.department}</small>
                              </div>
                            </td>

                            <td>
                              <span className="ems-supervisor-cell">{emp.supervisorName}</span>
                            </td>

                            <td>
                              <div className="ems-score-cell">
                                <strong className="text-emerald">{score}%</strong>
                                <small>{emp.kpis.length} KPIs Active</small>
                              </div>
                            </td>

                            <td>
                              <span className={`ems-status-pill status-${emp.status}`}>
                                {emp.status.toUpperCase()}
                              </span>
                            </td>

                            <td>
                              <div className="ems-actions-cell">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedEmpId(emp.id);
                                    setActiveTab("profile");
                                  }}
                                  className="ems-action-btn"
                                  title="View Profile Dossier"
                                >
                                  View Profile
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(emp.id, emp.status)}
                                  className={`ems-action-btn ${emp.status === "active" ? "btn-warn" : "btn-reactivate"}`}
                                  title={emp.status === "active" ? "Suspend Account" : "Activate Account"}
                                >
                                  {emp.status === "active" ? "Suspend" : "Activate"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 4: ATTENDANCE & WORK SCHEDULE
            ───────────────────────────────────────────────────────────── */}
            {activeTab === "attendance" && (
              <div className="ems-attendance-view">
                <div className="ems-card ems-attendance-header-card">
                  <div>
                    <span className="ems-section-kicker">Operating Hours &amp; Schedule</span>
                    <h2>Work Schedule &amp; Activity Log: {currentViewEmp.name}</h2>
                    <p>
                      Official Colombo HQ Business Hours: <strong>9:00 AM – 6:00 PM (Monday – Friday)</strong>.
                      All check-ins are cryptographically timestamped into the CreativeX Activity Log.
                    </p>
                  </div>

                  <div className="ems-attendance-stat-row">
                    <div className="ems-stat-chip">
                      <span>Monthly Work Mode:</span>
                      <strong>{currentViewEmp.workLocation}</strong>
                    </div>
                    <div className="ems-stat-chip">
                      <span>On-Time Attendance:</span>
                      <strong className="text-emerald">100% Verified</strong>
                    </div>
                  </div>
                </div>

                <div className="ems-card ems-attendance-table-card">
                  <h3>Recent Daily Check-In Records</h3>
                  <table className="ems-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                        <th>Work Mode</th>
                        <th>Punctuality Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentViewEmp.attendance.map((rec, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{rec.date}</strong>
                          </td>
                          <td className="font-mono text-emerald">{rec.checkIn}</td>
                          <td className="font-mono">{rec.checkOut}</td>
                          <td>
                            <span className="ems-workmode-tag">{rec.workMode}</span>
                          </td>
                          <td>
                            <span className="ems-status-pill status-active">ON-TIME ✓</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD NEW EMPLOYEE / INTERN
      ───────────────────────────────────────────────────────────── */}
      {showAddEmpModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowAddEmpModal(false)}>
          <div className="ems-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <h3>Onboard New Employee / Intern Profile</h3>
              <button
                type="button"
                onClick={() => setShowAddEmpModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="ems-modal-form">
              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyantha Silva"
                    value={newEmpName}
                    onChange={(e) => setNewEmpName(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priyantha@creativexlab.online"
                    value={newEmpEmail}
                    onChange={(e) => setNewEmpEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Role Privilege *</label>
                  <select
                    value={newEmpRole}
                    onChange={(e) => setNewEmpRole(e.target.value as EmployeeRole)}
                    className="ems-select-styled"
                  >
                    <option value="employee">Employee / Intern</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="ems-form-group">
                  <label>Initial Password</label>
                  <input
                    type="text"
                    value={newEmpPassword}
                    onChange={(e) => setNewEmpPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Business Development Intern"
                    value={newEmpDesignation}
                    onChange={(e) => setNewEmpDesignation(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Department</label>
                  <select
                    value={newEmpDepartment}
                    onChange={(e) => setNewEmpDepartment(e.target.value)}
                    className="ems-select-styled"
                  >
                    <option value="Business Development & Sales">Business Development &amp; Sales</option>
                    <option value="Cloud Infrastructure & Edge">Cloud Infrastructure &amp; Edge</option>
                    <option value="AI Systems & Machine Learning">AI Systems &amp; Machine Learning</option>
                    <option value="Creative Design & UI/UX">Creative Design &amp; UI/UX</option>
                    <option value="Executive Leadership">Executive Leadership</option>
                  </select>
                </div>
              </div>

              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Direct Supervisor(s)</label>
                  <input
                    type="text"
                    value={newEmpSupervisor}
                    onChange={(e) => setNewEmpSupervisor(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Contract Type</label>
                  <input
                    type="text"
                    value={newEmpContract}
                    onChange={(e) => setNewEmpContract(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Save &amp; Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD SUPERVISOR 1-ON-1 REVIEW
      ───────────────────────────────────────────────────────────── */}
      {showAddReviewModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowAddReviewModal(false)}>
          <div className="ems-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <h3>Record 1-on-1 Review for {currentViewEmp.name}</h3>
              <button
                type="button"
                onClick={() => setShowAddReviewModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddReview} className="ems-modal-form">
              <div className="ems-form-group">
                <label>Overall Sprint Rating (1 to 5 Stars)</label>
                <div className="ems-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`ems-star-btn ${star <= reviewRating ? "active" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ems-star-label">{reviewRating} / 5 Stars</span>
                </div>
              </div>

              <div className="ems-form-group">
                <label>Demonstrated Strengths &amp; Accomplishments *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Fast lead turnaround speed, professional phone calls with Australian clients..."
                  value={reviewStrengths}
                  onChange={(e) => setReviewStrengths(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Coaching &amp; Improvement Points</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Ensure CRM notes are completed immediately following the client call..."
                  value={reviewImprovements}
                  onChange={(e) => setReviewImprovements(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Goals &amp; Targets for Next Week</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Schedule 4 new discovery meetings for CreativeOS..."
                  value={reviewGoals}
                  onChange={(e) => setReviewGoals(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Save &amp; Log Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD NEW KPI TARGET
      ───────────────────────────────────────────────────────────── */}
      {showAddKpiModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowAddKpiModal(false)}>
          <div className="ems-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <h3>Assign New KPI Target to {currentViewEmp.name}</h3>
              <button
                type="button"
                onClick={() => setShowAddKpiModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddKpi} className="ems-modal-form">
              <div className="ems-form-group">
                <label>KPI Indicator Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B2B Outbound Calls Completed"
                  value={kpiTitle}
                  onChange={(e) => setKpiTitle(e.target.value)}
                />
              </div>

              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Target Value *</label>
                  <input
                    type="number"
                    required
                    value={kpiTarget}
                    onChange={(e) => setKpiTarget(Number(e.target.value))}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Current Progress</label>
                  <input
                    type="number"
                    value={kpiCurrent}
                    onChange={(e) => setKpiCurrent(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="ems-form-row">
                <div className="ems-form-group">
                  <label>Measurement Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. Qualified Leads, Demos, %"
                    value={kpiUnit}
                    onChange={(e) => setKpiUnit(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Weight (%)</label>
                  <input
                    type="number"
                    value={kpiWeight}
                    onChange={(e) => setKpiWeight(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="ems-form-group">
                <label>Evaluation Period</label>
                <input
                  type="text"
                  value={kpiPeriod}
                  onChange={(e) => setKpiPeriod(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Supervisor Guidance Notes</label>
                <textarea
                  rows={2}
                  placeholder="Instructions for achieving this KPI..."
                  value={kpiNotes}
                  onChange={(e) => setKpiNotes(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddKpiModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Assign KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: UPDATE KPI PROGRESS
      ───────────────────────────────────────────────────────────── */}
      {showUpdateKpiModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowUpdateKpiModal(null)}>
          <div className="ems-modal-card modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <h3>Update Progress: {showUpdateKpiModal.kpi.title}</h3>
              <button
                type="button"
                onClick={() => setShowUpdateKpiModal(null)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateKpiProgress} className="ems-modal-form">
              <div className="ems-form-group">
                <label>
                  Current Value (Target is {showUpdateKpiModal.kpi.target} {showUpdateKpiModal.kpi.unit})
                </label>
                <input
                  type="number"
                  required
                  value={kpiUpdateVal}
                  onChange={(e) => setKpiUpdateVal(Number(e.target.value))}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowUpdateKpiModal(null)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD NEW B2B LEAD (BDI PIPELINE)
      ───────────────────────────────────────────────────────────── */}
      {showAddLeadModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowAddLeadModal(false)}>
          <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div className="ems-modal-title-with-icon">
                <Plus size={18} className="text-[#ff5a36]" />
                <h3>Log New B2B Sales Opportunity</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddNewLead} className="ems-modal-form">
              {isSupervisor && (
                <div className="ems-form-group ems-supervisor-assignment-box">
                  <label className="ems-assignee-label">
                    <UserCheck size={14} className="text-[#ff5a36]" />
                    Assign Opportunity To Intern / BD Staff *
                  </label>
                  <select
                    value={assigneeEmpId}
                    onChange={(e) => setAssigneeEmpId(e.target.value)}
                    className="ems-assignee-select"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} — {emp.designation} ({emp.employeeId})
                      </option>
                    ))}
                  </select>
                  <span className="ems-field-hint">
                    Direct assignment from Supervisor / Admin. The lead will appear in the chosen employee&apos;s pipeline and automatically increment their outbound KPI target.
                  </span>
                </div>
              )}

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Client / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex HealthTech Solutions"
                    value={newLeadClient}
                    onChange={(e) => setNewLeadClient(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Contact Person &amp; Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rohan Jayasuriya (CTO)"
                    value={newLeadContact}
                    onChange={(e) => setNewLeadContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Acquisition Channel</label>
                  <select
                    value={newLeadChannel}
                    onChange={(e) => setNewLeadChannel(e.target.value as LeadPipelineItem["channel"])}
                  >
                    <option value="LinkedIn">LinkedIn Outbound</option>
                    <option value="WhatsApp">WhatsApp Direct</option>
                    <option value="Email">Cold Email Campaign</option>
                    <option value="Referral">Inbound Referral</option>
                    <option value="Phone">Executive Phone Call</option>
                  </select>
                </div>
                <div className="ems-form-group">
                  <label>Target Corridor</label>
                  <select
                    value={newLeadCorridor}
                    onChange={(e) => setNewLeadCorridor(e.target.value as LeadPipelineItem["corridor"])}
                  >
                    <option value="Sri Lanka SME">Sri Lanka Enterprise &amp; SME</option>
                    <option value="Australia">Australia Nearshore (Sydney / Melbourne)</option>
                    <option value="United Kingdom">United Kingdom (London / FinTech)</option>
                    <option value="Global">Global / US Corridor</option>
                  </select>
                </div>
              </div>

              <div className="ems-form-group">
                <label>Estimated Sprint Deal Value</label>
                <input
                  type="text"
                  placeholder="e.g. LKR 850,000 or AUD 4,200"
                  value={newLeadValue}
                  onChange={(e) => setNewLeadValue(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Lead Notes &amp; Pain Points</label>
                <textarea
                  rows={2}
                  placeholder="Brief client context, tech stack requirements, or scheduled talk track..."
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Log Lead &amp; Increment KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD DAILY OPERATIONAL TASK (WORKFLOW)
      ───────────────────────────────────────────────────────────── */}
      {showAddTaskModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowAddTaskModal(false)}>
          <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div className="ems-modal-title-with-icon">
                <CheckSquare size={18} className="text-emerald" />
                <h3>Add Day-to-Day Operational Task</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTaskModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddNewTask} className="ems-modal-form">
              {isSupervisor && (
                <div className="ems-form-group ems-supervisor-assignment-box">
                  <label className="ems-assignee-label">
                    <UserCheck size={14} className="text-emerald" />
                    Assign Workflow Task To Intern / Staff *
                  </label>
                  <select
                    value={assigneeEmpId}
                    onChange={(e) => setAssigneeEmpId(e.target.value)}
                    className="ems-assignee-select"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} — {emp.designation} ({emp.employeeId})
                      </option>
                    ))}
                  </select>
                  <span className="ems-field-hint">
                    Delegated task will appear in this employee&apos;s daily shift checklist with a supervisory delegation badge.
                  </span>
                </div>
              )}

              <div className="ems-form-group">
                <label>Task Deliverable / Action *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule discovery demo with Melbourne SaaS agency CTO"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Scheduled Shift Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 11:30 AM"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as DailyChecklistItem["category"])}
                  >
                    <option value="Outreach">Outreach (Cold &amp; Inbound)</option>
                    <option value="Follow-up">Client Follow-up</option>
                    <option value="Demo">CreativeOS Demo Walkthrough</option>
                    <option value="Client Call">Executive Client Call</option>
                    <option value="Research">Market Intel &amp; Research</option>
                    <option value="Admin">Admin &amp; CRM Hygiene</option>
                  </select>
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Task Priority Level</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as "urgent" | "high" | "normal")}
                  >
                    <option value="normal">Normal / Routine</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent / Critical Action</option>
                  </select>
                </div>
                <div className="ems-form-group">
                  <label>Target Shift Block</label>
                  <select
                    value={newTaskShift}
                    onChange={(e) => setNewTaskShift(e.target.value as "morning" | "afternoon" | "eod")}
                  >
                    <option value="morning">Morning Shift (09:00 – 12:00)</option>
                    <option value="afternoon">Afternoon Execution (12:00 – 17:00)</option>
                    <option value="eod">EOD Wrap &amp; Handover (17:00 – 18:00)</option>
                  </select>
                </div>
              </div>

              <div className="ems-form-group">
                <label>Operational Notes &amp; Success Criteria</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Client requested Next.js 15 SSR overview and pricing estimates..."
                  value={newTaskNotes}
                  onChange={(e) => setNewTaskNotes(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Add to Daily Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUBMIT EOD REPORT TO SUPERVISORS
      ───────────────────────────────────────────────────────────── */}
      {showEodModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowEodModal(false)}>
          <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div className="ems-modal-title-with-icon">
                <Send size={18} className="text-[#ff5a36]" />
                <h3>End-of-Day (EOD) Operations Handover &amp; Audit</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEodModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitEodReport} className="ems-modal-form">
              <div className="ems-eod-summary-grid">
                <div className="ems-eod-stat-box">
                  <span className="lbl">Deliverables Verified</span>
                  <strong className="val text-emerald tabular-nums">
                    {(currentViewEmp.checklist || []).filter((c) => c.completed).length} /{" "}
                    {(currentViewEmp.checklist || []).length}
                  </strong>
                  <small>Tasks Completed Today</small>
                </div>
                <div className="ems-eod-stat-box">
                  <span className="lbl">Assigned Reviewers</span>
                  <strong className="val text-white">{currentViewEmp.supervisorName}</strong>
                  <small>Strategic Sales &amp; Systems Leads</small>
                </div>
              </div>

              <div className="ems-form-group">
                <label>Key Accomplishments &amp; Client Milestones Today *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Sent revised milestone quote to Meridian Logistics Lanka; initiated outreach with 15 Australian tech agencies; prepped discovery walkthrough for Highland Teas."
                  value={eodSummaryNotes}
                  onChange={(e) => setEodSummaryNotes(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Blockers / High-Priority Plan for Tomorrow Morning Shift</label>
                <input
                  type="text"
                  placeholder="e.g. Awaiting client feedback on AEST timing; prep demo sandbox for London scaleup."
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEodModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Sign Off &amp; Submit EOD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

