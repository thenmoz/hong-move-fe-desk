"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Modal } from "@/components/ui/Modal";

export default function CreateBookingPage() {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: "1234xxxxxx",
    fullName: "",
    phone: "",
    email: "",
    origin: "",
    destination: "",
    date: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setFormData({
      bookingId: "1234xxxxxx",
      fullName: data.get("fullName") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      origin: data.get("origin") as string,
      destination: data.get("destination") as string,
      date: data.get("date") as string,
      month: data.get("month") as string,
      year: data.get("year") as string,
      hour: data.get("hour") as string,
      minute: data.get("minute") as string,
    });

    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // TODO: Save booking to database/API
    setShowConfirmModal(false);
    // Navigate to booking detail page
    router.push(`/booking/${formData.bookingId}`);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
          สร้างหมายเลขบุ๊คกิ้ง
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-10">
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
                      defaultValue="12345xxxx"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
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
                      placeholder="Test Test"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                      required
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
                      placeholder="012-345-6789"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                      required
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
                      placeholder="Test@test.com"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                      required
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
                      placeholder="สร้างนายหน้าพิเศษ"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
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
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-slate-600"
                    >
                      วันเดินทาง*
                    </label>
                    <div className="mt-2 flex gap-2">
                      <select
                        id="date"
                        name="date"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                        required
                      >
                        <option value="">วัน</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          )
                        )}
                      </select>
                      <select
                        name="month"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                        required
                      >
                        <option value="">เดือน</option>
                        <option value="01">ม.ค.</option>
                        <option value="02">ก.พ.</option>
                        <option value="03">มี.ค.</option>
                        <option value="04">เม.ย.</option>
                        <option value="05">พ.ค.</option>
                        <option value="06">มิ.ย.</option>
                        <option value="07">ก.ค.</option>
                        <option value="08">ส.ค.</option>
                        <option value="09">ก.ย.</option>
                        <option value="10">ต.ค.</option>
                        <option value="11">พ.ย.</option>
                        <option value="12">ธ.ค.</option>
                      </select>
                      <select
                        name="year"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                        required
                      >
                        <option value="">ปี</option>
                        <option value="2567">2567</option>
                        <option value="2568">2568</option>
                        <option value="2569">2569</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-slate-600"
                    >
                      เวลาเดินทาง*
                    </label>
                    <div className="mt-2 flex gap-2">
                      <select
                        id="time"
                        name="hour"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                        required
                      >
                        <option value="">ชม.</option>
                        {Array.from({ length: 24 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <select
                        name="minute"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                        required
                      >
                        <option value="">นาที</option>
                        {Array.from({ length: 60 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Action buttons */}
              <div className="flex gap-4 pt-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  กลับ
                </Link>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000] sm:flex-initial"
                >
                  สร้างบุ๊กกิ้ง
                </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="ยืนยันก่อนการสร้าง"
          size="sm"
          actions={
            <>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
              >
                ยืนยัน
              </button>
            </>
          }
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-800">
              หมายเลขบุ๊กกิ้ง{" "}
              <span className="text-[#8b0000]">{formData.bookingId}</span>
            </p>
            <p className="mt-3 text-sm text-slate-600">
              คนขับจะได้รับอีเมลไปยัง {formData.email || "Test@test.com"}
            </p>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
