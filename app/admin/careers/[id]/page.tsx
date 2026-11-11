"use client";

import { useParams } from "next/navigation";
import { AdminJobEditor } from "@/components/admin/job-editor";

export default function AdminEditCareerPage() {
  const params = useParams();
  const id = (params?.id as string) || "new";
  return <AdminJobEditor jobIdOrSlug={id} />;
}

