export default function LessonsSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-4 sm:p-5"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--border-light)]" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 w-3/5 rounded bg-[var(--border-light)]" />
            <div className="h-3 w-2/5 rounded bg-[var(--border-light)]" />
          </div>
          <div className="hidden h-9 w-40 rounded-lg bg-[var(--border-light)] sm:block" />
        </li>
      ))}
    </ul>
  );
}