"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/lib/api";

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

  return {
    mentors,
    loading,
    error,
    addMentor,
    editMentor,
    removeMentor,
    refetch: load,
  };
}