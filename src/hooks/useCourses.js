"use client";

import { useState, useEffect, useCallback } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCourses();
      setCourses(res.data.courses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const addCourse = async (formData) => {
    await createCourse(formData);
    await fetchCourses();
  };

  const editCourse = async (id, formData) => {
    await updateCourse(id, formData);
    await fetchCourses();
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    await fetchCourses();
  };

  return { courses, loading, error, addCourse, editCourse, removeCourse, refetch: fetchCourses };
}