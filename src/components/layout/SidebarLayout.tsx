import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "./AppSidebar";

type SidebarLayoutProps = {
  children: ReactNode;
};

// Main Layout Component
const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen flex">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        onMouseEnter={() => !sidebarOpen && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !sidebarOpen && !isMobile && setIsHovered(false)}
        className={cn(
          "fixed top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out",
          isMobile 
            ? cn("w-[270px]", sidebarOpen ? "translate-x-0" : "-translate-x-full")
            : cn(
                "w-[280px]",
                !sidebarOpen && !isHovered && "w-[4rem]",
                !sidebarOpen && isHovered && "w-[280px] shadow-lg",
                sidebarOpen && "translate-x-0",
                !sidebarOpen && !isHovered && "-translate-x-[calc(100%-4rem)]"
              )
        )}
      >
        <AppSidebar collapsed={!sidebarOpen && !isHovered && !isMobile} />
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        !isMobile && "ml-[4rem]",
        sidebarOpen && !isMobile && "ml-[280px]"
      )}>
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "mr-4 rounded-md p-2 hover:bg-accent transition-colors duration-200",
              "text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft size={20} className="transition-transform duration-200" />
            ) : (
              <ChevronRight size={20} className="transition-transform duration-200" />
            )}
          </button>
          <h1 className="font-semibold text-lg md:text-xl">EaslyApply</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto px-4 py-6 md:px-6 md:py-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;