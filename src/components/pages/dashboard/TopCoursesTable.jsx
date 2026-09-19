export default function TopCoursesTable({ courses }) {
  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background-card)] transition-colors">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Top Courses</h3>

      {courses.length === 0 ? (
        <p className="text-[var(--text-muted)] text-sm">No enrollments yet.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--border-light)]">
              <th className="py-2 px-1 text-[var(--text-secondary)] font-medium">Course</th>
              <th className="py-2 px-1 text-[var(--text-secondary)] font-medium">Price</th>
              <th className="py-2 px-1 text-[var(--text-secondary)] font-medium">Enrollments</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId} className="border-b border-[var(--border-light)] last:border-0">
                <td className="py-2 px-1 text-[var(--text-primary)]">{course.title}</td>
                <td className="py-2 px-1 text-[var(--text-secondary)]">৳{course.price}</td>
                <td className="py-2 px-1 text-[var(--accent)] font-semibold">{course.enrollmentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}