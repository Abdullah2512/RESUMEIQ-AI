import { cn } from "../../lib/cn";

export function Input({ label, className, ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-text">{label}</span> : null}
      <input
        className={cn(
          "focus-ring h-11 w-full rounded-lg border border-line bg-panel px-3 text-sm text-text placeholder:text-muted",
          className
        )}
        {...props}
      />
    </label>
  );
}
