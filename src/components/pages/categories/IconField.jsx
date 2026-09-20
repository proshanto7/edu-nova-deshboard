import { labelClass } from "@/components/common/uiStyles";

export default function IconField({ register, error, initialData }) {
  const isEditing = Boolean(initialData);

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
        {...register("icon", {
          required: !isEditing ? "Icon is required" : false,
        })}
        className="w-full cursor-pointer rounded-xl border border-dashed border-(--border) bg-(--background-input) p-2 text-sm text-(--text-secondary) file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-(--accent) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--accent-text) hover:file:bg-(--accent-hover)"
      />
      {error && (
        <p className="mt-1.5 text-xs text-(--danger)">{error.message}</p>
      )}
    </div>
  );
}
