import Link from "next/link";
import {
  ClipboardPlus,
  Clock3,
  DollarSign,
  MapPin,
  Plus,
  ShieldCheck,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const quickActions = [
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
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
