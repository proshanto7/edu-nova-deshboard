// Focus ring: keyboard diye navigate korle button/link e dekhabe
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

// Form label
export const labelClass = "mb-1.5 block text-sm font-medium text-[var(--text-primary)]";

// Form input / textarea. text-base mobile e (iOS zoom bondho korte), sm+ e text-sm
export const inputClass = (hasError = false) =>
  `w-full rounded-xl border bg-[var(--background-input)] px-3.5 py-2.5 text-base text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:ring-2 sm:text-sm ${
    hasError
      ? "border-[var(--danger)] focus:ring-[var(--danger)]/20"
      : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
  }`;