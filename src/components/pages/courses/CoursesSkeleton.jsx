export default function CoursesSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-(--border) bg-(--background-card)"
        >
          <div className="aspect-video w-full bg-(--border-light)" />
          <div className="space-y-3 p-4 sm:p-5">
            <div className="h-4 w-4/5 rounded bg-(--border-light)" />
            <div className="h-3 w-1/3 rounded bg-(--border-light)" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-5 w-16 rounded bg-(--border-light)" />
              <div className="h-4 w-10 rounded bg-(--border-light)" />
            </div>
            <div className="h-9 rounded-lg bg-(--border-light)" />
          </div>
        </li>
      ))}
    </ul>
  );
}
