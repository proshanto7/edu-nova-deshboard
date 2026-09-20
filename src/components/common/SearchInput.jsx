"use client";

import { SearchIcon, CloseIcon } from "./Icons";

/**
 * Reusable search box (controlled component).
 *
 * Use:
 *   const [search, setSearch] = useState("");
 *   <SearchInput value={search} onChange={setSearch} placeholder="Search courses..." />
 *
 * Note: onChange e event na, seedha string value pass hoy.
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  label = "Search",
  autoFocus = false,
  className = "",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && value) onChange("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-(--text-muted)">
        <SearchIcon />
      </span>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={label}
        autoFocus={autoFocus}
        autoComplete="off"
        className="w-full rounded-xl border border-(--border) bg-(--background-input) py-2.5 pr-10 pl-10 text-base text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 sm:text-sm [&::-webkit-search-cancel-button]:appearance-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-(--text-muted) transition-colors hover:bg-(--border-light) hover:text-(--text-primary)"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}