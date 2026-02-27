interface ScoreDonutChartProps {
  score: number;
  maxScore?: number;
}

const RADIUS = 90;
const STROKE_WIDTH = 20;
const CENTER = 100;
const FULL_CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Gauge arc: 240° visible, 120° gap at bottom
const ARC_DEGREES = 240;
const ARC_LENGTH = (ARC_DEGREES / 360) * FULL_CIRCUMFERENCE;
const GAP_LENGTH = FULL_CIRCUMFERENCE - ARC_LENGTH;

// Rotation to center the gap at the bottom:
// SVG stroke starts at 3 o'clock. We rotate 150° so arc starts at ~7:30 position
const ROTATION = 150;

// Inner dotted boundary ring
const INNER_RADIUS = 62;
const DOT_SIZE = 1.5;
const DOT_CIRCUMFERENCE = 2 * Math.PI * INNER_RADIUS;
const NUM_DOTS = 80;
const DOT_GAP = DOT_CIRCUMFERENCE / NUM_DOTS - DOT_SIZE;

export function ScoreDonutChart({
  score,
  maxScore = 100,
}: ScoreDonutChartProps) {
  const percent = score / maxScore;
  const scoreArcLength = percent * ARC_LENGTH;

  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-auto w-full max-w-77.25"
        role="img"
        aria-label={`Melio Score: ${String(score)} out of ${String(maxScore)}`}
      >
        <defs>
          <linearGradient
            id="score-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--chart-gradient-1)" />
            <stop offset="35%" stopColor="var(--chart-gradient-2)" />
            <stop offset="70%" stopColor="var(--chart-gradient-3)" />
            <stop offset="100%" stopColor="var(--chart-gradient-4)" />
          </linearGradient>
        </defs>

        {/* Background track arc */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          className="stroke-bg-progress-track"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${String(ARC_LENGTH)} ${String(GAP_LENGTH)}`}
          transform={`rotate(${String(ROTATION)} ${String(CENTER)} ${String(CENTER)})`}
        />

        {/* Score arc — hidden when score is 0 */}
        {score > 0 && (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#score-gradient)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={`${String(scoreArcLength)} ${String(FULL_CIRCUMFERENCE - scoreArcLength)}`}
            transform={`rotate(${String(ROTATION)} ${String(CENTER)} ${String(CENTER)})`}
            style={{
              filter: "var(--chart-drop-shadow)",
            }}
          />
        )}

        {/* Inner dotted boundary ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="none"
          className="stroke-status-optimal"
          strokeWidth={DOT_SIZE}
          strokeDasharray={`${String(DOT_SIZE)} ${String(DOT_GAP)}`}
          strokeLinecap="round"
        />

        {/* Center text */}
        <text
          x={CENTER}
          y={92}
          textAnchor="middle"
          className="fill-text-primary text-[8px] font-normal"
        >
          Current Melio Score
        </text>
        <text
          x={CENTER}
          y={122}
          textAnchor="middle"
          className="fill-text-primary text-[29px] font-normal"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}
