
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! The page you're looking for isn't here.</p>
        <p className="text-muted-foreground mb-8">The page you're trying to access doesn't exist or has been moved.</p>
        <Button asChild>
          <a href="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
