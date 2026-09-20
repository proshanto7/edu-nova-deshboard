import FormField from "@/components/common/FormField";

export default function AvatarField({ register, initialData }) {
  return (
    <FormField label="Profile photo" htmlFor="mentor-avatar" hint="(optional)">
      {initialData?.avatar && (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-(--border-light) p-2">
          <img
            src={initialData.avatar}
            alt=""
            className="h-12 w-12 shrink-0 rounded-full border border-(--border) object-cover"
          />
          <span className="text-xs text-(--text-muted)">
            Current photo. Upload a new file to replace it.
          </span>
        </div>
      )}

      <input
        id="mentor-avatar"
        type="file"
        accept="image/*"
        {...register("avatar")}
        className="w-full cursor-pointer rounded-xl border border-dashed border-(--border) bg-(--background-input) p-2 text-sm text-(--text-secondary) file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-(--accent) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--accent-text) hover:file:bg-(--accent-hover)"
      />
      <p className="mt-1.5 text-xs text-(--text-muted)">
        JPG, PNG or WebP, up to 2MB.
      </p>
    </FormField>
  );
}
