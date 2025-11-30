"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Eye, Calendar } from "lucide-react";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default function ManageBookingPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "ไม่สามารถโหลดข้อมูลการจอง");
      }

      setBookings(data.data?.bookings || []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ไม่สามารถโหลดข้อมูลการจอง";
      setFetchError(message);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Calculate statistics
  const stats = {
    totalRevenue: bookings
      .filter((b) => b.paymentStatus === "paid" && b.finalMeterPrice)
      .reduce((sum, b) => sum + (b.finalMeterPrice || 0), 0),
    pending: bookings.filter((b) => b.jobStatus === "pending").length,
    inProgress: bookings.filter((b) => b.jobStatus === "in_progress").length,
    completed: bookings.filter((b) => b.jobStatus === "completed").length,
    cancelled: bookings.filter((b) => b.jobStatus === "cancelled").length,
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesKeyword =
      !searchKeyword ||
      booking.bookingNumber.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      booking.phone.includes(searchKeyword);

    const matchesDate =
      !selectedDate ||
      format(new Date(booking.travelDateTime), "yyyy-MM-dd") === selectedDate;

    const matchesStatus =
      selectedStatus === "all" || booking.jobStatus === selectedStatus;

    return matchesKeyword && matchesDate && matchesStatus;
  });

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "รอคำเนินการ",
      confirmed: "ยืนยันแล้ว",
      in_progress: "กำลังเดินทาง",
      completed: "เสร็จสิ้น",
      cancelled: "ยกเลิก",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "text-yellow-600",
      confirmed: "text-blue-600",
      in_progress: "text-green-600",
      completed: "text-green-600",
      cancelled: "text-red-600",
    };
    return colors[status] || "text-gray-600";
  };

  const formatDateTime = (dateString: Date | string) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "dd/MM/yyyy", { locale: th });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-slate-800">จัดการบุ๊กกิ้ง</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg bg-gray-200 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">รายได้รวม (บาท)</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {stats.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">รอคำเนินการ</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">กำลังเดินทาง</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{stats.inProgress}</p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">เสร็จสิ้น</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{stats.completed}</p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">ยกเลิก</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{stats.cancelled}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="rounded-lg bg-gray-200 p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="ค้นหาจากชื่อ / หมายเลข booking / เบอร์โทรเลขครก/เลขที่พัก"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
              />
            </div>

            {/* Date Picker */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000] lg:w-48"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000] lg:w-48"
              >
                <option value="all">สถานะ : ทั้งหมด</option>
                <option value="pending">รอคำเนินการ</option>
                <option value="confirmed">ยืนยันแล้ว</option>
                <option value="in_progress">กำลังเดินทาง</option>
                <option value="completed">เสร็จสิ้น</option>
                <option value="cancelled">ยกเลิก</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="flex items-center justify-center gap-2 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6b0000]">
              <Search className="h-4 w-4" />
              ค้นหา
            </button>
          </div>
        </div>

        {fetchError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p>{fetchError}</p>
              <button
                onClick={fetchBookings}
                className="font-medium text-red-800 underline-offset-2 hover:underline"
              >
                ลองอีกครั้ง
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {isLoading ? (
            <div className="py-12 text-center text-gray-500">กำลังโหลดข้อมูลการจอง...</div>
          ) : (
            <>
              <div className="max-h-[600px] overflow-auto">
                <table className="min-w-full table-auto">
                  <thead className="sticky top-0 z-10 bg-[#8b0000] text-white shadow">
                    <tr>
                      <th className="whitespace-nowrap px-3 py-3 text-center text-xs font-medium">ลำดับ</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">
                        หมายเลข Booking
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">ชื่อผู้โดยสาร</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">เบอร์โทรศัพท์</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">อีเมล</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">ปลายทาง</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">วันเดินทาง</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">เวลาเดินทาง</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">สถานะ</th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-medium">ค่าโดยสาร</th>
                      <th className="sticky right-0 whitespace-nowrap bg-[#8b0000] px-4 py-3 text-center text-xs font-medium">ดูข้อมูล</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredBookings.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-red-50'} hover:bg-red-100 transition-colors`}
                      >
                        <td className="whitespace-nowrap px-3 py-3 text-center text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-900">
                          {booking.bookingNumber}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                          {booking.passengerName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                          {booking.phone}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-900">
                          <div className="max-w-[180px] truncate" title={booking.email}>
                            {booking.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-900">
                          <div className="max-w-[150px] truncate" title={booking.dropoffLocation}>
                            {booking.dropoffLocation}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                          {formatDateTime(booking.travelDateTime)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                          {format(new Date(booking.travelDateTime), "HH:mm")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(booking.jobStatus)}`}>
                            {getStatusLabel(booking.jobStatus)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                          {booking.finalMeterPrice
                            ? `฿${booking.finalMeterPrice.toLocaleString()}`
                            : "-"}
                        </td>
                        <td className="sticky right-0 whitespace-nowrap bg-inherit px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              window.location.href = `/booking/${booking.bookingNumber}`;
                            }}
                            className="inline-flex items-center justify-center rounded-full bg-green-600 p-2 text-white shadow-sm transition-colors hover:bg-green-700 hover:shadow-md"
                            title="ดูรายละเอียด"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
                  <div className="text-sm text-gray-600">
                    ทั้งหมด {filteredBookings.length} รายการ
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded bg-[#8b0000] px-4 py-2 text-sm text-white">
                      1
                    </button>
                    <button className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
                      2
                    </button>
                    <button className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
                      ต่อไป
                    </button>
                  </div>
                </div>
              )}

              {filteredBookings.length === 0 && !fetchError && (
                <div className="py-12 text-center text-gray-500">
                  ไม่พบข้อมูลที่ค้นหา
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
