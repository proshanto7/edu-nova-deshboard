/**
 * Name er prothom akkhor diye gol avatar.
 *
 * Use:
 *   <Avatar name="Rahim" />
 *   <Avatar name="Rahim" className="h-9 w-9 text-sm" />
 */
export default function Avatar({
  name = "",
  className = "h-11 w-11 text-base",
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-(--accent)/10 font-semibold text-(--accent) ${className}`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
