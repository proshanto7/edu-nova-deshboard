import { PencilIcon, TrashIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import { DEFAULT_CATEGORY_COLOR } from "./constants";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const color = category.color || DEFAULT_CATEGORY_COLOR;
  const count = category.courseCount ?? 0;

  return (
    <li className="group flex min-w-0 flex-col rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl"
          style={{ backgroundColor: `${color}26` }}
        >
          {category.icon?.url ? (
            <img
              src={category.icon.url}
              alt={category.name}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <span className="text-lg font-bold" style={{ color }}>
              {category.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-(--text-primary)">
            {category.name}
          </h3>
          <p className="mt-0.5 text-xs text-(--text-muted)">
            {count} {count === 1 ? "course" : "courses"}
          </p>
        </div>

        <span
          className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          title={color}
          aria-hidden="true"
        />
      </div>

      {category.description && (
        <p className="mt-3 line-clamp-2 text-sm text-(--text-secondary)">
          {category.description}
        </p>
      )}

      <div className="mt-auto pt-4">
        <div className="flex gap-2 border-t border-(--border-light) pt-3">
          <button
            onClick={() => onEdit(category)}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            <PencilIcon />
            Edit
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-(--danger)/25 px-3 py-2 text-sm font-medium text-(--danger) transition-colors hover:bg-(--danger-bg) ${focusRing}`}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
