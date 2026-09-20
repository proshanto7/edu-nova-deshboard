"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import CourseFormModal from "./CourseFormModal";

export default function CoursesPage() {
  const { courses, loading, error, addCourse, editCourse, removeCourse } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const openCreate = () => {
    setEditingCourse(null);
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingCourse) {
      await editCourse(editingCourse._id, formData);
    } else {
      await addCourse(formData);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await removeCourse(id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--text-primary)">Courses</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-(--accent) text-(--accent-text) font-medium hover:bg-(--accent-hover) transition-colors"
        >
          + New Course
        </button>
      </div>

      {loading && <p className="text-(--text-secondary)">Loading...</p>}
      {error && <p className="text-(--danger)">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border border-(--border) bg-(--background-card) overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-(--border-light)">
                <th className="p-3 text-(--text-secondary) font-medium">Image</th>
                <th className="p-3 text-(--text-secondary) font-medium">Title</th>
                <th className="p-3 text-(--text-secondary) font-medium">Category</th>
                <th className="p-3 text-(--text-secondary) font-medium">Price</th>
                <th className="p-3 text-(--text-secondary) font-medium">Students</th>
                <th className="p-3 text-(--text-secondary) font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-(--border-light) last:border-0">
                  <td className="p-3">
                    {course.image?.url && (
                      <img src={course.image.url} alt={course.title} className="w-10 h-10 rounded object-cover" />
                    )}
                  </td>
                  <td className="p-3 text-(--text-primary)">{course.title}</td>
                  <td className="p-3 text-(--text-secondary)">{course.category?.name}</td>
                  <td className="p-3 text-(--text-secondary)">
                    {course.isFree ? "Free" : `৳${course.price}`}
                  </td>
                  <td className="p-3 text-(--text-secondary)">{course.students}</td>
                  <td className="p-3 space-x-2">
                    <Link
                      href={`/courses/${course._id}/lessons`}
                      className="text-(--success) hover:underline text-xs"
                    >
                      Lessons
                    </Link>
                    <button onClick={() => openEdit(course)} className="text-(--accent) hover:underline text-xs">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(course._id)} className="text-(--danger) hover:underline text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-(--text-muted)">
                    No courses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CourseFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCourse}
      />
    </div>
  );
}