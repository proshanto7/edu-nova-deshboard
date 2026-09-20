"use client";

import Modal from "@/components/common/Modal";
import { useStudentEnrollments } from "@/hooks/useStudentEnrollments";

export default function StudentEnrollmentsModal({ isOpen, onClose, student }) {
  const { enrollments, loading, error, revoke } = useStudentEnrollments(student?._id);

  const handleRevoke = async (enrollmentId) => {
    if (!confirm("Revoke this enrollment? Student will lose access immediately.")) return;
    try {
      await revoke(enrollmentId);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${student?.name || ""}'s Enrollments`}>
      {loading && <p className="text-(--text-secondary) text-sm">Loading...</p>}
      {error && <p className="text-(--danger) text-sm">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment._id}
              className="flex items-center justify-between p-3 rounded-lg border border-(--border-light) bg-(--background)"
            >
              <div>
                <p className="text-sm font-medium text-(--text-primary)">
                  {enrollment.course?.title}
                </p>
                <p className="text-xs text-(--text-muted)">
                  {enrollment.course?.isFree ? "Free" : `৳${enrollment.course?.price}`}
                </p>
              </div>
              <button
                onClick={() => handleRevoke(enrollment._id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-(--danger) text-(--danger) hover:bg-(--danger) hover:text-white transition-colors"
              >
                Revoke
              </button>
            </div>
          ))}

          {enrollments.length === 0 && (
            <p className="text-sm text-(--text-muted) text-center py-4">
              No active enrollments.
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}