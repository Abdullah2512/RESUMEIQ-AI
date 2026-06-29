import { cn } from "../../lib/cn";

export function Card({ className, children }) {
  return <div className={cn("glass rounded-lg p-5 shadow-soft", className)}>{children}</div>;
}
