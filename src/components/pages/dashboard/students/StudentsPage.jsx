"use client";

import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import EnrollModal from "./EnrollModal";

export default function StudentsPage() {
  const { students, loading, error, refetch } = useStudents();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openEnroll = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Students</h1>

      {loading && <p className="text-[var(--text-secondary)]">Loading...</p>}
      {error && <p className="text-[var(--danger)]">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--border-light)]">
                <th className="p-3 text-[var(--text-secondary)] font-medium">Name</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Email</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Verified</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b border-[var(--border-light)] last:border-0">
                  <td className="p-3 text-[var(--text-primary)]">{s.name}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{s.email}</td>
                  <td className="p-3">
                    {s.isVerified ? (
                      <span className="text-[var(--success)]">Yes</span>
                    ) : (
                      <span className="text-[var(--warning)]">No</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => openEnroll(s)}
                      className="text-[var(--accent)] hover:underline text-xs"
                    >
                      Enroll in Course
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-[var(--text-muted)]">
                    No students yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <EnrollModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={selectedStudent}
        onSuccess={refetch}
      />
    </div>
  );
}