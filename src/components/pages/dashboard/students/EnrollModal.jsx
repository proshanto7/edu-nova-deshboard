"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import { enrollStudent, getCourses } from "@/lib/api";

export default function EnrollModal({ isOpen, onClose, student, onSuccess }) {
  const [serverError, setServerError] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { courseId: "" } });

  useEffect(() => {
    if (!isOpen) return;

    const fetchCourses = async () => {
      setCoursesLoading(true);
      try {
        const res = await getCourses({ limit: 100 });
        setCourses(res.data.courses);
      } catch (err) {
        setServerError(err.message);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [isOpen]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      await enrollStudent({ studentId: student._id, courseId: data.courseId });
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Enroll ${student?.name || ""}`}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">Select Course</label>

          {coursesLoading ? (
            <p className="text-sm text-(--text-muted)">Loading courses...</p>
          ) : (
            <select
              {...register("courseId", { required: "Please select a course" })}
              className="w-full p-2.5 rounded-lg border border-(--border) bg-(--background-input) text-(--text-primary)"
            >
              <option value="">-- Select a course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title} {course.isFree ? "(Free)" : `— ৳${course.price}`}
                </option>
              ))}
            </select>
          )}

          {errors.courseId && (
            <p className="text-(--danger) text-xs mt-1">{errors.courseId.message}</p>
          )}

          {!coursesLoading && courses.length === 0 && (
            <p className="text-xs text-(--text-muted) mt-1">No courses available yet.</p>
          )}
        </div>

        {serverError && <p className="text-(--danger) text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting || coursesLoading || courses.length === 0}
          className="w-full p-2.5 rounded-lg bg-(--accent) text-(--accent-text) font-medium hover:bg-(--accent-hover) transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Enrolling..." : "Enroll"}
        </button>
      </form>
    </Modal>
  );
}