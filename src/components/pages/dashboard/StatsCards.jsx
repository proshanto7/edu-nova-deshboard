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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background-card)] transition-colors"
        >
          <p className="text-sm text-[var(--text-secondary)] mb-2">{card.label}</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{card.value}</p>
        </div>
      ))}
    </div>
  );
}