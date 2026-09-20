"use client";

import { useState, useEffect } from "react";
import { getCategories, getAllUsers } from "@/lib/api";

export function useDropdownData() {
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, userRes] = await Promise.all([
          getCategories({ limit: 100 }),
          getAllUsers({ limit: 100 }),
        ]);
        setCategories(catRes.data.categories);
        setMentors(userRes.data.users.filter((u) => ["mentor", "admin"].includes(u.role)));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { categories, mentors, loading };
}