import { ChevronDownIcon } from "./Icons";

// <select> er class. text-base mobile e (iOS zoom bondho korte), sm+ e text-sm
export const selectClass = (hasError = false) =>
  `w-full cursor-pointer appearance-none rounded-xl border bg-[var(--background-input)] py-2.5 pr-10 pl-3.5 text-base text-[var(--text-primary)] outline-none transition focus:ring-2 sm:text-sm ${
    hasError
      ? "border-[var(--danger)] focus:ring-[var(--danger)]/20"
      : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
  }`;

/**
 * Use:
 *   <SelectWrap>
 *     <select {...register("level")} className={selectClass(false)}>...</select>
 *   </SelectWrap>
 */
export default function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-(--text-muted)">
        <ChevronDownIcon />
      </span>
    </div>
  );
}
