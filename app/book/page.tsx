'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LocationDropdown } from '@/components/ui/LocationDropdown';
import type { BookingFormData } from '@/types/booking';

const BOOKING_SOURCE = 'customer';

export default function CustomerBookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    passengerName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    travelDateTime: '',
    note: '',
    source: BOOKING_SOURCE,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการจอง');
      }

      setBookingNumber(data.booking.bookingNumber);
      setBookingSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6B0000] via-[#8B0000] to-[#6B0000] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <Image
              src="/hongmove-logo.png"
              alt="Hongmove Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">จองสำเร็จ!</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">หมายเลขการจอง</p>
            <p className="text-2xl font-bold text-[#6B0000]">{bookingNumber}</p>
          </div>

          <div className="text-left bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>ขั้นตอนต่อไป:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
              <li>เราได้ส่งอีเมลยืนยันไปที่ <strong>{formData.email}</strong></li>
              <li>กรุณาตรวจสอบอีเมลเพื่อดูรายละเอียดการจอง</li>
              <li>ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setBookingSuccess(false);
                setFormData({
                  passengerName: '',
                  phone: '',
                  email: '',
                  pickupLocation: '',
                  dropoffLocation: '',
                  travelDateTime: '',
                  note: '',
                  source: BOOKING_SOURCE,
                });
              }}
              className="w-full rounded-lg bg-[#8b0000] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000]"
            >
              จองอีกครั้ง
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B0000] via-[#8B0000] to-[#6B0000] py-8 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/hongmove-logo.png"
            alt="Hongmove Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">จองรถรับ-ส่ง</h1>
          <p className="text-white/90 text-sm md:text-base">
            กรุณากรอกข้อมูลเพื่อจองรถรับ-ส่ง
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ข้อมูลผู้โดยสาร */}
            <section>
              <h2 className="text-lg font-semibold text-slate-700">
                ข้อมูลผู้โดยสาร
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="passengerName"
                    className="block text-sm font-medium text-slate-600"
                  >
                    ชื่อ-นามสกุล*
                  </label>
                  <input
                    type="text"
                    id="passengerName"
                    name="passengerName"
                    placeholder="ชื่อ-นามสกุล"
                    value={formData.passengerName}
                    onChange={(e) => handleChange('passengerName', e.target.value)}
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
                    placeholder="08x-xxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
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
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
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
                  <LocationDropdown
                    label="ต้นทาง (จุดรับ)"
                    placeholder="เลือกจุดรับ"
                    value={formData.pickupLocation}
                    onChange={(value) => handleChange('pickupLocation', value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dropoffLocation"
                    className="block text-sm font-medium text-slate-600"
                  >
                    ปลายทาง (จุดส่ง)*
                  </label>
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    placeholder="ท่าอากาศยาน, โรงแรม, ที่อยู่"
                    value={formData.dropoffLocation}
                    onChange={(e) => handleChange('dropoffLocation', e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="travelDateTime"
                    className="block text-sm font-medium text-slate-600"
                  >
                    วันที่และเวลา*
                  </label>
                  <input
                    type="datetime-local"
                    id="travelDateTime"
                    name="travelDateTime"
                    value={formData.travelDateTime}
                    onChange={(e) => handleChange('travelDateTime', e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* หมายเหตุ */}
            <section>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-slate-600"
              >
                หมายเหตุ
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#8b0000] focus:outline-none focus:ring-1 focus:ring-[#8b0000]"
              />
            </section>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            {/* Action buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-[#8b0000] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6b0000] disabled:opacity-50 disabled:cursor-not-allowed sm:flex-initial"
              >
                {isSubmitting ? 'กำลังจอง...' : 'ยืนยันการจอง'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2025 Hongmove - บริการรถรับ-ส่งสนามบิน</p>
        </div>
      </div>
    </div>
  );
}
