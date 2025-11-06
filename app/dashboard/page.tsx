import Link from "next/link";
import {
  CalendarDays,
  ClipboardPlus,
  Clock3,
  DollarSign,
  MapPin,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";

const navigation = [
  { label: "แดชบอร์ด", href: "/dashboard", active: true },
  { label: "จัดการนัดหมาย", href: "/manage-booking" },
  { label: "จัดการยูนิต", href: "#" },
  { label: "จัดการแคมเปญ", href: "#" },
];

const quickActions = [
  { label: "เพิ่มรถ", href: "#" },
  { label: "เพิ่มคนขับ", href: "#" },
  { label: "สร้างหมายเลขบุ๊คกิ้ง", href: "/create-booking" },
];

const overviewStats = [
  {
    label: "ค่าจำนวนบุ๊กกิ้งรับแล้ว",
    value: "120",
    icon: ClipboardPlus,
  },
  {
    label: "รอเรื่องดูบ้านหมายนี้",
    value: "199",
    icon: Clock3,
  },
  {
    label: "รายได้รวม (บาท)",
    value: "5,000",
    icon: DollarSign,
  },
  {
    label: "รอดำเนินการ",
    value: "20",
    icon: Clock3,
  },
  {
    label: "ทำสัญญาครม",
    value: "1",
    icon: ShieldCheck,
  },
  {
    label: "เสร็จสิ้น",
    value: "9",
    icon: ShieldCheck,
  },
  {
    label: "ยกเลิก",
    value: "1",
    icon: MapPin,
  },
];

export default function DashboardPage() {
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
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-white/15 text-white shadow-inner"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
        <main className="flex-1 px-6 py-10 sm:px-8 lg:px-12">
          <header className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
                ภาพรวม
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
                >
                  <Plus className="h-4 w-4" />
                  {action.label}
                </Link>
              ))}
            </div>
          </header>

          <section aria-label="Overview stats" className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {overviewStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-slate-100 px-6 py-6 text-center shadow-sm"
                >
                  <p className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-4xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
