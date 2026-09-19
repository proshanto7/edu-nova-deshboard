"use client";

import { useState, useEffect, useCallback } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCategories();
      setCategories(res.data.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (formData) => {
    await createCategory(formData);
    await fetchCategories();
  };

  const editCategory = async (id, formData) => {
    await updateCategory(id, formData);
    await fetchCategories();
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    await fetchCategories();
  };

  return { categories, loading, error, addCategory, editCategory, removeCategory, refetch: fetchCategories };
}