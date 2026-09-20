import {
  ClockIcon,
  LockIcon,
  PencilIcon,
  PlayIcon,
  TrashIcon,
} from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import { formatDuration } from "./formatDuration";

export default function LessonItem({ lesson, onEdit, onDelete }) {
  return (
    <li className="flex min-w-0 flex-col gap-4 rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
        {/* Order badge */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--accent)/10 text-sm font-bold text-(--accent)">
          {lesson.order}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="wrap-break-word text-base font-semibold text-(--text-primary)">
            {lesson.title}
          </h3>

          {lesson.description && (
            <p className="mt-1 line-clamp-2 text-sm text-(--text-secondary)">
              {lesson.description}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {lesson.isPreview ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-(--success)/10 px-2.5 py-1 text-xs font-medium text-(--success)">
                <PlayIcon className="h-3.5 w-3.5" />
                Free
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-(--border-light) px-2.5 py-1 text-xs font-medium text-(--text-muted)">
                <LockIcon className="h-3.5 w-3.5" />
                Locked
              </span>
            )}

            <span className="inline-flex items-center gap-1 text-xs text-(--text-secondary)">
              <ClockIcon className="h-3.5 w-3.5" />
              {formatDuration(lesson.duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions: mobile e full width, sm+ e right side e */}
      <div className="flex gap-2 sm:shrink-0">
        <button
          onClick={() => onEdit(lesson)}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) sm:flex-none ${focusRing}`}
        >
          <PencilIcon />
          Edit
        </button>
        <button
          onClick={() => onDelete(lesson._id)}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-(--danger)/25 px-3 py-2 text-sm font-medium text-(--danger) transition-colors hover:bg-(--danger-bg) sm:flex-none ${focusRing}`}
        >
          <TrashIcon />
          Delete
        </button>
      </div>
    </li>
  );
}
