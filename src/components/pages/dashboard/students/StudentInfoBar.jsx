import Avatar from "@/components/common/Avatar";

export default function StudentInfoBar({ student }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-(--border-light) bg-background p-3">
      <Avatar name={student.name} className="h-10 w-10 text-sm" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-(--text-primary)">
          {student.name}
        </p>
        <p className="truncate text-xs text-(--text-muted)">{student.email}</p>
      </div>
    </div>
  );
}
