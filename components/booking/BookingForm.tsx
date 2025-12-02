'use client';

import React, { useState } from 'react';
import { Booking, BookingFormData } from '@/types/booking';
import { Input } from '@/components/ui/Input';
import { LocationDropdown } from '@/components/ui/LocationDropdown';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface BookingFormProps {
  booking?: Booking; // สำหรับ edit mode
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  booking,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    passengerName: booking?.passengerName || '',
    phone: booking?.phone || '',
    email: booking?.email || '',
    pickupLocation: booking?.pickupLocation || '',
    dropoffLocation: booking?.dropoffLocation || '',
    travelDateTime: booking?.travelDateTime
      ? new Date(booking.travelDateTime).toISOString().slice(0, 16)
      : '',
    note: booking?.note || '',
  });

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* ข้อมูลผู้โดยสาร */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              ข้อมูลผู้โดยสาร
            </h4>
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
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              จุดรับ-ส่ง
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LocationDropdown
                label="จุดรับ (Pickup)"
                placeholder="เลือกจุดรับ"
                value={formData.pickupLocation}
                onChange={(value) => handleChange('pickupLocation', value)}
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
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              เวลาเดินทาง
            </h4>
            <Input
              label="วันที่และเวลา *"
              type="datetime-local"
              value={formData.travelDateTime}
              onChange={(e) => handleChange('travelDateTime', e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              * สามารถแก้ไขเวลาได้ภายหลัง
            </p>
          </div>

          {/* หมายเหตุ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมายเหตุ
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
            />
          </div>

          {/* ปุ่ม */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg">
              {booking ? 'บันทึกการแก้ไข' : 'สร้าง Booking'}
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
              ยกเลิก
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
