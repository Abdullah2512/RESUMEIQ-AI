import { FileSearch } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({ title, body, action, onAction }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-line p-8 text-center">
      <FileSearch className="mb-4 h-10 w-10 text-brand-500" />
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{body}</p>
      {action ? (
        <Button className="mt-5" onClick={onAction}>
          {action}
        </Button>
      ) : null}
    </div>
  );
}
