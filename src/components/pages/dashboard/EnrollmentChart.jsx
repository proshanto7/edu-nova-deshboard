"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function EnrollmentChart({ trend }) {
  const chartData = trend.map((item) => ({
    label: `${MONTH_NAMES[item.month - 1]} ${item.year}`,
    enrollments: item.count,
  }));

  return (
    <div className="mb-6 min-w-0 rounded-xl border border-(--border) bg-(--background-card) p-4 transition-colors sm:mb-8 sm:p-5">
      <h3 className="mb-4 text-base font-semibold text-(--text-primary)">
        Enrollment Trend (Last 6 Months)
      </h3>

      {chartData.length === 0 ? (
        <p className="text-sm text-(--text-muted)">No enrollment data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="label"
              stroke="var(--text-secondary)"
              fontSize={12}
              interval="preserveStartEnd"
              minTickGap={16}
            />
            <YAxis
              allowDecimals={false}
              stroke="var(--text-secondary)"
              fontSize={12}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-primary)",
              }}
            />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={{ fill: "var(--accent)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
