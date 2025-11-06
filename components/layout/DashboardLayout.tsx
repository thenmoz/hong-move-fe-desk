"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "แดชบอร์ด", href: "/dashboard" },
  { label: "จัดการนัดหมาย", href: "/manage-booking" },
  { label: "จัดการยูนิต", href: "#" },
  { label: "จัดการแคมเปญ", href: "#" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const todayLabel = new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen w-full bg-white shadow-sm">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col justify-between border-r border-black/10 bg-[#5c0000] px-6 py-10 text-white lg:flex">
          <div>
            <Link href="/" className="block">
              <Image
                src="/hongmove-logo.png"
                alt="Hongmove Logo"
                width={96}
                height={96}
                className="mx-auto h-24 w-24 object-contain"
              />
            </Link>

            <nav className="mt-12 space-y-3">
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
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <p className="text-sm font-semibold">Admin</p>
            <p className="mt-1 text-xs text-white/70">
              เข้าสู่ระบบเมื่อ {todayLabel}
            </p>
            <button className="mt-6 w-full rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-[#5c0000] transition-colors hover:bg-white">
              ออกจากระบบ
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-10 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
