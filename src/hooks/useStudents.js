"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllUsers, enrollStudent, revokeEnrollment } from "@/lib/api";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllUsers({ role: "student", limit: 100 });
      setStudents(res.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, error, refetch: fetchStudents };
}