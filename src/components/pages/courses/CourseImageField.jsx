"use client";

import { useState } from "react";
import FormField from "@/components/common/FormField";

export default function CourseImageField({
  setValue,
  clearErrors,
  error,
  initialData,
}) {
  const isEditing = Boolean(initialData);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file abar select korle-o change trigger hobe

    if (!file) return;

    setFileName(file.name);
    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    clearErrors?.("image");
  };

  return (
    <FormField
      label="Course image"
      htmlFor="course-image"
      hint={!isEditing ? "(required)" : undefined}
      error={error?.message}
    >
      {initialData?.image?.url && (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-(--border-light) p-2">
          <img
            src={initialData.image.url}
            alt=""
            className="h-14 w-24 shrink-0 rounded-lg border border-(--border) object-cover"
          />
          <span className="text-xs text-(--text-muted)">
            Current image. Upload a new file to replace it.
          </span>
        </div>
      )}

      <input
        id="course-image"
        type="file"
        accept="image/*"
        aria-invalid={error ? "true" : "false"}
        onChange={handleChange}
        className="w-full cursor-pointer rounded-xl border border-dashed border-(--border) bg-(--background-input) p-2 text-sm text-(--text-secondary) file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-(--accent) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--accent-text) hover:file:bg-(--accent-hover)"
      />

      {fileName && (
        <p className="mt-1.5 text-xs text-(--text-muted)">
          Selected: {fileName}
        </p>
      )}
    </FormField>
  );
}