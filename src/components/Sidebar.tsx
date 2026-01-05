"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, BookOpen, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform md:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto glass border-r border-border">
        <Link href="/" className="flex items-center ps-2.5 mb-5">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
            PhD Companion
          </span>
        </Link>
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center p-2 rounded-lg group transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className={clsx("w-5 h-5 transition duration-75", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="absolute bottom-4 left-0 w-full px-3">
             <button className="flex items-center p-2 w-full text-foreground rounded-lg hover:bg-muted transition-colors group">
                <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition duration-75" />
                <span className="ms-3">Log Out</span>
            </button>
        </div>
      </div>
    </aside>
  );
}
