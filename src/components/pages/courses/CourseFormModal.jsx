"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import SelectWrap, { selectClass } from "@/components/common/SelectWrap";
import { inputClass } from "@/components/common/uiStyles";
import { useDropdownData } from "@/hooks/useDropdownData";
import CoursePricingFields from "./CoursePricingFields";
import CourseImageField from "./CourseImageField";
import { EMPTY_COURSE_FORM } from "./constants";

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [serverError, setServerError] = useState("");
  const { categories, mentors } = useDropdownData();

  // Instructor dropdown e shudhu mentor gula dekhabe (student bad)
  const mentorOptions = (mentors ?? []).filter((m) => m.role === "mentor");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...EMPTY_COURSE_FORM, image: null },
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
        image: null,
      });
    } else {
      reset({ ...EMPTY_COURSE_FORM, image: null });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data) => {
   console.log("SUBMIT DATA:", data);
    if (!initialData && !data.image) {
      setServerError("Course image is required");
      return;
    }

    setServerError("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return;
        formData.append(key, value);
      });
      if (data.image) {
        formData.append("image", data.image);
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
      title={initialData ? "Edit Course" : "New Course"}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          label="Title"
          htmlFor="course-title"
          error={errors.title?.message}
        >
          <input
            id="course-title"
            placeholder="e.g. Complete React Bootcamp"
            {...register("title", { required: "Title is required" })}
            className={inputClass(!!errors.title)}
          />
        </FormField>

        <FormField
          label="Description"
          htmlFor="course-description"
          error={errors.description?.message}
        >
          <textarea
            id="course-description"
            placeholder="What will students learn?"
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            className={`${inputClass(!!errors.description)} resize-none`}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Category"
            htmlFor="course-category"
            error={errors.category?.message}
          >
            <SelectWrap>
              <select
                id="course-category"
                {...register("category", { required: "Category is required" })}
                className={selectClass(!!errors.category)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </FormField>

          <FormField
            label="Instructor"
            htmlFor="course-instructor"
            error={errors.instructor?.message}
          >
            <SelectWrap>
              <select
                id="course-instructor"
                {...register("instructor", {
                  required: "Instructor is required",
                })}
                className={selectClass(!!errors.instructor)}
              >
                <option value="">Select Instructor</option>
                {mentorOptions.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Level" htmlFor="course-level">
            <SelectWrap>
              <select
                id="course-level"
                {...register("level")}
                className={selectClass(false)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </SelectWrap>
          </FormField>

          <FormField label="Language" htmlFor="course-language">
            <input
              id="course-language"
              placeholder="Language"
              {...register("language")}
              className={inputClass(false)}
            />
          </FormField>
        </div>

        <CoursePricingFields register={register} errors={errors} />

        <CourseImageField
          setValue={setValue}
          clearErrors={clearErrors}
          error={errors.image}
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