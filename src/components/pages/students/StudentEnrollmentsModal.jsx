"use client";

import Modal from "@/components/common/Modal";
import { BookIcon } from "@/components/common/Icons";
import { useStudentEnrollments } from "@/hooks/useStudentEnrollments";
import EnrollmentItem from "./EnrollmentItem";

export default function StudentEnrollmentsModal({ isOpen, onClose, student }) {
  const { enrollments, loading, error, revoke } = useStudentEnrollments(
    student?._id,
  );

  const handleRevoke = async (enrollmentId) => {
    if (
      !confirm("Revoke this enrollment? Student will lose access immediately.")
    )
      return;
    try {
      await revoke(enrollmentId);
    } catch (err) {
      alert(err.message);
    }
  };

  const list = enrollments ?? [];
  const ready = !loading && !error;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${student?.name || ""}'s Enrollments`}
    >
      {loading && (
        <div role="status">
          <span className="sr-only">Loading...</span>
          <ul className="space-y-3" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <li
                key={i}
                className="flex animate-pulse items-center justify-between gap-3 rounded-xl border border-(--border-light) bg-background p-3 sm:p-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/5 rounded bg-(--border-light)" />
                  <div className="h-3 w-1/4 rounded bg-(--border-light)" />
                </div>
                <div className="h-8 w-16 rounded-lg bg-(--border-light)" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-(--danger-bg) px-3 py-2.5 text-sm text-(--danger)"
        >
          {error}
        </p>
      )}

      {ready && list.length > 0 && (
        <ul className="max-h-[60dvh] space-y-3 overflow-y-auto">
          {list.map((enrollment) => (
            <EnrollmentItem
              key={enrollment._id}
              enrollment={enrollment}
              onRevoke={handleRevoke}
            />
          ))}
        </ul>
      )}

      {ready && list.length === 0 && (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--border-light) text-(--text-secondary)">
            <BookIcon className="h-5 w-5" />
          </div>
          <p className="text-sm text-(--text-muted)">No active enrollments.</p>
        </div>
      )}
    </Modal>
  );
}
