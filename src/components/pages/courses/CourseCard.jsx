import Link from "next/link";
import {
  BookIcon,
  ImageIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

const actionBase =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors sm:text-sm";

export default function CourseCard({ course, onEdit, onDelete }) {
  const students = course.students ?? 0;
  const hasDiscount = !course.isFree && Number(course.discountPrice) > 0;

  return (
    <li className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--background-card) transition-all hover:-translate-y-0.5 hover:shadow-lg">
      {/* Image + badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-(--border-light)">
        {course.image?.url ? (
          <img
            src={course.image.url}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-(--text-muted)">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}

        {course.category?.name && (
          <span className="absolute top-3 left-3 max-w-[60%] truncate rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {course.category.name}
          </span>
        )}

        {course.level && (
          <span className="absolute top-3 right-3 rounded-full bg-(--background-card)/90 px-2.5 py-1 text-xs font-medium text-(--text-primary) capitalize backdrop-blur">
            {course.level}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-(--text-primary)">
          {course.title}
        </h3>

        {course.instructor?.name && (
          <p className="mt-1 truncate text-sm text-(--text-secondary)">
            by {course.instructor.name}
          </p>
        )}

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {course.isFree ? (
              <span className="text-lg font-bold text-(--success)">Free</span>
            ) : (
              <span className="text-lg font-bold text-(--text-primary)">
                ৳{course.price}
              </span>
            )}
            {hasDiscount && (
              <p className="text-xs text-(--success)">
                Discount ৳{course.discountPrice}
              </p>
            )}
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-(--text-secondary)">
            <UsersIcon />
            {students}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4">
          <div className="grid grid-cols-3 gap-2 border-t border-(--border-light) pt-3">
            <Link
              href={`/dashboard/courses/${course._id}/lessons`}
              className={`${actionBase} border-(--success)/30 text-(--success) hover:bg-(--success)/10 ${focusRing}`}
            >
              <BookIcon />
              Lessons
            </Link>
            <button
              onClick={() => onEdit(course)}
              className={`${actionBase} border-(--border) text-(--text-primary) hover:bg-(--border-light) ${focusRing}`}
            >
              <PencilIcon />
              Edit
            </button>
            <button
              onClick={() => onDelete(course._id)}
              className={`${actionBase} border-(--danger)/25 text-(--danger) hover:bg-(--danger-bg) ${focusRing}`}
            >
              <TrashIcon />
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
