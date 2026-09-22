"use client";

import { useState } from "react";
import { labelClass } from "@/components/common/uiStyles";

export default function IconField({ setValue, clearErrors, error, initialData }) {
  const isEditing = Boolean(initialData);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file abar select korle-o change trigger hobe

    if (!file) return;

    setFileName(file.name);
    setValue("icon", file, { shouldValidate: true, shouldDirty: true });
    clearErrors?.("icon");
  };

  return (
    <div>
      <label htmlFor="category-icon" className={labelClass}>
        Icon{" "}
        {!isEditing && (
          <span className="font-normal text-(--text-muted)">(required)</span>
        )}
      </label>

      {initialData?.icon?.url && (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-(--border-light) p-2">
          <img
            src={initialData.icon.url}
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg border border-(--border) object-contain p-1"
          />
          <span className="text-xs text-(--text-muted)">
            Current icon. Upload a new file to replace it.
          </span>
        </div>
      )}

      <input
        id="category-icon"
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

      {error && (
        <p className="mt-1.5 text-xs text-(--danger)">{error.message}</p>
      )}
    </div>
  );
}