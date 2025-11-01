'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Booking } from '@/types/booking';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface EmailConfirmationProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!booking) return null;

  const handleSendEmail = async () => {
    setIsSending(true);
    setSendStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendStatus('success');

      // Auto close after 2 seconds
      setTimeout(() => {
        setSendStatus('idle');
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatDateTime = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'dd MMMM yyyy เวลา HH:mm น.', { locale: th });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ส่งยืนยันการจอง" size="lg">
      <div className="space-y-4">
        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">รายละเอียดการจอง</h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Booking Number:</span>
              <p className="font-semibold text-gray-900">{booking.bookingNumber}</p>
            </div>

            <div>
              <span className="text-gray-500">ผู้โดยสาร:</span>
              <p className="font-semibold text-gray-900">{booking.passengerName}</p>
            </div>

            <div>
              <span className="text-gray-500">อีเมล:</span>
              <p className="font-semibold text-blue-600">{booking.email}</p>
            </div>

            <div>
              <span className="text-gray-500">เบอร์โทร:</span>
              <p className="font-semibold text-gray-900">{booking.phone}</p>
            </div>

            <div className="col-span-2">
              <span className="text-gray-500">Flight:</span>
              <p className="font-semibold text-gray-900">{booking.flightNumber}</p>
            </div>

            <div className="col-span-2">
              <span className="text-gray-500">เวลาเดินทาง:</span>
              <p className="font-semibold text-gray-900">
                {formatDateTime(booking.travelDateTime)}
              </p>
            </div>

            <div className="col-span-2">
              <span className="text-gray-500">จุดรับ:</span>
              <p className="font-medium text-gray-900">{booking.pickupLocation}</p>
            </div>

            <div className="col-span-2">
              <span className="text-gray-500">จุดส่ง:</span>
              <p className="font-medium text-gray-900">{booking.dropoffLocation}</p>
            </div>
          </div>
        </div>

        {/* Email Sent Status */}
        {booking.emailSentAt && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">
                อีเมลถูกส่งแล้วเมื่อ:{' '}
                {formatDateTime(booking.emailSentAt)}
              </span>
            </div>
          </div>
        )}

        {/* Send Status Messages */}
        {sendStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">ส่งอีเมลสำเร็จ!</span>
            </div>
          </div>
        )}

        {sendStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">เกิดข้อผิดพลาดในการส่งอีเมล</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSendEmail}
            disabled={isSending}
          >
            <Mail className="w-4 h-4 mr-2" />
            {isSending ? 'กำลังส่ง...' : booking.emailSentAt ? 'ส่งอีกครั้ง (Resend)' : 'ส่งอีเมล'}
          </Button>
          <Button variant="secondary" onClick={onClose} disabled={isSending}>
            ปิด
          </Button>
        </div>
      </div>
    </Modal>
  );
};
