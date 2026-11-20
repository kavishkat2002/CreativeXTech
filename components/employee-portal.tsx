"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
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
  LogIn,
  LogOut,
  UserCheck,
  Star,
  ChevronLeft,
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
  DollarSign,
  MessageSquare,
  Send,
  Zap,
  RotateCcw,
  SlidersHorizontal,
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
  EodReportItem,
  getStoredEmployees,
  saveStoredEmployees,
  getStoredEMSSession,
  saveStoredEMSSession,
  authenticateEmployee,
  calculateOverallKPIScore,
  fetchEmployeesFromSupabase,
  INITIAL_EMPLOYEES,
  parseDealValueToLKR,
  formatLKR,
} from "@/lib/employee-data";
import { getSupabaseClient } from "@/lib/supabase-client";

export function EmployeePortal() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [session, setSession] = useState<EMSUserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const lastLocalActionRef = React.useRef<number>(0);

  // ── 24-Hour Real-Time Clock State
  const [currentClock, setCurrentClock] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentClock(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const [newEmpSupervisor, setNewEmpSupervisor] = useState("Thimathi Dissanayaka");
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
  const [kpiUpdateTargetVal, setKpiUpdateTargetVal] = useState<number>(0);

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
  const [bdiSubTab, setBdiSubTab] = useState<"overview" | "pipeline" | "checklist">("overview");

  // ── Quick Add Lead Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadClient, setNewLeadClient] = useState("");
  const [newLeadContact, setNewLeadContact] = useState("");
  const [newLeadChannel, setNewLeadChannel] = useState<LeadPipelineItem["channel"]>("WhatsApp");
  const [newLeadCorridor, setNewLeadCorridor] = useState<LeadPipelineItem["corridor"]>("Sri Lanka SME");
  const [newLeadValue, setNewLeadValue] = useState("LKR 850,000");
  const [newLeadNotes, setNewLeadNotes] = useState("");
  const [assigneeEmpId, setAssigneeEmpId] = useState<string>("emp-bdi-001");

  // ── Edit Lead Modal State
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editLeadClient, setEditLeadClient] = useState("");
  const [editLeadContact, setEditLeadContact] = useState("");
  const [editLeadChannel, setEditLeadChannel] = useState<LeadPipelineItem["channel"]>("WhatsApp");
  const [editLeadCorridor, setEditLeadCorridor] = useState<LeadPipelineItem["corridor"]>("Sri Lanka SME");
  const [editLeadValue, setEditLeadValue] = useState("LKR 850,000");
  const [editLeadStage, setEditLeadStage] = useState<LeadPipelineItem["stage"]>("New Lead");
  const [editLeadFollowUp, setEditLeadFollowUp] = useState("");
  const [editLeadNotes, setEditLeadNotes] = useState("");

  // ── Edit Employee Profile Modal State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileEmpId, setEditProfileEmpId] = useState<string | null>(null);
  const [editProfileName, setEditProfileName] = useState("");
  const [editProfileDesignation, setEditProfileDesignation] = useState("");
  const [editProfileDepartment, setEditProfileDepartment] = useState("");
  const [editProfileSupervisor, setEditProfileSupervisor] = useState("");
  const [editProfileWorkLocation, setEditProfileWorkLocation] = useState("");
  const [editProfilePhone, setEditProfilePhone] = useState("");
  const [editProfileContract, setEditProfileContract] = useState("");
  const [editProfileTerritory, setEditProfileTerritory] = useState("");
  const [editProfileBio, setEditProfileBio] = useState("");

  // ── Daily Workflow State & EOD Report
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("10:30 AM");
  const [newTaskDate, setNewTaskDate] = useState<string>("");
  const [selectedTaskDate, setSelectedTaskDate] = useState<string>("");
  const [newTaskCategory, setNewTaskCategory] = useState<DailyChecklistItem["category"]>("Outreach");
  const [newTaskPriority, setNewTaskPriority] = useState<"urgent" | "high" | "normal">("normal");
  const [newTaskShift, setNewTaskShift] = useState<"morning" | "afternoon" | "eod">("morning");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [workflowFilter, setWorkflowFilter] = useState<"all" | "morning" | "afternoon" | "eod" | "urgent" | "pending" | "completed">("all");
  const [showEodModal, setShowEodModal] = useState(false);
  const [eodSummaryNotes, setEodSummaryNotes] = useState("");
  const [eodBlockersNotes, setEodBlockersNotes] = useState("");

  // ── Supervisor Reset Intern Data State
  const [showResetInternModal, setShowResetInternModal] = useState(false);
  const [resetTargetEmpId, setResetTargetEmpId] = useState<string>("emp-bdi-001");
  const [resetOptionKpis, setResetOptionKpis] = useState(true);
  const [resetLeadsTarget, setResetLeadsTarget] = useState<number>(45);
  const [resetDemosTarget, setResetDemosTarget] = useState<number>(16);
  const [resetOptionPipeline, setResetOptionPipeline] = useState(true);
  const [resetOptionChecklist, setResetOptionChecklist] = useState(true);

  // ── Work Schedule & Attendance State
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "Remote" | "Office (Rajagiriya)">("all");
  const [clockInModeSelection, setClockInModeSelection] = useState<"Remote" | "Office (Rajagiriya)">("Remote");


  const handleToggleChecklist = (taskId: string) => {
    lastLocalActionRef.current = Date.now();
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
    lastLocalActionRef.current = Date.now();
    const targetDate = selectedTaskDate && selectedTaskDate !== "all" ? selectedTaskDate : formatLocalDate(new Date());
    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.checklist) {
        return {
          ...emp,
          checklist: emp.checklist.map((c) => {
            const taskDate = c.date || targetDate;
            if (selectedTaskDate === "all" || taskDate === targetDate) {
              return {
                ...c,
                completed,
                completedAt: completed
                  ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : undefined,
              };
            }
            return c;
          }),
        };
      }
      return emp;
    });
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(
      completed
        ? `All tasks for ${selectedTaskDate === "all" ? "all days" : targetDate} marked as completed!`
        : `Checklist reset for ${selectedTaskDate === "all" ? "all days" : targetDate}.`
    );
  };

  const handleDeleteTask = (taskId: string) => {
    lastLocalActionRef.current = Date.now();
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

  const handleSubmitEodReport = (e: React.FormEvent) => {
    e.preventDefault();
    lastLocalActionRef.current = Date.now();
    const tasksTotal = (currentViewEmp.checklist || []).length;
    const tasksDone = (currentViewEmp.checklist || []).filter((c) => c.completed).length;
    const deliverables = `${tasksDone}/${tasksTotal}`;
    const reportDate = activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
    const submittedTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newReport: EodReportItem = {
      id: `eod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: reportDate,
      submittedAt: submittedTime,
      deliverablesCount: deliverables,
      accomplishments: eodSummaryNotes.trim() || `Completed ${tasksDone} of ${tasksTotal} scheduled deliverables for shift ${reportDate}.`,
      blockers: eodBlockersNotes.trim() || undefined,
      status: "pending_review",
    };

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        const existing = emp.eodReports || [];
        // Replace existing submission for the same date or prepend new one
        const filtered = existing.filter((r) => r.date !== reportDate);
        return {
          ...emp,
          eodReports: [newReport, ...filtered],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);

    // Dispatches to Supabase EOD reports API
    if (typeof fetch === "function") {
      fetch("/api/employee/eod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: currentViewEmp.id,
          employeeName: currentViewEmp.name,
          supervisorName: currentViewEmp.supervisorName,
          deliverablesCount: deliverables,
          accomplishments: newReport.accomplishments,
          blockers: newReport.blockers,
          date: reportDate,
        }),
      }).catch((err) => console.warn("[ems] EOD Supabase sync notice:", err));
    }

    const targetSupervisor = (currentViewEmp.supervisorName || "Thimathi Dissanayaka")
      .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
      .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
      .trim() || "Thimathi Dissanayaka";
    showToast(
      `EOD Shift Report successfully logged for ${targetSupervisor} (${deliverables} deliverables pending sign-off).`
    );
    setShowEodModal(false);
    setEodSummaryNotes("");
    setEodBlockersNotes("");
  };

  const handleAdvanceLeadStage = (leadId: string) => {
    lastLocalActionRef.current = Date.now();
    const stageFlow: Array<LeadPipelineItem["stage"]> = [
      "New Lead",
      "Contacted",
      "Demo Booked",
      "Proposal Sent",
      "Closed Won",
    ];

    let advancedLeadName = "";
    let nextStageName: LeadPipelineItem["stage"] = "Contacted";
    let isPendingApproval = false;
    let isApprovedWon = false;
    let commissionLKR = 0;

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            advancedLeadName = lead.clientName;
            const currentIdx = stageFlow.indexOf(lead.stage);
            const nextIdx = Math.min(stageFlow.length - 1, currentIdx + 1);
            nextStageName = stageFlow[nextIdx];
            const dealVal = parseDealValueToLKR(lead.dealValue);
            commissionLKR = Math.round(dealVal * 0.10);

            if (nextStageName === "Closed Won") {
              if (!isSupervisor) {
                isPendingApproval = true;
                return {
                  ...lead,
                  stage: "Closed Won",
                  approvalStatus: "pending",
                  approvalRequestedBy: session?.employee.name || emp.name,
                  approvalRequestedAt: new Date().toISOString(),
                  commissionLKR,
                };
              } else {
                isApprovedWon = true;
                return {
                  ...lead,
                  stage: "Closed Won",
                  approvalStatus: "approved",
                  approvedBy: session?.employee.name || "Supervisor Thimathi Dissanayaka",
                  approvedAt: new Date().toISOString(),
                  commissionLKR,
                };
              }
            }
            return { ...lead, stage: nextStageName, approvalStatus: undefined };
          }
          return lead;
        });

        let nextKpis = emp.kpis;
        if (nextStageName === "Demo Booked") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-2" ? { ...k, current: k.current + 1 } : k
          );
        } else if (isApprovedWon) {
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

    if (isPendingApproval) {
      showToast(
        `Lead "${advancedLeadName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) for Closed Won sign-off! 10% commission (${formatLKR(commissionLKR)}) will be assigned upon approval.`
      );
    } else if (isApprovedWon) {
      showToast(
        `Lead "${advancedLeadName}" marked as Complete Won! 10% commission (+${formatLKR(commissionLKR)}) officially assigned.`
      );
    } else {
      showToast(`Lead "${advancedLeadName}" advanced to ${nextStageName.toUpperCase()}! KPI updated.`);
    }
  };

  const handleSetLeadStage = (leadId: string, targetStage: LeadPipelineItem["stage"]) => {
    lastLocalActionRef.current = Date.now();
    let clientName = "";
    let isPendingApproval = false;
    let isApprovedWon = false;
    let commissionLKR = 0;

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            clientName = lead.clientName;
            const dealVal = parseDealValueToLKR(lead.dealValue);
            commissionLKR = Math.round(dealVal * 0.10);

            if (targetStage === "Closed Won") {
              if (!isSupervisor) {
                isPendingApproval = true;
                return {
                  ...lead,
                  stage: "Closed Won",
                  approvalStatus: "pending",
                  approvalRequestedBy: session?.employee.name || emp.name,
                  approvalRequestedAt: new Date().toISOString(),
                  commissionLKR,
                };
              } else {
                isApprovedWon = true;
                return {
                  ...lead,
                  stage: "Closed Won",
                  approvalStatus: "approved",
                  approvedBy: session?.employee.name || "Supervisor Thimathi Dissanayaka",
                  approvedAt: new Date().toISOString(),
                  commissionLKR,
                };
              }
            } else {
              return { ...lead, stage: targetStage, approvalStatus: undefined };
            }
          }
          return lead;
        });

        let nextKpis = emp.kpis;
        if (targetStage === "Demo Booked") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-2" ? { ...k, current: k.current + 1 } : k
          );
        } else if (isApprovedWon) {
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

    if (isPendingApproval) {
      showToast(
        `Lead "${clientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) for sign-off! 10% commission (${formatLKR(commissionLKR)}) will be assigned once approved.`
      );
    } else if (isApprovedWon) {
      showToast(
        `Lead "${clientName}" officially APPROVED as COMPLETE WON! 10% commission (+${formatLKR(commissionLKR)}) assigned to ${currentViewEmp.name}.`
      );
    } else {
      showToast(`Lead "${clientName}" moved to ${targetStage.toUpperCase()}!`);
    }
  };

  const handleSupervisorApproveLead = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let approvedClient = "";
    let commissionAmt = 0;
    let internName = "";

    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        internName = emp.name;
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            approvedClient = lead.clientName;
            const val = parseDealValueToLKR(lead.dealValue);
            commissionAmt = Math.round(val * 0.10);
            return {
              ...lead,
              stage: "Closed Won",
              approvalStatus: "approved",
              approvedBy: session?.employee.name || "Supervisor Thimathi Dissanayaka",
              approvedAt: new Date().toISOString(),
              commissionLKR: commissionAmt,
              pendingRequestType: undefined,
            };
          }
          return lead;
        });

        const nextKpis = emp.kpis.map((k) =>
          k.id === "kpi-bdi-1" ? { ...k, current: (k.current ?? 0) + 1 } : k
        );

        return { ...emp, leads: nextLeads, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(
      `Deal for "${approvedClient}" APPROVED! Marked Complete Won and 10% commission (+${formatLKR(commissionAmt)}) officially assigned to ${internName}. 🎉`
    );
  };

  const handleSupervisorRejectLead = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let rejectedClient = "";
    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            rejectedClient = lead.clientName;
            return {
              ...lead,
              stage: "Proposal Sent",
              approvalStatus: "rejected",
              pendingRequestType: undefined,
              notes: `${lead.notes} [Supervisor requested revision before Closed Won sign-off]`,
            };
          }
          return lead;
        });
        return { ...emp, leads: nextLeads };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Deal for "${rejectedClient}" returned to Proposal Sent for revision.`);
  };

  const handleSupervisorApproveEdit = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let client = "";
    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId && lead.pendingEditData) {
            client = lead.pendingEditData.clientName || lead.clientName;
            const edits = lead.pendingEditData;
            const dealVal = parseDealValueToLKR(edits.dealValue || lead.dealValue);
            const commissionLKR = Math.round(dealVal * 0.10);
            return {
              ...lead,
              ...edits,
              approvalStatus: edits.stage === "Closed Won" ? ("approved" as const) : undefined,
              approvedBy: session?.employee.name || "Supervisor Thimathi Dissanayaka",
              approvedAt: new Date().toISOString(),
              commissionLKR: edits.stage === "Closed Won" ? commissionLKR : lead.commissionLKR,
              pendingRequestType: undefined,
              pendingEditData: undefined,
            };
          }
          return lead;
        });
        return { ...emp, leads: nextLeads };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Proposed edits for "${client}" APPROVED and applied successfully. ✔`);
  };

  const handleSupervisorRejectEdit = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let client = "";
    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            client = lead.clientName;
            return {
              ...lead,
              pendingRequestType: undefined,
              pendingEditData: undefined,
              approvalStatus: undefined,
            };
          }
          return lead;
        });
        return { ...emp, leads: nextLeads };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Edit request for "${client}" was rejected. Original lead retained.`);
  };

  const handleSupervisorApproveDelete = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let clientName = "Lead";

    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        const targetLead = emp.leads.find((l) => l.id === leadId);
        if (targetLead) clientName = targetLead.clientName;
        return {
          ...emp,
          leads: emp.leads.filter((l) => l.id !== leadId),
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Deletion for "${clientName}" APPROVED. Lead removed from pipeline.`);
  };

  const handleSupervisorRejectDelete = (leadId: string, empId?: string) => {
    lastLocalActionRef.current = Date.now();
    let client = "";
    const updated: Employee[] = employees.map((emp) => {
      const isTarget = empId ? emp.id === empId : (emp.leads && emp.leads.some((l) => l.id === leadId));
      if (isTarget && emp.leads) {
        const nextLeads: LeadPipelineItem[] = emp.leads.map((lead) => {
          if (lead.id === leadId) {
            client = lead.clientName;
            return {
              ...lead,
              pendingRequestType: undefined,
              approvalStatus: undefined,
            };
          }
          return lead;
        });
        return { ...emp, leads: nextLeads };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Deletion request for "${client}" rejected. Lead remains active in pipeline.`);
  };

  const handleSupervisorSignOffEodReport = (employeeId: string, reportId: string, notes?: string) => {
    lastLocalActionRef.current = Date.now();
    const supervisorSignerName = session?.employee.name || "Thimathi Dissanayaka";
    const signOffTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    let signedEmployeeName = "";
    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === employeeId && emp.eodReports) {
        signedEmployeeName = emp.name;
        const nextReports = emp.eodReports.map((r) => {
          if (r.id === reportId) {
            return {
              ...r,
              status: "signed_off" as const,
              signedOffBy: supervisorSignerName,
              signedOffAt: `${todayIsoDate} ${signOffTime}`,
              supervisorNotes: notes || "Shift deliverables verified and authorized by supervisor.",
            };
          }
          return r;
        });
        return { ...emp, eodReports: nextReports };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);

    // Sync sign-off to API
    if (typeof fetch === "function") {
      fetch("/api/employee/eod", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          status: "signed_off",
          signedOffBy: supervisorSignerName,
          signedOffAt: `${todayIsoDate} ${signOffTime}`,
          supervisorNotes: notes || "Shift deliverables verified and authorized by supervisor.",
        }),
      }).catch((err) => console.warn("[ems] EOD PATCH sync notice:", err));
    }

    showToast(`✓ EOD Shift Report for ${signedEmployeeName || "Intern"} officially signed off & verified.`);
  };

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadClient.trim()) return;

    lastLocalActionRef.current = Date.now();
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
      assignedBy: isSupervisor
        ? `${session?.employee.name} (${session?.role === "employee" ? "INTERN" : session?.role.toUpperCase()})`
        : undefined,
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

  const handleOpenEditLead = (lead: LeadPipelineItem) => {
    setEditingLeadId(lead.id);
    setEditLeadClient(lead.clientName);
    setEditLeadContact(lead.contactPerson || "");
    setEditLeadChannel(lead.channel || "WhatsApp");
    setEditLeadCorridor(lead.corridor || "Sri Lanka SME");
    setEditLeadValue(lead.dealValue || "LKR 850,000");
    setEditLeadStage(lead.stage || "New Lead");
    setEditLeadFollowUp(lead.nextFollowUp || "Today · Pending Outreach");
    setEditLeadNotes(lead.notes || "");
    setShowEditLeadModal(true);
  };

  const handleSaveEditLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeadId || !editLeadClient.trim()) return;

    lastLocalActionRef.current = Date.now();
    const updatedClientName = editLeadClient.trim();
    let oldStage: LeadPipelineItem["stage"] | undefined;

    let isEditRequested = false;
    let isApprovedWon = false;
    let commissionLKR = 0;

    const proposedEditData: Partial<LeadPipelineItem> = {
      clientName: editLeadClient.trim(),
      contactPerson: editLeadContact.trim() || "Decision Maker",
      channel: editLeadChannel,
      corridor: editLeadCorridor,
      dealValue: editLeadValue.trim() || "LKR 850,000",
      stage: editLeadStage,
      nextFollowUp: editLeadFollowUp.trim() || "Today · Pending Outreach",
      notes: editLeadNotes.trim() || "Outbound prospect identified.",
    };

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        const nextLeads = emp.leads.map((l) => {
          if (l.id === editingLeadId) {
            oldStage = l.stage;
            const dealVal = parseDealValueToLKR(editLeadValue);
            commissionLKR = Math.round(dealVal * 0.10);

            if (!isSupervisor) {
              // Intern requested edit: dispatches to supervisor for approval
              isEditRequested = true;
              return {
                ...l,
                pendingRequestType: "edit" as const,
                pendingEditData: proposedEditData,
                approvalStatus: "pending" as const,
                approvalRequestedBy: session?.employee.name || emp.name,
                approvalRequestedAt: new Date().toISOString(),
              };
            }

            // Supervisor editing directly:
            if (editLeadStage === "Closed Won") {
              isApprovedWon = true;
            }

            return {
              ...l,
              ...proposedEditData,
              approvalStatus: editLeadStage === "Closed Won" ? ("approved" as const) : undefined,
              approvedBy: session?.employee.name || "Supervisor Thimathi Dissanayaka",
              approvedAt: new Date().toISOString(),
              commissionLKR: editLeadStage === "Closed Won" ? commissionLKR : l.commissionLKR,
              pendingRequestType: undefined,
              pendingEditData: undefined,
            };
          }
          return l;
        });

        let nextKpis = emp.kpis;
        if (oldStage !== "Closed Won" && isApprovedWon) {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-1" ? { ...k, current: k.current + 1 } : k
          );
        } else if (oldStage !== "Demo Booked" && editLeadStage === "Demo Booked") {
          nextKpis = emp.kpis.map((k) =>
            k.id === "kpi-bdi-2" ? { ...k, current: k.current + 1 } : k
          );
        }

        return { ...emp, leads: nextLeads, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowEditLeadModal(false);
    setEditingLeadId(null);

    if (isEditRequested) {
      showToast(
        `Proposed edits for "${updatedClientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) for approval!`
      );
    } else if (isApprovedWon) {
      showToast(
        `Lead "${updatedClientName}" saved as COMPLETE WON! 🎉 +10% (${formatLKR(commissionLKR)}) added to Estimated Incentive.`
      );
    } else {
      showToast(`Lead "${updatedClientName}" updated successfully.`);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    lastLocalActionRef.current = Date.now();
    const leadToDelete = currentViewEmp.leads?.find((l) => l.id === leadId);
    const clientName = leadToDelete?.clientName || "Lead";

    if (!isSupervisor) {
      // Intern requested deletion: dispatches to supervisor for approval
      const updated: Employee[] = employees.map((emp) => {
        if (emp.id === currentViewEmp.id && emp.leads) {
          const nextLeads = emp.leads.map((l) => {
            if (l.id === leadId) {
              return {
                ...l,
                pendingRequestType: "delete" as const,
                approvalStatus: "pending" as const,
                approvalRequestedBy: session?.employee.name || emp.name,
                approvalRequestedAt: new Date().toISOString(),
              };
            }
            return l;
          });
          return { ...emp, leads: nextLeads };
        }
        return emp;
      });

      setEmployees(updated);
      saveStoredEmployees(updated);
      showToast(
        `Deletion request for "${clientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) for approval.`
      );
      return;
    }

    // Supervisor or Admin: Delete immediately
    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.leads) {
        return {
          ...emp,
          leads: emp.leads.filter((l) => l.id !== leadId),
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Lead "${clientName}" deleted from sales pipeline.`);
  };

  const handleOpenEditProfile = (emp: Employee) => {
    setEditProfileEmpId(emp.id);
    setEditProfileName(emp.name);
    setEditProfileDesignation(emp.designation);
    setEditProfileDepartment(emp.department);
    setEditProfileSupervisor(emp.supervisorName);
    setEditProfileWorkLocation(emp.workLocation);
    setEditProfilePhone(emp.phone);
    setEditProfileContract(emp.contractType);
    setEditProfileTerritory(emp.allocatedTerritory || "");
    setEditProfileBio(emp.bio || "");
    setShowEditProfileModal(true);
  };

  const handleSaveEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProfileEmpId || !editProfileName.trim()) return;

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === editProfileEmpId) {
        return {
          ...emp,
          name: editProfileName.trim(),
          designation: editProfileDesignation.trim() || emp.designation,
          department: editProfileDepartment.trim() || emp.department,
          supervisorName: editProfileSupervisor.trim() || emp.supervisorName,
          workLocation: editProfileWorkLocation.trim() || emp.workLocation,
          phone: editProfilePhone.trim() || emp.phone,
          contractType: editProfileContract.trim() || emp.contractType,
          allocatedTerritory: editProfileTerritory.trim() || emp.allocatedTerritory,
          bio: editProfileBio.trim(),
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);

    // Refresh active session if the user updated their own profile
    if (session && session.employee.id === editProfileEmpId) {
      const updatedSelf = updated.find((e) => e.id === editProfileEmpId);
      if (updatedSelf) {
        const nextSession = { ...session, employee: updatedSelf };
        setSession(nextSession);
        saveStoredEMSSession(nextSession);
      }
    }

    setShowEditProfileModal(false);
    setEditProfileEmpId(null);
    showToast(`Profile for ${editProfileName.trim()} updated and synced to Supabase database.`);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const targetEmpId = isSupervisor && assigneeEmpId ? assigneeEmpId : currentViewEmp.id;
    const targetEmp = employees.find((emp) => emp.id === targetEmpId) || currentViewEmp;

    const todayIso = formatLocalDate(new Date());
    const targetDate = newTaskDate || (selectedTaskDate && selectedTaskDate !== "all" ? selectedTaskDate : todayIso);

    if (!isSupervisor && targetDate < todayIso) {
      showToast("Employees cannot add tasks to past shifts. Please select today or an upcoming shift.");
      return;
    }

    const newTask: DailyChecklistItem = {
      id: `chk-${Date.now()}`,
      task: newTaskTitle.trim(),
      timeSlot: newTaskTime || "11:00 AM",
      completed: false,
      category: newTaskCategory,
      priority: newTaskPriority,
      shiftBlock: newTaskShift,
      notes: newTaskNotes.trim() || undefined,
      date: targetDate,
      assignedBy: isSupervisor
        ? `${session?.employee.name} (${session?.role === "employee" ? "INTERN" : session?.role.toUpperCase()})`
        : undefined,
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
    setNewTaskDate("");
    showToast(
      isSupervisor
        ? `Task assigned to ${targetEmp.name}! Added to their daily workflow schedule.`
        : "Daily workflow task added to schedule."
    );
  };

  // Helper for consistent YYYY-MM-DD in local time
  const formatLocalDate = (d: Date = new Date()): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // ── Remote Attendance Clock IN
  const handleRemoteClockIn = () => {
    lastLocalActionRef.current = Date.now();
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours24}:${mins}`;
    const dateStr = formatLocalDate(now);

    const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 15);
    const punctualityStatus: AttendanceRecord["status"] = isLate ? "late" : "present";

    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        const existing = emp.attendance || [];
        const hasToday = existing.some((a) => a.date === dateStr);
        if (hasToday) {
          return {
            ...emp,
            attendance: existing.map((a) =>
              a.date === dateStr
                ? {
                    ...a,
                    checkIn: a.checkIn || timeStr,
                    checkOut: "Active",
                    workMode: "Remote" as const,
                    status: punctualityStatus,
                  }
                : a
            ),
          };
        }
        const newRecord: AttendanceRecord = {
          date: dateStr,
          checkIn: timeStr,
          checkOut: "Active",
          status: punctualityStatus,
          workMode: "Remote",
        };
        return {
          ...emp,
          attendance: [newRecord, ...existing],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    const supervisor = currentViewEmp.supervisorName || "Assigned Supervisor";
    showToast(`Remote Clock-IN verified at ${timeStr}. Real-time notification dispatched to supervisor ${supervisor}.`);
  };

  // ── Remote Attendance Clock OUT
  const handleRemoteClockOut = () => {
    lastLocalActionRef.current = Date.now();
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours24}:${mins}`;
    const dateStr = formatLocalDate(now);

    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        const existing = emp.attendance || [];
        const hasToday = existing.some((a) => a.date === dateStr);
        if (hasToday) {
          return {
            ...emp,
            attendance: existing.map((a) =>
              a.date === dateStr
                ? { ...a, checkOut: timeStr, workMode: "Remote" as const }
                : a
            ),
          };
        }
        const newRecord: AttendanceRecord = {
          date: dateStr,
          checkIn: "09:00",
          checkOut: timeStr,
          status: "present",
          workMode: "Remote",
        };
        return {
          ...emp,
          attendance: [newRecord, ...existing],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    const supervisor = currentViewEmp.supervisorName || "Assigned Supervisor";
    showToast(`Remote Clock-OUT logged at ${timeStr}. Shift summary dispatched to supervisor ${supervisor}.`);
  };

  const handleQuickAttendanceCheckIn = (mode: "Remote" | "Office (Rajagiriya)") => {
    if (mode === "Remote") {
      handleRemoteClockIn();
    } else {
      lastLocalActionRef.current = Date.now();
      const now = new Date();
      const hours24 = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const timeStr = `${hours24}:${mins}`;
      const dateStr = formatLocalDate(now);
      const updated = employees.map((emp) => {
        if (emp.id === currentViewEmp.id) {
          const existing = emp.attendance || [];
          const hasToday = existing.some((a) => a.date === dateStr);
          if (hasToday) {
            return {
              ...emp,
              attendance: existing.map((a) =>
                a.date === dateStr ? { ...a, checkOut: timeStr, workMode: mode } : a
              ),
            };
          }
          return {
            ...emp,
            attendance: [
              { date: dateStr, checkIn: timeStr, checkOut: "Active", status: "present" as const, workMode: mode },
              ...existing,
            ],
          };
        }
        return emp;
      });
      setEmployees(updated);
      saveStoredEmployees(updated);
      const supervisor = currentViewEmp.supervisorName || "Assigned Supervisor";
      showToast(`Clock-IN (${mode}) verified at ${timeStr}. Dispatched to supervisor ${supervisor}.`);
    }
  };

  useEffect(() => {
    setMounted(true);
    const stored = getStoredEmployees();
    setEmployees(stored);
    const existingSession = getStoredEMSSession();
    if (existingSession) {
      setSession(existingSession);
    }

    let isMounted = true;
    const syncFromRemote = async () => {
      // Pause remote overwrite if a local edit/delete/add occurred within 3.5 seconds
      if (Date.now() - lastLocalActionRef.current < 3500) {
        return;
      }
      try {
        const remoteEmployees = await fetchEmployeesFromSupabase();
        if (Date.now() - lastLocalActionRef.current < 3500) {
          return;
        }
        if (isMounted && remoteEmployees && remoteEmployees.length > 0) {
          const localStored = getStoredEmployees();
          const sanitized = remoteEmployees.map((e) => {
            const localEmp = localStored.find((l) => l.id === e.id);
            const remoteEods = e.eodReports || [];
            const localEods = localEmp?.eodReports || [];
            const eodMap = new Map<string, EodReportItem>();
            // Remote reports first
            remoteEods.forEach((r) => eodMap.set(r.id, r));
            // Local reports take precedence - especially authorized sign-offs
            localEods.forEach((lr) => {
              const remoteMatch = eodMap.get(lr.id);
              if (remoteMatch) {
                // If local report was signed off by supervisor, ALWAYS keep signed off
                if (lr.status === "signed_off") {
                  eodMap.set(lr.id, { ...remoteMatch, ...lr });
                } else if (remoteMatch.status === "signed_off") {
                  eodMap.set(lr.id, remoteMatch);
                } else {
                  eodMap.set(lr.id, { ...remoteMatch, ...lr });
                }
              } else {
                eodMap.set(lr.id, lr);
              }
            });
            const mergedEodReports = Array.from(eodMap.values());

            const isIkram =
              e.id === "emp-bdi-001" ||
              e.name === "Kavindu Senanayake" ||
              e.email === "intern.bd@creativexlab.online";
            const isThimathi =
              e.id === "emp-sup-001" ||
              e.name === "Dinithi Perera" ||
              e.name === "Thimathi Dissanayaka" ||
              e.email === "supervisor.bd@creativexlab.online" ||
              e.email === "thimathi@creativexlab.online";

            const cleanedSup = isThimathi
              ? ""
              : (e.supervisorName || "")
                  .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
                  .replace(/Dinithi/gi, "Thimathi Dissanayaka")
                  .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
                  .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                  .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                  .trim();

            return {
              ...e,
              name: isIkram ? "Ikram Lantra" : isThimathi ? "Thimathi Dissanayaka" : e.name,
              email: isIkram ? "ikram@creativex.online" : isThimathi ? "thimathi@creativexlab.online" : e.email,
              password: isIkram ? "CreativexIkram041" : isThimathi ? "thimathi@2001" : e.password,
              phone: isIkram ? "+94 77 690 2960" : e.phone,
              designation: isThimathi ? "Head Of Engineering and Business Development" : e.designation,
              department: isThimathi ? "Engineering & Business Development" : e.department,
              supervisorName: isThimathi
                ? ""
                : isIkram
                ? (cleanedSup || "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
                : cleanedSup,
              eodReports: mergedEodReports,
            };
          });
          setEmployees(sanitized);
          try {
            localStorage.setItem("creativex_ems_employees_v4", JSON.stringify(sanitized));
          } catch {}

          // Refresh session employee if profile data was updated in Supabase
          setSession((prev) => {
            if (!prev) return null;
            const updatedSelf = sanitized.find((e) => e.id === prev.employee.id);
            if (updatedSelf) {
              const nextSession = { ...prev, employee: updatedSelf };
              saveStoredEMSSession(nextSession);
              return nextSession;
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn("[ems] Realtime sync error:", err);
      }
    };

    // 1. Initial sync from Supabase
    syncFromRemote();

    // 2. Realtime WebSocket subscription to Supabase postgres_changes
    let realtimeChannel: any = null;
    getSupabaseClient()
      .then((client) => {
        if (!isMounted) return;
        if (client && typeof client.channel === "function") {
          realtimeChannel = client
            .channel("ems-realtime-sync")
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: "ems_employees" },
              () => {
                syncFromRemote();
              }
            )
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: "ems_leads" },
              () => {
                syncFromRemote();
              }
            )
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: "ems_workflow_tasks" },
              () => {
                syncFromRemote();
              }
            )
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: "ems_eod_reports" },
              () => {
                syncFromRemote();
              }
            )
            .subscribe();
        }
      })
      .catch(() => {});

    // 3. Proactive heartbeat polling (every 4 seconds) for continuous real-time sync across devices
    const pollInterval = setInterval(() => {
      syncFromRemote();
    }, 4000);

    // 4. Cross-tab instant storage sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "creativex_ems_employees_v4" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const sanitized = parsed.map((emp: Employee) => {
              const isThim = emp.id === "emp-sup-001" || emp.name === "Dinithi Perera" || emp.name === "Thimathi Dissanayaka";
              const cleanedSupervisor = isThim
                ? ""
                : (emp.supervisorName || "")
                    .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
                    .replace(/Dinithi/gi, "Thimathi Dissanayaka")
                    .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
                    .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                    .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                    .trim();

              if (
                emp.id === "emp-bdi-001" ||
                emp.name === "Kavindu Senanayake" ||
                emp.email === "intern.bd@creativexlab.online"
              ) {
                return {
                  ...emp,
                  name: "Ikram Lantra",
                  email: "ikram@creativex.online",
                  password: "CreativexIkram041",
                  phone: "+94 77 690 2960",
                  supervisorName: cleanedSupervisor || "Thimathi Dissanayaka (Head Of Engineering and Business Development)",
                };
              }
              if (isThim) {
                return {
                  ...emp,
                  name: "Thimathi Dissanayaka",
                  email: "thimathi@creativexlab.online",
                  password: "thimathi@2001",
                  designation: "Head Of Engineering and Business Development",
                  department: "Engineering & Business Development",
                  supervisorName: "",
                };
              }
              return {
                ...emp,
                supervisorName: cleanedSupervisor,
              };
            });
            setEmployees(sanitized);
          }
        } catch {}
      }
    };

    const handleCustomLocalSync = (e: Event) => {
      const customEvent = e as CustomEvent<Employee[]>;
      if (Array.isArray(customEvent.detail)) {
        const sanitized = customEvent.detail.map((emp) => {
          const isThim = emp.id === "emp-sup-001" || emp.name === "Dinithi Perera" || emp.name === "Thimathi Dissanayaka";
          const cleanedSupervisor = isThim
            ? ""
            : (emp.supervisorName || "")
                .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
                .replace(/Dinithi/gi, "Thimathi Dissanayaka")
                .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
                .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                .trim();

          if (
            emp.id === "emp-bdi-001" ||
            emp.name === "Kavindu Senanayake" ||
            emp.email === "intern.bd@creativexlab.online"
          ) {
            return {
              ...emp,
              name: "Ikram Lantra",
              email: "ikram@creativex.online",
              password: "CreativexIkram041",
              phone: "+94 77 690 2960",
              supervisorName: cleanedSupervisor || "Thimathi Dissanayaka (Head Of Engineering and Business Development)",
            };
          }
          if (isThim) {
            return {
              ...emp,
              name: "Thimathi Dissanayaka",
              email: "thimathi@creativexlab.online",
              password: "thimathi@2001",
              designation: "Head Of Engineering and Business Development",
              department: "Engineering & Business Development",
              supervisorName: "",
            };
          }
          return {
            ...emp,
            supervisorName: cleanedSupervisor,
          };
        });
        setEmployees(sanitized);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("ems_local_sync", handleCustomLocalSync);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ems_local_sync", handleCustomLocalSync);
      if (realtimeChannel && typeof realtimeChannel.unsubscribe === "function") {
        realtimeChannel.unsubscribe();
      }
    };
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
        // If employee or supervisor, select their own profile
        if (res.session.role === "employee" || res.session.role === "supervisor") {
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
      const roleBadge = res.session.role === "employee" ? "INTERN" : res.session.role.toUpperCase();
      showToast(`Logged in as ${res.session.employee.name} (${roleBadge})`);
      if (res.session.role === "employee" || res.session.role === "supervisor") {
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
      supervisorId: "emp-admin-001",
      supervisorName: newEmpSupervisor.trim() || "Thimathi Dissanayaka",
      joiningDate: new Date().toISOString().split("T")[0],
      contractType: newEmpContract,
      workLocation: "Remote · Rajagiriya, Colombo",
      phone: "+94 77 000 0000",
      allocatedTerritory: newEmpTerritory,
      status: "active",
      bio: "New team member onboarded to Creativex Technology operational graph.",
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

    lastLocalActionRef.current = Date.now();
    const reviewerName = session?.employee.name || "Supervisor";
    const targetEmpId = currentViewEmp.id || selectedEmpId;
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
      if (emp.id === targetEmpId) {
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
    showToast(`Supervisor 1-on-1 review recorded successfully for ${currentViewEmp.name}.`);
  };

  // ── Supervisor / Admin: Add New KPI Target
  const handleAddKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiTitle.trim() || !kpiTarget) {
      showToast("Please provide a valid KPI title and target number.");
      return;
    }

    lastLocalActionRef.current = Date.now();
    const targetEmpId = currentViewEmp.id || selectedEmpId;

    const newKpiItem: EmployeeKPI = {
      id: `kpi-${Date.now()}`,
      title: kpiTitle.trim(),
      target: Number(kpiTarget),
      current: Number(kpiCurrent) || 0,
      unit: kpiUnit.trim() || "Units",
      period: kpiPeriod.trim() || "Monthly",
      weight: Number(kpiWeight) || 20,
      status: Number(kpiCurrent) >= Number(kpiTarget) ? "exceeding" : "on_track",
      notes: kpiNotes.trim() || `Target assigned by supervisor ${session?.employee?.name || "Supervisor"}.`,
    };

    const updated = employees.map((emp) => {
      if (emp.id === targetEmpId) {
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
    showToast(`Added new KPI target for ${currentViewEmp.name}.`);
  };

  // ── Supervisor / Admin: Update KPI Actual Progress & Target
  const handleUpdateKpiProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showUpdateKpiModal) return;

    lastLocalActionRef.current = Date.now();
    const { kpi, empId } = showUpdateKpiModal;
    const newVal = Math.max(0, Number(kpiUpdateVal));
    const newTarget = isSupervisor && kpiUpdateTargetVal > 0 ? Number(kpiUpdateTargetVal) : kpi.target;

    const updated = employees.map((emp) => {
      if (emp.id === empId) {
        let hasKpi = false;
        const nextKpis = (emp.kpis || []).map((k) => {
          if (k.id === kpi.id) {
            hasKpi = true;
            let nextStatus: EmployeeKPI["status"] = "on_track";
            if (newVal >= newTarget) nextStatus = "exceeding";
            else if (newVal < newTarget * 0.7) nextStatus = "needs_attention";
            return {
              ...k,
              target: newTarget,
              current: newVal,
              status: nextStatus,
              notes: isSupervisor
                ? `Target (${newTarget}) & progress (${newVal}) updated by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`
                : k.notes,
            };
          }
          return k;
        });

        if (!hasKpi) {
          nextKpis.push({
            id: kpi.id,
            title: kpi.title,
            target: newTarget,
            current: newVal,
            unit: kpi.unit || "Units",
            weight: kpi.weight || 25,
            period: kpi.period || "Monthly (Q4 2026)",
            status: newVal >= newTarget ? "exceeding" : (newVal < newTarget * 0.7 ? "needs_attention" : "on_track"),
            notes: `Target (${newTarget}) & progress (${newVal}) assigned by supervisor.`,
          });
        }
        return { ...emp, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowUpdateKpiModal(null);
    showToast(`Updated "${kpi.title}": ${newVal} / ${newTarget} ${kpi.unit}.`);
  };

  // Find currently viewed employee (supervisors can only view their own account or intern profiles)
  const rawViewEmp = useMemo(() => {
    let emp = employees.find((e) => e.id === selectedEmpId);
    if (session?.role === "supervisor" && emp?.role === "admin") {
      emp = employees.find((e) => e.id === session.employee.id) || employees.find((e) => e.role === "employee");
    }
    return emp || employees.find((e) => e.id === session?.employee?.id) || employees[2] || employees[0];
  }, [employees, selectedEmpId, session]);

  // Viewable employees for the top profile picker (Admin sees all; Supervisor only sees themselves and interns)
  const viewableEmployees = useMemo(() => {
    if (session?.role === "admin") {
      return employees;
    }
    if (session?.role === "supervisor") {
      return employees.filter(
        (emp) => emp.id === session.employee.id || emp.role === "employee"
      );
    }
    return employees.filter((emp) => emp.id === session?.employee?.id);
  }, [employees, session]);

  useEffect(() => {
    if (session?.role === "supervisor" && selectedEmpId === "emp-admin-001") {
      setSelectedEmpId(session.employee.id);
    }
  }, [session, selectedEmpId]);
  const currentViewEmp: Employee = useMemo(() => {
    if (!rawViewEmp) return rawViewEmp;
    let supervisor = (rawViewEmp.supervisorName || "")
      .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
      .replace(/Dinithi/gi, "Thimathi Dissanayaka")
      .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
      .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
      .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
      .trim();

    if (
      rawViewEmp.id === "emp-bdi-001" ||
      rawViewEmp.name === "Kavindu Senanayake" ||
      rawViewEmp.email === "intern.bd@creativexlab.online"
    ) {
      return {
        ...rawViewEmp,
        name: "Ikram Lantra",
        email: "ikram@creativex.online",
        password: "CreativexIkram041",
        phone: "+94 77 690 2960",
        supervisorName: supervisor || "Thimathi Dissanayaka (Head Of Engineering and Business Development)",
      };
    }
    if (
      rawViewEmp.id === "emp-sup-001" ||
      rawViewEmp.name === "Dinithi Perera" ||
      rawViewEmp.name === "Thimathi Dissanayaka" ||
      rawViewEmp.email === "supervisor.bd@creativexlab.online" ||
      rawViewEmp.email === "thimathi@creativexlab.online"
    ) {
      return {
        ...rawViewEmp,
        name: "Thimathi Dissanayaka",
        email: "thimathi@creativexlab.online",
        password: "thimathi@2001",
        designation: "Head Of Engineering and Business Development",
        department: "Engineering & Business Development",
        supervisorName: "",
      };
    }
    return {
      ...rawViewEmp,
      supervisorName: supervisor,
    };
  }, [rawViewEmp]);
  const overallKpiScore = calculateOverallKPIScore(currentViewEmp?.kpis || []);

  // Realtime B2B Pipeline & Incentive Calculations
  const empLeads = currentViewEmp?.leads || [];
  const wonLeads = empLeads.filter(
    (l) => l.stage === "Closed Won" && l.approvalStatus !== "pending"
  );
  const pendingApprovalLeads = empLeads.filter(
    (l) => l.approvalStatus === "pending"
  );
  const pendingWonLeads = empLeads.filter(
    (l) => l.approvalStatus === "pending" && (l.pendingRequestType === "won" || l.stage === "Closed Won")
  );
  const pendingEditLeads = empLeads.filter(
    (l) => l.approvalStatus === "pending" && l.pendingRequestType === "edit"
  );
  const pendingDeleteLeads = empLeads.filter(
    (l) => l.approvalStatus === "pending" && l.pendingRequestType === "delete"
  );
  const activeLeads = empLeads.filter(
    (l) => l.stage !== "Closed Won" || l.approvalStatus === "pending"
  );

  const activePipelineValue = activeLeads.reduce(
    (sum, lead) => sum + parseDealValueToLKR(lead.dealValue),
    0
  );
  const wonPipelineValue = wonLeads.reduce(
    (sum, lead) => sum + parseDealValueToLKR(lead.dealValue),
    0
  );
  // Estimated incentive: 10% commission on approved closed won project/deal value
  const estimatedIncentive = Math.round(wonPipelineValue * 0.10);
  const pendingCommission = pendingWonLeads.reduce(
    (sum, lead) => sum + Math.round(parseDealValueToLKR(lead.dealValue) * 0.10),
    0
  );

  const isAdmin = session?.role === "admin";
  const isSupervisor = session?.role === "supervisor" || session?.role === "admin";

  // ── All Pending Intern Approvals across supervised employees
  const allSupervisedPendingApprovals = useMemo(() => {
    const list: {
      lead: LeadPipelineItem;
      employee: Employee;
    }[] = [];
    employees.forEach((emp) => {
      (emp.leads || []).forEach((lead) => {
        if (lead.approvalStatus === "pending") {
          list.push({ lead, employee: emp });
        }
      });
    });
    return list;
  }, [employees]);

  // ── All Pending Intern EOD Reports across supervised employees
  const allSupervisedPendingEodReports = useMemo(() => {
    const list: {
      report: EodReportItem;
      employee: Employee;
    }[] = [];
    employees.forEach((emp) => {
      (emp.eodReports || []).forEach((report) => {
        if (report.status === "pending_review") {
          list.push({ report, employee: emp });
        }
      });
    });
    return list;
  }, [employees]);

  const totalPendingSupervisorApprovals =
    allSupervisedPendingApprovals.length + allSupervisedPendingEodReports.length;

  // B2B Intern KPI Progress Values (Dynamic with fallback)
  const kpiLeads = currentViewEmp?.kpis?.find((k) => k.id === "kpi-bdi-1") || currentViewEmp?.kpis?.[0];
  const kpiDemos = currentViewEmp?.kpis?.find((k) => k.id === "kpi-bdi-2") || currentViewEmp?.kpis?.[1];

  const leadsCurrent = kpiLeads ? (kpiLeads.current ?? 0) : 0;
  const leadsTarget = kpiLeads ? (kpiLeads.target ?? 45) : 45;
  const leadsPct = leadsTarget > 0 ? Math.min(100, Math.round((leadsCurrent / leadsTarget) * 100)) : 0;

  const demosCurrent = kpiDemos ? (kpiDemos.current ?? 0) : 0;
  const demosTarget = kpiDemos ? (kpiDemos.target ?? 16) : 16;
  const demosPct = demosTarget > 0 ? Math.min(100, Math.round((demosCurrent / demosTarget) * 100)) : 0;

  // 24-Hour System Clock Calculation
  const clockHours = String(currentClock.getHours()).padStart(2, "0");
  const clockMinutes = String(currentClock.getMinutes()).padStart(2, "0");
  const clockSeconds = String(currentClock.getSeconds()).padStart(2, "0");
  const liveClock24 = `${clockHours}:${clockMinutes}:${clockSeconds}`;
  const liveDateFormatted = currentClock.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const todayIsoDate = formatLocalDate(currentClock);

  // ── Day-by-Day Task Workflow State & Helpers
  const activeTaskDate = selectedTaskDate === "all" ? "all" : (selectedTaskDate || todayIsoDate);

  const navigateTaskDay = (offsetDays: number) => {
    const cur = activeTaskDate && activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
    const [y, m, d] = cur.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + offsetDays);
    setSelectedTaskDate(formatLocalDate(dateObj));
  };

  const taskWeekDays = useMemo(() => {
    const cur = activeTaskDate && activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
    const [y, m, d] = cur.split("-").map(Number);
    const baseDate = new Date(y, m - 1, d);
    const dayOfWeek = baseDate.getDay(); // 0 Sun, 1 Mon ... 6 Sat
    const diffToMon = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() + diffToMon);

    const checklist = currentViewEmp?.checklist || [];

    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      const iso = formatLocalDate(dayDate);
      const dayTasks = checklist.filter((item) => (item.date || todayIsoDate) === iso);
      const completedTasks = dayTasks.filter((item) => item.completed);
      const dayShort = dayDate.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = dayDate.getDate();
      const isToday = iso === todayIsoDate;
      const isSelected = activeTaskDate !== "all" && iso === activeTaskDate;

      days.push({
        iso,
        dayShort,
        dayNum,
        isToday,
        isSelected,
        total: dayTasks.length,
        completed: completedTasks.length,
      });
    }
    return days;
  }, [activeTaskDate, currentViewEmp?.checklist, todayIsoDate]);

  const activeDayTasks = useMemo(() => {
    const all = currentViewEmp?.checklist || [];
    if (activeTaskDate === "all") return all;
    return all.filter((item) => (item.date || todayIsoDate) === activeTaskDate);
  }, [currentViewEmp?.checklist, activeTaskDate, todayIsoDate]);

  const activeDayCompletedCount = activeDayTasks.filter((c) => c.completed).length;
  const activeDayTotalCount = activeDayTasks.length;
  const activeDayProgressPct =
    activeDayTotalCount > 0 ? Math.round((activeDayCompletedCount / activeDayTotalCount) * 100) : 0;

  const pendingPastTasksCount = useMemo(() => {
    if (activeTaskDate === "all") return 0;
    const all = currentViewEmp?.checklist || [];
    return all.filter((c) => {
      const d = c.date || todayIsoDate;
      return !c.completed && d < activeTaskDate;
    }).length;
  }, [currentViewEmp?.checklist, activeTaskDate, todayIsoDate]);

  const isPastShift = activeTaskDate !== "all" && activeTaskDate < todayIsoDate;
  const canAddTasksForShift = isSupervisor || !isPastShift;

  const formattedActiveTaskDay = useMemo(() => {
    if (activeTaskDate === "all") return "All Shift Days";
    const [y, m, d] = activeTaskDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (activeTaskDate === todayIsoDate) return `${dayName} (Today)`;
    return dayName;
  }, [activeTaskDate, todayIsoDate]);

  const handleCarryForwardPendingTasks = () => {
    lastLocalActionRef.current = Date.now();
    const all = currentViewEmp?.checklist || [];
    const targetDate = activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
    const pendingPastTasks = all.filter((c) => {
      const d = c.date || todayIsoDate;
      return !c.completed && d < targetDate;
    });

    if (pendingPastTasks.length === 0) {
      showToast("No pending tasks from previous days to carry forward.");
      return;
    }

    const updated: Employee[] = employees.map((emp) => {
      if (emp.id === currentViewEmp.id && emp.checklist) {
        const clonedTasks: DailyChecklistItem[] = pendingPastTasks.map((pt) => ({
          ...pt,
          id: `chk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          date: targetDate,
          notes: pt.notes
            ? `${pt.notes} (Carried from ${pt.date || "previous day"})`
            : `Carried forward from ${pt.date || "previous day"}`,
        }));
        return {
          ...emp,
          checklist: [...emp.checklist, ...clonedTasks],
        };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Carried forward ${pendingPastTasks.length} pending task(s) to ${targetDate}!`);
  };
  const todayAttendance = currentViewEmp?.attendance?.find((a) => a.date === todayIsoDate);
  const isCurrentlyClockedIn = Boolean(
    todayAttendance && (todayAttendance.checkOut === "Active" || !todayAttendance.checkOut || todayAttendance.checkOut === "")
  );
  const isShiftCompletedToday = Boolean(
    todayAttendance && todayAttendance.checkOut && todayAttendance.checkOut !== "Active"
  );

  const currentHour = currentClock.getHours();
  const currentMinute = currentClock.getMinutes();
  const minutesSince9AM = (currentHour - 9) * 60 + currentMinute;
  const shiftPercent = Math.min(100, Math.max(0, Math.round((minutesSince9AM / (9 * 60)) * 100)));

  const filteredAttendance = useMemo(() => {
    const list = currentViewEmp?.attendance || [];
    if (attendanceFilter === "Remote") return list.filter((a) => a.workMode?.includes("Remote"));
    if (attendanceFilter === "Office (Rajagiriya)") return list.filter((a) => a.workMode?.includes("Office"));
    return list;
  }, [currentViewEmp?.attendance, attendanceFilter]);

  // Helper to parse time string ("08:58 AM", "09:00", "06:02 PM", "18:00") into minutes of day
  const parseTimeToMinutes = (tStr?: string): number => {
    if (!tStr) return 0;
    const clean = tStr.trim();
    const isPM = clean.toUpperCase().includes("PM");
    const isAM = clean.toUpperCase().includes("AM");
    const match = clean.match(/(\d+):(\d+)/);
    if (!match) return 540;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;
    return h * 60 + m;
  };

  // Real-time synchronization of weekly schedule, hours, and attendance
  const weekData = useMemo(() => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
    const now = currentClock;
    const currentDayOfWeek = now.getDay(); // 0: Sun, 1: Mon, ... 4: Thu, 5: Fri, 6: Sat
    const diffToMon = (currentDayOfWeek === 0 ? -6 : 1) - currentDayOfWeek;
    const mondayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMon);
    mondayDate.setHours(0, 0, 0, 0);

    const empAttendance = currentViewEmp?.attendance || [];
    const todayIso = formatLocalDate(now);

    let totalMinutesWorked = 0;
    let completedShiftsCount = 0;
    let onTimeCount = 0;
    let tardiesCount = 0;

    const days = dayNames.map((dayName, index) => {
      const d = new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate() + index);
      const isoDate = formatLocalDate(d);
      const isToday = isoDate === todayIso;
      const isPast = d < now && !isToday;
      const isFuture = d > now && !isToday;

      // Match actual attendance record strictly by isoDate (no fallbacks across unrelated weeks)
      let record = isToday ? todayAttendance : empAttendance.find((a) => a.date === isoDate);

      let mode: "Remote" | "Rajagiriya HQ" = index === 2 ? "Rajagiriya HQ" : "Remote";
      let statusText = "Scheduled (09:00 – 18:00)";
      let shiftDurationHours = 0;
      let isActiveNow = false;
      let isCompleted = false;

      if (isToday) {
        if (todayAttendance) {
          record = todayAttendance;
          mode = (todayAttendance.workMode && todayAttendance.workMode.includes("Office")) ? "Rajagiriya HQ" : "Remote";
          if (isCurrentlyClockedIn) {
            isActiveNow = true;
            const checkInMin = parseTimeToMinutes(todayAttendance.checkIn || "09:00");
            const curMin = now.getHours() * 60 + now.getMinutes();
            const elapsed = Math.max(0, curMin - checkInMin);
            shiftDurationHours = Math.round((elapsed / 60) * 10) / 10;
            statusText = `Shift Active (${shiftDurationHours.toFixed(1)}h)`;
            totalMinutesWorked += elapsed;
            if (todayAttendance.status === "late") tardiesCount += 1;
            else onTimeCount += 1;
          } else if (todayAttendance.checkOut && todayAttendance.checkOut !== "Active") {
            isCompleted = true;
            const checkInMin = parseTimeToMinutes(todayAttendance.checkIn);
            const checkOutMin = parseTimeToMinutes(todayAttendance.checkOut);
            const duration = Math.max(0, checkOutMin - checkInMin);
            shiftDurationHours = Math.round((duration / 60) * 10) / 10;
            statusText = `Completed (${shiftDurationHours.toFixed(1)}h)`;
            totalMinutesWorked += shiftDurationHours * 60;
            completedShiftsCount += 1;
            if (todayAttendance.status === "late") tardiesCount += 1;
            else onTimeCount += 1;
          }
        } else {
          statusText = "Standby · Not Clocked In";
        }
      } else if (record) {
        mode = (record.workMode && record.workMode.includes("Office")) ? "Rajagiriya HQ" : "Remote";
        if (record.checkOut && record.checkOut !== "Active") {
          isCompleted = true;
          const checkInMin = parseTimeToMinutes(record.checkIn);
          const checkOutMin = parseTimeToMinutes(record.checkOut);
          const duration = Math.max(0, checkOutMin - checkInMin);
          shiftDurationHours = Math.round((duration / 60) * 10) / 10;
          if (shiftDurationHours <= 0) shiftDurationHours = 9.0;
          statusText = `Completed (${shiftDurationHours.toFixed(1)}h)`;
          totalMinutesWorked += shiftDurationHours * 60;
          completedShiftsCount += 1;
          if (record.status === "late") tardiesCount += 1;
          else onTimeCount += 1;
        } else {
          statusText = `Logged (${record.checkIn || "09:00"})`;
        }
      } else if (isPast) {
        statusText = "Off / Excused";
      } else {
        statusText = "Scheduled (09:00 – 18:00)";
      }

      return {
        dayName,
        date: isoDate,
        isToday,
        isPast,
        isFuture,
        mode,
        statusText,
        hours: shiftDurationHours,
        isActiveNow,
        isCompleted,
        record,
      };
    });

    const totalHours = Math.round((totalMinutesWorked / 60) * 10) / 10;
    const totalActiveDays = completedShiftsCount + (isCurrentlyClockedIn ? 1 : 0);
    const punctualityRate = totalActiveDays > 0
      ? Math.round((onTimeCount / totalActiveDays) * 100)
      : 100;

    return {
      days,
      totalHours,
      punctualityRate,
      tardiesCount,
    };
  }, [currentClock, currentViewEmp?.attendance, isCurrentlyClockedIn, todayAttendance]);

  // Supervisor Quick Reset for single KPI to 0
  const handleResetKpiToZero = (kpiId: string, kpiName: string) => {
    if (!confirm(`Supervisor Confirmation: Reset "${kpiName}" count to 0 for ${currentViewEmp.name}?`)) {
      return;
    }
    lastLocalActionRef.current = Date.now();
    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        let hasKpi = false;
        const nextKpis = (emp.kpis || []).map((k) => {
          if (k.id === kpiId) {
            hasKpi = true;
            return {
              ...k,
              current: 0,
              status: "needs_attention" as const,
              notes: `Reset to 0 by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
            };
          }
          return k;
        });

        if (!hasKpi) {
          nextKpis.push({
            id: kpiId,
            title: kpiName,
            target: kpiId === "kpi-bdi-1" ? 45 : (kpiId === "kpi-bdi-2" ? 16 : 10),
            current: 0,
            unit: kpiId === "kpi-bdi-1" ? "Qualified Leads" : "Discovery Demos",
            weight: 25,
            period: "Monthly (Q4 2026)",
            status: "needs_attention",
            notes: `Reset to 0 by supervisor on ${new Date().toLocaleDateString()}.`,
          });
        }
        return { ...emp, kpis: nextKpis };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Supervisor reset "${kpiName}" to 0 for ${currentViewEmp.name}.`);
  };

  // Supervisor Quick Reset for all pipeline deals to 0
  const handleResetPipelineDeals = () => {
    const target = currentViewEmp.role === "employee"
      ? currentViewEmp
      : (employees.find((e) => e.role === "employee" || e.id === "emp-bdi-001") || currentViewEmp);

    if (!confirm(`Supervisor Confirmation: Clear all pipeline deals for ${target.name} (${target.employeeId}) and reset pipeline value to LKR 0?`)) {
      return;
    }
    lastLocalActionRef.current = Date.now();
    const updated = employees.map((emp) => {
      if (emp.id === target.id) {
        return { ...emp, leads: [] };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Supervisor cleared all pipeline deals for ${target.name}.`);
  };

  // Supervisor Comprehensive Reset Modal Action
  const handleSupervisorResetSubmit = (e?: React.FormEvent, forceFullReset = false) => {
    if (e && e.preventDefault) e.preventDefault();
    lastLocalActionRef.current = Date.now();

    const targetInternId = resetTargetEmpId || (currentViewEmp.role === "employee" ? currentViewEmp.id : "emp-bdi-001");
    const targetInternObj =
      employees.find((emp) => emp.id === targetInternId) ||
      employees.find((emp) => emp.role === "employee") ||
      employees.find((emp) => emp.id === "emp-bdi-001") ||
      currentViewEmp;

    const doKpis = forceFullReset || resetOptionKpis;
    const doPipeline = forceFullReset || resetOptionPipeline;
    const doChecklist = forceFullReset || resetOptionChecklist;

    const updated = employees.map((emp) => {
      if (emp.id === targetInternObj.id) {
        let nextEmp = { ...emp };

        if (doKpis) {
          let hasLeadsKpi = false;
          let hasDemosKpi = false;
          const nextKpis = (emp.kpis || []).map((k) => {
            if (k.id === "kpi-bdi-1") {
              hasLeadsKpi = true;
              const tgt = resetLeadsTarget > 0 ? resetLeadsTarget : k.target;
              return {
                ...k,
                target: tgt,
                current: 0,
                status: "needs_attention" as const,
                notes: `Sprint reset to 0 / ${tgt} target by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
              };
            }
            if (k.id === "kpi-bdi-2") {
              hasDemosKpi = true;
              const tgt = resetDemosTarget > 0 ? resetDemosTarget : k.target;
              return {
                ...k,
                target: tgt,
                current: 0,
                status: "needs_attention" as const,
                notes: `Sprint reset to 0 / ${tgt} target by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
              };
            }
            if (forceFullReset && k.id === "kpi-bdi-4") {
              return {
                ...k,
                current: 0,
                status: "needs_attention" as const,
                notes: `Sprint metrics reset to 0 by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
              };
            }
            return k;
          });

          if (!hasLeadsKpi) {
            nextKpis.push({
              id: "kpi-bdi-1",
              title: "Monthly Leads Logged",
              target: resetLeadsTarget > 0 ? resetLeadsTarget : 45,
              current: 0,
              unit: "Qualified Leads",
              weight: 25,
              period: "Monthly (Q4 2026)",
              status: "needs_attention",
              notes: `Sprint initialized by supervisor on ${new Date().toLocaleDateString()}.`,
            });
          }
          if (!hasDemosKpi) {
            nextKpis.push({
              id: "kpi-bdi-2",
              title: "Discovery Demos Scheduled",
              target: resetDemosTarget > 0 ? resetDemosTarget : 16,
              current: 0,
              unit: "Discovery Demos",
              weight: 25,
              period: "Monthly (Q4 2026)",
              status: "needs_attention",
              notes: `Sprint initialized by supervisor on ${new Date().toLocaleDateString()}.`,
            });
          }
          nextEmp.kpis = nextKpis;
        }

        if (doPipeline) {
          nextEmp.leads = [];
        }

        if (doChecklist) {
          nextEmp.checklist = (emp.checklist || []).map((c) => ({
            ...c,
            completed: false,
          }));
        }

        return nextEmp;
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    setShowResetInternModal(false);
    showToast(`Supervisor successfully reset sprint data for ${targetInternObj.name} (${targetInternObj.employeeId}).`);
  };

  // Filtered employees in Admin/Supervisor table
  const filteredEmployees = employees.filter((emp) => {
    if (session?.role === "supervisor" && emp.role === "admin") {
      return false;
    }
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
    return <div className="ems-loading-screen">Initializing Creativex Technology Employee Management System...</div>;
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
              <span className="ems-brand-tag">Creativex EMS</span>
            </Link>
            <span className="ems-bar-divider" />
            <span className="ems-system-title">Enterprise Employee Management System</span>
          </div>

          <div className="ems-top-controls">
            <div className="ems-hq-clock">
              <span>Colombo HQ · IST 09:00–18:00</span>
            </div>

            {session ? (
              <div className="ems-session-pill">
                <span className={`ems-role-tag role-${session.role}`}>
                  {session.role === "employee" ? "INTERN" : session.role.toUpperCase()}
                </span>
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
                <div className="ems-login-brand">
                  <img
                    src="/brand/creativex-logo-light.png"
                    alt="Creativex Technology"
                    width={220}
                    height={58}
                    className="ems-login-logo"
                  />
                </div>
                <h2>Creativex Employee Portal</h2>
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
                  <span>Authorized Accounts (Click to Log In):</span>
                </div>

                <div className="ems-demo-buttons-grid">
                  {/* Master Admin Button */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("tkavishka101@gmail.com", "@Kavishka2002")}
                    className="ems-demo-account-btn highlight-admin"
                    title="Click to instant sign-in as Master Admin"
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
                    onClick={() => handleQuickLogin("ikram@creativex.online", "CreativexIkram041")}
                    className="ems-demo-account-btn"
                    title="Click to instant sign-in as BD Intern (Ikram Lantra)"
                  >
                    <div className="ems-acc-role">
                      <span className="badge-emp">BD INTERN</span>
                      <strong className="text-white">Ikram Lantra</strong>
                    </div>
                    <small>ikram@creativex.online · Live KPI Tracking</small>
                  </button>

                  {/* Supervisor Button */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("thimathi@creativexlab.online", "thimathi@2001")}
                    className="ems-demo-account-btn"
                    title="Click to instant sign-in as Supervisor"
                  >
                    <div className="ems-acc-role">
                      <span className="badge-sup">SUPERVISOR</span>
                      <strong className="text-white">Thimathi Dissanayaka</strong>
                    </div>
                    <small>thimathi@creativexlab.online · Head Of Engineering &amp; BD</small>
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
            {/* Top Employee Profile Selector (for Supervisors & Admin) */}
            {isSupervisor && (
              <div className="ems-dashboard-header ems-dashboard-header-compact">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEmpId("emp-sup-001");
                      setActiveTab("profile");
                    }}
                    className={`ems-subnav-btn ${selectedEmpId === "emp-sup-001" && activeTab === "profile" ? "active" : ""}`}
                    title="Open Supervisor Profile & Intern Approvals Center"
                  >
                    <ShieldCheck size={14} className={totalPendingSupervisorApprovals > 0 ? "text-amber-400" : "text-emerald"} />
                    <span>Supervisor Approvals</span>
                    {totalPendingSupervisorApprovals > 0 ? (
                      <span className="ems-count-pill border-amber-500/40 text-amber-300 bg-amber-500/10">
                        {totalPendingSupervisorApprovals} Pending
                      </span>
                    ) : (
                      <span className="ems-count-pill text-emerald border-emerald-500/30">0</span>
                    )}
                  </button>

                  <div className="ems-employee-picker">
                    <label htmlFor="emp-select">Viewing Profile:</label>
                    <select
                      id="emp-select"
                      value={selectedEmpId}
                      onChange={(e) => setSelectedEmpId(e.target.value)}
                      className="ems-select-styled"
                    >
                      {viewableEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.employeeId} — {emp.name} ({emp.designation})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

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
                title={isSupervisor ? "Supervisor KPI Scoreboard" : "My Performance & KPI Scoreboard"}
              >
                <Target size={15} />
                <span>{isSupervisor ? "Supervisor KPI Scoreboard" : "My KPI Scoreboard"}</span>
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
                <span className="ems-tab-pill">
                  {todayAttendance ? (isCurrentlyClockedIn ? "Active" : "Logged") : "40h / Wk"}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                disabled
                aria-disabled="true"
                className="ems-tab-btn opacity-50 cursor-not-allowed pointer-events-none select-none"
                title="Creative Team (Access Disabled)"
              >
                <Users size={15} />
                <span>Creative Team</span>
              </button>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                TAB 1: EMPLOYEE PROFILE DOSSIER (FIRST: BD INTERN)
            ───────────────────────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="ems-profile-view">
                {/* ── 24-Hour Live System Clock & Remote Attendance Punch ── */}
                <div className="ems-clock24-strip">
                  <div className="ems-clock24-left">
                    <Clock size={16} className="text-[#a1a1aa]" />
                    <div className="ems-clock24-display">
                      <span className="ems-clock24-time tabular-nums">{liveClock24}</span>
                      <span className="ems-clock24-zone">UTC+05:30 · Colombo</span>
                    </div>
                    <div className="ems-clock24-sep" />
                    <div className="ems-clock24-date">
                      <span>{liveDateFormatted}</span>
                    </div>
                  </div>

                  <div className="ems-clock24-right">
                    {!isCurrentlyClockedIn ? (
                      <button
                        type="button"
                        onClick={handleRemoteClockIn}
                        className="ems-remote-punch-btn clock-in"
                        title="Mark remote attendance: Clock IN"
                      >
                        <LogIn size={13} />
                        <span>Remote Clock IN</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="ems-shift-badge-active">
                          <span>Remote Active ({todayAttendance?.checkIn})</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoteClockOut}
                          className="ems-remote-punch-btn clock-out"
                          title="Mark remote attendance: Clock OUT"
                        >
                          <LogOut size={13} />
                          <span>Remote Clock OUT</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                   ENTERPRISE HR SYSTEM PROFILE DOSSIER (WORKDAY / DEEL STYLE)
                ───────────────────────────────────────────────────────────── */}
                <div className="ems-hr-profile-hero">
                  {/* Top Identity & HR Header */}
                  <div className="ems-hr-identity-header">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="ems-hr-avatar-wrap">
                        <div className="ems-hr-avatar">
                          {currentViewEmp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>

                      <div className="ems-hr-meta-main">
                        <div className="ems-hr-title-wrap">
                          <h2>{currentViewEmp.name}</h2>
                          <span className="ems-hr-badge-id">{currentViewEmp.employeeId}</span>
                          <span className="ems-hr-status-pill">
                            {currentViewEmp.role === "employee" ? "Active · Internship" : "Full-Time Active"}
                          </span>
                          <span className="ems-hr-band-pill">
                            {currentViewEmp.role === "admin"
                              ? "Executive Tier · L5"
                              : currentViewEmp.role === "supervisor"
                              ? "Band L3 · Management"
                              : "Band L1 · Associate"}
                          </span>
                        </div>

                        <div className="ems-hr-designation-line">
                          <span className="ems-hr-designation-text">{currentViewEmp.designation}</span>
                          <span className="text-white/30">·</span>
                          <span className="ems-hr-department-text">{currentViewEmp.department}</span>
                        </div>

                        {/* Corporate Contact & Tenure Strip */}
                        <div className="ems-hr-contact-strip">
                          <div className="ems-hr-contact-item">
                            <Mail size={13} className="text-[#a1a1aa]" />
                            <a href={`mailto:${currentViewEmp.email}`} className="ems-hr-contact-item text-link">
                              {currentViewEmp.email}
                            </a>
                          </div>
                          {currentViewEmp.phone && (
                            <div className="ems-hr-contact-item">
                              <Phone size={13} className="text-[#a1a1aa]" />
                              <a href={`tel:${currentViewEmp.phone.replace(/\s+/g, '')}`} className="ems-hr-contact-item text-link">
                                {currentViewEmp.phone}
                              </a>
                            </div>
                          )}
                          <div className="ems-hr-contact-item">
                            <MapPin size={13} className="text-[#a1a1aa]" />
                            <span>Colombo Operations Center (UTC+05:30)</span>
                          </div>
                          <div className="ems-hr-contact-item">
                            <Calendar size={13} className="text-[#a1a1aa]" />
                            <span>
                              {(() => {
                                if (!currentViewEmp.joiningDate) return "Active Standing";
                                const start = new Date(currentViewEmp.joiningDate);
                                const now = new Date();
                                const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                                if (diffMonths < 1) {
                                  const diffDays = Math.max(1, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
                                  return `${diffDays} days active (Joined ${currentViewEmp.joiningDate})`;
                                }
                                const years = Math.floor(diffMonths / 12);
                                const months = diffMonths % 12;
                                if (years === 0) return `${months} mos active (Joined ${currentViewEmp.joiningDate})`;
                                if (months === 0) return `${years} yr${years > 1 ? "s" : ""} tenure (Joined ${currentViewEmp.joiningDate})`;
                                return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""} tenure (Joined ${currentViewEmp.joiningDate})`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance & Appraisal Summary Card */}
                    <div className="ems-hr-appraisal-box">
                      <div className="ems-hr-appraisal-top">
                        <div>
                          <div className="ems-hr-appraisal-val">{overallKpiScore}%</div>
                          <div className="ems-hr-appraisal-lbl">Appraisal KPI Score</div>
                        </div>
                        <div className="ems-hr-appraisal-grade">
                          <strong>{overallKpiScore >= 100 ? "Grade A+" : overallKpiScore >= 85 ? "Grade A" : "Grade B"}</strong>
                          <small>{overallKpiScore >= 100 ? "Exceeding Expectations" : "Target Achieved"}</small>
                        </div>
                      </div>
                      <div className="ems-hr-appraisal-footer">
                        <span>Q4 2026 Appraisal Cycle</span>
                        <span className="ems-hr-appraisal-tag">Evaluation Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Executive 2-Column HR Dossier Specification (Linear / Stripe Grade) */}
                  <div className="ems-hr-exec-grid">
                    {/* Panel 1: Organizational & Employment Structure */}
                    <div className="ems-hr-exec-panel">
                      <div className="ems-hr-exec-panel-head">
                        <div className="ems-hr-exec-panel-title">
                          <Building size={14} />
                          <span>Organizational &amp; Employment Structure</span>
                        </div>
                        <span className="ems-hr-exec-panel-tag">
                          {currentViewEmp.role === "admin" ? "CC-EXEC-01" : "CC-BD-04"}
                        </span>
                      </div>
                      <div className="ems-hr-exec-rows">
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Reporting Line</span>
                          <div className="ems-hr-exec-value">
                            {(() => {
                              let cleanedSupervisor = (currentViewEmp.supervisorName || "")
                                .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
                                .replace(/Dinithi/gi, "Thimathi Dissanayaka")
                                .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
                                .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                                .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                                .trim();
                              if (currentViewEmp.id === "emp-bdi-001" && (!cleanedSupervisor || cleanedSupervisor.toLowerCase().includes("dinithi"))) {
                                cleanedSupervisor = "Thimathi Dissanayaka (Head Of Engineering and Business Development)";
                              }
                              return cleanedSupervisor ? (
                                <>
                                  <div>{cleanedSupervisor}</div>
                                  <span className="ems-hr-exec-sub">
                                    {currentViewEmp.role === "admin"
                                      ? "Creativex Technology Board of Directors"
                                      : "Strategic Leadership & Solutions Engineering"}
                                  </span>
                                </>
                              ) : (
                                <div>
                                  {currentViewEmp.role === "admin"
                                    ? "Creativex Technology Board of Directors"
                                    : "Strategic Leadership & Solutions Engineering"}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Department &amp; Unit</span>
                          <div className="ems-hr-exec-value">
                            <div>{currentViewEmp.department}</div>
                            <span className="ems-hr-exec-sub">Colombo Operations Hub</span>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Employment Agreement</span>
                          <div className="ems-hr-exec-value">
                            <div>{currentViewEmp.contractType}</div>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Operating Schedule</span>
                          <div className="ems-hr-exec-value">
                            <div>09:00 – 18:00 (Colombo Time)</div>
                            <span className="ems-hr-exec-sub">Monday to Friday · Standard 40h/wk</span>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Work Location</span>
                          <div className="ems-hr-exec-value">
                            <div>{currentViewEmp.workLocation}</div>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Assigned Corridors</span>
                          <div className="ems-hr-exec-value">
                            <div>{currentViewEmp.allocatedTerritory || "Sri Lanka SMEs, Australia & UK Tech"}</div>
                            <span className="ems-hr-exec-sub">Outbound B2B Discovery &amp; Solution Scoping</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Panel 2: Compensation, Clearances & Authority */}
                    <div className="ems-hr-exec-panel">
                      <div className="ems-hr-exec-panel-head">
                        <div className="ems-hr-exec-panel-title">
                          <ShieldCheck size={14} />
                          <span>Compensation, Governance &amp; Clearances</span>
                        </div>
                        <span className="ems-hr-exec-panel-tag">Clearance Level 2</span>
                      </div>
                      <div className="ems-hr-exec-rows">
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Remuneration Model</span>
                          <div className="ems-hr-exec-value">
                            <div>
                              {currentViewEmp.role === "employee"
                                ? "Monthly Corporate Stipend + 10% Closed-Won Commission"
                                : currentViewEmp.role === "supervisor"
                                ? "Executive Monthly Salary + Team Overrides"
                                : "Executive Director Remuneration"}
                            </div>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Disbursement Cycle</span>
                          <div className="ems-hr-exec-value">
                            <div>Monthly Direct Wire · Disbursed on 28th</div>
                            <span className="ems-hr-exec-sub">LKR / Direct Bank Transfer</span>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Leave Entitlement</span>
                          <div className="ems-hr-exec-value">
                            <div>
                              {currentViewEmp.role === "employee"
                                ? "Study & Exam Leave (3 Days Available)"
                                : "14 Annual (11 Avail) · 7 Casual (5 Avail)"}
                            </div>
                          </div>
                        </div>
                        <div className="ems-hr-exec-row">
                          <span className="ems-hr-exec-label">Sign-Off &amp; Authority</span>
                          <div className="ems-hr-exec-value">
                            <div>
                              {currentViewEmp.role === "supervisor"
                                ? "Up to LKR 2,500,000 Milestone Authority"
                                : currentViewEmp.role === "admin"
                                ? "Unrestricted Executive Board Authority"
                                : "Milestone Intake & Discovery Scoping"}
                            </div>
                            <span className="ems-hr-exec-sub">
                              Escalation: Executive Office · Same-Day Resolution
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Security & Compliance Clearance Grid */}
                      <div className="ems-hr-clearance-section">
                        <div className="ems-hr-clearance-head">Active Clearances &amp; Legal Undertakings</div>
                        <div className="ems-hr-clearance-grid">
                          <div className="ems-hr-clearance-item">
                            <CheckCircle2 size={14} />
                            <div className="ems-hr-clearance-text">
                              <strong>Corporate NDA</strong>
                              <span>Active on File</span>
                            </div>
                          </div>
                          <div className="ems-hr-clearance-item">
                            <CheckCircle2 size={14} />
                            <div className="ems-hr-clearance-text">
                              <strong>IP Assignment</strong>
                              <span>100% Creativex Technology</span>
                            </div>
                          </div>
                          <div className="ems-hr-clearance-item">
                            <CheckCircle2 size={14} />
                            <div className="ems-hr-clearance-text">
                              <strong>PDPA Level 2</strong>
                              <span>Operator Clearance</span>
                            </div>
                          </div>
                          <div className="ems-hr-clearance-item">
                            <CheckCircle2 size={14} />
                            <div className="ems-hr-clearance-text">
                              <strong>Workstation</strong>
                              <span>Encrypted Profile</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                   SUPERVISOR MANAGEMENT WORKSPACE & INTERN APPROVAL CENTER
                ───────────────────────────────────────────────────────────── */}
                {(currentViewEmp.role === "supervisor" || currentViewEmp.role === "admin") && (
                  <div className="ems-supervisor-workspace">
                    {/* 1. Quick Stats Strip */}
                    <div className="ems-bdi-quickstats-strip">
                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-orange">
                          <TrendingUp size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Supervised Team Pipeline</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">LKR 16.2M</strong>
                            <span className="ems-stat-target">/ 15M Target</span>
                            <span className="ems-stat-pct text-emerald">108%</span>
                          </div>
                          <div className="ems-stat-progressbar">
                            <div className="ems-bar-fill" style={{ width: "100%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-purple">
                          <Users size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Supervised Direct Reports</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">1 Active Intern</strong>
                            <span className="ems-stat-target">B2B Sales</span>
                          </div>
                          <span className="text-[11px] text-[#71717a] mt-1 block">Ikram Lantra (CX-EMP-041)</span>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-blue">
                          <ShieldAlert size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Intern Sign-Offs Pending</span>
                            {totalPendingSupervisorApprovals > 0 && (
                              <span className="ems-badge-pending-count">
                                {totalPendingSupervisorApprovals} Action{totalPendingSupervisorApprovals === 1 ? "" : "s"}
                              </span>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className={`ems-stat-val tabular-nums ${totalPendingSupervisorApprovals > 0 ? "text-amber-400" : "text-emerald"}`}>
                              {totalPendingSupervisorApprovals}
                            </strong>
                            <span className="ems-stat-target">
                              {totalPendingSupervisorApprovals === 0 ? "All requests cleared" : "Requires Authorization"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-emerald">
                          <Award size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <span className="ems-stat-label">Pitch Closing Benchmark</span>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">28.5%</strong>
                            <span className="ems-stat-target">/ 25% Target</span>
                            <span className="ems-stat-pct text-emerald">+3.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Intern Sign-Off & Approvals Command Center */}
                    <div className="ems-supervisor-approvals-section">
                      <div className="ems-pipeline-header">
                        <div className="ems-pipeline-header-info">
                          <div className="flex items-center gap-2">
                            <h3 className="ems-subview-title">Intern Sign-Off &amp; Approvals Command Center</h3>
                            <span className={`ems-count-pill ${totalPendingSupervisorApprovals > 0 ? "border-amber-500/40 text-amber-300 bg-amber-500/10" : "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"}`}>
                              {totalPendingSupervisorApprovals} Pending
                            </span>
                          </div>
                          <p className="ems-subview-desc">
                            Review and authorize daily EOD shift reports, Closed Won deals, proposed edits, and deletion requests submitted by supervised Business Development Interns.
                          </p>
                        </div>
                        <div className="ems-pipeline-header-actions">
                          <button
                            type="button"
                            onClick={() => {
                              const targetId = currentViewEmp.role === "employee"
                                ? currentViewEmp.id
                                : (employees.find((e) => e.role === "employee" || e.id === "emp-bdi-001")?.id || "emp-bdi-001");
                              setResetTargetEmpId(targetId);
                              setResetOptionKpis(true);
                              setResetOptionPipeline(true);
                              setResetOptionChecklist(true);
                              setShowResetInternModal(true);
                            }}
                            className="ems-btn-secondary"
                            title="Supervisor controls to reset sprint targets, leads or metrics"
                          >
                            <RotateCcw size={13} /> Reset Intern Sprint
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEmpId("emp-bdi-001");
                              setActiveTab("profile");
                            }}
                            className="ems-btn-primary"
                          >
                            <Users size={14} /> View Intern Profile
                          </button>
                        </div>
                      </div>

                      {totalPendingSupervisorApprovals === 0 ? (
                        <div className="ems-approvals-empty-card">
                          <CheckCircle2 size={36} className="text-emerald" />
                          <h4 className="text-white text-sm font-semibold mt-3 mb-1">All Intern Requests Cleared</h4>
                          <p className="text-xs text-[#a0a5a0] max-w-md text-center m-0">
                            There are no pending daily EOD shift reports, Closed Won deals, proposed edits, or deletion requests awaiting supervisor authorization. Any new intern submissions will appear here for review.
                          </p>
                        </div>
                      ) : (
                        <div className="ems-supervisor-approvals-grid">
                          {/* 1. Pending EOD Shift Reports */}
                          {allSupervisedPendingEodReports.map(({ report, employee }) => (
                            <div key={report.id} className="ems-supervisor-approval-card border border-amber-500/25 bg-[#151715]">
                              <div className="ems-approval-card-top">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="ems-sub-emp-chip">
                                    <Users size={12} className="text-[#a1a1aa]" />
                                    <strong>{employee.name}</strong> ({employee.employeeId})
                                  </span>
                                  <span className="ems-stage-badge border border-amber-500/30 text-amber-300 bg-amber-500/10">
                                    EOD Shift Sign-Off Pending
                                  </span>
                                </div>
                                <div className="ems-lead-value-badge font-mono text-xs text-amber-300">
                                  {report.deliverablesCount} Deliverables
                                </div>
                              </div>

                              <div className="ems-approval-card-details">
                                <div className="ems-approval-detail-row">
                                  <strong className="text-white text-sm">Shift Operations Handover ({report.date})</strong>
                                  <span className="text-xs text-[#a1a1aa]">Submitted at {report.submittedAt} · Supervisor: {employee.supervisorName}</span>
                                </div>

                                <div className="mt-2 text-xs bg-black/40 p-2.5 rounded border border-white/5">
                                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Accomplishments &amp; Output</div>
                                  <p className="m-0 text-zinc-200 leading-relaxed">{report.accomplishments}</p>
                                  {report.blockers && (
                                    <div className="mt-2 pt-2 border-t border-white/5 text-[11.5px] text-amber-200/90">
                                      <strong className="text-amber-400 font-semibold">Blockers / Tomorrow Priority: </strong>
                                      {report.blockers}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Supervisor Authorization Action Buttons */}
                              <div className="ems-approval-action-buttons mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSupervisorSignOffEodReport(employee.id, report.id)}
                                  className="ems-btn-approve-deal flex-1"
                                >
                                  <CheckCircle2 size={13} />
                                  <span>Sign-Off &amp; Authorize Shift</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedEmpId(employee.id);
                                    setActiveTab("profile");
                                    setSelectedTaskDate(report.date);
                                  }}
                                  className="ems-btn-reject-deal"
                                  title="Inspect intern daily workflow for this shift"
                                >
                                  <FileText size={13} />
                                  <span>Inspect Shift</span>
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* 2. Pending Lead Deals, Edits, Deletions */}
                          {allSupervisedPendingApprovals.map(({ lead, employee }) => {
                            const isWon = lead.pendingRequestType === "won" || lead.stage === "Closed Won";
                            const isEdit = lead.pendingRequestType === "edit";
                            const isDelete = lead.pendingRequestType === "delete";
                            const dealLKR = parseDealValueToLKR(lead.dealValue);
                            const commission = Math.round(dealLKR * 0.10);

                            return (
                              <div key={lead.id} className="ems-supervisor-approval-card">
                                <div className="ems-approval-card-top">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="ems-sub-emp-chip">
                                      <Users size={12} className="text-[#a1a1aa]" />
                                      <strong>{employee.name}</strong> ({employee.employeeId})
                                    </span>
                                    <span className={`ems-stage-badge ${isDelete ? "stage-danger" : isEdit ? "stage-purple" : "stage-pending"}`}>
                                      {isDelete ? "Deletion Sign-Off" : isEdit ? "Proposed Edit Review" : "Closed Won Authorization"}
                                    </span>
                                  </div>
                                  <div className="ems-lead-value-badge tabular-nums">
                                    {lead.dealValue}
                                  </div>
                                </div>

                                <div className="ems-approval-card-details">
                                  <div className="ems-approval-detail-row">
                                    <strong className="text-white text-sm">{lead.clientName}</strong>
                                    <span className="text-xs text-[#a1a1aa]">{lead.contactPerson} · {lead.corridor} · {lead.channel}</span>
                                  </div>

                                  {isWon && (
                                    <div className="ems-approval-incentive-box">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-zinc-300">10% Intern Incentive Commission:</span>
                                        <strong className="text-emerald font-mono text-sm">+{formatLKR(commission)}</strong>
                                      </div>
                                      <small className="text-[11px] text-zinc-400 block mt-0.5">
                                        Will be officially credited to {employee.name}&rsquo;s sprint bonus upon authorization.
                                      </small>
                                    </div>
                                  )}

                                  {isEdit && lead.pendingEditData && (
                                    <div className="ems-pending-edit-diff mt-2">
                                      <div className="text-[11.5px] text-zinc-300">
                                        <strong>Proposed Changes:</strong> Client: &ldquo;{lead.pendingEditData.clientName}&rdquo; · Value: <span className="text-emerald font-semibold">{lead.pendingEditData.dealValue}</span> · Region: {lead.pendingEditData.corridor} · Stage: {lead.pendingEditData.stage}
                                      </div>
                                      {lead.pendingEditData.notes && (
                                        <div className="text-[11px] text-zinc-400 italic mt-1">&ldquo;{lead.pendingEditData.notes}&rdquo;</div>
                                      )}
                                    </div>
                                  )}

                                  {lead.notes && (
                                    <p className="ems-lead-notes mt-2 text-xs text-zinc-400 italic bg-black/20 p-2 rounded">
                                      &ldquo;{lead.notes}&rdquo;
                                    </p>
                                  )}
                                </div>

                                {/* Supervisor Authorization Action Buttons */}
                                <div className="ems-approval-action-buttons mt-3 pt-3 border-t border-zinc-800">
                                  {isWon && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorApproveLead(lead.id, employee.id)}
                                        className="ems-btn-approve-deal flex-1"
                                      >
                                        <CheckCircle2 size={13} />
                                        <span>Approve &amp; Assign Commission</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorRejectLead(lead.id, employee.id)}
                                        className="ems-btn-reject-deal"
                                      >
                                        <RotateCcw size={13} />
                                        <span>Return to Proposal</span>
                                      </button>
                                    </>
                                  )}

                                  {isEdit && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorApproveEdit(lead.id, employee.id)}
                                        className="ems-btn-approve-deal flex-1"
                                      >
                                        <CheckCircle2 size={13} />
                                        <span>Approve &amp; Apply Edits</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorRejectEdit(lead.id, employee.id)}
                                        className="ems-btn-reject-deal"
                                      >
                                        <RotateCcw size={13} />
                                        <span>Reject Edits</span>
                                      </button>
                                    </>
                                  )}

                                  {isDelete && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorApproveDelete(lead.id, employee.id)}
                                        className="ems-btn-danger-approve flex-1"
                                      >
                                        <Trash2 size={13} />
                                        <span>Approve &amp; Delete Lead</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSupervisorRejectDelete(lead.id, employee.id)}
                                        className="ems-btn-reject-deal"
                                      >
                                        <RotateCcw size={13} />
                                        <span>Reject / Keep Lead</span>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* 2b. All Intern EOD Reports Archive (Signed-Off & Pending) */}
                      {(() => {
                        const allInternEods: Array<{ report: EodReportItem; employee: Employee }> =
                          employees.flatMap((emp) => (emp.eodReports || []).map((r) => ({ report: r, employee: emp })));

                        if (allInternEods.length === 0) return null;

                        return (
                          <div className="ems-eod-archive-box mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                                <FileText size={13} className="text-[#ff5a36]" />
                                All Intern Shift EOD Reports ({allInternEods.length})
                              </span>
                              <span className="text-[11px] text-[#71717a]">
                                Historical Handover Log
                              </span>
                            </div>

                            <div className="space-y-2">
                              {allInternEods.map(({ report, employee }) => {
                                const isPending = report.status === "pending_review";
                                return (
                                  <div
                                    key={report.id}
                                    className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start justify-between gap-3 text-xs"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <strong className="text-white font-medium">{employee.name}</strong>
                                        <span className="text-zinc-500 font-mono text-[11px]">({employee.employeeId})</span>
                                        <span className="text-zinc-400">·</span>
                                        <span className="text-zinc-300 font-mono text-[11px]">{report.date}</span>
                                        <span
                                          className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${
                                            isPending
                                              ? "bg-amber-950/40 border-amber-500/30 text-amber-300"
                                              : "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                                          }`}
                                        >
                                          {isPending ? "Pending Review" : "Signed Off ✓"}
                                        </span>
                                      </div>
                                      <p className="m-0 text-zinc-300 leading-relaxed text-[11.5px]">{report.accomplishments}</p>
                                      {report.blockers && (
                                        <div className="text-[11px] text-amber-200/90 pt-0.5">
                                          <strong className="text-amber-400">Next Shift Focus: </strong>
                                          {report.blockers}
                                        </div>
                                      )}
                                      {!isPending && report.signedOffBy && (
                                        <div className="text-[10.5px] text-zinc-500">
                                          Authorized by {report.signedOffBy} {report.signedOffAt ? `· ${report.signedOffAt}` : ""}
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                                      <span className="font-mono text-emerald font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                                        {report.deliverablesCount} Tasks
                                      </span>
                                      {isPending && (
                                        <button
                                          type="button"
                                          onClick={() => handleSupervisorSignOffEodReport(employee.id, report.id)}
                                          className="ems-btn-primary py-1 px-2.5 text-[11px] bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40"
                                        >
                                          <CheckCircle2 size={11} /> Sign-Off
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 3. Supervised Team & Interns Quick Management Card */}
                    <div className="ems-supervised-team-card mt-6">
                      <div className="ems-pipeline-header">
                        <div className="ems-pipeline-header-info">
                          <h3 className="ems-subview-title">Supervised Direct Reports</h3>
                          <p className="ems-subview-desc">
                            Supervised Business Development Interns and sprint productivity overview.
                          </p>
                        </div>
                      </div>

                      <div className="ems-intern-card-summary">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className="ems-avatar-box" style={{ width: 40, height: 40, minWidth: 40 }}>
                              <div className="ems-avatar-initials text-xs">IL</div>
                            </div>
                            <div>
                              <h4 className="text-white text-sm font-semibold m-0">Ikram Lantra</h4>
                              <p className="text-xs text-[#a1a1aa] m-0">
                                CX-EMP-041 · Business Development Intern (Probation) in 20 Days
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEmpId("emp-bdi-001");
                                setActiveTab("profile");
                                setBdiSubTab("pipeline");
                              }}
                              className="ems-btn-secondary"
                            >
                              <Briefcase size={13} /> Inspect Pipeline
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowResetInternModal(true)}
                              className="ems-btn-secondary"
                            >
                              <RotateCcw size={13} /> Reset Sprint Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                   ENHANCED BDI WORKSPACE & OS EXPERIENCE (B2B Intern)
                ───────────────────────────────────────────────────────────── */}
                {currentViewEmp.role !== "supervisor" && (currentViewEmp.id === "emp-bdi-001" || currentViewEmp.department.includes("Business Development")) && (
                  <div className="ems-bdi-workspace">
                    {/* 1. Quick Stats Strip */}
                    <div className="ems-bdi-quickstats-strip">
                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-orange">
                          <Users size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Monthly Leads Logged</span>
                            {isSupervisor && (
                              <div className="ems-card-actions-group">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setKpiUpdateVal(leadsCurrent);
                                    setKpiUpdateTargetVal(leadsTarget);
                                    setShowUpdateKpiModal({
                                      kpi: kpiLeads || {
                                        id: "kpi-bdi-1",
                                        title: "Monthly Leads Logged",
                                        target: leadsTarget,
                                        current: leadsCurrent,
                                        unit: "Qualified Leads",
                                        weight: 25,
                                        status: "needs_attention",
                                      },
                                      empId: currentViewEmp.id,
                                    });
                                  }}
                                  className="ems-card-assign-btn"
                                  title="Supervisor: Assign Target & Progress"
                                >
                                  <SlidersHorizontal size={10} /> Assign
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleResetKpiToZero(kpiLeads?.id || "kpi-bdi-1", "Monthly Leads Logged")}
                                  className="ems-card-reset-btn"
                                  title="Supervisor: Reset count to 0"
                                >
                                  <RotateCcw size={10} /> Reset
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">{leadsCurrent}</strong>
                            <span className="ems-stat-target">/ {leadsTarget} Target</span>
                            <span className="ems-stat-pct text-emerald">{leadsPct}%</span>
                          </div>
                          <div className="ems-stat-progressbar">
                            <div className="ems-bar-fill" style={{ width: `${leadsPct}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-purple">
                          <Calendar size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Discovery Demos Scheduled</span>
                            {isSupervisor && (
                              <div className="ems-card-actions-group">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setKpiUpdateVal(demosCurrent);
                                    setKpiUpdateTargetVal(demosTarget);
                                    setShowUpdateKpiModal({
                                      kpi: kpiDemos || {
                                        id: "kpi-bdi-2",
                                        title: "Discovery Demos Scheduled",
                                        target: demosTarget,
                                        current: demosCurrent,
                                        unit: "Discovery Demos",
                                        weight: 25,
                                        status: "needs_attention",
                                      },
                                      empId: currentViewEmp.id,
                                    });
                                  }}
                                  className="ems-card-assign-btn"
                                  title="Supervisor: Assign Target & Progress"
                                >
                                  <SlidersHorizontal size={10} /> Assign
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleResetKpiToZero(kpiDemos?.id || "kpi-bdi-2", "Discovery Demos Scheduled")}
                                  className="ems-card-reset-btn"
                                  title="Supervisor: Reset count to 0"
                                >
                                  <RotateCcw size={10} /> Reset
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">{demosCurrent}</strong>
                            <span className="ems-stat-target">/ {demosTarget} Target</span>
                            <span className="ems-stat-pct text-emerald">{demosPct}%</span>
                          </div>
                          <div className="ems-stat-progressbar">
                            <div className="ems-bar-fill" style={{ width: `${demosPct}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-emerald">
                          <DollarSign size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Active Pipeline Value</span>
                            {isSupervisor && activePipelineValue > 0 && (
                              <button
                                type="button"
                                onClick={handleResetPipelineDeals}
                                className="ems-card-reset-btn"
                                title="Supervisor: Reset active pipeline to LKR 0"
                              >
                                <RotateCcw size={10} /> Reset
                              </button>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val tabular-nums">
                              {activePipelineValue > 0 ? formatLKR(activePipelineValue) : "LKR 0"}
                            </strong>
                            <span className="ems-stat-sub">
                              {activeLeads.length} {activeLeads.length === 1 ? "Active Deal" : "Active Deals"}
                            </span>
                          </div>
                          <small className="text-[#a0a5a0] text-xs">
                            {activeLeads.length > 0
                              ? Array.from(new Set(activeLeads.map((l) => l.corridor || "Sri Lanka SME"))).join(" · ")
                              : "No active pipeline deals"}
                          </small>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-blue">
                          <Award size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Estimated Incentive</span>
                            {isSupervisor && estimatedIncentive > 0 && (
                              <button
                                type="button"
                                onClick={handleResetPipelineDeals}
                                className="ems-card-reset-btn"
                                title="Supervisor: Reset won deals"
                              >
                                <RotateCcw size={10} /> Reset
                              </button>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className="ems-stat-val text-emerald tabular-nums">
                              {estimatedIncentive > 0 ? `+${formatLKR(estimatedIncentive)}` : "LKR 0"}
                            </strong>
                            {pendingCommission > 0 && (
                              <span className="text-[11px] text-amber-400 font-mono ml-2">
                                (+{formatLKR(pendingCommission)} pending sign-off)
                              </span>
                            )}
                          </div>
                          <small className="text-[#a0a5a0] text-xs">
                            {wonLeads.length > 0
                              ? `10% Commission Assigned (${wonLeads.length} Approved Won ${wonLeads.length === 1 ? "Deal" : "Deals"})`
                              : pendingCommission > 0
                              ? `10% Commission Awaiting Supervisor Sign-Off`
                              : "10% Commission on Won Deals"}
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* 2. Sub-Tab Navigator */}
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
                        <span className="ems-count-pill">{currentViewEmp.leads?.length ?? 0}</span>
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
                          {(currentViewEmp.checklist || []).length}
                        </span>
                      </button>

                    </div>

                    {/* ─────────────────────────────────────────────────────────────
                       SUB-TAB 1: ROLE CHARTER & PROFILE OVERVIEW
                    ───────────────────────────────────────────────────────────── */}
                    {bdiSubTab === "overview" && (
                      <div className="space-y-4">
                        {/* 1. Probation Card (20 Days Track) */}
                        <div className="ems-role-spotlight-card">
                          <div className="ems-spotlight-head">
                            <div className="ems-spotlight-title">
                              <Award size={18} className="text-[#ff5a36]" />
                              <h3>Role Charter: Business Development Intern (Probation) in 20 Days</h3>
                            </div>
                            <span className="ems-spotlight-badge">Tier 01</span>
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
                                  <strong className="text-white">LKR 20,000 / Month</strong>
                                </div>
                                <div className="ems-comp-row">
                                  <span>Performance Commission:</span>
                                  <strong className="text-emerald">+ Commission on Closed Enterprise Sprints</strong>
                                </div>
                                <div className="ems-comp-row">
                                  <span>Probation Benchmark:</span>
                                  <span>20-Day Probation Assessment (Advancement to Tier 02)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Full Track Card (Tier 02 - Locked) */}
                        <div className="ems-role-spotlight-card opacity-75 border-dashed relative">
                          <div className="ems-spotlight-head">
                            <div className="ems-spotlight-title">
                              <Lock size={18} className="text-[#a1a1aa]" />
                              <h3>Role Charter: Business Development Intern</h3>
                            </div>
                            <span className="ems-spotlight-badge flex items-center gap-1.5 opacity-80 border-dashed">
                              <Lock size={11} /> Tier 02 (Locked)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#161a16] border border-[#2b332b] text-xs text-[#a1a1aa] mb-4">
                            <Lock size={13} className="text-[#ff5a36] shrink-0" />
                            <span>
                              <strong>Tier 02 Track Locked:</strong> Unlocks automatically upon completing the 20-Day Probation evaluation.
                            </span>
                          </div>

                          <div className="ems-spotlight-columns select-none">
                            <div className="ems-spotlight-col">
                              <h4>Core Focus Areas &amp; Deliverables</h4>
                              <ul>
                                <li>
                                  <CheckCircle2 size={14} className="text-[#71717a]" />
                                  <strong>B2B Tech Lead Generation:</strong> Drive outbound enterprise sales across Sri Lanka, Australia, and UK corridors.
                                </li>
                                <li>
                                  <CheckCircle2 size={14} className="text-[#71717a]" />
                                  <strong>CreativeOS Discovery Demos:</strong> Deliver verified product walkthroughs and articulate system advantages to clients.
                                </li>
                                <li>
                                  <CheckCircle2 size={14} className="text-[#71717a]" />
                                  <strong>Proposal Turnaround SLA:</strong> Gather technical client specifications and coordinate engineering scoping within 24 hours.
                                </li>
                                <li>
                                  <CheckCircle2 size={14} className="text-[#71717a]" />
                                  <strong>Market Intelligence:</strong> Build competitive dossiers and initiate outbound strategic partnerships.
                                </li>
                              </ul>
                            </div>

                            <div className="ems-spotlight-col">
                              <h4>Compensation &amp; Career Trajectory</h4>
                              <div className="ems-comp-box">
                                <div className="ems-comp-row">
                                  <span>Monthly Base Stipend:</span>
                                  <strong className="text-white">LKR 20,000 – 50,000 / Month</strong>
                                </div>
                                <div className="ems-comp-row">
                                  <span>Performance Commission:</span>
                                  <strong className="text-[#71717a]">+ Commission on Closed Enterprise Sprints</strong>
                                </div>
                                <div className="ems-comp-row">
                                  <span>Promotion Pathway:</span>
                                  <span>Associate Business Development Executive (Upon 6-Month Review)</span>
                                </div>
                              </div>

                              <div className="ems-spotlight-actions mt-4">
                                <button
                                  type="button"
                                  disabled
                                  aria-disabled="true"
                                  className="ems-btn-secondary w-full opacity-50 cursor-not-allowed pointer-events-none select-none flex items-center justify-center gap-1.5"
                                  title="Unlocks upon completing 20-day probation"
                                >
                                  <Lock size={13} /> Tier 02 Locked (Unlocks Post-Probation)
                                </button>
                              </div>
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
                          <div className="ems-pipeline-header-info">
                            <h3 className="ems-subview-title">Active B2B Sales Pipeline</h3>
                            <p className="ems-subview-desc">
                              Track enterprise and SME software prospects across Sri Lanka, Australia, and the UK.
                              Advancing a deal automatically increments your live Supervisor KPI targets!
                            </p>
                          </div>
                          <div className="ems-pipeline-header-actions">
                            {isSupervisor && (
                              <button
                                type="button"
                                onClick={() => setShowResetInternModal(true)}
                                className="ems-btn-secondary"
                                title="Supervisor controls to reset sprint targets, leads or metrics"
                              >
                                <RotateCcw size={13} /> Reset Intern Data
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setShowAddLeadModal(true)}
                              className="ems-btn-primary"
                            >
                              <Plus size={14} /> Log New Lead
                            </button>
                          </div>
                        </div>

                        {/* Subtle Notice for Supervisor Viewing Intern Profile */}
                        {isSupervisor && pendingApprovalLeads.length > 0 && (
                          <div className="ems-approval-callout-banner" style={{ background: "rgba(245, 158, 11, 0.05)", borderColor: "rgba(245, 158, 11, 0.2)" }}>
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                <Clock size={15} className="text-amber-400" />
                                <span className="text-xs text-zinc-300">
                                  <strong>{pendingApprovalLeads.length} pending request{pendingApprovalLeads.length === 1 ? "" : "s"}</strong> from {currentViewEmp.name} awaiting supervisor authorization.
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedEmpId("emp-sup-001");
                                  setActiveTab("profile");
                                }}
                                className="ems-btn-secondary py-1 px-3 text-xs"
                              >
                                Review in Supervisor Approvals &rarr;
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="ems-pipeline-grid">
                          {(currentViewEmp.leads || []).map((lead) => {
                            const stageColors: Record<string, string> = {
                              "New Lead": "stage-blue",
                              "Contacted": "stage-purple",
                              "Demo Booked": "stage-orange",
                              "Proposal Sent": "stage-amber",
                              "Closed Won": "stage-emerald",
                            };
                            const isPending = lead.approvalStatus === "pending";
                            const isPendingDelete = isPending && lead.pendingRequestType === "delete";
                            const isPendingEdit = isPending && lead.pendingRequestType === "edit";
                            const isPendingWon = isPending && (lead.pendingRequestType === "won" || lead.stage === "Closed Won");
                            const isWonApproved = lead.stage === "Closed Won" && !isPending;

                            let cardClass = "ems-lead-card";
                            if (isWonApproved) cardClass += " lead-card-won";
                            if (isPendingWon) cardClass += " lead-card-pending-approval";
                            if (isPendingEdit) cardClass += " lead-card-pending-edit";
                            if (isPendingDelete) cardClass += " lead-card-pending-delete";

                            return (
                              <div key={lead.id} className={cardClass}>
                                <div className="ems-lead-card-top">
                                  <div className="ems-lead-main-info">
                                    <h4 className="ems-lead-client">{lead.clientName}</h4>
                                    <span className="ems-lead-contact">{lead.contactPerson}</span>
                                  </div>
                                  <div className="ems-lead-top-actions-wrapper">
                                    <span
                                      className={`ems-stage-badge ${
                                        isPendingDelete
                                          ? "stage-danger"
                                          : isPendingEdit
                                          ? "stage-purple"
                                          : isPendingWon
                                          ? "stage-pending"
                                          : stageColors[lead.stage] || "stage-blue"
                                      }`}
                                    >
                                      {isPendingDelete
                                        ? "Deletion Pending Approval"
                                        : isPendingEdit
                                        ? "Edit Pending Approval"
                                        : isPendingWon
                                        ? "Awaiting Won Approval"
                                        : lead.stage}
                                    </span>
                                    <div className="ems-lead-card-actions">
                                      <button
                                        type="button"
                                        onClick={() => handleOpenEditLead(lead)}
                                        className="ems-lead-btn-action"
                                        title={isSupervisor ? "Edit Lead Opportunity" : "Edit Lead (Requires Supervisor Approval)"}
                                        aria-label="Edit Lead"
                                      >
                                        <Edit size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteLead(lead.id)}
                                        className="ems-lead-btn-action btn-danger"
                                        title={isSupervisor ? "Delete Lead Opportunity" : "Request Supervisor Approval to Delete"}
                                        aria-label="Delete Lead"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
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

                                {/* 1. Deletion Approval Notice */}
                                {isPendingDelete && (
                                  <div className="ems-intern-waiting-badge text-red-300 border-red-500/25 bg-red-500/10">
                                    <Clock size={12} className="text-red-400 flex-shrink-0" />
                                    <span>Deletion requested. Awaiting Supervisor ({currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) approval. Lead remains active until authorized.</span>
                                  </div>
                                )}

                                {/* 2. Edit Approval Notice */}
                                {isPendingEdit && (
                                  <div className="ems-lead-approval-panel panel-edit">
                                    <div className="ems-approval-panel-header">
                                      <div className="flex items-center gap-1.5">
                                        <Clock size={13} className="text-purple-400" />
                                        <span className="text-xs font-semibold text-white">Proposed Edits Pending Review</span>
                                      </div>
                                      <span className="ems-approval-edit-pill">Awaiting Sign-Off</span>
                                    </div>
                                    <div className="ems-pending-edit-diff">
                                      <div className="text-[11.5px] text-zinc-300">
                                        <strong>Proposed Changes:</strong> Client: &ldquo;{lead.pendingEditData?.clientName}&rdquo; · Value: <span className="text-emerald font-semibold">{lead.pendingEditData?.dealValue}</span> · Region: {lead.pendingEditData?.corridor} · Stage: {lead.pendingEditData?.stage}
                                      </div>
                                      {lead.pendingEditData?.notes && (
                                        <div className="text-[11px] text-zinc-400 italic mt-1">&ldquo;{lead.pendingEditData?.notes}&rdquo;</div>
                                      )}
                                    </div>
                                    <p className="ems-approval-panel-note">
                                      Submitted to Supervisor ({currentViewEmp.supervisorName || "Thimathi Dissanayaka"}). Lead will update automatically once signed off.
                                    </p>
                                  </div>
                                )}

                                {/* 3. Closed Won Approval Notice */}
                                {isPendingWon && (
                                  <div className="ems-lead-approval-panel">
                                    <div className="ems-approval-panel-header">
                                      <div className="flex items-center gap-1.5">
                                        <Clock size={13} className="text-amber-400" />
                                        <span className="text-xs font-semibold text-white">
                                          Closed Won Sign-Off Pending
                                        </span>
                                      </div>
                                      <span className="ems-approval-commission-pill">
                                        10% Commission: {formatLKR(parseDealValueToLKR(lead.dealValue) * 0.10)}
                                      </span>
                                    </div>
                                    <p className="ems-approval-panel-note">
                                      Submitted to Supervisor ({currentViewEmp.supervisorName || "Thimathi Dissanayaka"}). 10% commission will be credited upon supervisor approval.
                                    </p>
                                  </div>
                                )}

                                {/* 4. Complete Won Approved Banner */}
                                {isWonApproved && (
                                  <div className="ems-lead-verified-banner">
                                    <CheckCircle2 size={13} className="text-[#34d399] flex-shrink-0" />
                                    <span>Complete Won · Approved by {lead.approvedBy || "Thimathi Dissanayaka"} · 10% Commission Assigned</span>
                                  </div>
                                )}

                                <div className="ems-lead-footer">
                                  <div className="ems-lead-followup">
                                    <Clock size={12} className="text-[#a1a1aa]" />
                                    <span>{lead.nextFollowUp}</span>
                                  </div>

                                  <div className="ems-stage-control-group">
                                    <label htmlFor={`stage-select-${lead.id}`} className="ems-stage-select-label">
                                      Stage
                                    </label>
                                    <div className="ems-stage-dropdown-box">
                                      <select
                                        id={`stage-select-${lead.id}`}
                                        value={lead.stage}
                                        onChange={(e) =>
                                          handleSetLeadStage(lead.id, e.target.value as LeadPipelineItem["stage"])
                                        }
                                        className={`ems-stage-dropdown-menu ${
                                          isPendingWon
                                            ? "stage-pending"
                                            : stageColors[lead.stage] || "stage-blue"
                                        }`}
                                        title="Choose stage from dropdown menu"
                                      >
                                        <option value="New Lead">New Lead</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Demo Booked">Demo Booked</option>
                                        <option value="Proposal Sent">Proposal Sent</option>
                                        <option value="Closed Won">
                                          {isSupervisor
                                            ? "Closed Won ✓"
                                            : isPendingWon
                                            ? "Awaiting Supervisor Approval ⏳"
                                            : "Closed Won (Requires Approval)"}
                                        </option>
                                      </select>
                                      <ChevronDown size={13} className="ems-dropdown-arrow" />
                                    </div>
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
                                    {activeDayCompletedCount} of{" "}
                                    {Math.max(1, activeDayTotalCount)}
                                  </strong>
                                  <span className="ems-pct-sub">
                                    ({activeDayProgressPct}%)
                                  </span>
                                </div>
                              </div>
                              <div className="ems-progress-bar-wrap">
                                <div className="ems-bar-track">
                                  <div
                                    className="ems-bar-fill"
                                    style={{ width: `${activeDayProgressPct}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            {canAddTasksForShift ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setNewTaskDate(activeTaskDate !== "all" ? activeTaskDate : todayIsoDate);
                                  setShowAddTaskModal(true);
                                }}
                                className="ems-btn-primary"
                              >
                                <Plus size={14} /> Add Task
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTaskDate(todayIsoDate);
                                  setNewTaskDate(todayIsoDate);
                                  setShowAddTaskModal(true);
                                }}
                                className="ems-btn-secondary text-xs"
                                title="Past shifts are closed. Jump to today to add a task."
                              >
                                <Plus size={13} /> Add Task for Today
                              </button>
                            )}

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

                        {/* ── DAY-BY-DAY CALENDAR & WEEK STRIP ── */}
                        <div className="ems-day-nav-card">
                          <div className="ems-day-nav-header">
                            <div className="ems-day-title-wrap">
                              <Calendar size={16} className="text-[#ff5a36]" />
                              <span className="ems-day-title-text font-semibold text-white">
                                {formattedActiveTaskDay}
                              </span>
                              {activeTaskDate === todayIsoDate && (
                                <span className="ems-badge-today">Active Shift</span>
                              )}
                              {activeTaskDate !== "all" && activeTaskDate < todayIsoDate && (
                                <span className="ems-badge-past">Past Shift</span>
                              )}
                              {activeTaskDate !== "all" && activeTaskDate > todayIsoDate && (
                                <span className="ems-badge-future">Upcoming</span>
                              )}
                            </div>

                            <div className="ems-day-nav-actions">
                              <div className="ems-day-stepper">
                                <button
                                  type="button"
                                  onClick={() => navigateTaskDay(-1)}
                                  className="ems-stepper-btn"
                                  title="Previous Day"
                                >
                                  <ChevronLeft size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedTaskDate(todayIsoDate)}
                                  className={`ems-stepper-today-btn ${activeTaskDate === todayIsoDate ? "active" : ""}`}
                                >
                                  Today
                                </button>
                                <button
                                  type="button"
                                  onClick={() => navigateTaskDay(1)}
                                  className="ems-stepper-btn"
                                  title="Next Day"
                                >
                                  <ChevronRight size={14} />
                                </button>
                              </div>

                              <div className="ems-date-picker-wrap">
                                <input
                                  type="date"
                                  value={activeTaskDate !== "all" ? activeTaskDate : todayIsoDate}
                                  onChange={(e) => setSelectedTaskDate(e.target.value)}
                                  className="ems-date-input"
                                  title="Jump to date"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedTaskDate(activeTaskDate === "all" ? todayIsoDate : "all")}
                                className={`ems-all-days-btn ${activeTaskDate === "all" ? "active" : ""}`}
                              >
                                {activeTaskDate === "all" ? "Day View" : "All Days"}
                              </button>
                            </div>
                          </div>

                          {/* 7-Day Week Strip */}
                          <div className="ems-week-strip">
                            {taskWeekDays.map((d) => (
                              <button
                                key={d.iso}
                                type="button"
                                onClick={() => setSelectedTaskDate(d.iso)}
                                className={`ems-week-day-btn ${d.isSelected ? "selected" : ""} ${d.isToday ? "is-today" : ""}`}
                              >
                                <span className="ems-week-day-name">{d.dayShort}</span>
                                <span className="ems-week-day-num">{d.dayNum}</span>
                                <span className="ems-week-day-status">
                                  {d.total > 0 ? (
                                    d.completed === d.total ? (
                                      <span className="text-emerald font-semibold">Done</span>
                                    ) : (
                                      <span>{d.completed}/{d.total}</span>
                                    )
                                  ) : (
                                    <span className="text-zinc-600">—</span>
                                  )}
                                </span>
                              </button>
                            ))}
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
                              All Shifts ({activeDayTasks.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("morning")}
                              className={`ems-wf-filter-pill ${workflowFilter === "morning" ? "active" : ""}`}
                            >
                              Morning ({activeDayTasks.filter((c) => c.shiftBlock === "morning").length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("afternoon")}
                              className={`ems-wf-filter-pill ${workflowFilter === "afternoon" ? "active" : ""}`}
                            >
                              Afternoon ({activeDayTasks.filter((c) => c.shiftBlock === "afternoon").length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("eod")}
                              className={`ems-wf-filter-pill ${workflowFilter === "eod" ? "active" : ""}`}
                            >
                              EOD Wrap ({activeDayTasks.filter((c) => c.shiftBlock === "eod").length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("urgent")}
                              className={`ems-wf-filter-pill pill-urgent ${workflowFilter === "urgent" ? "active" : ""}`}
                            >
                              <AlertCircle size={12} /> Urgent ({activeDayTasks.filter((c) => c.priority === "urgent").length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("pending")}
                              className={`ems-wf-filter-pill ${workflowFilter === "pending" ? "active" : ""}`}
                            >
                              Pending ({activeDayTasks.filter((c) => !c.completed).length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setWorkflowFilter("completed")}
                              className={`ems-wf-filter-pill pill-completed ${workflowFilter === "completed" ? "active" : ""}`}
                            >
                              Completed ({activeDayCompletedCount})
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
                              title="Reset tasks to pending"
                            >
                              Reset
                            </button>
                            {pendingPastTasksCount > 0 && activeTaskDate !== "all" && (
                              <>
                                <span className="ems-sep-dot">·</span>
                                <button
                                  type="button"
                                  onClick={handleCarryForwardPendingTasks}
                                  className="ems-link-btn text-[#ff5a36] hover:underline"
                                  title={`Carry forward ${pendingPastTasksCount} incomplete task(s) from earlier days`}
                                >
                                  Carry Forward ({pendingPastTasksCount})
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* 3. Filtered Tasks List */}
                        {activeDayTasks.filter((item) => {
                          if (workflowFilter === "morning") return item.shiftBlock === "morning";
                          if (workflowFilter === "afternoon") return item.shiftBlock === "afternoon";
                          if (workflowFilter === "eod") return item.shiftBlock === "eod";
                          if (workflowFilter === "urgent") return item.priority === "urgent";
                          if (workflowFilter === "pending") return !item.completed;
                          if (workflowFilter === "completed") return item.completed;
                          return true;
                        }).length === 0 ? (
                          <div className="ems-workflow-empty-state">
                            <Calendar size={28} className="text-zinc-500 mb-2" />
                            <h4 className="text-white text-sm font-semibold m-0">
                              No Tasks for {formattedActiveTaskDay}
                            </h4>
                            <p className="text-xs text-[#a0a5a0] max-w-md text-center mt-1 mb-4">
                              {isPastShift && !isSupervisor
                                ? "This shift is closed. Employees cannot add tasks to past shifts."
                                : workflowFilter === "all"
                                ? "No tasks have been scheduled for this shift yet. Organize outreach, meetings, and follow-ups by adding a task."
                                : `No tasks match the "${workflowFilter}" filter on this day.`}
                            </p>
                            <div className="flex gap-2 items-center flex-wrap justify-center">
                              {canAddTasksForShift ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewTaskDate(activeTaskDate !== "all" ? activeTaskDate : todayIsoDate);
                                    setShowAddTaskModal(true);
                                  }}
                                  className="ems-btn-primary"
                                >
                                  <Plus size={13} /> Add Task for {activeTaskDate === todayIsoDate ? "Today" : activeTaskDate}
                                </button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                                    <Lock size={12} className="text-zinc-400" /> Past Shift Closed (Read-Only)
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedTaskDate(todayIsoDate)}
                                    className="ems-btn-primary text-xs"
                                  >
                                    View Today&apos;s Active Shift
                                  </button>
                                </div>
                              )}
                              {pendingPastTasksCount > 0 && activeTaskDate !== "all" && canAddTasksForShift && (
                                <button
                                  type="button"
                                  onClick={handleCarryForwardPendingTasks}
                                  className="ems-btn-secondary"
                                >
                                  <RotateCcw size={13} /> Carry Forward ({pendingPastTasksCount}) Pending
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="ems-checklist-list">
                            {activeDayTasks
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
                                      {activeTaskDate === "all" && item.date && (
                                        <span className="ems-time-badge tabular-nums">
                                          <Calendar size={11} /> {item.date}
                                        </span>
                                      )}
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
                        )}

                        {/* 4. Bottom EOD Operations Handover Bar */}
                        {(() => {
                          const activeShiftDateForEod = activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
                          const activeDayEodReport = (currentViewEmp.eodReports || []).find(
                            (r) => r.date === activeShiftDateForEod
                          );

                          if (activeDayEodReport && activeDayEodReport.status === "signed_off") {
                            return (
                              <div className="ems-eod-handover-banner border-emerald-500/30 bg-emerald-950/20">
                                <div className="ems-eod-banner-left">
                                  <div className="ems-eod-icon bg-emerald-500/10 text-emerald">
                                    <CheckCircle2 size={18} />
                                  </div>
                                  <div>
                                    <strong className="ems-eod-title text-emerald-300">
                                      EOD Shift Report Signed Off &amp; Authorized
                                    </strong>
                                    <p className="ems-eod-desc text-zinc-300">
                                      Verified by <strong>{activeDayEodReport.signedOffBy || currentViewEmp.supervisorName}</strong>
                                      {activeDayEodReport.signedOffAt ? ` (${activeDayEodReport.signedOffAt})` : ""}. 
                                      Deliverables: <strong>{activeDayEodReport.deliverablesCount}</strong> verified.
                                    </p>
                                  </div>
                                </div>
                                <div className="ems-eod-banner-right">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEodSummaryNotes(activeDayEodReport.accomplishments || "");
                                      setEodBlockersNotes(activeDayEodReport.blockers || "");
                                      setShowEodModal(true);
                                    }}
                                    className="ems-btn-secondary text-xs"
                                  >
                                    <FileText size={13} /> View / Update Report
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          if (activeDayEodReport && activeDayEodReport.status === "pending_review") {
                            return (
                              <div className="ems-eod-handover-banner border-amber-500/30 bg-amber-950/15">
                                <div className="ems-eod-banner-left">
                                  <div className="ems-eod-icon bg-amber-500/10 text-amber-400">
                                    <Clock size={18} />
                                  </div>
                                  <div>
                                    <strong className="ems-eod-title text-amber-300">
                                      EOD Shift Report Logged · Pending Supervisor Review
                                    </strong>
                                    <p className="ems-eod-desc text-zinc-300">
                                      Submitted at {activeDayEodReport.submittedAt} for{" "}
                                      <strong>
                                        {(currentViewEmp.supervisorName || "Thimathi Dissanayaka")
                                          .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                                          .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                                          .trim() || "Thimathi Dissanayaka"}
                                      </strong> (
                                      {activeDayEodReport.deliverablesCount} deliverables).
                                    </p>
                                  </div>
                                </div>
                                <div className="ems-eod-banner-right flex items-center gap-2">
                                  {isSupervisor && (
                                    <button
                                      type="button"
                                      onClick={() => handleSupervisorSignOffEodReport(currentViewEmp.id, activeDayEodReport.id)}
                                      className="ems-btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40"
                                    >
                                      <CheckCircle2 size={13} /> Sign-Off Now
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEodSummaryNotes(activeDayEodReport.accomplishments || "");
                                      setEodBlockersNotes(activeDayEodReport.blockers || "");
                                      setShowEodModal(true);
                                    }}
                                    className="ems-btn-secondary text-xs border-amber-500/30 text-amber-300"
                                  >
                                    <Edit size={13} /> Edit Report
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          return (
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
                                    Direct supervisor review with{" "}
                                    <strong>
                                      {(currentViewEmp.supervisorName || "Thimathi Dissanayaka")
                                        .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                                        .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                                        .trim() || "Thimathi Dissanayaka"}
                                    </strong>. 
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
                          );
                        })()}
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
                      <span className="ems-section-kicker">
                        {isSupervisor ? "Supervisor Evaluation Framework" : "Employee Performance Framework"}
                      </span>
                      <h2>
                        {isSupervisor
                          ? `KPI Performance Scoreboard: ${currentViewEmp.name}`
                          : "My Performance & KPI Scoreboard"}
                      </h2>
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
                                setKpiUpdateTargetVal(kpi.target);
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
                                <span className={`ems-role-tag role-${emp.role}`}>
                                  {emp.role === "employee" ? "INTERN" : emp.role.toUpperCase()}
                                </span>
                                <span className="ems-cell-desig">{emp.designation}</span>
                                <small className="text-white/50">{emp.department}</small>
                              </div>
                            </td>

                            <td>
                              <span className="ems-supervisor-cell">
                                {(emp.supervisorName || "")
                                  .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                                  .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                                  .trim() || (emp.role === "admin" ? "Board of Directors" : "Executive Directorate")}
                              </span>
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
                                  onClick={() => handleOpenEditProfile(emp)}
                                  className="ems-action-btn"
                                  title="Edit Employee Details"
                                >
                                  <Edit size={12} /> Edit
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
                {/* 1. Header Banner & Single Clean Punch Action */}
                <div className="ems-schedule-hero-banner">
                  <div className="ems-schedule-hero-left">
                    <span className="ems-section-kicker">Colombo Operations Schedule</span>
                    <h2 className="text-white text-lg font-bold">
                      Work Schedule &amp; Attendance Log: {currentViewEmp.name}
                    </h2>
                    <p className="text-xs text-[#a1a1aa]">
                      Standard Operating Shift: <strong>09:00 – 18:00 (Colombo · UTC+05:30)</strong> · Monday to Friday
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2.5 py-1 rounded bg-[#181c18] border border-[#262c26] text-white font-medium flex items-center gap-1.5">
                        <Clock size={12} className="text-[#a1a1aa]" />
                        <span>
                          {!todayAttendance
                            ? "Standby · Not Clocked In Today"
                            : isCurrentlyClockedIn
                            ? `Shift Active (${todayAttendance.workMode}) · In at ${todayAttendance.checkIn}`
                            : `Shift Completed · In: ${todayAttendance.checkIn} — Out: ${todayAttendance.checkOut}`}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="ems-schedule-hero-right">
                    <div className="ems-clock-box-neutral">
                      <Clock size={14} className="text-[#ff5a36]" />
                      <span className="tabular-nums">{liveClock24}</span>
                    </div>

                    {!isCurrentlyClockedIn && (
                      <select
                        value={clockInModeSelection}
                        onChange={(e) => setClockInModeSelection(e.target.value as any)}
                        className="bg-[#141814] text-xs text-white border border-[#2b332b] rounded px-2.5 py-2 focus:outline-none"
                      >
                        <option value="Remote">Remote</option>
                        <option value="Office (Rajagiriya)">Rajagiriya HQ</option>
                      </select>
                    )}

                    {!isCurrentlyClockedIn ? (
                      <button
                        type="button"
                        onClick={() => handleQuickAttendanceCheckIn(clockInModeSelection)}
                        className="ems-btn-primary py-2 px-4 text-xs font-semibold"
                      >
                        <LogIn size={14} />
                        <span>Clock IN</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRemoteClockOut}
                        className="ems-btn-secondary py-2 px-4 text-xs font-semibold border-[#ff5a36]/40 text-[#ff7a5c] hover:bg-[#ff5a36]/10"
                      >
                        <LogOut size={14} />
                        <span>Clock OUT</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Side-by-Side: Weekly Roster (Left) & Timesheet Summary (Right) */}
                <div className="ems-schedule-dual-grid">
                  {/* Left Column: Weekly Schedule */}
                  <div className="ems-schedule-card-panel">
                    <div>
                      <span className="ems-section-kicker">Weekly Cadence</span>
                      <h3 className="text-white text-sm font-bold">This Week&apos;s Operating Schedule</h3>
                      <p className="text-xs text-[#a1a1aa] mt-0.5">
                        Assigned schedule for {currentViewEmp.name} (40.0 hrs standard)
                      </p>
                    </div>

                    <div className="space-y-2">
                      {weekData.days.map((day) => (
                        <div
                          key={day.dayName}
                          className={`ems-schedule-day-row ${day.isToday ? "is-today" : ""}`}
                        >
                          <div className="ems-day-info">
                            <span className={`ems-day-title ${day.isToday ? "text-[#ff7a5c]" : ""}`}>
                              {day.dayName} {day.isToday && "(Today)"}
                            </span>
                            <span className="ems-mode-pill-neutral">{day.mode}</span>
                          </div>
                          <span className="text-xs text-[#a1a1aa] font-mono">09:00 – 18:00</span>
                          <span
                            className={`text-xs ${
                              day.isActiveNow
                                ? "text-[#ff7a5c] font-semibold"
                                : day.isToday
                                ? "text-white font-medium"
                                : "text-white"
                            }`}
                          >
                            {day.statusText}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Timesheet Metrics & Policy */}
                  <div className="ems-schedule-card-panel">
                    <div>
                      <span className="ems-section-kicker">Overview</span>
                      <h3 className="text-white text-sm font-bold">Shift &amp; Attendance Metrics</h3>
                      <p className="text-xs text-[#a1a1aa] mt-0.5">
                        Current monthly verification status
                      </p>
                    </div>

                    <div className="ems-schedule-summary-box">
                      <span className="ems-summary-label">Total Hours This Week</span>
                      <span className="ems-summary-value tabular-nums">{weekData.totalHours.toFixed(1)} hrs</span>
                      <span className="ems-summary-sub">
                        Standard 40.0 hrs target met ({Math.min(100, Math.round((weekData.totalHours / 40.0) * 100))}%)
                      </span>
                    </div>

                    <div className="ems-schedule-summary-box">
                      <span className="ems-summary-label">Punctuality Rate</span>
                      <span className="ems-summary-value">{weekData.punctualityRate}% On-Time</span>
                      <span className="ems-summary-sub">
                        {weekData.tardiesCount === 0
                          ? "All shifts within grace window · 0 Tardies"
                          : `${weekData.tardiesCount} Late arrivals logged`}
                      </span>
                    </div>

                    <div className="ems-schedule-summary-box">
                      <span className="ems-summary-label">Workplace Standards</span>
                      <span className="text-xs text-white font-medium leading-relaxed mt-1">
                        • 15-minute grace window until 09:15 AM Colombo time
                      </span>
                      <span className="text-xs text-[#a1a1aa] leading-relaxed">
                        • Daily EOD sign-off submitted before 18:00
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Verified Attendance History Table */}
                <div className="ems-card ems-attendance-table-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <span className="ems-section-kicker">Activity Log</span>
                      <h3 className="text-base font-bold text-white">
                        Timesheet History: {currentViewEmp.name}
                      </h3>
                      <p className="text-xs text-[#a1a1aa] mt-0.5">
                        Cryptographically verified timestamps for shifts and check-ins
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#141814] p-1 border border-[#2b332b] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setAttendanceFilter("all")}
                        className={`text-xs px-2.5 py-1 rounded transition-colors ${
                          attendanceFilter === "all"
                            ? "bg-[#ff5a36] text-white font-semibold"
                            : "text-[#a0a5a0] hover:text-white"
                        }`}
                      >
                        All ({currentViewEmp.attendance.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendanceFilter("Remote")}
                        className={`text-xs px-2.5 py-1 rounded transition-colors ${
                          attendanceFilter === "Remote"
                            ? "bg-[#ff5a36] text-white font-semibold"
                            : "text-[#a0a5a0] hover:text-white"
                        }`}
                      >
                        Remote
                      </button>
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="text-xs px-2.5 py-1 rounded transition-colors text-[#71717a] opacity-50 cursor-not-allowed pointer-events-none select-none"
                        title="Office HQ (Access Disabled)"
                      >
                        Office HQ
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="ems-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Shift Window</th>
                          <th>Check-In</th>
                          <th>Check-Out</th>
                          <th>Total Hours</th>
                          <th>Location</th>
                          <th>Punctuality</th>
                          <th>Supervisor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttendance.map((rec, i) => (
                          <tr key={i}>
                            <td>
                              <strong className="text-white">{rec.date}</strong>
                            </td>
                            <td className="text-xs text-[#a1a1aa]">09:00 – 18:00</td>
                            <td className="font-mono text-white font-medium">{rec.checkIn}</td>
                            <td className="font-mono text-white">
                              {rec.checkOut === "Active" ? (
                                <span className="text-[#ff7a5c] font-semibold">Active Shift</span>
                              ) : (
                                rec.checkOut
                              )}
                            </td>
                            <td className="font-mono text-xs text-[#a1a1aa]">
                              {rec.checkOut === "Active"
                                ? "In Progress"
                                : (() => {
                                    const inM = parseTimeToMinutes(rec.checkIn);
                                    const outM = parseTimeToMinutes(rec.checkOut);
                                    const diff = Math.max(0, outM - inM);
                                    const h = Math.floor(diff / 60);
                                    const m = diff % 60;
                                    return `${h}h ${String(m).padStart(2, "0")}m`;
                                  })()}
                            </td>
                            <td>
                              <span className="ems-workmode-tag">{rec.workMode}</span>
                            </td>
                            <td>
                              <span
                                className={`text-xs px-2 py-0.5 rounded border font-medium ${
                                  rec.status === "late"
                                    ? "bg-amber-950/40 border-amber-500/30 text-amber-300"
                                    : "bg-[#1b201b] border-[#2b332b] text-white"
                                }`}
                              >
                                {rec.status === "late" ? "Late Check-in" : "On-Time ✓"}
                              </span>
                            </td>
                            <td className="text-xs text-[#71717a]">
                              {currentViewEmp.supervisorName || "Thimathi D."} ✓
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
              <div className="ems-modal-title-with-icon">
                <Target size={18} className="text-[#ff5a36]" />
                <h3>{isSupervisor ? "Assign Target & Progress" : `Update Progress: ${showUpdateKpiModal.kpi.title}`}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUpdateKpiModal(null)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateKpiProgress} className="ems-modal-form">
              <div className="p-2.5 rounded bg-[#141814] border border-white/10 mb-3 text-xs">
                <div className="text-[10px] uppercase font-semibold text-[#a1a1aa] tracking-wider">Indicator</div>
                <div className="text-white font-semibold mt-0.5">{showUpdateKpiModal.kpi.title}</div>
                <div className="text-[#71717a] mt-0.5">
                  Unit: {showUpdateKpiModal.kpi.unit || "Units"} · Target intern: {currentViewEmp.name}
                </div>
              </div>

              {isSupervisor && (
                <div className="ems-form-group">
                  <label>
                    Target Value ({showUpdateKpiModal.kpi.unit || "Units"}) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={kpiUpdateTargetVal || showUpdateKpiModal.kpi.target}
                    onChange={(e) => setKpiUpdateTargetVal(Math.max(1, Number(e.target.value)))}
                    className="ems-input"
                  />
                  <small className="text-[#71717a] text-[11px] block mt-1">
                    Supervisor assigned benchmark target for this sprint cycle.
                  </small>
                </div>
              )}

              <div className="ems-form-group">
                <label>
                  Current Progress ({showUpdateKpiModal.kpi.unit || "Units"}) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    required
                    value={kpiUpdateVal}
                    onChange={(e) => setKpiUpdateVal(Math.max(0, Number(e.target.value)))}
                    className="ems-input flex-1"
                  />
                  {isSupervisor && (
                    <button
                      type="button"
                      onClick={() => setKpiUpdateVal(0)}
                      className="ems-btn-secondary px-2.5 text-xs text-[#a1a1aa] hover:text-white"
                      title="Reset current progress to 0"
                    >
                      <RotateCcw size={11} className="inline mr-1" /> Reset to 0
                    </button>
                  )}
                </div>
              </div>

              <div className="ems-modal-actions mt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateKpiModal(null)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  {isSupervisor ? "Save & Assign Target" : "Save Progress"}
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
          MODAL: EDIT B2B LEAD (BDI PIPELINE)
      ───────────────────────────────────────────────────────────── */}
      {showEditLeadModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowEditLeadModal(false)}>
          <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div className="ems-modal-title-with-icon">
                <Edit size={18} className="text-[#ff5a36]" />
                <h3>{isSupervisor ? "Edit B2B Sales Opportunity" : "Request Edit: Sales Opportunity"}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditLeadModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditLead} className="ems-modal-form">
              {!isSupervisor && (
                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-md flex items-center gap-2 mb-3">
                  <ShieldAlert size={15} className="text-amber-400 flex-shrink-0" />
                  <span>
                    As an intern, your submitted edits will be dispatched to Supervisor ({currentViewEmp.supervisorName || "Thimathi Dissanayaka"}) for approval before taking effect.
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
                    value={editLeadClient}
                    onChange={(e) => setEditLeadClient(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Contact Person &amp; Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rohan Jayasuriya (CTO)"
                    value={editLeadContact}
                    onChange={(e) => setEditLeadContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Acquisition Channel</label>
                  <select
                    value={editLeadChannel}
                    onChange={(e) => setEditLeadChannel(e.target.value as LeadPipelineItem["channel"])}
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
                    value={editLeadCorridor}
                    onChange={(e) => setEditLeadCorridor(e.target.value as LeadPipelineItem["corridor"])}
                  >
                    <option value="Sri Lanka SME">Sri Lanka Enterprise &amp; SME</option>
                    <option value="Australia">Australia Nearshore (Sydney / Melbourne)</option>
                    <option value="United Kingdom">United Kingdom (London / FinTech)</option>
                    <option value="Global">Global / US Corridor</option>
                  </select>
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Estimated Sprint Deal Value</label>
                  <input
                    type="text"
                    placeholder="e.g. LKR 850,000 or AUD 4,200"
                    value={editLeadValue}
                    onChange={(e) => setEditLeadValue(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Pipeline Stage</label>
                  <select
                    value={editLeadStage}
                    onChange={(e) => setEditLeadStage(e.target.value as LeadPipelineItem["stage"])}
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Demo Booked">Demo Booked</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Won">
                      {isSupervisor ? "Closed Won (Approved 10% Incentive)" : "Closed Won (Requests Supervisor Sign-Off)"}
                    </option>
                  </select>
                </div>
              </div>

              <div className="ems-form-group">
                <label>Next Follow-Up / Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. Tomorrow · Follow-up Call or Today · Pending Outreach"
                  value={editLeadFollowUp}
                  onChange={(e) => setEditLeadFollowUp(e.target.value)}
                />
              </div>

              <div className="ems-form-group">
                <label>Lead Notes &amp; Pain Points</label>
                <textarea
                  rows={2}
                  placeholder="Brief client context, tech stack requirements, or scheduled talk track..."
                  value={editLeadNotes}
                  onChange={(e) => setEditLeadNotes(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEditLeadModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  {isSupervisor ? "Save Changes" : "Submit Edits for Supervisor Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT EMPLOYEE PROFILE (REALTIME SYNC)
      ───────────────────────────────────────────────────────────── */}
      {showEditProfileModal && (
        <div className="ems-modal-backdrop" onClick={() => setShowEditProfileModal(false)}>
          <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div className="ems-modal-title-with-icon">
                <Edit size={18} className="text-[#ff5a36]" />
                <h3>Edit Employee Profile Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="ems-modal-close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditProfile} className="ems-modal-form">
              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editProfileName}
                    onChange={(e) => setEditProfileName(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Designation / Role Title *</label>
                  <input
                    type="text"
                    required
                    value={editProfileDesignation}
                    onChange={(e) => setEditProfileDesignation(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={editProfileDepartment}
                    onChange={(e) => setEditProfileDepartment(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Direct Supervisor(s)</label>
                  <input
                    type="text"
                    value={editProfileSupervisor}
                    onChange={(e) => setEditProfileSupervisor(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Work Location &amp; Hours</label>
                  <input
                    type="text"
                    value={editProfileWorkLocation}
                    onChange={(e) => setEditProfileWorkLocation(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    value={editProfilePhone}
                    onChange={(e) => setEditProfilePhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-grid-2">
                <div className="ems-form-group">
                  <label>Contract Agreement</label>
                  <input
                    type="text"
                    value={editProfileContract}
                    onChange={(e) => setEditProfileContract(e.target.value)}
                  />
                </div>
                <div className="ems-form-group">
                  <label>Assigned Corridors / Territory</label>
                  <input
                    type="text"
                    value={editProfileTerritory}
                    onChange={(e) => setEditProfileTerritory(e.target.value)}
                  />
                </div>
              </div>

              <div className="ems-form-group">
                <label>Operational Focus / Bio</label>
                <textarea
                  rows={2}
                  placeholder="Responsibilities, current mission, or key focus areas..."
                  value={editProfileBio}
                  onChange={(e) => setEditProfileBio(e.target.value)}
                />
              </div>

              <div className="ems-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="ems-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="ems-btn-primary">
                  Save &amp; Sync to Database
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

              <div className="ems-form-group">
                <label className="flex items-center justify-between">
                  <span>Scheduled Shift Date *</span>
                  {!isSupervisor && (
                    <span className="text-[10px] text-zinc-400 font-normal">Past dates restricted for employees</span>
                  )}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    required
                    min={!isSupervisor ? todayIsoDate : undefined}
                    value={
                      newTaskDate ||
                      (!isSupervisor && activeTaskDate < todayIsoDate
                        ? todayIsoDate
                        : (activeTaskDate !== "all" ? activeTaskDate : todayIsoDate))
                    }
                    onChange={(e) => {
                      if (!isSupervisor && e.target.value < todayIsoDate) {
                        showToast("Employees cannot select past dates for new tasks.");
                        setNewTaskDate(todayIsoDate);
                      } else {
                        setNewTaskDate(e.target.value);
                      }
                    }}
                    className="ems-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setNewTaskDate(todayIsoDate)}
                    className="ems-btn-secondary px-3 py-1.5 text-xs whitespace-nowrap"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      setNewTaskDate(formatLocalDate(tomorrow));
                    }}
                    className="ems-btn-secondary px-3 py-1.5 text-xs whitespace-nowrap"
                  >
                    Tomorrow
                  </button>
                </div>
                {!isSupervisor && (
                  <small className="text-[#71717a] text-[11px] block mt-1">
                    Employees can only schedule tasks for the active shift today or upcoming future dates.
                  </small>
                )}
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
                    <option value="Client Meeting">Client Meeting</option>
                    <option value="Client Call">Executive Client Call</option>
                    <option value="Research">Market Intel &amp; Research</option>
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
                  <span className="lbl">Shift Date</span>
                  <strong className="val text-white tabular-nums">
                    {activeTaskDate !== "all" ? activeTaskDate : todayIsoDate}
                  </strong>
                  <small>Active Shift Reporting</small>
                </div>
                <div className="ems-eod-stat-box">
                  <span className="lbl">Deliverables Verified</span>
                  <strong className="val text-emerald tabular-nums">
                    {(currentViewEmp.checklist || []).filter((c) => {
                      const d = c.date || todayIsoDate;
                      const target = activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
                      return c.completed && d === target;
                    }).length} /{" "}
                    {(currentViewEmp.checklist || []).filter((c) => {
                      const d = c.date || todayIsoDate;
                      const target = activeTaskDate !== "all" ? activeTaskDate : todayIsoDate;
                      return d === target;
                    }).length}
                  </strong>
                  <small>Tasks Completed For Shift</small>
                </div>
                <div className="ems-eod-stat-box">
                  <span className="lbl">Assigned Reviewers</span>
                  <strong className="val text-white">
                    {(currentViewEmp.supervisorName || "Thimathi Dissanayaka")
                      .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
                      .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
                      .trim() || "Strategic Leadership"}
                  </strong>
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
                  value={eodBlockersNotes}
                  onChange={(e) => setEodBlockersNotes(e.target.value)}
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

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUPERVISOR RESET INTERN DATA
      ───────────────────────────────────────────────────────────── */}
      {showResetInternModal && (() => {
        const modalTargetIntern =
          employees.find((e) => e.id === resetTargetEmpId) ||
          employees.find((e) => e.role === "employee") ||
          employees.find((e) => e.id === "emp-bdi-001") ||
          currentViewEmp;
        const candidateInterns = employees.filter((e) => e.role === "employee");

        return (
          <div className="ems-modal-backdrop" onClick={() => setShowResetInternModal(false)}>
            <div className="ems-modal-card modal-md" onClick={(e) => e.stopPropagation()}>
              <div className="ems-modal-header">
                <div className="ems-modal-title-with-icon">
                  <RotateCcw size={18} className="text-[#ff5a36]" />
                  <h3>Supervisor Control: Reset Intern Sprint Data</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResetInternModal(false)}
                  className="ems-modal-close"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={(e) => handleSupervisorResetSubmit(e, false)} className="ems-modal-form">
                {/* Target Supervised Intern Banner / Selector */}
                <div className="p-3 rounded-lg bg-[#141814] border border-white/10 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Supervised Intern Target</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {modalTargetIntern.name} <span className="font-mono text-xs text-zinc-400">({modalTargetIntern.employeeId})</span>
                    </div>
                    <div className="text-xs text-[#71717a] mt-0.5">{modalTargetIntern.designation}</div>
                  </div>
                  {candidateInterns.length > 1 ? (
                    <select
                      value={modalTargetIntern.id}
                      onChange={(e) => setResetTargetEmpId(e.target.value)}
                      className="bg-[#1b201b] border border-white/15 text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    >
                      {candidateInterns.map((ci) => (
                        <option key={ci.id} value={ci.id}>
                          {ci.name} ({ci.employeeId})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium">
                      Active Intern
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#a0a5a0] mb-3 leading-relaxed">
                  As supervisor, you can reset sprint metrics, sales leads, or daily tasks for{" "}
                  <strong className="text-white">{modalTargetIntern.name}</strong> ({modalTargetIntern.employeeId}) to prepare for a new month or sprint cycle.
                </p>

                <div className="ems-form-group">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-white">
                    <input
                      type="checkbox"
                      checked={resetOptionKpis}
                      onChange={(e) => setResetOptionKpis(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-900 text-[#ff5a36] focus:ring-0"
                    />
                    <span>Reset Monthly KPI Metrics (Leads Logged &amp; Demos Scheduled to 0)</span>
                  </label>
                  <small className="text-[#71717a] text-xs block pl-6">
                    Sets Monthly Leads Logged to 0 and Discovery Demos Scheduled to 0 for {modalTargetIntern.name}.
                  </small>
                  {resetOptionKpis && (
                    <div className="pl-6 pt-3 pb-1">
                      <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Assign New Sprint Targets (Optional)
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                            Monthly Leads Target
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={resetLeadsTarget}
                            onChange={(e) => setResetLeadsTarget(Math.max(1, Number(e.target.value)))}
                            className="bg-[#1b201b] border border-white/15 text-white text-xs rounded px-2.5 py-1.5 w-full focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                            Discovery Demos Target
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={resetDemosTarget}
                            onChange={(e) => setResetDemosTarget(Math.max(1, Number(e.target.value)))}
                            className="bg-[#1b201b] border border-white/15 text-white text-xs rounded px-2.5 py-1.5 w-full focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ems-form-group">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-white">
                    <input
                      type="checkbox"
                      checked={resetOptionPipeline}
                      onChange={(e) => setResetOptionPipeline(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-900 text-[#ff5a36] focus:ring-0"
                    />
                    <span>Reset B2B Sales Pipeline (Set Active Pipeline Value &amp; Incentive to LKR 0)</span>
                  </label>
                  <small className="text-[#71717a] text-xs block pl-6">
                    Clears all current pipeline leads for {modalTargetIntern.name}, resetting pipeline value and incentive commissions to 0.
                  </small>
                </div>

                <div className="ems-form-group">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-white">
                    <input
                      type="checkbox"
                      checked={resetOptionChecklist}
                      onChange={(e) => setResetOptionChecklist(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-900 text-[#ff5a36] focus:ring-0"
                    />
                    <span>Reset Daily Outreach Tasks Checklist</span>
                  </label>
                  <small className="text-[#71717a] text-xs block pl-6">
                    Marks all daily tasks as uncompleted for a fresh shift.
                  </small>
                </div>

                <div className="ems-modal-actions mt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleSupervisorResetSubmit(undefined, true)}
                    className="ems-btn-secondary border-red-500/40 text-red-400 hover:bg-red-500/10"
                  >
                    Full Reset (All to 0)
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowResetInternModal(false)}
                      className="ems-btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="ems-btn-primary">
                      Apply Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

