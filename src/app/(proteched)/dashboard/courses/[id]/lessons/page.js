"use client";

import { useParams } from "next/navigation";
import LessonsPage from "@/components/pages/lessons/LessonsPage";

export default function Page() {
  const { id } = useParams();
  return <LessonsPage courseId={id} />;
}