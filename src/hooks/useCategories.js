"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api";

const LIMIT = 12;
const DEBOUNCE_MS = 400;

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  const fetchCategories = useCallback(async (targetPage, targetSearch) => {
    setLoading(true);
    setError("");
    try {
      const res = await getCategories({
        page: targetPage,
        limit: LIMIT,
        search: targetSearch || undefined,
      });
      setCategories(res.data.categories);
      setPage(res.data.pagination.page);
      setPages(res.data.pagination.pages);
      setTotal(res.data.pagination.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // প্রথমবার lode kora
  useEffect(() => {
    fetchCategories(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search change hole debounce kore page 1 theke abar fetch
  const updateSearch = (value) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchCategories(1, value);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const goToPage = (p) => fetchCategories(p, search);

  const addCategory = async (formData) => {
    await createCategory(formData);
    await fetchCategories(1, search);
  };

  const editCategory = async (id, formData) => {
    await updateCategory(id, formData);
    await fetchCategories(page, search);
  };

  const removeCategory = async (id, force = false) => {
    await deleteCategory(id, force);
    const isLastItemOnPage = categories.length === 1 && page > 1;
    await fetchCategories(isLastItemOnPage ? page - 1 : page, search);
  };

  return {
    categories,
    loading,
    error,
    page,
    pages,
    total,
    search,
    setSearch: updateSearch,
    goToPage,
    addCategory,
    editCategory,
    removeCategory,
    refetch: () => fetchCategories(page, search),
  };
}