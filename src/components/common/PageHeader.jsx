import { PlusIcon } from "./Icons";
import { focusRing } from "./uiStyles";

/**
 * Use:
 *   <PageHeader title="Courses" subtitle="12 courses in total" actionLabel="New Course" onAction={openCreate} />
 * actionLabel dile "+" icon shoho button dekhabe, na dile shudhu title.
 */
export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-(--text-primary) sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-(--text-secondary)">{subtitle}</p>
        )}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-2.5 text-sm font-semibold text-(--accent-text) shadow-sm transition-all hover:bg-(--accent-hover) active:scale-[0.98] sm:w-auto ${focusRing}`}
        >
          <PlusIcon />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
