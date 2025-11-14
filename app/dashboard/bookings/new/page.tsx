'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AdminBookingFormData {
  passengerName: string;
  phone: string;
  email: string;
  flightNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  travelDateTime: string;
  note?: string;
}

export default function NewBookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<AdminBookingFormData>({
    passengerName: '',
    phone: '',
    email: '',
    flightNumber: '',
    pickupLocation: '',
    dropoffLocation: '',
    travelDateTime: '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof AdminBookingFormData, value: string) => {
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
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการสร้าง booking');
      }

      // Success - redirect to bookings list
      router.push('/dashboard/bookings');
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการสร้าง booking กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#7a0a0a] transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าแดชบอร์ด
          </Link>
          <h1 className="text-2xl font-bold text-[#3a0000]">สร้าง Booking ใหม่</h1>
          <p className="text-sm text-slate-600 mt-1">กรอกข้อมูลผู้โดยสารและรายละเอียดการเดินทาง</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* ข้อมูลผู้โดยสาร */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-slate-200">
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

              {/* ข้อมูลเที่ยวบิน */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-slate-200">
                  ข้อมูลเที่ยวบิน
                </h3>
                <Input
                  label="Flight Number"
                  type="text"
                  placeholder="TG401, DD8823, etc."
                  value={formData.flightNumber}
                  onChange={(e) => handleChange('flightNumber', e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-1">
                  * ไม่จำเป็น - กรอกเฉพาะกรณีรับ-ส่งสนามบิน
                </p>
              </div>

              {/* จุดรับ-ส่ง */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-slate-200">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-slate-200">
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

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? 'กำลังสร้าง...' : 'สร้าง Booking'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={() => router.back()}
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
