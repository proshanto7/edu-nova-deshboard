"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import { useDropdownData } from "@/hooks/useDropdownData";

export default function CourseFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [serverError, setServerError] = useState("");
  const { categories, mentors } = useDropdownData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      instructor: "",
      level: "beginner",
      language: "English",
      price: "",
      discountPrice: "",
      isFree: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category?._id || "",
        instructor: initialData.instructor?._id || "",
        level: initialData.level,
        language: initialData.language,
        price: initialData.price,
        discountPrice: initialData.discountPrice || "",
        isFree: initialData.isFree,
      });
    } else {
      reset({
        title: "",
        description: "",
        category: "",
        instructor: "",
        level: "beginner",
        language: "English",
        price: "",
        discountPrice: "",
        isFree: false,
      });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return;
        formData.append(key, value);
      });
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Course" : "New Course"}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3" noValidate>
        <div>
          <input
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          {errors.title && <p className="text-[var(--danger)] text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Description"
            rows={3}
            {...register("description", { required: "Description is required" })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          {errors.description && (
            <p className="text-[var(--danger)] text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-[var(--danger)] text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("instructor", { required: "Instructor is required" })}
              className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
            >
              <option value="">Select Instructor</option>
              {mentors.map((m) => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
            {errors.instructor && (
              <p className="text-[var(--danger)] text-xs mt-1">{errors.instructor.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            {...register("level")}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            placeholder="Language"
            {...register("language")}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price"
            {...register("price", { required: "Price is required", min: 0 })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          <input
            type="number"
            placeholder="Discount Price"
            {...register("discountPrice", { min: 0 })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input type="checkbox" {...register("isFree")} />
          This course is free
        </label>

        <div>
          <label className="text-sm text-[var(--text-secondary)] block mb-1">
            Course Image {!initialData && "(required)"}
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: !initialData ? "Image is required" : false })}
            className="w-full text-sm text-[var(--text-secondary)]"
          />
          {errors.image && <p className="text-[var(--danger)] text-xs mt-1">{errors.image.message}</p>}
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