"use client";

import { useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
import CourseCard from "./CourseCard";
import CoursesSkeleton from "./CoursesSkeleton";
import CoursesEmptyState from "./CoursesEmptyState";
import CourseFormModal from "./CourseFormModal";

export default function CoursesPage() {
  const {
    courses,
    loading,
    error,
    page,
    pages,
    total,
    search,
    setSearch,
    addCourse,
    editCourse,
    removeCourse,
    goToPage,
  } = useCourses();

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

  const isFiltering = search.trim().length > 0;
  const ready = !loading && !error;

  let subtitle;
  if (loading) subtitle = "Loading courses...";
  else if (isFiltering) subtitle = `Showing ${courses.length} of ${total}`;
  else subtitle = `${total} ${total === 1 ? "course" : "courses"} in total`;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Courses"
        subtitle={subtitle}
        actionLabel="New Course"
        onAction={openCreate}
      />

      {(total > 0 || isFiltering) && (
        <div className="mb-5 sm:max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by title, category or instructor..."
            label="Search courses"
          />
        </div>
      )}

      {loading && <CoursesSkeleton />}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {error}
        </div>
      )}

      {ready && courses.length === 0 && (
        <CoursesEmptyState
          searchTerm={search}
          onCreate={openCreate}
          onClearSearch={() => setSearch("")}
        />
      )}

      {ready && courses.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {ready && courses.length > 0 && (
        <Pagination page={page} pages={pages} onPageChange={goToPage} />
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