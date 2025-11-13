'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface BookingFormData {
  passengerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropoffLocation: string;
  travelDateTime: string;
  note?: string;
}

export default function CustomerBookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    passengerName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    travelDateTime: '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
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

      // Success
      setBookingNumber(data.booking.bookingNumber);
      setBookingSuccess(true);

      // TODO: ส่งอีเมลยืนยัน
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirmation Screen
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

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            จองสำเร็จ!
          </h2>

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
            <Button
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
                });
              }}
              className="w-full"
            >
              จองอีกครั้ง
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Booking Form
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            จองรถรับ-ส่ง
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            กรุณากรอกข้อมูลเพื่อจองรถรับ-ส่ง
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* ข้อมูลผู้โดยสาร */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                  ข้อมูลผู้โดยสาร
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ชื่อผู้โดยสาร *"
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    value={formData.passengerName}
                    onChange={(e) => handleChange('passengerName', e.target.value)}
                    required
                  />
                  <Input
                    label="เบอร์โทรศัพท์ *"
                    type="tel"
                    placeholder="08x-xxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                  <Input
                    label="อีเมล *"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="md:col-span-2"
                  />
                </div>
              </div>

              {/* จุดรับ-ส่ง */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                  จุดรับ-ส่ง
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="จุดรับ (Pickup) *"
                    type="text"
                    placeholder="ท่าอากาศยาน, โรงแรม, ที่อยู่"
                    value={formData.pickupLocation}
                    onChange={(e) => handleChange('pickupLocation', e.target.value)}
                    required
                  />
                  <Input
                    label="จุดส่ง (Drop-off) *"
                    type="text"
                    placeholder="ท่าอากาศยาน, โรงแรม, ที่อยู่"
                    value={formData.dropoffLocation}
                    onChange={(e) => handleChange('dropoffLocation', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* เวลาเดินทาง */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                  เวลาเดินทาง
                </h3>
                <Input
                  label="วันที่และเวลา *"
                  type="datetime-local"
                  value={formData.travelDateTime}
                  onChange={(e) => handleChange('travelDateTime', e.target.value)}
                  required
                />
              </div>

              {/* หมายเหตุ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุ
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/40 focus:border-[#7a0a0a] transition-all"
                  rows={3}
                  placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                  value={formData.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-lg py-4"
              >
                {isSubmitting ? 'กำลังจอง...' : 'ยืนยันการจอง'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * ฟิลด์ที่มีเครื่องหมายดอกจันต้องกรอก
              </p>
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
