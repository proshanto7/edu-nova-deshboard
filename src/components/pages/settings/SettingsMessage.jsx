/**
 * Settings card er success / error message.
 * text khali hole kichu render kore na.
 */
export default function SettingsMessage({ type = "error", text }) {
  if (!text) return null;

  const isSuccess = type === "success";

  return (
    <p
      role={isSuccess ? "status" : "alert"}
      className={`rounded-lg px-3 py-2.5 text-sm ${
        isSuccess
          ? "bg-(--success)/10 text-(--success)"
          : "bg-(--danger-bg) text-(--danger)"
      }`}
    >
      {text}
    </p>
  );
}
