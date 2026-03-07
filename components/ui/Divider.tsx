interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function Divider({ className = "", orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return <div className={`w-px bg-white/10 self-stretch ${className}`} />;
  }
  return <div className={`w-full h-px bg-white/10 ${className}`} />;
}
