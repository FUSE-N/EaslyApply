import { NavLink } from "react-router-dom";
import { BarChart2, Bot, Briefcase, FileText, MessagesSquare, Search, Settings, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
    icon: MessagesSquare,
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
  collapsed?: boolean;
}

const AppSidebar = ({ collapsed = false }: AppSidebarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "h-full bg-sidebar flex flex-col shadow-lg animate-slide-in-left overflow-hidden",
      collapsed ? "w-16" : "w-full"
    )}>
      <div className={cn(
        "flex items-center px-4 py-4 border-b border-sidebar-border",
        collapsed ? "justify-center" : "gap-2 px-6"
      )}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white transition-all duration-300 hover:scale-105 shrink-0">
          <UserCircle className="h-8 w-8 text-sidebar" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0 overflow-hidden">
            <span className="font-medium text-sidebar-foreground whitespace-nowrap">AI Job Buddy</span>
            <span className="text-xs text-sidebar-foreground/80 whitespace-nowrap">Your Career Assistant</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className={cn("space-y-1", collapsed ? "px-1" : "px-2")}>
          {navigationItems.map((item, index) => (
            <li key={item.title} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-md text-sidebar-foreground",
                    "hover:bg-sidebar-accent transition-colors duration-200",
                    collapsed 
                      ? "justify-center p-3" 
                      : "gap-3 px-4 py-2.5",
                    isActive && "sidebar-item-active"
                  )
                }
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-center p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer hover:brightness-95 transition-all duration-200 hover:scale-105">
            <span className="font-medium whitespace-nowrap">Upgrade to Pro</span>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-sidebar-border animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-center p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer hover:brightness-95 transition-all duration-200">
            <Settings className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;
