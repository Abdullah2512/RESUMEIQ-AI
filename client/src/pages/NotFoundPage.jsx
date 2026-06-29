import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="app-shell grid min-h-screen place-items-center px-4 text-center">
      <div>
        <Compass className="mx-auto h-12 w-12 text-brand-500" />
        <p className="mt-6 text-sm font-semibold text-brand-500">404</p>
        <h1 className="mt-2 text-4xl font-bold text-text">This page is not on the map</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The route may have moved, or the link may be incomplete.</p>
        <Link to="/app">
          <Button className="mt-6">Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
