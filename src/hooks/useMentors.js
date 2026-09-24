"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "@/lib/api";

export function useMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");
    try {
      const res = await getAllUsers({ role: "mentor", limit: 100 });

      // Response shape: useStudents e jei shape use korchen sheta-i ekhane boshan
      const users = res?.data?.users ?? [];

      // Backend role filter na korle-o jate student na ashe
      setMentors(users.filter((u) => u.role === "mentor"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Error hole throw hoy, form/page e catch kore dekhano hoy
  // formData = FormData (name, email, password, avatar)
  const addMentor = async (formData) => {
    formData.append("role", "mentor");
    await createUser(formData);
    await load({ silent: true });
  };

  const editMentor = async (id, data) => {
    await updateUser(id, data);
    await load({ silent: true });
  };

  const removeMentor = async (id) => {
    await deleteUser(id);
    setMentors((prev) => prev.filter((m) => m._id !== id));
  };

  // Optimistic update: UI-te agei flip kore dei, request fail korle revert
  const toggleMentorStatus = async (mentor) => {
    const nextIsActive = !mentor.isActive;

    setMentors((prev) =>
      prev.map((m) =>
        m._id === mentor._id ? { ...m, isActive: nextIsActive } : m,
      ),
    );

    try {
      const res = await updateUserStatus(mentor._id, nextIsActive);
      const updated = res.data.user;

      setMentors((prev) =>
        prev.map((m) => (m._id === mentor._id ? { ...m, ...updated } : m)),
      );

      return { success: true };
    } catch (err) {
      setMentors((prev) =>
        prev.map((m) =>
          m._id === mentor._id ? { ...m, isActive: mentor.isActive } : m,
        ),
      );

      return { success: false, message: err.message };
    }
  };

  return {
    mentors,
    loading,
    error,
    addMentor,
    editMentor,
    removeMentor,
    toggleMentorStatus,
    refetch: load,
  };
}
