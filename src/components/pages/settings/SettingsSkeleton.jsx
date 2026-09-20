export default function SettingsSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading settings...</span>

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-(--border) bg-(--background-card) p-4 sm:p-6"
        >
          <div className="h-5 w-32 rounded bg-(--border-light)" />
          <div className="mt-2 h-3 w-56 max-w-full rounded bg-(--border-light)" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-11 rounded-xl bg-(--border-light)" />
            <div className="h-11 rounded-xl bg-(--border-light)" />
          </div>
        </div>
      ))}
    </div>
  );
}