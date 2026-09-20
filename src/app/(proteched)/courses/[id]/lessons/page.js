"use client";

import { useParams } from "next/navigation";
import LessonsPage from "@/components/pages/dashboard/lessons/LessonsPage";

export default function Page() {
  const { id } = useParams();
  return <LessonsPage courseId={id} />;
}