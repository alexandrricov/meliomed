interface GradientBoxProps {
  gradientFrom: string;
  gradientTo: string;
  size?: number;
  className?: string;
  children: React.ReactNode;
}

export function GradientBox({
  gradientFrom,
  gradientTo,
  size = 80,
  className = "",
  children,
}: GradientBoxProps) {
  return (
    <div
      className={`rounded-inner flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {children}
    </div>
  );
}
