import { useFieldArray } from "react-hook-form";
import FormField from "@/components/common/FormField";
import { inputClass, focusRing } from "@/components/common/uiStyles";
import { CloseIcon } from "@/components/common/Icons";

/**
 * "Requirements" / "What you'll learn" er moto dynamic string-list field.
 * Empty row gula submit-er age filter kore ferot dite hobe (parent-e handle kora).
 */
export default function CourseListField({ control, register, name, label, placeholder }) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <FormField label={label}>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              placeholder={placeholder}
              {...register(`${name}.${index}`)}
              className={inputClass(false)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              aria-label="Remove"
              className={`shrink-0 rounded-lg border border-(--border) p-2.5 text-(--text-secondary) transition-colors hover:bg-(--border-light) hover:text-(--danger) disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append("")}
        className={`mt-2 text-sm font-medium text-(--accent) hover:underline ${focusRing}`}
      >
        + Add another
      </button>
    </FormField>
  );
}
