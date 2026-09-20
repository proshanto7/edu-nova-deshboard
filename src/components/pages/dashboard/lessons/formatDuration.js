export function formatDuration(seconds) {
  if (!seconds) return "-";

  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes} min`;
}