import Link from "next/link";
import {
  CalendarDays,
  ClipboardPlus,
  Clock3,
  DollarSign,
  Gauge,
  MapPin,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import Image from "next/image";

const navigation = [
  { label: "แดชบอร์ด", href: "/dashboard", active: true },
  { label: "จัดการผู้ใช้งาน", href: "#" },
  { label: "จัดการรถ", href: "#" },
  { label: "จัดการทริป", href: "#" },
];

const quickActions = [
  { label: "เพิ่มรถ", icon: Truck },
  { label: "เพิ่มพนักงานขับ", icon: Users },
  { label: "สร้างหมายเลขบุ๊กกิ้งใหม่", icon: ClipboardPlus },
];

const overviewStats = [
  {
    label: "จำนวนผู้ใช้งานระบบ",
    value: "120",
    helper: "ผู้ใช้งานที่ได้รับอนุญาตทั้งหมด",
    icon: Users,
  },
  {
    label: "รถที่พร้อมใช้งานขณะนี้",
    value: "199",
    helper: "อัพเดตล่าสุดเมื่อ 15 นาทีที่ผ่านมา",
    icon: Truck,
  },
  {
    label: "รายได้รอบ (บาท)",
    value: "5,000",
    helper: "รวมรอบการเดินทางล่าสุด",
    icon: DollarSign,
  },
  {
    label: "เสร็จสิ้น",
    value: "9",
    helper: "งานที่ปิดแล้ววันนี้",
    icon: ShieldCheck,
  },
  {
    label: "รอดำเนินการ",
    value: "20",
    helper: "ต้องติดตามภายในวันนี้",
    icon: Clock3,
  },
  {
    label: "กำลังเดินทาง",
    value: "1",
    helper: "อยู่ระหว่างพาผู้โดยสาร",
    icon: MapPin,
  },
];

const timelineItems = [
  {
    time: "09:00",
    title: "BK20241106001",
    description:
      "รับลูกค้าที่สนามบินสุวรรณภูมิ แล้วส่งไปที่โรงแรมฮิลตัน สุขุมวิท",
    status: "กำลังดำเนินการ",
  },
  {
    time: "10:30",
    title: "BK20241106002",
    description: "รอคอนเฟิร์มการเดินทางรอบบ่ายจากทีมขาย",
    status: "รอการยืนยัน",
  },
  {
    time: "14:45",
    title: "BK20241106003",
    description: "เตรียมรถตู้ VIP สำหรับงานรับ-ส่งลูกค้ารายสำคัญ",
    status: "เตรียมการ",
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
              <p className="text-xs uppercase tracking-[0.5em] text-[#5c0000]">
                แดชบอร์ด
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#3a0000] sm:text-4xl">
                ภาพรวมการเดินทาง
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                อัปเดตล่าสุด {todayLabel}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[#5c0000]/20 bg-white px-5 py-3 shadow-sm">
                <CalendarDays className="h-5 w-5 text-[#5c0000]" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    ช่วงวันที่
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    06 พ.ย. 2024 - 12 พ.ย. 2024
                  </p>
                </div>
              </div>
              <button className="rounded-xl border border-[#5c0000] px-4 py-2 text-sm font-semibold text-[#5c0000] transition-colors hover:bg-[#5c0000] hover:text-white">
                ดาวน์โหลดรายงาน
              </button>
            </div>
          </header>

          <section aria-label="Quick actions" className="mt-10">
            <div className="flex flex-wrap gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-3 rounded-full bg-[#5c0000] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5c0000]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#7a0a0a]"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Overview stats" className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {overviewStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-[#5c0000]">
                        {stat.value}
                      </p>
                    </div>
                    <div className="rounded-full bg-[#5c0000]/10 p-3 text-[#5c0000]">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">{stat.helper}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Timeline" className="mt-12">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#5c0000]">
                    แผนงานวันนี้
                  </p>
                  <p className="text-xs text-slate-500">
                    ติดตามสถานะงานล่าสุดทั้งหมด
                  </p>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100">
                  ดูทั้งหมด
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {timelineItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-2 rounded-xl bg-white/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5c0000]/10 text-[#5c0000]">
                        <Clock3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-[#5c0000]/10 px-3 py-1 text-xs font-semibold text-[#5c0000]">
                        {item.status}
                      </span>
                      <span className="text-sm font-medium text-slate-600">
                        {item.time} น.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5c0000]">
                สถานะระบบ
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>ระบบคอนเฟิร์มอีเมล</span>
                  <span className="flex items-center gap-2 text-[#116530]">
                    <Gauge className="h-4 w-4" />
                    ปกติ
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>การสำรองรอบเดินทาง</span>
                  <span className="flex items-center gap-2 text-[#ff9f1c]">
                    <Clock3 className="h-4 w-4" />
                    รอรันรอบถัดไป
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>แจ้งเตือนผ่าน LINE OA</span>
                  <span className="flex items-center gap-2 text-[#5c0000]">
                    <ShieldCheck className="h-4 w-4" />
                    พร้อมทำงาน
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5c0000]">
                ไฮไลต์วันนี้
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>• ทีมขับรถได้รับรีวิว 5 ดาว จำนวน 3 รายการ</p>
                <p>
                  • มีงานด่วนจากลูกค้า VIP เวลา 18:30 น.
                  ต้องจัดเตรียมรถพร้อมคนขับ
                </p>
                <p>• ยอดจองล่วงหน้าสำหรับสุดสัปดาห์เพิ่มขึ้น 18%</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5c0000] px-5 py-2 text-sm font-semibold text-white shadow-[#5c0000]/20 transition hover:-translate-y-0.5 hover:bg-[#7a0a0a]">
                <ShieldCheck className="h-4 w-4" />
                ดูรายละเอียดเพิ่มเติม
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
