"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import ToggleField from "@/components/common/ToggleField";
import { inputClass } from "@/components/common/uiStyles";
import LessonVideoField from "./LessonVideoField";
import { EMPTY_LESSON_FORM } from "./constants";

export default function LessonFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  courseId,
}) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EMPTY_LESSON_FORM,
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
      reset(EMPTY_LESSON_FORM);
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

  // min: 1 rule e message nai, tai fallback message dekhabo
  const orderError = errors.order
    ? errors.order.message || "Order must be 1 or more"
    : "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Lesson" : "New Lesson"}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          label="Lesson title"
          htmlFor="lesson-title"
          error={errors.title?.message}
        >
          <input
            id="lesson-title"
            placeholder="e.g. Introduction to Components"
            {...register("title", { required: "Title is required" })}
            className={inputClass(!!errors.title)}
          />
        </FormField>

        <FormField
          label="Description"
          htmlFor="lesson-description"
          hint="(optional)"
        >
          <textarea
            id="lesson-description"
            placeholder="What is covered in this lesson?"
            rows={3}
            {...register("description")}
            className={`${inputClass(false)} resize-none`}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Order" htmlFor="lesson-order" error={orderError}>
            <input
              id="lesson-order"
              type="number"
              inputMode="numeric"
              placeholder="1"
              {...register("order", { required: "Order is required", min: 1 })}
              className={inputClass(!!errors.order)}
            />
          </FormField>

          <ToggleField
            id="lesson-is-preview"
            label="Free Preview"
            inputProps={register("isPreview")}
            className="sm:mt-[1.65rem]"
          />
        </div>

        <LessonVideoField
          register={register}
          error={errors.video}
          initialData={initialData}
        />

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
            disabled={isSubmitting}
            className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-(--primary-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
