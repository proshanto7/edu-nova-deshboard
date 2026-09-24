// 3 ta step er progress bar. current = 0, 1 ba 2
export default function StepIndicator({ current, total = 3 }) {
  return (
    <div className="mb-8">
      <ol className="flex gap-1.5" aria-label="Password reset progress">
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            aria-current={i === current ? "step" : undefined}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= current ? "bg-(--accent)" : "bg-(--secondary-light)"
            }`}
          />
        ))}
      </ol>
      <p className="sr-only">
        Step {current + 1} of {total}
      </p>
    </div>
  );
}
