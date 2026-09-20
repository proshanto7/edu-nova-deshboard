const TONES = {
  default: "border-[var(--border)] bg-[var(--background-card)]",
  danger: "border-[var(--danger)]/40 bg-[var(--danger-bg)]",
};

export default function SettingsSection({
  title,
  description,
  tone = "default",
  children,
}) {
  return (
    <section
      className={`rounded-2xl border p-4 transition-colors sm:p-6 ${TONES[tone]}`}
    >
      <div className="mb-5">
        <h2
          className={`text-base font-semibold ${
            tone === "danger" ? "text-(--danger)" : "text-(--text-primary)"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-(--text-muted)">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
