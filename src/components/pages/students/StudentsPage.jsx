"use client";

import { useMemo, useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
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
    editStudent,
    toggleStudentStatus,
  } = useStudents();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");

  const openEnroll = (student) => {
    setSelectedStudent(student);
    setEnrollModalOpen(true);
  };

  const openView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const openCreate = () => {
    setEditingStudent(null);
    setFormModalOpen(true);
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingStudent) {
      await editStudent(editingStudent._id, formData);
    } else {
      await addStudent(formData);
    }
  };

  const total = students?.length ?? 0;
  const ready = !loading && !error;

  // Search: name ba email e match korle dekhabe
  const query = search.trim().toLowerCase();
  const isFiltering = query.length > 0;

  const filteredStudents = useMemo(() => {
    const list = students ?? [];
    if (!query) return list;
    return list.filter(
      (s) =>
        s.name?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query),
    );
  }, [students, query]);

  let subtitle;
  if (loading) subtitle = "Loading students...";
  else if (isFiltering)
    subtitle = `Showing ${filteredStudents.length} of ${total}`;
  else subtitle = `${total} ${total === 1 ? "student" : "students"} in total`;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Students"
        subtitle={subtitle}
        actionLabel="New Student"
        onAction={openCreate}
      />

      {ready && total > 0 && (
        <div className="mb-5 sm:max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email..."
            label="Search students"
          />
        </div>
      )}

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

      {ready && total > 0 && filteredStudents.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--border) bg-(--background-card) px-6 py-14 text-center">
          <h2 className="text-base font-semibold text-(--text-primary)">
            No students found.
          </h2>
          <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">
            Try a different name or email.
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light)"
          >
            Clear search
          </button>
        </div>
      )}

      {ready && filteredStudents.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map((s) => (
            <StudentCard
              key={s._id}
              student={s}
              onEnroll={openEnroll}
              onViewEnrollments={openView}
              onToggleStatus={toggleStudentStatus}
              onEdit={openEdit}
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
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />
    </div>
  );
}
