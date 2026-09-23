"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import { inputClass, labelClass } from "@/components/common/uiStyles";
import ColorField from "./ColorField";
import IconField from "./IconField";
import { DEFAULT_CATEGORY_COLOR } from "./constants";

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", description: "", color: DEFAULT_CATEGORY_COLOR },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        color: initialData.color,
      });
    } else {
      reset({ name: "", description: "", color: DEFAULT_CATEGORY_COLOR });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("color", data.color);
      if (data.icon && data.icon[0]) {
        formData.append("icon", data.icon[0]);
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Category" : "New Category"}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        <div>
          <label htmlFor="category-name" className={labelClass}>
            Name
          </label>
          <input
            id="category-name"
            placeholder="e.g. Web Development"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", { required: "Name is required" })}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-(--danger)">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category-description" className={labelClass}>
            Description
          </label>
          <textarea
            id="category-description"
            placeholder="Short description (optional)"
            rows={3}
            {...register("description")}
            className={`${inputClass(false)} resize-none`}
          />
        </div>

        <ColorField register={register} />
        <IconField
          register={register}
          error={errors.icon}
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
