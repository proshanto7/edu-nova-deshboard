"use client";

import { useState, useEffect, useCallback } from "react";
import { getLessonsForCourse, createLesson, updateLesson, deleteLesson } from "@/lib/api";

export function useLessons(courseId) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Video upload cholakalin 0-100 — upload na cholle null
  const [uploadProgress, setUploadProgress] = useState(null);

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
    setUploadProgress(0);
    try {
      await createLesson(formData, setUploadProgress);
      await fetchLessons();
    } finally {
      setUploadProgress(null);
    }
  };

  const editLesson = async (id, formData) => {
    setUploadProgress(0);
    try {
      await updateLesson(id, formData, setUploadProgress);
      await fetchLessons();
    } finally {
      setUploadProgress(null);
    }
  };

  const removeLesson = async (id) => {
    await deleteLesson(id);
    await fetchLessons();
  };

  return {
    lessons,
    loading,
    error,
    uploadProgress,
    addLesson,
    editLesson,
    removeLesson,
    refetch: fetchLessons,
  };
}