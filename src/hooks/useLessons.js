"use client";

import { useState, useEffect, useCallback } from "react";
import { getLessonsForCourse, createLesson, updateLesson, deleteLesson } from "@/lib/api";

export function useLessons(courseId) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLessons = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    setError("");
    try {
      const res = await getLessonsForCourse(courseId);
      setLessons(res.data.lessons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const addLesson = async (formData) => {
    await createLesson(formData);
    await fetchLessons();
  };

  const editLesson = async (id, formData) => {
    await updateLesson(id, formData);
    await fetchLessons();
  };

  const removeLesson = async (id) => {
    await deleteLesson(id);
    await fetchLessons();
  };

  return { lessons, loading, error, addLesson, editLesson, removeLesson, refetch: fetchLessons };
}