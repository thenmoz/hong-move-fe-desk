"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Modal } from "@/components/ui/Modal";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelReasonModal, setShowCancelReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    setShowCancelReasonModal(true);
  };

  const handleCancelWithReason = () => {
    // TODO: Cancel booking with reason
    console.log("Cancel reason:", cancelReason);
    setShowCancelReasonModal(false);
    setCancelReason("");
    // Navigate back to dashboard
    router.push("/dashboard");
  };

  const handleStartDriving = () => {
    // TODO: Start driving logic
    console.log("Start driving");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-slate-600">
          <span>ข้อมูลบุ๊กกิ้ง</span>
          <span className="mx-2">&gt;</span>
          <span className="font-medium text-[#8b0000]">รอดำเนินการ</span>
        </div>

        <form className="space-y-10">
          {/* ข้อมูลผู้โดยสาร */}
          <section>
            <h2 className="text-lg font-semibold text-slate-700">
              ข้อมูลผู้โดยสาร
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bookingId"
                  className="block text-sm font-medium text-slate-600"
                >
                  Booking ID
                </label>
                <input
                  type="text"
                  id="bookingId"
                  name="bookingId"
                  defaultValue={bookingId}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-600"
                >
                  ชื่อ-นามสกุล*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue="Test Test"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-600"
                >
                  เบอร์โทรศัพท์*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue="012-345-6789"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600"
                >
                  อีเมล*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="Test@test.com"
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
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-slate-600"
                >
                  ต้นทาง
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  defaultValue="สร้างนายหน้าพิเศษ"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-slate-600"
                >
                  ปลายทาง*
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  defaultValue="กรุงเทพมหานคร"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="travelDate"
                  className="block text-sm font-medium text-slate-600"
                >
                  วันเดินทาง*
                </label>
                <div className="mt-2 flex gap-2">
                  <select
                    name="date"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  >
                    <option value="20">20</option>
                  </select>
                  <select
                    name="month"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  >
                    <option value="คย">คย</option>
                  </select>
                  <select
                    name="year"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  >
                    <option value="เม">เม</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="travelTime"
                  className="block text-sm font-medium text-slate-600"
                >
                  เวลาเดินทาง*
                </label>
                <div className="mt-2 flex gap-2">
                  <select
                    name="hour"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  >
                    <option value="XX">XX</option>
                  </select>
                  <select
                    name="minute"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
                    disabled
                  >
                    <option value="XX">XX</option>
                  </select>
                </div>
              </div>

              {/* การชำระ */}
              <div>
                <label
                  htmlFor="payment"
                  className="block text-sm font-medium text-slate-600"
                >
                  การชำระ
                </label>
                <select
                  id="payment"
                  name="payment"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                >
                  <option value="">เลือกวิธีชำระเงิน</option>
                  <option value="cash">เงินสด</option>
                  <option value="transfer">โอนเงิน</option>
                  <option value="credit">บัตรเครดิต</option>
                </select>
              </div>

              {/* ผู้ขับ */}
              <div>
                <label
                  htmlFor="driver"
                  className="block text-sm font-medium text-slate-600"
                >
                  ผู้ขับ
                </label>
                <select
                  id="driver"
                  name="driver"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                >
                  <option value="">เลือกผู้ขับ</option>
                  <option value="driver1">คนขับ 1</option>
                  <option value="driver2">คนขับ 2</option>
                  <option value="driver3">คนขับ 3</option>
                </select>
              </div>

              {/* ค่าโดยสาร */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="fare"
                  className="block text-sm font-medium text-slate-600"
                >
                  ค่าโดยสาร (บาท)
                </label>
                <input
                  type="number"
                  id="fare"
                  name="fare"
                  placeholder="0"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                />
              </div>
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
            <button
              type="button"
              onClick={handleCancelClick}
              className="flex-1 rounded-lg bg-[#FFA500] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#FF8C00] sm:flex-initial"
            >
              ยกเลิกบุ๊กกิ้ง
            </button>
            <button
              type="button"
              onClick={handleStartDriving}
              className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000] sm:flex-initial"
            >
              เริ่มขับ
            </button>
          </div>
        </form>

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
            <p className="text-lg font-semibold text-[#8b0000]">{bookingId}</p>
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
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCancelWithReason}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
              >
                ยืนยัน
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
