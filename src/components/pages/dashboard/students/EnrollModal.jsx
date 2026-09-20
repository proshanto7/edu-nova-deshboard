"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { enrollStudent } from "@/lib/api";
import { useDropdownData } from "@/hooks/useDropdownData";

export default function EnrollModal({ isOpen, onClose, student, onSuccess }) {
  const [serverError, setServerError] = useState("");
  const { categories } = useDropdownData(); // reuse hook just for triggering fetch pattern; courses needed separately below

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { courseId: "" } });

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
          <input
            placeholder="Course ID"
            {...register("courseId", { required: "Course ID is required" })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Courses page থেকে course-এর ID কপি করে বসান (dropdown পরে যোগ করব চাইলে)।
          </p>
          {errors.courseId && (
            <p className="text-[var(--danger)] text-xs mt-1">{errors.courseId.message}</p>
          )}
        </div>

        {serverError && <p className="text-[var(--danger)] text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-text)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          {isSubmitting ? "Enrolling..." : "Enroll"}
        </button>
      </form>
    </Modal>
  );
}