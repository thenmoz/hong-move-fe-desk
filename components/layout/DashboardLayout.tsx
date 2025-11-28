"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const navigation = [
  { label: "แดชบอร์ด", href: "/dashboard" },
  { label: "จัดการนัดหมาย", href: "/manage-booking" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const todayLabel = new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
  }).format(new Date());

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState !== null) {
      setIsSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="min-h-screen w-full bg-white shadow-sm">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed left-4 top-4 z-50 rounded-lg bg-[#5c0000] p-2 text-white shadow-lg lg:hidden"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-0 z-40 flex h-screen flex-col justify-between border-r border-black/10 bg-[#5c0000] px-6 py-10 text-white transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          {/* Toggle button for desktop */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-10 hidden rounded-full bg-white p-1.5 text-[#5c0000] shadow-md transition-colors hover:bg-gray-100 lg:block"
            title={isSidebarOpen ? "ซ่อน Sidebar" : "แสดง Sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          <div>
            <Link href="/" className="block">
              <Image
                src="/hongmove-logo.png"
                alt="Hongmove Logo"
                width={128}
                height={128}
                className={`mx-auto object-contain transition-all ${
                  isSidebarOpen ? "h-32 w-32" : "h-12 w-12"
                }`}
              />
            </Link>

            <nav className={`space-y-3 ${isSidebarOpen ? "mt-12" : "mt-8"}`}>
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/15 text-white shadow-inner"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    } ${!isSidebarOpen && "text-center"}`}
                    title={!isSidebarOpen ? item.label : undefined}
                  >
                    {isSidebarOpen ? item.label : item.label.charAt(0)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {isSidebarOpen && (
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm font-semibold">Admin</p>
              <p className="mt-1 text-xs text-white/70">
                เข้าสู่ระบบเมื่อ {todayLabel}
              </p>
              <button className="mt-6 w-full rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-[#5c0000] transition-colors hover:bg-white">
                ออกจากระบบ
              </button>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main
          className={`min-h-screen overflow-x-auto px-6 py-10 transition-all duration-300 lg:px-8 ${
            isSidebarOpen ? "lg:ml-72" : "lg:ml-20"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
