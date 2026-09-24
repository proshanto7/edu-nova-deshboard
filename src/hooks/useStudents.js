"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllUsers,
  createUser,
  enrollStudent,
  revokeEnrollment,
  updateUserStatus,
} from "@/lib/api";

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

  // Error hole throw hoy, form/modal e catch kore dekhano hoy.
  // formData = FormData (name, email, password)
  const addStudent = useCallback(async (formData) => {
    formData.append("role", "student");
    await createUser(formData);
    await fetchStudents();
  }, [fetchStudents]);

  const toggleStudentStatus = useCallback(async (student) => {
    const nextIsActive = !student.isActive;

    // Optimistic update: UI-te agei flip kore dei, request fail korle revert
    setStudents((prev) =>
      prev.map((s) =>
        s._id === student._id ? { ...s, isActive: nextIsActive } : s,
      ),
    );

    try {
      const res = await updateUserStatus(student._id, nextIsActive);
      const updated = res.data.user;

      setStudents((prev) =>
        prev.map((s) => (s._id === student._id ? { ...s, ...updated } : s)),
      );

      return { success: true };
    } catch (err) {
      // Revert on failure
      setStudents((prev) =>
        prev.map((s) =>
          s._id === student._id ? { ...s, isActive: student.isActive } : s,
        ),
      );

      return { success: false, message: err.message };
    }
  }, []);

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
    addStudent,
    toggleStudentStatus,
  };
}