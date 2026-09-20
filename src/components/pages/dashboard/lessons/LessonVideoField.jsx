import FormField from "@/components/common/FormField";

export default function LessonVideoField({ register, error, initialData }) {
  const isEditing = Boolean(initialData);

  return (
    <FormField
      label="Video"
      htmlFor="lesson-video"
      hint={!isEditing ? "(required)" : undefined}
      error={error?.message}
    >
      {isEditing && (
        <p className="mb-2 text-xs text-(--text-muted)">
          Leave empty to keep the current video, or upload a new file to replace
          it.
        </p>
      )}

      <input
        id="lesson-video"
        type="file"
        accept="video/*"
        aria-invalid={error ? "true" : "false"}
        {...register("video", {
          required: !isEditing ? "Video is required" : false,
        })}
        className="w-full cursor-pointer rounded-xl border border-dashed border-(--border) bg-(--background-input) p-2 text-sm text-(--text-secondary) file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-(--accent) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--accent-text) hover:file:bg-(--accent-hover)"
      />
    </FormField>
  );
}
