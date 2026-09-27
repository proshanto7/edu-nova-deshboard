"use client";

import Link from "next/link";
import EnrollmentRequestList from "../enrollment-requests/EnrollmentRequestList";

/**
 * Dashboard home e "needs your review" list.
 * requests = summary.pendingEnrollmentRequests (backend max 10 ta pathay)
 * totalPending = summary.overview.pendingEnrollmentRequests (mot koyta pending)
 */
export default function PendingRequestsPanel({
  requests,
  totalPending,
  onApprove,
  onReject,
}) {
  return (
    <section className="mb-6 min-w-0 sm:mb-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-(--text-primary)">
            Pending Enrollment Requests
          </h3>
          {totalPending > requests.length && (
            <p className="mt-0.5 text-xs text-(--text-muted)">
              Showing latest {requests.length} of {totalPending}
            </p>
          )}
        </div>

        <Link
          href="/dashboard/enrollment-requests"
          className="shrink-0 text-sm font-medium text-(--accent) hover:underline"
        >
          View all
        </Link>
      </div>

      {requests.length === 0 ? (
        <p className="rounded-xl border border-dashed border-(--border) bg-(--background-card) px-4 py-6 text-center text-sm text-(--text-muted)">
          No pending requests. You&apos;re all caught up.
        </p>
      ) : (
        <EnrollmentRequestList
          requests={requests}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </section>
  );
}
