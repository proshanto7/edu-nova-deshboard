"use client";

import { useState } from "react";
import Link from "next/link";
import { useLessons } from "@/hooks/useLessons";
import LessonFormModal from "./LessonFormModal";

function formatDuration(seconds) {
  if (!seconds) return "-";

  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes} min`;
}

export default function LessonsPage({ courseId }) {
  const { lessons, loading, error, addLesson, editLesson, removeLesson } =
    useLessons(courseId);
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

  return (
    <div className="p-6">
      <Link
        href="/courses"
        className="text-sm text-[var(--accent)] hover:underline"
      >
        ← Back to Courses
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Lessons
        </h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-text)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          + New Lesson
        </button>
      </div>

      {loading && <p className="text-[var(--text-secondary)]">Loading...</p>}
      {error && <p className="text-[var(--danger)]">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--border-light)]">
                <th className="p-3 text-[var(--text-secondary)] font-medium">
                  Order
                </th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">
                  Title
                </th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">
                  Preview
                </th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">
                  Duration
                </th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((lesson) => (
                  <tr
                    key={lesson._id}
                    className="border-b border-[var(--border-light)] last:border-0"
                  >
                    <td className="p-3 text-[var(--text-secondary)]">
                      {lesson.order}
                    </td>
                    <td className="p-3 text-[var(--text-primary)]">
                      {lesson.title}
                    </td>
                    <td className="p-3">
                      {lesson.isPreview ? (
                        <span className="text-[var(--success)] text-xs">
                          Free
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] text-xs">
                          Locked
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-(--text-secondary)">
                      {formatDuration(lesson.duration)}
                    </td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => openEdit(lesson)}
                        className="text-[var(--accent)] hover:underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="text-[var(--danger)] hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {lessons.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-[var(--text-muted)]"
                  >
                    No lessons yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <LessonFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingLesson}
        courseId={courseId}
      />
    </div>
  );
}
