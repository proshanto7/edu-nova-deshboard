/**
 * Brand panel er illustration: ekta course er "learning path".
 * Bhora circle = shesh kora lesson, ring = ekhon jekhane acho, faka = ager lesson.
 * Rong: accent theme theke (text-(--accent) -> currentColor), baki fixed (panel shobshomoy dark).
 */
export default function LearningPath({ className = "" }) {
  return (
    <svg
      viewBox="14 26 372 224"
      fill="none"
      aria-hidden="true"
      className={`text-(--accent) ${className}`}
    >
      {/* Shesh kora ongsho */}
      <path
        d="M28 236C80 236 96 188 140 184S196 176 222 150"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Baki ongsho */}
      <path
        d="M222 150C250 122 268 96 300 88S350 64 372 44"
        stroke="#8a99b3"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />

      {/* Completed nodes */}
      {[
        [28, 236],
        [140, 184],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <circle r="13" fill="currentColor" />
          <path
            d="M-5.5 0.5l3.8 3.8 7.2-8"
            stroke="#0a1220"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Current node */}
      <g transform="translate(222 150)">
        <circle r="20" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        <circle r="9" fill="currentColor" />
      </g>

      {/* Upcoming nodes */}
      {[
        [300, 88],
        [372, 44],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="10"
          fill="#0a1220"
          stroke="#3b4a66"
          strokeWidth="2.5"
        />
      ))}
    </svg>
  );
}
