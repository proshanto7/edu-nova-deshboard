import { labelClass } from "./uiStyles";

/**
 * Label + input + error message wrapper.
 *
 * Use:
 *   <FormField label="Title" htmlFor="title" error={errors.title?.message}>
 *     <input id="title" {...register("title")} className={inputClass(!!errors.title)} />
 *   </FormField>
 */
export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelClass}>
          {label}
          {hint && (
            <span className="ml-1 font-normal text-(--text-muted)">{hint}</span>
          )}
        </label>
      )}
      {children}
      {error && <p className="mt-1.5 text-xs text-(--danger)">{error}</p>}
    </div>
  );
}
