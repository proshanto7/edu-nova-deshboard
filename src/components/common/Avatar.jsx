/**
 * Avatar: src thakle image, na thakle name er prothom akkhor.
 *
 * Use:
 *   <Avatar name="Rahim" />
 *   <Avatar name="Rahim" src={user.avatar} />
 *   <Avatar name="Rahim" className="h-9 w-9 text-sm" />
 */
export default function Avatar({
  name = "",
  src = "",
  className = "h-11 w-11 text-base",
}) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

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
