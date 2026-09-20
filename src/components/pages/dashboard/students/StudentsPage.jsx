"use client";

import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import EnrollModal from "./EnrollModal";
import StudentEnrollmentsModal from "./StudentEnrollmentsModal";

export default function StudentsPage() {
  const { students, loading, error, refetch } = useStudents();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openEnroll = (student) => {
    setSelectedStudent(student);
    setEnrollModalOpen(true);
  };

  const openView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-(--text-primary) mb-6">Students</h1>

      {loading && <p className="text-(--text-secondary)">Loading...</p>}
      {error && <p className="text-(--danger)">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border border-(--border) bg-(--background-card) overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-(--border-light)">
                <th className="p-3 text-(--text-secondary) font-medium">Name</th>
                <th className="p-3 text-(--text-secondary) font-medium">Email</th>
                <th className="p-3 text-(--text-secondary) font-medium">Verified</th>
                <th className="p-3 text-(--text-secondary) font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b border-(--border-light) last:border-0">
                  <td className="p-3 text-(--text-primary)">{s.name}</td>
                  <td className="p-3 text-(--text-secondary)">{s.email}</td>
                  <td className="p-3">
                    {s.isVerified ? (
                      <span className="text-(--success)">Yes</span>
                    ) : (
                      <span className="text-(--warning)">No</span>
                    )}
                  </td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => openEnroll(s)}
                      className="text-(--accent) hover:underline text-xs"
                    >
                      Enroll
                    </button>
                    <button
                      onClick={() => openView(s)}
                      className="text-(--text-secondary) hover:underline text-xs"
                    >
                      View Enrollments
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-(--text-muted)">
                    No students yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    </div>
  );
}