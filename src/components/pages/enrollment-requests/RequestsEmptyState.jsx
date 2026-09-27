import { InboxIcon } from "@/components/common/Icons";

const MESSAGES = {
  pending: {
    title: "No pending requests.",
    text: "You're all caught up. New requests from students will show up here.",
  },
  approved: {
    title: "No approved requests yet.",
    text: "Requests you approve will be listed here.",
  },
  rejected: {
    title: "No rejected requests.",
    text: "Requests you reject will be listed here.",
  },
  all: {
    title: "No enrollment requests yet.",
    text: "When students request a course, it will show up here.",
  },
};

export default function RequestsEmptyState({ status = "pending" }) {
  const { title, text } = MESSAGES[status] ?? MESSAGES.all;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--border) bg-(--background-card) px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--border-light) text-(--text-secondary)">
        <InboxIcon className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-(--text-primary)">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-(--text-secondary)">{text}</p>
    </div>
  );
}
