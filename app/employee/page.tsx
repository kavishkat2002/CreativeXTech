import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { EmployeePortal } from "@/components/employee-portal";

export const metadata: Metadata = {
  title: "Employee Portal & Management System (EMS) | CreativeX Technology",
  description:
    "Secure Employee Management System for CreativeX Technology. Manage staff profiles, supervisor KPI evaluations, attendance schedules, and role-based permissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmployeePage() {
  return (
    <>
      <SiteHeader activeSection="employee" />
      <main className="ems-root-wrapper">
        <EmployeePortal />
      </main>
      <SiteFooter />
    </>
  );
}

