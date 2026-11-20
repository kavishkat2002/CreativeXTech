import type { Metadata } from "next";
import { EmployeePortal } from "@/components/employee-portal";

export const metadata: Metadata = {
  title: "Employee Portal & Management System (EMS) | Creativex Technology",
  description:
    "Secure Employee Management System for Creativex Technology. Manage staff profiles, supervisor KPI evaluations, attendance schedules, and role-based permissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmployeePage() {
  return (
    <main className="ems-root-wrapper">
      <EmployeePortal />
    </main>
  );
}

