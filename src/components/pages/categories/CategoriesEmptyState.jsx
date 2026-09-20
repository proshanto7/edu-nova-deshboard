import { FolderIcon, PlusIcon, SearchIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function CategoriesEmptyState({
  searchTerm = "",
  onCreate,
  onClearSearch,
}) {
  const term = searchTerm.trim();
  const isSearching = term.length > 0;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--border) bg-(--background-card) px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--border-light) text-(--text-secondary)">
        {isSearching ? <SearchIcon className="h-6 w-6" /> : <FolderIcon />}
      </div>

      {isSearching ? (
        <>
          <h2 className="max-w-full wrap-break-word text-base font-semibold text-(--text-primary)">
            No results for “{term}”
          </h2>
          <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">
            Try a different name, or clear the search to see all categories.
          </p>
          <button
            onClick={onClearSearch}
            className={`mt-5 inline-flex items-center gap-2 rounded-xl border border-(--border) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--border-light) ${focusRing}`}
          >
            Clear search
          </button>
        </>
      ) : (
        <>
          <h2 className="text-base font-semibold text-(--text-primary)">
            No categories yet.
          </h2>
          <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">
            Create your first category to start grouping your courses.
          </p>
          <button
            onClick={onCreate}
            className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-(--accent) px-4 py-2.5 text-sm font-semibold text-(--accent-text) transition-all hover:bg-(--accent-hover) active:scale-[0.98] ${focusRing}`}
          >
            <PlusIcon />
            New Category
          </button>
        </>
      )}
    </div>
  );
}
