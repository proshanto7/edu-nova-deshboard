"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api";

const LIMIT = 12;
const DEBOUNCE_MS = 400;

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  const fetchCourses = useCallback(async (targetPage, targetSearch) => {
    setLoading(true);
    setError("");
    try {
      const res = await getCourses({
        page: targetPage,
        limit: LIMIT,
        search: targetSearch || undefined,
      });
      setCourses(res.data.courses);
      setPage(res.data.pagination.page);
      setPages(res.data.pagination.pages);
      setTotal(res.data.pagination.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSearch = (value) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchCourses(1, value);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const goToPage = (p) => fetchCourses(p, search);

  const addCourse = async (formData) => {
    await createCourse(formData);
    await fetchCourses(1, search);
  };

  const editCourse = async (id, formData) => {
    await updateCourse(id, formData);
    await fetchCourses(page, search);
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    const isLastItemOnPage = courses.length === 1 && page > 1;
    await fetchCourses(isLastItemOnPage ? page - 1 : page, search);
  };

  return {
    courses,
    loading,
    error,
    page,
    pages,
    total,
    search,
    setSearch: updateSearch,
    goToPage,
    addCourse,
    editCourse,
    removeCourse,
    refetch: () => fetchCourses(page, search),
  };
}