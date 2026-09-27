const STYLES = {
  pending: "bg-(--warning)/10 text-(--warning)",
  approved: "bg-(--success)/10 text-(--success)",
  rejected: "bg-(--danger)/10 text-(--danger)",
};

const LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        STYLES[status] ?? STYLES.pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status] ?? status}
    </span>
  );
}
