"use client";

import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import PageHeader from "@/components/common/PageHeader";
import StudentCard from "./StudentCard";
import StudentsSkeleton from "./StudentsSkeleton";
import StudentsEmptyState from "./StudentsEmptyState";
import EnrollModal from "./EnrollModal";
import StudentEnrollmentsModal from "./StudentEnrollmentsModal";
import StudentFormModal from "./StudentFormModal";

export default function StudentsPage() {
  const {
    students,
    loading,
    error,
    refetch,
    addStudent,
    toggleStudentStatus,
  } = useStudents();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openEnroll = (student) => {
    setSelectedStudent(student);
    setEnrollModalOpen(true);
  };

  const openView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const total = students?.length ?? 0;
  const ready = !loading && !error;

  let subtitle;
  if (loading) subtitle = "Loading students...";
  else subtitle = `${total} ${total === 1 ? "student" : "students"} in total`;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Students"
        subtitle={subtitle}
        actionLabel="New Student"
        onAction={() => setCreateModalOpen(true)}
      />

      {loading && <StudentsSkeleton />}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {error}
        </div>
      )}

      {ready && total === 0 && <StudentsEmptyState />}

      {ready && total > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {students.map((s) => (
            <StudentCard
              key={s._id}
              student={s}
              onEnroll={openEnroll}
              onViewEnrollments={openView}
              onToggleStatus={toggleStudentStatus}
            />
          ))}
        </ul>
      )}

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        student={selectedStudent}
        onSuccess={refetch}
      />

      <StudentEnrollmentsModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        student={selectedStudent}
      />

      <StudentFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={addStudent}
      />
    </div>
  );
}