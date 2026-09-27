"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";

const MAX_REASON_LENGTH = 500; // backend validation er shathe mile

/**
 * request = je request reject korte chai (null hole modal bondho).
 * onConfirm(reason): async, error hole throw korbe.
 */
export default function RejectModal({ request, onClose, onConfirm }) {
  return (
    <Modal isOpen={!!request} onClose={onClose} title="Reject request">
      {/* key: notun request khulle form state (reason/error) fresh hoy */}
      {request && (
        <RejectForm
          key={request._id}
          request={request}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </Modal>
  );
}

function RejectForm({ request, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    try {
      await onConfirm(reason.trim());
      // Success hole parent modal bondho kore dey
    } catch (err) {
      setServerError(err.message || "Failed to reject request");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="text-sm text-(--text-secondary)">
        Reject{" "}
        <span className="font-medium text-(--text-primary)">
          {request.student?.name || "this student"}
        </span>
        &apos;s request for{" "}
        <span className="font-medium text-(--text-primary)">
          {request.course?.title || "this course"}
        </span>
        ? The student can request the course again later.
      </p>

      <FormField
        label="Reason"
        hint="(optional)"
        htmlFor="reject-reason"
        error={
          reason.length >= MAX_REASON_LENGTH
            ? `Maximum ${MAX_REASON_LENGTH} characters`
            : undefined
        }
      >
        <textarea
          id="reject-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={MAX_REASON_LENGTH}
          rows={4}
          placeholder="e.g. Payment not received"
          className={`${inputClass(reason.length >= MAX_REASON_LENGTH)} resize-none`}
        />
        <p className="mt-1.5 text-right text-xs text-(--text-muted)">
          {reason.length}/{MAX_REASON_LENGTH}
        </p>
      </FormField>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg bg-(--danger-bg) px-3 py-2.5 text-sm text-(--danger)"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-(--danger) px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Rejecting..." : "Reject request"}
        </button>
      </div>
    </form>
  );
}
