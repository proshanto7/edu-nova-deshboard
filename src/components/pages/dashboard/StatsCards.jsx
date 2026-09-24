import Link from "next/link";
import { focusRing } from "@/components/common/uiStyles";

export default function StatsCards({ overview }) {
  const pending = overview.pendingEnrollmentRequests ?? 0;

  const cards = [
    { label: "Total Students", value: overview.totalStudents },
    { label: "Total Mentors", value: overview.totalMentors },
    { label: "Total Courses", value: overview.totalCourses },
    { label: "Total Categories", value: overview.totalCategories },
    { label: "Active Enrollments", value: overview.totalActiveEnrollments },
    { label: "Total Lessons", value: overview.totalLessons },
    { label: "Est. Revenue", value: `৳${overview.totalRevenue.toLocaleString()}` },
    {
      label: "Pending Requests",
      value: pending,
      href: "/dashboard/enrollment-requests",
      highlight: pending > 0,
    },
  ];

  const baseClass =
    "block min-w-0 rounded-xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:p-5";

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => {
        const content = (
          <>
            <p className="mb-1.5 text-xs text-(--text-secondary) sm:mb-2 sm:text-sm">
              {card.label}
            </p>
            <p
              className={`wrap-break-word text-xl font-bold sm:text-2xl ${
                card.highlight ? "text-(--warning)" : "text-(--text-primary)"
              }`}
            >
              {card.value}
            </p>
          </>
        );

        // href thakle card ta link — click korle requests page e jay
        return card.href ? (
          <Link
            key={card.label}
            href={card.href}
            className={`${baseClass} hover:border-(--accent) ${focusRing}`}
          >
            {content}
          </Link>
        ) : (
          <div key={card.label} className={baseClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
