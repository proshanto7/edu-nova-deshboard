"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";

export default function LessonFormModal({ isOpen, onClose, onSubmit, initialData, courseId }) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", description: "", order: 1, isPreview: false },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description || "",
        order: initialData.order,
        isPreview: initialData.isPreview,
      });
    } else {
      reset({ title: "", description: "", order: 1, isPreview: false });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      const formData = new FormData();
      formData.append("course", courseId);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("order", data.order);
      formData.append("isPreview", data.isPreview);

      if (data.video && data.video[0]) {
        formData.append("video", data.video[0]);
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Lesson" : "New Lesson"}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <div>
          <input
            placeholder="Lesson Title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          {errors.title && <p className="text-[var(--danger)] text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Description"
            rows={2}
            {...register("description")}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Order"
              {...register("order", { required: "Order is required", min: 1 })}
              className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
            />
            {errors.order && <p className="text-[var(--danger)] text-xs mt-1">{errors.order.message}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <input type="checkbox" {...register("isPreview")} />
            Free Preview
          </label>
        </div>

        <div>
          <label className="text-sm text-[var(--text-secondary)] block mb-1">
            Video {!initialData && "(required)"}
          </label>
          <input
            type="file"
            accept="video/*"
            {...register("video", { required: !initialData ? "Video is required" : false })}
            className="w-full text-sm text-[var(--text-secondary)]"
          />
          {errors.video && <p className="text-[var(--danger)] text-xs mt-1">{errors.video.message}</p>}
        </div>

        {serverError && <p className="text-[var(--danger)] text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2.5 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
}