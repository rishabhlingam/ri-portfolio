interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs border border-white/20 text-white tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}
