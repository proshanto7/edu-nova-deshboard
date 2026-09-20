export default function RecentActivityFeed({ enrollments }) {
  return (
    <div className="min-w-0 rounded-xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:p-5">
      <h3 className="mb-4 text-base font-semibold text-(--text-primary)">
        Recent Enrollments
      </h3>

      {enrollments.length === 0 ? (
        <p className="text-sm text-(--text-muted)">No recent activity.</p>
      ) : (
        <ul className="space-y-0">
          {enrollments.map((item) => (
            <li
              key={item._id}
              className="wrap-break-word border-b border-(--border-light) py-2.5 text-sm text-(--text-primary) last:border-0"
            >
              <span className="font-medium">{item.student?.name}</span> enrolled
              in <span className="font-medium">{item.course?.title}</span>
              <span className="mt-0.5 block text-(--text-muted) sm:ml-2 sm:mt-0 sm:inline">
                (by {item.enrolledBy?.name})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
