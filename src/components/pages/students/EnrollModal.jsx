"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import SelectWrap, { selectClass } from "@/components/common/SelectWrap";
import { enrollStudent, getCourses } from "@/lib/api";
import StudentInfoBar from "./StudentInfoBar";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Enroll ${student?.name || ""}`}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        {student && <StudentInfoBar student={student} />}

        <FormField
          label="Select Course"
          htmlFor="enroll-course"
          error={errors.courseId?.message}
        >
          {coursesLoading ? (
            <div
              role="status"
              className="h-11 animate-pulse rounded-xl bg-(--border-light)"
            >
              <span className="sr-only">Loading courses...</span>
            </div>
          ) : (
            <SelectWrap>
              <select
                id="enroll-course"
                {...register("courseId", {
                  required: "Please select a course",
                })}
                className={selectClass(!!errors.courseId)}
              >
                <option value="">-- Select a course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}{" "}
                    {course.isFree ? "(Free)" : `— ৳${course.price}`}
                  </option>
                ))}
              </select>
            </SelectWrap>
          )}

          {!coursesLoading && courses.length === 0 && (
            <p className="mt-1.5 text-xs text-(--text-muted)">
              No courses available yet.
            </p>
          )}
        </FormField>

        {serverError && (
          <p
            role="alert"
            className="rounded-lg bg-(--danger-bg) px-3 py-2.5 text-sm text-(--danger)"
          >
            {serverError}
          </p>
        )}

        {/* Mobile e stack, sm+ e ek line e */}
        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light)"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || coursesLoading || courses.length === 0}
            className="rounded-xl bg-(--accent) px-5 py-2.5 text-sm font-semibold text-(--accent-text) transition-all hover:bg-(--accent-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Enrolling..." : "Enroll"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
