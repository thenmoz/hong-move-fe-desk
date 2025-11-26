"use client";

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
import { useEffect, useState } from "react";
import { Booking } from "@/types/booking";

const quickActions = [
  { label: "สร้างหมายเลขบุ๊คกิ้ง", href: "/create-booking" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/bookings?limit=100"); // Fetch enough to calculate stats
        const data = await response.json();

        if (data.success && data.data?.bookings) {
          const bookings: Booking[] = data.data.bookings;

          const newStats = {
            pending: bookings.filter((b) => b.jobStatus === "pending").length,
            confirmed: bookings.filter((b) => b.jobStatus === "confirmed").length,
            inProgress: bookings.filter((b) => b.jobStatus === "in_progress").length,
            completed: bookings.filter((b) => b.jobStatus === "completed").length,
            cancelled: bookings.filter((b) => b.jobStatus === "cancelled").length,
            totalRevenue: bookings
              .filter((b) => b.paymentStatus === "paid" && b.finalMeterPrice)
              .reduce((sum, b) => sum + (b.finalMeterPrice || 0), 0),
          };
          setStats(newStats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const overviewStats = [
    {
      label: "ค่าจำนวนบุ๊กกิ้งรับแล้ว",
      value: stats.confirmed.toString(),
      icon: ClipboardPlus,
    },
    {
      label: "รอเรื่องดูบ้านหมายนี้", // Assuming this maps to pending for now, or maybe another status?
      value: stats.pending.toString(),
      icon: Clock3,
    },
    {
      label: "รายได้รวม (บาท)",
      value: stats.totalRevenue.toLocaleString(),
      icon: DollarSign,
    },
    {
      label: "รอดำเนินการ",
      value: stats.pending.toString(),
      icon: Clock3,
    },
    {
      label: "กำลังเดินทาง",
      value: stats.inProgress.toString(),
      icon: ShieldCheck,
    },
    {
      label: "เสร็จสิ้น",
      value: stats.completed.toString(),
      icon: ShieldCheck,
    },
    {
      label: "ยกเลิก",
      value: stats.cancelled.toString(),
      icon: MapPin,
    },
  ];

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
                {isLoading ? "-" : stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
