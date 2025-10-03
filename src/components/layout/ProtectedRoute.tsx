import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && location.pathname !== "/auth" && location.pathname !== "/") {
      navigate("/auth");
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-soft-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && location.pathname !== "/auth" && location.pathname !== "/") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
