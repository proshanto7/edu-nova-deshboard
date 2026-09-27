export default function RequestsSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse rounded-2xl border border-(--border) bg-(--background-card) p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-(--border-light)" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-(--border-light)" />
              <div className="h-3 w-1/2 rounded bg-(--border-light)" />
              <div className="h-3 w-2/3 rounded bg-(--border-light)" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
