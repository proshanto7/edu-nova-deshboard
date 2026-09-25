"use client";

export default function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  const goTo = (p) => {
    if (p < 1 || p > pages || p === page) return;
    onPageChange(p);
  };

  // page number gulo generate kora — beshi hole ... diye short kora
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(pages, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (range[0] > 1) {
      range.unshift(range[0] > 2 ? "..." : 1);
      if (range[0] === "...") range.unshift(1);
    }
    if (range[range.length - 1] < pages) {
      if (range[range.length - 1] < pages - 1) range.push("...");
      range.push(pages);
    }
    return range;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-center gap-1"
    >
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="rounded-lg border border-(--border) px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Prev
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-sm text-(--muted)">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            aria-current={p === page ? "page" : undefined}
            className={`min-w-9 rounded-lg border px-3 py-1.5 text-sm ${
              p === page
                ? "border-(--primary) bg-(--primary) text-white"
                : "border-(--border)"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page === pages}
        className="rounded-lg border border-(--border) px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}