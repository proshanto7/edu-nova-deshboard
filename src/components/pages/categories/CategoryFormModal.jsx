"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";

export default function CategoryFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", description: "", color: "#7d7f4c" },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        color: initialData.color,
      });
    } else {
      reset({ name: "", description: "", color: "#7d7f4c" });
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Category" : "New Category"}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <div>
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          {errors.name && <p className="text-[var(--danger)] text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Description"
            rows={3}
            {...register("description")}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--text-secondary)]">Color</label>
          <input type="color" {...register("color")} className="h-9 w-14 rounded cursor-pointer" />
        </div>

        <div>
          <label className="text-sm text-[var(--text-secondary)] block mb-1">
            Icon {!initialData && "(required)"}
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("icon", { required: !initialData ? "Icon is required" : false })}
            className="w-full text-sm text-[var(--text-secondary)]"
          />
          {errors.icon && <p className="text-[var(--danger)] text-xs mt-1">{errors.icon.message}</p>}
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