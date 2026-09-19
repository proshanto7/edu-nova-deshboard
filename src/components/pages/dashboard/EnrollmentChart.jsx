"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EnrollmentChart({ trend }) {
  const chartData = trend.map((item) => ({
    label: `${MONTH_NAMES[item.month - 1]} ${item.year}`,
    enrollments: item.count,
  }));

  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background-card)] mb-8 transition-colors">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        Enrollment Trend (Last 6 Months)
      </h3>

      {chartData.length === 0 ? (
        <p className="text-[var(--text-muted)] text-sm">No enrollment data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="label" stroke="var(--text-secondary)" fontSize={12} />
            <YAxis allowDecimals={false} stroke="var(--text-secondary)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-primary)",
              }}
            />
            <Line type="monotone" dataKey="enrollments" stroke="var(--accent)" strokeWidth={2} dot={{ fill: "var(--accent)" }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}