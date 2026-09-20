"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import StatsCards from "./StatsCards";
import EnrollmentChart from "./EnrollmentChart";
import TopCoursesTable from "./TopCoursesTable";
import RecentActivityFeed from "./RecentActivityFeed";

export default function DashboardHome() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p className="p-4 text-(--text-secondary) sm:p-6">Loading...</p>;
  }

  if (user?.role !== "admin") {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-xl font-bold text-(--text-primary) sm:text-2xl">
          Welcome, {user?.name || "Student"}!
        </h1>
        <p className="mt-2 text-(--text-secondary)">
          Student home content আসবে পরের ধাপে।
        </p>
      </div>
    );
  }

  return <AdminOverview />;
}

function AdminOverview() {
  const { summary, loading, error } = useDashboardSummary();

  if (loading) {
    return (
      <p className="p-4 text-(--text-secondary) sm:p-6">Loading dashboard...</p>
    );
  }

  if (error) {
    return (
      <p className="m-4 rounded-lg bg-(--danger-bg) p-4 text-(--danger) sm:m-6">
        {error}
      </p>
    );
  }

  return (
    <div className="p-4 transition-colors sm:p-6">
      <h1 className="mb-4 text-xl font-bold text-(--text-primary) sm:mb-6 sm:text-2xl">
        Admin Dashboard
      </h1>

      <StatsCards overview={summary.overview} />
      <EnrollmentChart trend={summary.enrollmentTrend} />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <TopCoursesTable courses={summary.topCourses} />
        <RecentActivityFeed enrollments={summary.recentEnrollments} />
      </div>
    </div>
  );
}
