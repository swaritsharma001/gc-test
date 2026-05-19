import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Terminal, 
  Settings, 
  Shield, 
  Activity, 
  Zap, 
  Database,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Commands", icon: Terminal, path: "/commands" },
    { name: "Analytics", icon: Activity, path: "/analytics" },
    { name: "Vault", icon: Shield, path: "/vault" },
  ];

  const resources = [
    { name: "Database", icon: Database, path: "/database" },
    { name: "Auto-Events", icon: Zap, path: "/events" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className={cn("pb-12 h-screen border-r bg-muted/20 backdrop-blur-md sticky top-16", className)}>
      <div className="space-y-4 py-6">
        <div className="px-6 py-2">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Navigation
          </h2>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", location.pathname === item.path ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-6 py-2">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Resources
          </h2>
          <nav className="space-y-1.5">
            {resources.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", location.pathname === item.path ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="absolute bottom-20 px-6 w-full">
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
          <p className="text-xs font-bold text-indigo-500 mb-1 uppercase tracking-wider">Storage Used</p>
          <div className="h-2 w-full bg-indigo-500/20 rounded-full mb-2">
            <div className="h-full w-2/3 bg-indigo-500 rounded-full shadow-glow"></div>
          </div>
          <p className="text-[10px] text-muted-foreground">8.2 GB of 12 GB</p>
        </div>
      </div>
    </div>
  );
}
