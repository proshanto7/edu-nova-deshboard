export default function ColorField({ register }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--background-input) px-3.5 py-2.5">
      <label
        htmlFor="category-color"
        className="text-sm font-medium text-(--text-primary)"
      >
        Color
      </label>
      <input
        id="category-color"
        type="color"
        {...register("color")}
        className="h-9 w-14 cursor-pointer rounded-lg border border-(--border) bg-transparent p-0.5"
      />
    </div>
  );
}
