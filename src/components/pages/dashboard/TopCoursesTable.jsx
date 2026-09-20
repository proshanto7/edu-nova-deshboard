export default function TopCoursesTable({ courses }) {
  return (
    <div className="min-w-0 rounded-xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:p-5">
      <h3 className="mb-4 text-base font-semibold text-(--text-primary)">
        Top Courses
      </h3>

      {courses.length === 0 ? (
        <p className="text-sm text-(--text-muted)">No enrollments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-(--border-light) text-left">
                <th className="px-1 py-2 font-medium text-(--text-secondary)">
                  Course
                </th>
                <th className="px-1 py-2 font-medium text-(--text-secondary)">
                  Price
                </th>
                <th className="px-1 py-2 font-medium text-(--text-secondary)">
                  Enrollments
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.courseId}
                  className="border-b border-(--border-light) last:border-0"
                >
                  <td className="px-1 py-2 text-(--text-primary)">
                    {course.title}
                  </td>
                  <td className="whitespace-nowrap px-1 py-2 text-(--text-secondary)">
                    ৳{course.price}
                  </td>
                  <td className="whitespace-nowrap px-1 py-2 font-semibold text-(--accent)">
                    {course.enrollmentCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
