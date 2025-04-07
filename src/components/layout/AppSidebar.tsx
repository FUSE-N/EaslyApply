import React, { ReactNode, useState } from "react";
import { 
  BarChart2, 
  FileText, 
  Search, 
  Briefcase, 
  MessageSquare, 
  Bot, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  HelpCircle,
  User,
  LogOut,
  CreditCard,
  Star,
  ChevronUp,
  Menu,
  X
} from "lucide-react";

// Utility function for class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Mock mobile hook - in real implementation you'd use your actual hook
const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width < 768;
};

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart2,
    path: "/",
    isActive: true,
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

const utilityItems = [
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
    badge: 3,
  },
  {
    title: "Support",
    icon: HelpCircle,
    path: "/support",
  }
];

const userMenuItems = [
  {
    title: "Upgrade to Pro",
    icon: Star,
    path: "/upgrade",
  },
  {
    title: "Account",
    icon: User,
    path: "/account",
  },
  {
    title: "Billing",
    icon: CreditCard,
    path: "/billing",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Log out",
    icon: LogOut,
    path: "/logout",
  },
];

// Collapsible Sidebar Component
const AppSidebar = ({ collapsed }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Navigation item component
  const NavItem = ({ item }) => (
    <li>
      <a 
        href={item.path}
        className={classNames(
          "flex items-center rounded-md transition-colors duration-200",
          collapsed ? "justify-center p-3" : "gap-3 px-4 py-2.5",
          item.isActive 
            ? "bg-blue-600 text-white" 
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        )}
        title={collapsed ? item.title : undefined}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && (
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {item.title}
          </span>
        )}
        {item.badge && (
          <div className={classNames(
            "bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center",
            collapsed ? "h-5 w-5 absolute top-1 right-1" : "ml-auto px-2 py-0.5 min-w-[20px]"
          )}>
            {item.badge}
          </div>
        )}
      </a>
    </li>
  );

  return (
    <>
      <div className={classNames(
        "h-screen  my-4 flex flex-col shadow-lg overflow-hidden rounded-xl border relative",
        "bg-gray-800 text-white border-gray-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header with logo */}
        <div className={classNames(
          "flex items-center px-4 py-4 border-b border-gray-700",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-white transition-all duration-300 hover:scale-105 shrink-0">
              <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold">
                EA
              </div>
            </div>
            
            {/* Text only shown when expanded */}
            {!collapsed && (
              <div className="flex flex-col min-w-0 overflow-hidden">
                <span className="font-medium text-white whitespace-nowrap">EaslyApply</span>
                <span className="text-xs text-gray-300 whitespace-nowrap">Your Career Assistant</span>
              </div>
            )}
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className={classNames("space-y-1", collapsed ? "px-1" : "px-2")}>
            {navigationItems.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </ul>
          
          <div className={classNames("mt-6 px-4 pb-2", collapsed ? "text-center" : "")}>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              {collapsed ? "" : "Support"}
            </p>
          </div>
          <ul className={classNames("space-y-1", collapsed ? "px-1" : "px-2")}>
            {utilityItems.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </ul>
        </nav>

        {/* User profile button */}
        <div className={classNames(
          "p-4 border-t border-gray-700 transition-all duration-200",
          userMenuOpen ? "bg-gray-700" : ""
        )}>
          <div 
            onClick={toggleUserMenu}
            className={classNames(
              "flex items-center gap-3 cursor-pointer rounded-md p-2 transition-all",
              collapsed ? "justify-center" : "",
              "hover:bg-gray-700"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
              <span className="font-medium">S</span>
            </div>
            
            {!collapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium text-sm text-white truncate">shadcn</div>
                  <div className="text-xs text-gray-400 truncate">m@example.com</div>
                </div>
                <ChevronUp 
                  className={classNames(
                    "h-4 w-4 text-gray-400 transition-transform",
                    userMenuOpen ? "transform rotate-180" : ""
                  )} 
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* User menu popup - Now outside the sidebar */}
      {userMenuOpen && (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden z-[60] animate-fade-in w-[280px]">
          <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
              <span className="font-medium">S</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">shadcn</div>
              <div className="text-sm text-gray-500">m@example.com</div>
            </div>
          </div>
          <div className="py-1">
            {userMenuItems.map((item) => (
              <a 
                key={item.title}
                href={item.path}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidebar;