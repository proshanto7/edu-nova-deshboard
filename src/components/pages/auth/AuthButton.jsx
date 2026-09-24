import { focusRing } from "@/components/common/uiStyles";

// <Link> ba <a> ke button er moto dekhate chaile eta className hishebe dao
export const primaryButtonClass = `inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-5 text-base font-semibold text-(--accent-text) transition hover:bg-(--accent-hover) active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 animate-spin motion-reduce:animate-none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function AuthButton({
  loading = false,
  loadingText,
  children,
  disabled,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      className={`${primaryButtonClass} ${className}`}
    >
      {loading && <Spinner />}
      {loading ? loadingText : children}
    </button>
  );
}
