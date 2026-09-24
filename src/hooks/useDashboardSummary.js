"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDashboardSummary,
  approveEnrollmentRequest,
  rejectEnrollmentRequest,
} from "@/lib/api";

export function useDashboardSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // silent = true hole "Loading..." dekhabe na — approve/reject er por
  // dashboard quietly refresh hobe, pura page flash korbe na.
  const fetchSummary = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");
    try {
      const res = await getDashboardSummary();
      setSummary(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // Error hole throw hoy — UI (RequestItem / RejectModal) e catch kore dekhano hoy.
  const approveRequest = useCallback(
    async (id) => {
      await approveEnrollmentRequest(id);
      await fetchSummary({ silent: true });
    },
    [fetchSummary],
  );

  const rejectRequest = useCallback(
    async (id, reason) => {
      await rejectEnrollmentRequest(id, reason);
      await fetchSummary({ silent: true });
    },
    [fetchSummary],
  );

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
    approveRequest,
    rejectRequest,
  };
}
