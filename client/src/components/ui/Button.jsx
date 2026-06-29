import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

const variants = {
  primary: "bg-ink text-white hover:bg-zinc-800 dark:bg-white dark:text-ink dark:hover:bg-zinc-200",
  secondary: "border border-line bg-panel text-text hover:bg-zinc-100 dark:hover:bg-zinc-900",
  ghost: "text-muted hover:bg-zinc-100 hover:text-text dark:hover:bg-zinc-900",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "primary", loading, children, disabled, ...props }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
