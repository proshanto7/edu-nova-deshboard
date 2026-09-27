"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLessons } from "@/hooks/useLessons";
import PageHeader from "@/components/common/PageHeader";
import { ArrowLeftIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import LessonItem from "./LessonItem";
import LessonsSkeleton from "./LessonsSkeleton";
import LessonsEmptyState from "./LessonsEmptyState";
import LessonFormModal from "./LessonFormModal";

export default function LessonsPage({ courseId }) {
  const {
    lessons,
    loading,
    error,
    addLesson,
    editLesson,
    removeLesson,
    uploadProgress,
  } = useLessons(courseId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const openCreate = () => {
    setEditingLesson(null);
    setModalOpen(true);
  };

  const openEdit = (lesson) => {
    setEditingLesson(lesson);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingLesson) {
      await editLesson(editingLesson._id, formData);
    } else {
      await addLesson(formData);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      await removeLesson(id);
    } catch (err) {
      alert(err.message);
    }
  };

  // Order onujayi sort
  const sortedLessons = useMemo(
    () => (lessons ?? []).slice().sort((a, b) => a.order - b.order),
    [lessons],
  );

  const total = sortedLessons.length;
  const ready = !loading && !error;

  let subtitle;
  if (loading) subtitle = "Loading lessons...";
  else
    subtitle = `${total} ${total === 1 ? "lesson" : "lessons"} in this course`;

  return (
    <div className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link
        href="/dashboard/courses"
        className={`mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-(--accent) hover:underline ${focusRing}`}
      >
        <ArrowLeftIcon />
        Back to Courses
      </Link>

      <PageHeader
        title="Lessons"
        subtitle={subtitle}
        actionLabel="New Lesson"
        onAction={openCreate}
      />

      {loading && <LessonsSkeleton />}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {error}
        </div>
      )}

      {ready && total === 0 && <LessonsEmptyState onCreate={openCreate} />}

      {ready && total > 0 && (
        <ul className="space-y-3">
          {sortedLessons.map((lesson) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <LessonFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingLesson}
        courseId={courseId}
        uploadProgress={uploadProgress}
      />
    </div>
  );
}