"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import SelectWrap, { selectClass } from "@/components/common/SelectWrap";
import { inputClass } from "@/components/common/uiStyles";
import { useDropdownData } from "@/hooks/useDropdownData";
import CoursePricingFields from "./CoursePricingFields";
import CourseListField from "./CourseListField";
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
    control,
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
        totalDuration: initialData.totalDuration ?? "",
        totalLectures: initialData.totalLectures ?? "",
        isPublished: initialData.isPublished ?? false,
        // Kono item na thakle ekta khali row rakhi, na hole "+ Add another" chara kichu dekha jabe na
        requirements:
          initialData.requirements?.length > 0
            ? initialData.requirements
            : [""],
        whatYouWillLearn:
          initialData.whatYouWillLearn?.length > 0
            ? initialData.whatYouWillLearn
            : [""],
        image: null,
      });
    } else {
      reset({ ...EMPTY_COURSE_FORM, image: null });
    }
  }, [initialData, reset, isOpen]);

  // categories/mentors async e load hoy — Edit mode e initialData-er reset()
  // options ready howar age fire hote pare, tai option add howar por abar sync kori.
  useEffect(() => {
    if (initialData && categories.length > 0) {
      setValue("category", initialData.category?._id || "");
    }
  }, [initialData, categories, setValue]);

  useEffect(() => {
    if (initialData && mentorOptions.length > 0) {
      setValue("instructor", initialData.instructor?._id || "");
    }
  }, [initialData, mentorOptions, setValue]);

  const onFormSubmit = async (data) => {
    if (!initialData && !data.image) {
      setServerError("Course image is required");
      return;
    }

    setServerError("");
    try {
      // Khali/duplicate row gula bad diye pathai
      const requirements = data.requirements
        .map((r) => r.trim())
        .filter(Boolean);
      const whatYouWillLearn = data.whatYouWillLearn
        .map((r) => r.trim())
        .filter(Boolean);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (["image", "requirements", "whatYouWillLearn"].includes(key)) return;
        formData.append(key, value);
      });
      // Array field — backend jodi multer/express diye multipart parse kore,
      // shei row `key[]` name-e barbar append korle array hishebe pouchay.
      requirements.forEach((item) => formData.append("requirements[]", item));
      whatYouWillLearn.forEach((item) =>
        formData.append("whatYouWillLearn[]", item),
      );
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Total duration"
            htmlFor="course-total-duration"
            hint="(minutes, optional)"
            error={
              errors.totalDuration
                ? errors.totalDuration.message || "Must be 0 or more"
                : ""
            }
          >
            <input
              id="course-total-duration"
              type="number"
              inputMode="numeric"
              placeholder="0"
              {...register("totalDuration", { min: 0 })}
              className={inputClass(!!errors.totalDuration)}
            />
          </FormField>

          <FormField
            label="Total lectures"
            htmlFor="course-total-lectures"
            hint="(optional)"
            error={
              errors.totalLectures
                ? errors.totalLectures.message || "Must be 0 or more"
                : ""
            }
          >
            <input
              id="course-total-lectures"
              type="number"
              inputMode="numeric"
              placeholder="0"
              {...register("totalLectures", { min: 0 })}
              className={inputClass(!!errors.totalLectures)}
            />
          </FormField>
        </div>

        <CourseListField
          control={control}
          register={register}
          name="requirements"
          label="Requirements"
          placeholder="e.g. Basic JavaScript knowledge"
        />

        <CourseListField
          control={control}
          register={register}
          name="whatYouWillLearn"
          label="What you'll learn"
          placeholder="e.g. Build REST APIs with Node.js"
        />

        <CoursePricingFields register={register} errors={errors} />

        {/* Publish toggle — off thakle course student-der kache dekhabe na */}
        <label
          htmlFor="course-is-published"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--background-input) px-3.5 py-3"
        >
          <span className="text-sm font-medium text-(--text-primary)">
            Publish this course
          </span>
          <input
            id="course-is-published"
            type="checkbox"
            {...register("isPublished")}
            className="peer sr-only"
          />
          <span className="relative h-6 w-11 shrink-0 rounded-full bg-(--border) transition-colors peer-checked:bg-(--accent) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--accent) after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
        </label>

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