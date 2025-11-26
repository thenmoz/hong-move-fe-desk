"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Modal } from "@/components/ui/Modal";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelReasonModal, setShowCancelReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBooking = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch booking");
      }

      setBooking(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId, fetchBooking]);

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    setShowCancelReasonModal(true);
  };

  const handleCancelWithReason = async () => {
    if (!cancelReason.trim()) return;

    try {
      setIsCancelling(true);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancellation_reason: cancelReason }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel booking");
      }

      setShowCancelReasonModal(false);
      setCancelReason("");
      router.push("/dashboard");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleStartDriving = () => {
    // TODO: Start driving logic
    console.log("Start driving");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="text-slate-500">กำลังโหลดข้อมูล...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !booking) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับไปหน้าแดชบอร์ด
            </Link>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p>{error || "ไม่พบข้อมูลการจอง"}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const travelDate = new Date(booking.travelDateTime);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-slate-600">
          <span>ข้อมูลบุ๊กกิ้ง</span>
          <span className="mx-2">&gt;</span>
          <span className="font-medium text-[#8b0000]">
            {booking.jobStatus === 'pending' ? 'รอดำเนินการ' : booking.jobStatus}
          </span>
        </div>

        <div className="space-y-10">
          {/* ข้อมูลผู้โดยสาร */}
          <section>
            <h2 className="text-lg font-semibold text-slate-700">
              ข้อมูลผู้โดยสาร
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Booking ID
                </label>
                <input
                  type="text"
                  value={booking.bookingNumber}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  value={booking.passengerName}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={booking.phone}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={booking.email}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>
            </div>
          </section>

          {/* ข้อมูลการเดินทาง */}
          <section>
            <h2 className="text-lg font-semibold text-slate-700">
              ข้อมูลการเดินทาง
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  ต้นทาง
                </label>
                <input
                  type="text"
                  value={booking.pickupLocation}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  ปลายทาง
                </label>
                <input
                  type="text"
                  value={booking.dropoffLocation}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  วันเดินทาง
                </label>
                <input
                  type="text"
                  value={format(travelDate, "dd MMMM yyyy", { locale: th })}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  เวลาเดินทาง
                </label>
                <input
                  type="text"
                  value={format(travelDate, "HH:mm")}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              {/* การชำระ */}
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  สถานะการชำระเงิน
                </label>
                <input
                  type="text"
                  value={booking.paymentStatus === 'paid' ? 'ชำระแล้ว' : 'ยังไม่ชำระ'}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              {/* ผู้ขับ */}
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  สถานะงาน
                </label>
                <input
                  type="text"
                  value={booking.jobStatus}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              {/* ค่าโดยสาร */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600">
                  ค่าโดยสาร (บาท)
                </label>
                <input
                  type="text"
                  value={booking.finalMeterPrice ? booking.finalMeterPrice.toLocaleString() : "-"}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              {/* Note */}
              {booking.note && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-600">
                    หมายเหตุ
                  </label>
                  <textarea
                    rows={3}
                    value={booking.note}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  />
                </div>
              )}
            </div>
          </section>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับ
            </Link>

            {booking.jobStatus !== 'cancelled' && booking.jobStatus !== 'completed' && (
              <button
                type="button"
                onClick={handleCancelClick}
                className="flex-1 rounded-lg bg-[#FFA500] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#FF8C00] sm:flex-initial"
              >
                ยกเลิกบุ๊กกิ้ง
              </button>
            )}

            {booking.jobStatus === 'confirmed' && (
              <button
                type="button"
                onClick={handleStartDriving}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000] sm:flex-initial"
              >
                เริ่มขับ
              </button>
            )}
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="ยกเลิกหมายเลขบุ๊กกิ้ง"
          size="sm"
          actions={
            <>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
              >
                ยืนยัน
              </button>
            </>
          }
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-[#8b0000]">{booking.bookingNumber}</p>
            <p className="mt-3 text-sm text-slate-600">
              คนขับจะได้รับอีเมลอีกครั้ง
            </p>
          </div>
        </Modal>

        {/* Cancel Reason Modal */}
        <Modal
          isOpen={showCancelReasonModal}
          onClose={() => {
            setShowCancelReasonModal(false);
            setCancelReason("");
          }}
          title="กรุณาใส่เหตุผลในการยกเลิกการจอง"
          size="sm"
          actions={
            <>
              <button
                onClick={() => {
                  setShowCancelReasonModal(false);
                  setCancelReason("");
                }}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                disabled={isCancelling}
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCancelWithReason}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
                disabled={isCancelling}
              >
                {isCancelling ? 'กำลังยืนยัน...' : 'ยืนยัน'}
              </button>
            </>
          }
        >
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
            placeholder="กรอกเหตุผลการยกเลิก..."
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
