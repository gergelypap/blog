import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  count: number;
}

export default function AnimatedWrapper({ children, count }: Props) {
  return (
    <div
      className="animate-fade-up [animation-fill-mode:forwards] opacity-0"
      style={{ animationDelay: `${count * 100}ms` }}
    >
      {children}
    </div>
  );
}
