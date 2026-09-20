import Avatar from "@/components/common/Avatar";
import { PencilIcon, TrashIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function MentorCard({ mentor, onEdit, onDelete }) {
  const joined = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <li className="flex min-w-0 flex-col rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar name={mentor.name} src={mentor.avatar} />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-(--text-primary)">
            {mentor.name}
          </h3>
          <p
            className="truncate text-sm text-(--text-secondary)"
            title={mentor.email}
          >
            {mentor.email}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        {mentor.isVerified ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--success)/10 px-2.5 py-1 text-xs font-medium text-(--success)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--warning)/10 px-2.5 py-1 text-xs font-medium text-(--warning)">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Unverified
          </span>
        )}

        {joined && (
          <span className="text-xs text-(--text-muted)">Joined {joined}</span>
        )}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex gap-2 border-t border-(--border-light) pt-3">
          <button
            onClick={() => onEdit(mentor)}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            <PencilIcon />
            Edit
          </button>
          <button
            onClick={() => onDelete(mentor._id)}
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
