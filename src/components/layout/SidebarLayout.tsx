
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "./AppSidebar";

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  // Set default to false to hide the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex w-full">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative z-50 transition-all duration-300 ease-in-out h-screen",
          isMobile 
            ? cn("w-[270px]", sidebarOpen ? "translate-x-0" : "-translate-x-full")
            : cn("w-[280px]", sidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%-4rem)]")
        )}
      >
        <AppSidebar collapsed={!sidebarOpen && !isMobile} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
          <button
            onClick={toggleSidebar}
            className="mr-4 rounded-md p-2 hover:bg-accent transition-colors duration-200"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={20} className="animate-fade-in" /> : <Menu size={20} className="animate-fade-in" />}
          </button>
          <h1 className="font-semibold text-lg md:text-xl">AI Job Buddy</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
