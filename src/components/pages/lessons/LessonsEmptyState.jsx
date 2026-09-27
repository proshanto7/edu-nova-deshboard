import { PlayIcon, PlusIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function LessonsEmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--border) bg-(--background-card) px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--border-light) text-(--text-secondary)">
        <PlayIcon className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-(--text-primary)">
        No lessons yet.
      </h2>
      <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">
        Add the first lesson to start building this course.
      </p>
      <button
        onClick={onCreate}
        className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-(--accent) px-4 py-2.5 text-sm font-semibold text-(--accent-text) transition-all hover:bg-(--accent-hover) active:scale-[0.98] ${focusRing}`}
      >
        <PlusIcon />
        New Lesson
      </button>
    </div>
  );
}
