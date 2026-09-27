"use client";

import { useState } from "react";
import Avatar from "@/components/common/Avatar";
import { CheckIcon, CloseIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import StatusBadge from "./StatusBadge";
import { formatDateTime } from "./formatDate";

/**
 * Ekta enrollment request.
 * - onApprove(id): async, error hole throw korbe
 * - onReject(request): reject modal khulbe (reason parent e nite hoy)
 * Approve/Reject button shudhu "pending" request e dekhabe.
 */
export default function RequestItem({ request, onApprove, onReject }) {
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState("");

  const { student, course } = request;
  const isPending = request.status === "pending";

  const handleApprove = async () => {
    setError("");
    setIsApproving(true);
    try {
      await onApprove(request._id);
    } catch (err) {
      setError(err.message || "Failed to approve request");
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <li className="min-w-0 rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar name={student?.name || ""} src={student?.avatar} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-(--text-primary)">
                {student?.name || "Deleted user"}
              </h3>
              <StatusBadge status={request.status} />
            </div>

            {student?.email && (
              <p
                className="truncate text-sm text-(--text-secondary)"
                title={student.email}
              >
                {student.email}
              </p>
            )}

            <p className="mt-2 wrap-break-word text-sm text-(--text-primary)">
              Requested{" "}
              <span className="font-medium">
                {course?.title || "a deleted course"}
              </span>
              {course && (
                <span className="text-(--text-muted)">
                  {" "}
                  · {course.isFree ? "Free" : `৳${course.price}`}
                </span>
              )}
            </p>

            {request.note && (
              <p className="mt-2 wrap-break-word rounded-lg bg-(--border-light) px-3 py-2 text-sm text-(--text-secondary)">
                “{request.note}”
              </p>
            )}

            <p className="mt-2 text-xs text-(--text-muted)">
              Requested on {formatDateTime(request.createdAt)}
            </p>

            {!isPending && (
              <p className="mt-1 text-xs text-(--text-muted)">
                {request.status === "approved" ? "Approved" : "Rejected"}
                {request.reviewedBy?.name && ` by ${request.reviewedBy.name}`}
                {request.reviewedAt &&
                  ` on ${formatDateTime(request.reviewedAt)}`}
              </p>
            )}

            {request.status === "rejected" && request.reviewNote && (
              <p className="mt-1 wrap-break-word text-sm text-(--danger)">
                Reason: {request.reviewNote}
              </p>
            )}
          </div>
        </div>

        {isPending && (
          <div className="grid grid-cols-2 gap-2 lg:flex lg:shrink-0">
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-(--accent-text) transition-all hover:bg-(--accent-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
            >
              <CheckIcon />
              {isApproving ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={() => onReject(request)}
              disabled={isApproving}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--danger)/30 px-4 py-2 text-sm font-medium text-(--danger) transition-colors hover:bg-(--danger-bg) disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
            >
              <CloseIcon />
              Reject
            </button>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-(--danger-bg) px-3 py-2 text-sm text-(--danger)"
        >
          {error}
        </p>
      )}
    </li>
  );
}
