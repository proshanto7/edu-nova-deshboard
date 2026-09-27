import { UsersIcon } from "@/components/common/Icons";

export default function StudentsEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--border) bg-(--background-card) px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--border-light) text-(--text-secondary)">
        <UsersIcon className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-(--text-primary)">
        No students yet.
      </h2>
      <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">
        Students will show up here once they sign up.
      </p>
    </div>
  );
}
