import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";

// min: 0 rule e message nai, tai fallback message dekhabo
const getMessage = (error, fallback) =>
  error ? error.message || fallback : "";

export default function CoursePricingFields({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Price (৳)"
          htmlFor="course-price"
          error={getMessage(errors.price, "Price must be 0 or more")}
        >
          <input
            id="course-price"
            type="number"
            inputMode="decimal"
            placeholder="0"
            {...register("price", { required: "Price is required", min: 0 })}
            className={inputClass(!!errors.price)}
          />
        </FormField>

        <FormField
          label="Discount price (৳)"
          htmlFor="course-discount-price"
          hint="(optional)"
          error={getMessage(errors.discountPrice, "Discount must be 0 or more")}
        >
          <input
            id="course-discount-price"
            type="number"
            inputMode="decimal"
            placeholder="0"
            {...register("discountPrice", { min: 0 })}
            className={inputClass(!!errors.discountPrice)}
          />
        </FormField>
      </div>

      {/* Free toggle switch */}
      <label
        htmlFor="course-is-free"
        className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--background-input) px-3.5 py-3"
      >
        <span className="text-sm font-medium text-(--text-primary)">
          This course is free
        </span>

        <input
          id="course-is-free"
          type="checkbox"
          {...register("isFree")}
          className="peer sr-only"
        />
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-(--border) transition-colors peer-checked:bg-(--accent) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--accent) after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}
