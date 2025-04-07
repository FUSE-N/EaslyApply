import React, { useState } from "react";
import { 
  BarChart2, 
  FileText, 
  Search, 
  Briefcase, 
  MessageSquare, 
  Bot, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

// Utility function to replace cn from @/lib/utils
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Mock function to replace useIsMobile hook
const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width < 768;
};

// Simple MockNavLink component to replace react-router-dom's NavLink
const MockNavLink = ({ 
  to, 
  className, 
  title, 
  children 
}: { 
  to: string; 
  className: string; 
  title?: string; 
  children: React.ReactNode 
}) => {
  // Mock isActive state - in a real app this would be determined by the router
  const isActive = to === "/";
  
  return (
    <a 
      href={to} 
      className={typeof className === 'function' ? className({ isActive }) : className} 
      title={title}
    >
      {children}
    </a>
  );
};

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart2,
    path: "/",
  },
  {
    title: "Resume Builder",
    icon: FileText,
    path: "/resume",
  },
  {
    title: "Job Search",
    icon: Search,
    path: "/job-search",
  },
  {
    title: "Applications",
    icon: Briefcase,
    path: "/applications",
  },
  {
    title: "Interview Prep",
    icon: MessageSquare,
    path: "/interview-prep",
  },
  {
    title: "AI Chat",
    icon: Bot,
    path: "/chat",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

interface AppSidebarProps {
  defaultCollapsed?: boolean;
}

const AppSidebar = ({ defaultCollapsed = false }: AppSidebarProps) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={classNames(
      "h-[calc(100vh-2rem)] my-4 flex flex-col shadow-lg overflow-hidden rounded-xl border relative",
      "bg-gray-800 text-white border-gray-700",
      collapsed ? "w-16" : "w-64" // Fixed width for expanded state
    )}>
              {/* Toggle button - outside version */}
        <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-12 bg-gray-700 text-white rounded-full p-1 shadow-md hover:bg-gray-600 transition-all z-10"
        >
        {collapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
        </button>

        <div className={classNames(
        "flex items-center px-4 py-4 border-b border-gray-700",
        collapsed ? "justify-center" : "justify-between"
        )}>
        {/* Logo section - always visible */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-white transition-all duration-300 hover:scale-105 shrink-0">
            <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold">
              <img src="/images/AI-CV.png" alt="Logo" className="h-8 w-8 rounded-md" />
            </div>
          </div>
          
          {/* Text only shown when expanded */}
          {!collapsed && (
            <div className="flex flex-col min-w-0 overflow-hidden transition-opacity duration-200">
              <span className="font-medium text-white whitespace-nowrap">EaslyApply</span>
              <span className="text-xs text-gray-300 whitespace-nowrap">Your Career Assistant</span>
            </div>
          )}
        </div>

        {/* Optional in-header toggle button */}
        {!collapsed && (
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-md hover:bg-zinc-700"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className={classNames("space-y-1", collapsed ? "px-1" : "px-2")}>
          {navigationItems.map((item, index) => (
            <li key={item.title} style={{ animationDelay: `${index * 50}ms` }}>
              <MockNavLink
                to={item.path}
                className={classNames(
                  "flex items-center rounded-md text-white",
                  "hover:bg-gray-700 transition-colors duration-200",
                  collapsed 
                    ? "justify-center p-3" 
                    : "gap-3 px-4 py-2.5",
                  item.path === "/" && "bg-blue-600" // Replace with actual active path logic
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-200">
                    {item.title}
                  </span>
                )}
              </MockNavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-700" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-center p-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all duration-200 hover:scale-105">
            <span className="font-medium whitespace-nowrap">Upgrade to Pro</span>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-gray-700" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-center p-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all duration-200">
            <Settings className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;