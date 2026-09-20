import Avatar from "@/components/common/Avatar";
import { BookIcon, PlusIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function StudentCard({ student, onEnroll, onViewEnrollments }) {
  return (
    <li className="flex min-w-0 flex-col rounded-2xl border border-(--border) bg-(--background-card) p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar name={student.name} />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-(--text-primary)">
            {student.name}
          </h3>
          <p
            className="truncate text-sm text-(--text-secondary)"
            title={student.email}
          >
            {student.email}
          </p>
        </div>
      </div>

      <div className="mt-3">
        {student.isVerified ? (
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
      </div>

      <div className="mt-auto pt-4">
        <div className="grid grid-cols-2 gap-2 border-t border-(--border-light) pt-3">
          <button
            onClick={() => onEnroll(student)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--accent)/30 px-3 py-2 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent)/10 ${focusRing}`}
          >
            <PlusIcon />
            Enroll
          </button>
          <button
            onClick={() => onViewEnrollments(student)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            <BookIcon />
            Enrollments
          </button>
        </div>
      </div>
    </li>
  );
}
