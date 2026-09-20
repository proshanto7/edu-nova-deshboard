import { PlusIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";

export default function CategoriesHeader({
  loading,
  total,
  visible,
  isFiltering,
  onCreate,
}) {
  let subtitle;
  if (loading) {
    subtitle = "Loading categories...";
  } else if (isFiltering) {
    subtitle = `Showing ${visible} of ${total}`;
  } else {
    subtitle = `${total} ${total === 1 ? "category" : "categories"} in total`;
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-(--text-primary) sm:text-2xl">
          Categories
        </h1>
        <p className="mt-1 text-sm text-(--text-secondary)">{subtitle}</p>
      </div>

      <button
        onClick={onCreate}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-2.5 text-sm font-semibold text-(--accent-text) shadow-sm transition-all hover:bg-(--accent-hover) active:scale-[0.98] sm:w-auto ${focusRing}`}
      >
        <PlusIcon />
        New Category
      </button>
    </div>
  );
}
