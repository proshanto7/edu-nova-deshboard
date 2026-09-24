"use client";

import { useState } from "react";
import { useEnrollmentRequests } from "@/hooks/useEnrollmentRequests";
import PageHeader from "@/components/common/PageHeader";
import { focusRing } from "@/components/common/uiStyles";
import EnrollmentRequestList from "./EnrollmentRequestList";
import RequestsSkeleton from "./RequestsSkeleton";
import RequestsEmptyState from "./RequestsEmptyState";

const TABS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

export default function EnrollmentRequestsPage() {
  const [status, setStatus] = useState("pending");
  const { requests, loading, error, approve, reject } =
    useEnrollmentRequests(status);

  const total = requests.length;
  const ready = !loading && !error;

  let subtitle;
  if (loading) subtitle = "Loading requests...";
  else if (status === "all")
    subtitle = `${total} ${total === 1 ? "request" : "requests"} in total`;
  else subtitle = `${total} ${status} ${total === 1 ? "request" : "requests"}`;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <PageHeader title="Enrollment Requests" subtitle={subtitle} />

      <div
        role="tablist"
        aria-label="Filter requests by status"
        className="mb-5 flex gap-2 overflow-x-auto pb-1"
      >
        {TABS.map((tab) => {
          const isActive = tab.value === status;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setStatus(tab.value)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${focusRing} ${
                isActive
                  ? "bg-(--accent) text-(--accent-text)"
                  : "border border-(--border) text-(--text-secondary) hover:bg-(--border-light)"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {loading && <RequestsSkeleton />}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
          >
            {error}
          </div>
        )}

        {ready && total === 0 && <RequestsEmptyState status={status} />}

        {ready && total > 0 && (
          <EnrollmentRequestList
            requests={requests}
            onApprove={approve}
            onReject={reject}
          />
        )}
      </div>
    </div>
  );
}
