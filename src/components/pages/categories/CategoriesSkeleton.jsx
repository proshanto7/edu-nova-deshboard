export default function CategoriesSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse rounded-2xl border border-(--border) bg-(--background-card) p-4 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-(--border-light)" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-(--border-light)" />
              <div className="h-3 w-1/3 rounded bg-(--border-light)" />
            </div>
          </div>
          <div className="mt-4 h-9 rounded-lg bg-(--border-light)" />
        </li>
      ))}
    </ul>
  );
}
