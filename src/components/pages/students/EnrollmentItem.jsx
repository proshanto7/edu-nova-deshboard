import { focusRing } from "@/components/common/uiStyles";

export default function EnrollmentItem({ enrollment, onRevoke }) {
  const course = enrollment.course;

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-(--border-light) bg-background p-3 sm:p-4">
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word text-sm font-medium text-(--text-primary)">
          {course?.title}
        </p>

        <div className="mt-1">
          {course?.isFree ? (
            <span className="inline-flex rounded-full bg-(--success)/10 px-2 py-0.5 text-xs font-medium text-(--success)">
              Free
            </span>
          ) : (
            <span className="text-xs text-(--text-muted)">
              ৳{course?.price}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onRevoke(enrollment._id)}
        className={`shrink-0 rounded-lg border border-(--danger) px-3 py-1.5 text-xs font-medium text-(--danger) transition-colors hover:bg-(--danger) hover:text-white sm:text-sm ${focusRing}`}
      >
        Revoke
      </button>
    </li>
  );
}
