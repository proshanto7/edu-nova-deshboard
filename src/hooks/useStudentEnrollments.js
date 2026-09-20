"use client";

import { useState, useEffect, useCallback } from "react";
import { getStudentEnrollments, revokeEnrollment } from "@/lib/api";

export function useStudentEnrollments(studentId) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEnrollments = useCallback(async () => {
    if (!studentId) return;
    setLoading(true);
    setError("");
    try {
      const res = await getStudentEnrollments(studentId);
      setEnrollments(res.data.enrollments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const revoke = async (enrollmentId) => {
    await revokeEnrollment(enrollmentId);
    await fetchEnrollments();
  };

  return { enrollments, loading, error, revoke, refetch: fetchEnrollments };
}