"use client";

import { useState } from "react";
import Avatar from "@/components/common/Avatar";
import { BookIcon, PencilIcon, PlusIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function StudentCard({
  student,
  onEnroll,
  onViewEnrollments,
  onToggleStatus,
  onEdit,
}) {
  const [isToggling, setIsToggling] = useState(false);
  const [toggleError, setToggleError] = useState("");

  const handleToggleStatus = async () => {
    setToggleError("");
    setIsToggling(true);
    const result = await onToggleStatus(student);
    setIsToggling(false);
    if (!result?.success) {
      setToggleError(result?.message || "Failed to update status");
    }
  };

  return (
    <li className="flex min-w-0 flex-col rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar name={student.name} />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-(--text-primary)">
            {student.name}
          </h3>
          <p
            className="truncate text-sm text-(--text-secondary)"
            title={student.email}
          >
            {student.email}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {student.isVerified ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--success)/10 px-2.5 py-1 text-xs font-medium text-(--success)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--warning)/10 px-2.5 py-1 text-xs font-medium text-(--warning)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Unverified
          </span>
        )}

        {student.isActive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--success)/10 px-2.5 py-1 text-xs font-medium text-(--success)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--danger)/10 px-2.5 py-1 text-xs font-medium text-(--danger)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Inactive
          </span>
        )}
      </div>

      {toggleError && (
        <p role="alert" className="mt-2 text-xs text-(--danger)">
          {toggleError}
        </p>
      )}

      <div className="mt-auto pt-4">
        <div className="grid grid-cols-3 gap-2 border-t border-(--border-light) pt-3">
          <button
            onClick={() => onEdit(student)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            <PencilIcon />
            Edit
          </button>
          <button
            onClick={() => onEnroll(student)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--accent)/30 px-3 py-2 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent)/10 ${focusRing}`}
          >
            <PlusIcon />
            Enroll
          </button>
          <button
            onClick={() => onViewEnrollments(student)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            <BookIcon />
            Enrollments
          </button>
        </div>

        <button
          onClick={handleToggleStatus}
          disabled={isToggling}
          className={`mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${focusRing} ${
            student.isActive
              ? "border-(--danger)/30 text-(--danger) hover:bg-(--danger-bg)"
              : "border-(--success)/30 text-(--success) hover:bg-(--success)/10"
          }`}
        >
          {isToggling
            ? "Updating..."
            : student.isActive
              ? "Deactivate"
              : "Activate"}
        </button>
      </div>
    </li>
  );
}
