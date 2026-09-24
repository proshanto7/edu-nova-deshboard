"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getEnrollmentRequests,
  approveEnrollmentRequest,
  rejectEnrollmentRequest,
} from "@/lib/api";

// status = "pending" | "approved" | "rejected" | "all"
export function useEnrollmentRequests(status = "pending") {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Kon status er data ekhon state e ache — tab bodolale purano tab er list flash na kore
  const [loadedStatus, setLoadedStatus] = useState(null);
  const latestRequestId = useRef(0);

  // silent = true hole skeleton dekhabe na (approve/reject er por quiet refresh)
  const fetchRequests = useCallback(
    async ({ silent = false } = {}) => {
      // Dhoto tab drut bodolale shudhu shesh request er response-i kaj korbe
      const requestId = ++latestRequestId.current;

      if (!silent) setLoading(true);
      setError("");

      try {
        const res = await getEnrollmentRequests({
          status: status === "all" ? "" : status,
        });
        if (requestId !== latestRequestId.current) return;
        setRequests(res.data.requests);
      } catch (err) {
        if (requestId !== latestRequestId.current) return;
        setError(err.message);
      } finally {
        if (requestId === latestRequestId.current) {
          setLoading(false);
          setLoadedStatus(status);
        }
      }
    },
    [status],
  );

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Error hole throw hoy — UI te catch kore dekhano hoy.
  const approve = useCallback(
    async (id) => {
      await approveEnrollmentRequest(id);
      await fetchRequests({ silent: true });
    },
    [fetchRequests],
  );

  const reject = useCallback(
    async (id, reason) => {
      await rejectEnrollmentRequest(id, reason);
      await fetchRequests({ silent: true });
    },
    [fetchRequests],
  );

  return {
    requests,
    loading: loading || loadedStatus !== status,
    error,
    refetch: fetchRequests,
    approve,
    reject,
  };
}
