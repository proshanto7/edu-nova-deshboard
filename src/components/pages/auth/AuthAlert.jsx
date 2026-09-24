import { AlertIcon } from "@/components/common/Icons";

// children khali hole kichu render hoy na. role="alert" — screen reader e sathe sathe pore
export default function AuthAlert({ children }) {
  if (!children) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-(--danger)/25 bg-(--danger-bg) px-3.5 py-3 text-sm text-(--danger)"
    >
      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="min-w-0 wrap-break-word">{children}</span>
    </div>
  );
}
