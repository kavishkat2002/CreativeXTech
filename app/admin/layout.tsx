import type { Metadata } from "next";
import { AdminClientLayout } from "./admin-client-layout";

export const metadata: Metadata = {
  title: "Admin Panel | Creativex Technology",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
