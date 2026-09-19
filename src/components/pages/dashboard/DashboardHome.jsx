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
    return <p className="p-6 text-[var(--text-secondary)]">Loading...</p>;
  }

  if (user?.role !== "admin") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome, {user?.name || "Student"}!
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
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
    return <p className="p-6 text-[var(--text-secondary)]">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-[var(--danger)] bg-[var(--danger-bg)] rounded-lg m-6">{error}</p>
    );
  }

  return (
    <div className="p-6 min-h-screen transition-colors">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Admin Dashboard</h1>

      <StatsCards overview={summary.overview} />
      <EnrollmentChart trend={summary.enrollmentTrend} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCoursesTable courses={summary.topCourses} />
        <RecentActivityFeed enrollments={summary.recentEnrollments} />
      </div>
    </div>
  );
}