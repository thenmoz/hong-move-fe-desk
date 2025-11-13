'use client';

import React from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Eye, Mail, Edit, DollarSign } from 'lucide-react';
import { Booking } from '@/types/booking';
import { PaymentBadge, JobStatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BookingTableProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onSendEmail: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onViewPayment: (booking: Booking) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onViewDetails,
  onSendEmail,
  onEdit,
  onViewPayment,
}) => {
  const formatDateTime = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'dd MMM yyyy HH:mm', { locale: th });
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
        <p className="text-gray-500">ไม่พบข้อมูลการจอง</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ผู้โดยสาร
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เวลาเดินทาง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จุดรับ - ส่ง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะการชำระ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะงาน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.bookingNumber}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{booking.passengerName}</div>
                  <div className="text-sm text-gray-500">{booking.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDateTime(booking.travelDateTime)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    <div className="font-medium">รับ: {booking.pickupLocation}</div>
                    <div className="text-gray-500">ส่ง: {booking.dropoffLocation}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PaymentBadge status={booking.paymentStatus} />
                  {booking.finalMeterPrice && (
                    <div className="text-sm text-gray-600 mt-1">
                      ฿{booking.finalMeterPrice.toLocaleString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <JobStatusBadge status={booking.jobStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(booking)}
                      className="text-blue-600 hover:text-blue-900"
                      title="ดูรายละเอียด"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(booking)}
                      className="text-gray-600 hover:text-gray-900"
                      title="แก้ไข"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSendEmail(booking)}
                      className="text-green-600 hover:text-green-900"
                      title="ส่งอีเมล"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    {booking.finalMeterPrice && (
                      <button
                        onClick={() => onViewPayment(booking)}
                        className="text-purple-600 hover:text-purple-900"
                        title="ดูข้อมูลการชำระเงิน"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
