interface KeyHintProps {
  children: React.ReactNode;
}

export function KeyHint({ children }: KeyHintProps) {
  return (
    <kbd className="absolute right-1.5 top-1 hidden text-xs leading-none text-inherit opacity-50 [@media(hover:hover)]:block">
      {children}
    </kbd>
  );
}
