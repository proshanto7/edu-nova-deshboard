export default function StatsCards({ overview }) {
  const cards = [
    { label: "Total Students", value: overview.totalStudents },
    { label: "Total Mentors", value: overview.totalMentors },
    { label: "Total Courses", value: overview.totalCourses },
    { label: "Total Categories", value: overview.totalCategories },
    { label: "Active Enrollments", value: overview.totalActiveEnrollments },
    { label: "Total Lessons", value: overview.totalLessons },
    { label: "Est. Revenue", value: `৳${overview.totalRevenue.toLocaleString()}` },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="min-w-0 rounded-xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:p-5"
        >
          <p className="mb-1.5 text-xs text-(--text-secondary) sm:mb-2 sm:text-sm">
            {card.label}
          </p>
          <p className="wrap-break-word text-xl font-bold text-(--text-primary) sm:text-2xl">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}