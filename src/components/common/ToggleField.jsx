/**
 * Reusable toggle switch (checkbox er design).
 *
 * Use:
 *   <ToggleField id="is-preview" label="Free Preview" inputProps={register("isPreview")} />
 *
 * inputProps e register(...) er result pass korte hobe.
 */
export default function ToggleField({ id, label, inputProps, className = "" }) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--background-input) px-3.5 py-3 ${className}`}
    >
      <span className="text-sm font-medium text-(--text-primary)">{label}</span>

      <input id={id} type="checkbox" {...inputProps} className="peer sr-only" />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-(--border) transition-colors peer-checked:bg-(--accent) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--accent) after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}
