"use client";

import { useState, useEffect, useCallback } from "react";
import { getMe, updateMe } from "@/lib/api";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getMe();
      setProfile(res.data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const saveProfile = async (data) => {
    const res = await updateMe(data);
    setProfile(res.data.user);
    return res;
  };

  return {
    profile,
    loading,
    error,
    saveProfile,
    refetch: fetchProfile,
  };
}
