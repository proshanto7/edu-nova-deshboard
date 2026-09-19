export default function RecentActivityFeed({ enrollments }) {
  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background-card)] transition-colors">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Recent Enrollments</h3>

      {enrollments.length === 0 ? (
        <p className="text-[var(--text-muted)] text-sm">No recent activity.</p>
      ) : (
        <ul className="space-y-0">
          {enrollments.map((item) => (
            <li key={item._id} className="py-2.5 border-b border-[var(--border-light)] last:border-0 text-sm text-[var(--text-primary)]">
              <span className="font-medium">{item.student?.name}</span> enrolled in{" "}
              <span className="font-medium">{item.course?.title}</span>
              <span className="text-[var(--text-muted)] ml-2">(by {item.enrolledBy?.name})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}