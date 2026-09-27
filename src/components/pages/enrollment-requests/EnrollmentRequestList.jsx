"use client";

import { useState } from "react";
import RequestItem from "./RequestItem";
import RejectModal from "./RejectModal";

/**
 * Dashboard panel ar Enrollment Requests page — duita jaygay-i eta use hoy.
 *
 * Use:
 *   <EnrollmentRequestList
 *     requests={requests}
 *     onApprove={(id) => approve(id)}            // async, error hole throw
 *     onReject={(id, reason) => reject(id, reason)} // async, error hole throw
 *   />
 */
export default function EnrollmentRequestList({
  requests,
  onApprove,
  onReject,
}) {
  const [rejecting, setRejecting] = useState(null);

  const handleConfirmReject = async (reason) => {
    await onReject(rejecting._id, reason);
    setRejecting(null);
  };

  return (
    <>
      <ul className="space-y-3">
        {requests.map((request) => (
          <RequestItem
            key={request._id}
            request={request}
            onApprove={onApprove}
            onReject={setRejecting}
          />
        ))}
      </ul>

      <RejectModal
        request={rejecting}
        onClose={() => setRejecting(null)}
        onConfirm={handleConfirmReject}
      />
    </>
  );
}
