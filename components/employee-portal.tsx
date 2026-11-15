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
  RotateCcw,
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
  const [newTaskCategory, setNewTaskCategory] = useState<DailyChecklistItem["category"]>("Outreach");
  const [newTaskPriority, setNewTaskPriority] = useState<"urgent" | "high" | "normal">("normal");
  const [newTaskShift, setNewTaskShift] = useState<"morning" | "afternoon" | "eod">("morning");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [workflowFilter, setWorkflowFilter] = useState<"all" | "morning" | "afternoon" | "eod" | "urgent" | "pending" | "completed">("all");
  const [showEodModal, setShowEodModal] = useState(false);
  const [eodSummaryNotes, setEodSummaryNotes] = useState("");

  // ── Supervisor Reset Intern Data State
  const [showResetInternModal, setShowResetInternModal] = useState(false);
  const [resetOptionKpis, setResetOptionKpis] = useState(true);
  const [resetOptionPipeline, setResetOptionPipeline] = useState(true);
  const [resetOptionChecklist, setResetOptionChecklist] = useState(true);

  const handleCopyScript = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 2500);
      showToast("Sales pitch script copied to clipboard!");
    }
  };

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
                  approvedBy: session?.employee.name || "Supervisor Dinithi Perera",
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
        `Lead "${advancedLeadName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Dinithi Perera"}) for Closed Won sign-off! 10% commission (${formatLKR(commissionLKR)}) will be assigned upon approval.`
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
                  approvedBy: session?.employee.name || "Supervisor Dinithi Perera",
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
        `Lead "${clientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Dinithi Perera"}) for sign-off! 10% commission (${formatLKR(commissionLKR)}) will be assigned once approved.`
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
              approvedBy: session?.employee.name || "Supervisor Dinithi Perera",
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
              approvedBy: session?.employee.name || "Supervisor Dinithi Perera",
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
              approvedBy: session?.employee.name || "Supervisor Dinithi Perera",
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
        `Proposed edits for "${updatedClientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Dinithi Perera"}) for approval!`
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
        `Deletion request for "${clientName}" submitted to Supervisor (${currentViewEmp.supervisorName || "Dinithi Perera"}) for approval.`
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

  // ── Remote Attendance Clock IN
  const handleRemoteClockIn = () => {
    lastLocalActionRef.current = Date.now();
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours24}:${mins}`;
    const dateStr = now.toISOString().split("T")[0];

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
    showToast(`Remote Clock-IN verified at ${timeStr} for ${currentViewEmp.name}.`);
  };

  // ── Remote Attendance Clock OUT
  const handleRemoteClockOut = () => {
    lastLocalActionRef.current = Date.now();
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours24}:${mins}`;
    const dateStr = now.toISOString().split("T")[0];

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
    showToast(`Remote Clock-OUT logged at ${timeStr}. Shift completed.`);
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
      const dateStr = now.toISOString().split("T")[0];
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
      showToast(`Recorded attendance (${mode}) at ${timeStr}.`);
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
          setEmployees(remoteEmployees);
          try {
            localStorage.setItem("creativex_ems_employees_v4", JSON.stringify(remoteEmployees));
          } catch {}

          // Refresh session employee if profile data was updated in Supabase
          setSession((prev) => {
            if (!prev) return null;
            const updatedSelf = remoteEmployees.find((e) => e.id === prev.employee.id);
            return updatedSelf ? { ...prev, employee: updatedSelf } : prev;
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
            setEmployees(parsed);
          }
        } catch {}
      }
    };

    const handleCustomLocalSync = (e: Event) => {
      const customEvent = e as CustomEvent<Employee[]>;
      if (Array.isArray(customEvent.detail)) {
        setEmployees(customEvent.detail);
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
      showToast(`Logged in as ${res.session.employee.name} (${res.session.role.toUpperCase()})`);
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

  const todayIsoDate = currentClock.toISOString().split("T")[0];
  const todayAttendance = currentViewEmp?.attendance?.find((a) => a.date === todayIsoDate);
  const isCurrentlyClockedIn = Boolean(
    todayAttendance && (todayAttendance.checkOut === "Active" || !todayAttendance.checkOut || todayAttendance.checkOut === "")
  );
  const isShiftCompletedToday = Boolean(
    todayAttendance && todayAttendance.checkOut && todayAttendance.checkOut !== "Active"
  );

  // Supervisor Quick Reset for single KPI to 0
  const handleResetKpiToZero = (kpiId: string, kpiName: string) => {
    if (!confirm(`Supervisor Confirmation: Reset "${kpiName}" count to 0 for ${currentViewEmp.name}?`)) {
      return;
    }
    lastLocalActionRef.current = Date.now();
    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        const nextKpis = emp.kpis.map((k) => {
          if (k.id === kpiId) {
            return {
              ...k,
              current: 0,
              status: "needs_attention" as const,
              notes: `Reset to 0 by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
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
    showToast(`Supervisor reset "${kpiName}" to 0 for ${currentViewEmp.name}.`);
  };

  // Supervisor Quick Reset for all pipeline deals to 0
  const handleResetPipelineDeals = () => {
    if (!confirm(`Supervisor Confirmation: Clear all pipeline deals for ${currentViewEmp.name} and reset pipeline value to LKR 0?`)) {
      return;
    }
    lastLocalActionRef.current = Date.now();
    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        return { ...emp, leads: [] };
      }
      return emp;
    });

    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Supervisor cleared all pipeline deals for ${currentViewEmp.name}.`);
  };

  // Supervisor Comprehensive Reset Modal Action
  const handleSupervisorResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lastLocalActionRef.current = Date.now();

    const updated = employees.map((emp) => {
      if (emp.id === currentViewEmp.id) {
        let nextEmp = { ...emp };

        if (resetOptionKpis) {
          nextEmp.kpis = emp.kpis.map((k) => {
            if (k.id === "kpi-bdi-1" || k.id === "kpi-bdi-2") {
              return {
                ...k,
                current: 0,
                status: "needs_attention" as const,
                notes: `Sprint metrics reset to 0 by supervisor ${session?.employee?.name || "Supervisor"} on ${new Date().toLocaleDateString()}.`,
              };
            }
            return k;
          });
        }

        if (resetOptionPipeline) {
          nextEmp.leads = [];
        }

        if (resetOptionChecklist) {
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
    showToast(`Supervisor successfully reset sprint data for ${currentViewEmp.name}.`);
  };

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
                    <ShieldCheck size={14} className={allSupervisedPendingApprovals.length > 0 ? "text-amber-400" : "text-emerald"} />
                    <span>Supervisor Approvals</span>
                    {allSupervisedPendingApprovals.length > 0 ? (
                      <span className="ems-count-pill border-amber-500/40 text-amber-300 bg-amber-500/10">
                        {allSupervisedPendingApprovals.length} Pending
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
                      {employees.map((emp) => (
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
                    </div>

                    <div className="ems-profile-hero-meta">
                      <div className="ems-title-row">
                        <h2>{currentViewEmp.name}</h2>
                        <span className="ems-badge-emp-id">{currentViewEmp.employeeId}</span>
                        <span className={`ems-status-tag tag-${currentViewEmp.status}`}>
                          {currentViewEmp.status === "active" ? "ACTIVE · HIGH VELOCITY" : currentViewEmp.status.toUpperCase()}
                        </span>
                        {(isAdmin || isSupervisor || session?.employee.id === currentViewEmp.id) && (
                          <button
                            type="button"
                            onClick={() => handleOpenEditProfile(currentViewEmp)}
                            className="ems-profile-edit-trigger"
                            title="Edit Employee Profile Details"
                          >
                            <Edit size={12} /> Edit Profile
                          </button>
                        )}
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
                   SUPERVISOR MANAGEMENT WORKSPACE & INTERN APPROVAL CENTER
                ───────────────────────────────────────────────────────────── */}
                {currentViewEmp.role === "supervisor" && (
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
                          <span className="text-[11px] text-[#71717a] mt-1 block">Kavindu Senanayake (CX-EMP-041)</span>
                        </div>
                      </div>

                      <div className="ems-bdi-stat-card">
                        <div className="ems-stat-icon-wrap icon-blue">
                          <ShieldAlert size={18} />
                        </div>
                        <div className="ems-stat-info">
                          <div className="ems-card-header-row">
                            <span className="ems-stat-label">Intern Sign-Offs Pending</span>
                            {allSupervisedPendingApprovals.length > 0 && (
                              <span className="ems-badge-pending-count">
                                {allSupervisedPendingApprovals.length} Action{allSupervisedPendingApprovals.length === 1 ? "" : "s"}
                              </span>
                            )}
                          </div>
                          <div className="ems-stat-val-row">
                            <strong className={`ems-stat-val tabular-nums ${allSupervisedPendingApprovals.length > 0 ? "text-amber-400" : "text-emerald"}`}>
                              {allSupervisedPendingApprovals.length}
                            </strong>
                            <span className="ems-stat-target">
                              {allSupervisedPendingApprovals.length === 0 ? "All requests cleared" : "Requires Authorization"}
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
                            <span className={`ems-count-pill ${allSupervisedPendingApprovals.length > 0 ? "border-amber-500/40 text-amber-300 bg-amber-500/10" : "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"}`}>
                              {allSupervisedPendingApprovals.length} Pending
                            </span>
                          </div>
                          <p className="ems-subview-desc">
                            Review and authorize Closed Won deals, proposed edits, and deletion requests submitted by supervised Business Development Interns.
                          </p>
                        </div>
                        <div className="ems-pipeline-header-actions">
                          <button
                            type="button"
                            onClick={() => setShowResetInternModal(true)}
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

                      {allSupervisedPendingApprovals.length === 0 ? (
                        <div className="ems-approvals-empty-card">
                          <CheckCircle2 size={36} className="text-emerald" />
                          <h4 className="text-white text-sm font-semibold mt-3 mb-1">All Intern Requests Cleared</h4>
                          <p className="text-xs text-[#a0a5a0] max-w-md text-center m-0">
                            There are no pending Closed Won deals, proposed edits, or deletion requests awaiting supervisor authorization. Any new intern submissions will appear here for review.
                          </p>
                        </div>
                      ) : (
                        <div className="ems-supervisor-approvals-grid">
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
                              <div className="ems-avatar-initials text-xs">KS</div>
                            </div>
                            <div>
                              <h4 className="text-white text-sm font-semibold m-0">Kavindu Senanayake</h4>
                              <p className="text-xs text-[#a1a1aa] m-0">
                                CX-EMP-041 · Business Development Intern (IT &amp; Software Products)
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
                              <button
                                type="button"
                                onClick={() => handleResetKpiToZero(kpiLeads?.id || "kpi-bdi-1", "Monthly Leads Logged")}
                                className="ems-card-reset-btn"
                                title="Supervisor: Reset count to 0"
                              >
                                <RotateCcw size={10} /> Reset
                              </button>
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
                              <button
                                type="button"
                                onClick={() => handleResetKpiToZero(kpiDemos?.id || "kpi-bdi-2", "Discovery Demos Scheduled")}
                                className="ems-card-reset-btn"
                                title="Supervisor: Reset count to 0"
                              >
                                <RotateCcw size={10} /> Reset
                              </button>
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

                      <button
                        type="button"
                        onClick={() => setBdiSubTab("playbook")}
                        className={`ems-subnav-btn ${bdiSubTab === "playbook" ? "active" : ""}`}
                      >
                        <BookOpen size={15} />
                        <span>Sales Playbook &amp; Pitch Scripts</span>
                        <span className="ems-count-pill">{DEFAULT_SALES_SCRIPTS.length}</span>
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
                                    <span>Deletion requested. Awaiting Supervisor ({currentViewEmp.supervisorName || "Dinithi Perera"}) approval. Lead remains active until authorized.</span>
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
                                      Submitted to Supervisor ({currentViewEmp.supervisorName || "Dinithi Perera"}). Lead will update automatically once signed off.
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
                                      Submitted to Supervisor ({currentViewEmp.supervisorName || "Dinithi Perera"}). 10% commission will be credited upon supervisor approval.
                                    </p>
                                  </div>
                                )}

                                {/* 4. Complete Won Approved Banner */}
                                {isWonApproved && (
                                  <div className="ems-lead-verified-banner">
                                    <CheckCircle2 size={13} className="text-[#34d399] flex-shrink-0" />
                                    <span>Complete Won · Approved by {lead.approvedBy || "Dinithi Perera"} · 10% Commission Assigned</span>
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
                {/* Remote Attendance Punch Card */}
                <div className="ems-card ems-remote-attendance-card">
                  <div className="ems-remote-punch-header">
                    <div>
                      <span className="ems-section-kicker">Remote Attendance Method</span>
                      <h3 className="text-white text-base font-semibold">Remote Shift Check-In &amp; Check-Out</h3>
                      <p className="text-xs text-[#a0a5a0] mt-1">
                        Operating Shift: <strong>09:00 – 18:00 (Colombo Time · UTC+05:30)</strong>. Timestamps are verified and saved into Supabase.
                      </p>
                    </div>
                    <div className="ems-remote-time-badge">
                      <Clock size={16} className="text-[#ff5a36]" />
                      <span className="font-mono text-lg font-bold text-white tabular-nums">{liveClock24}</span>
                      <span className="text-xs text-[#71717a]">24H Live</span>
                    </div>
                  </div>

                  <div className="ems-remote-punch-body">
                    <div className="ems-punch-status-block">
                      <span className="text-xs text-[#71717a] uppercase font-semibold tracking-wider">Today&apos;s Remote Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        <strong className="text-sm text-white">
                          {!todayAttendance
                            ? "Not Clocked In Today"
                            : isCurrentlyClockedIn
                            ? `Remote Shift Active · In at ${todayAttendance.checkIn}`
                            : `Remote Shift Completed · In: ${todayAttendance.checkIn} — Out: ${todayAttendance.checkOut}`}
                        </strong>
                      </div>
                    </div>

                    <div className="ems-punch-actions-block">
                      {!isCurrentlyClockedIn ? (
                        <button
                          type="button"
                          onClick={handleRemoteClockIn}
                          className="ems-btn-primary ems-punch-action-btn"
                        >
                          <LogIn size={15} />
                          <span>Remote Clock IN ({liveClock24.slice(0, 5)})</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRemoteClockOut}
                          className="ems-btn-secondary ems-punch-action-btn border-[#ff5a36]/40 text-[#ff7a5c] hover:bg-[#ff5a36]/10"
                        >
                          <LogOut size={15} />
                          <span>Remote Clock OUT ({liveClock24.slice(0, 5)})</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

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
                    As an intern, your submitted edits will be dispatched to Supervisor ({currentViewEmp.supervisorName || "Dinithi Perera"}) for approval before taking effect.
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

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUPERVISOR RESET INTERN DATA
      ───────────────────────────────────────────────────────────── */}
      {showResetInternModal && (
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

            <form onSubmit={handleSupervisorResetSubmit} className="ems-modal-form">
              <p className="text-xs text-[#a0a5a0] mb-3 leading-relaxed">
                As supervisor, you can reset sprint metrics, sales leads, or daily tasks for{" "}
                <strong className="text-white">{currentViewEmp.name}</strong> ({currentViewEmp.employeeId}) to prepare for a new month or sprint cycle.
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
                  Sets Monthly Leads Logged to 0 and Discovery Demos Scheduled to 0.
                </small>
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
                  Clears all current pipeline leads, resetting pipeline value and incentive commissions to 0.
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
                  onClick={() => {
                    setResetOptionKpis(true);
                    setResetOptionPipeline(true);
                    setResetOptionChecklist(true);
                    handleSupervisorResetSubmit({ preventDefault: () => {} } as any);
                  }}
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
      )}
    </div>
  );
}

