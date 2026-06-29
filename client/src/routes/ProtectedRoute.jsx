import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "../components/ui/Skeleton";

export function ProtectedRoute() {
  const { user, booting } = useAuth();

  if (booting) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md space-y-3">
          <Skeleton className="h-12" />
          <Skeleton className="h-32" />
          <Skeleton className="h-12" />
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
