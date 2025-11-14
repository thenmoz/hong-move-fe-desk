'use client';

import React from 'react';
import { DollarSign, CreditCard, CheckCircle } from 'lucide-react';
import { Booking } from '@/types/booking';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PaymentBadge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface PaymentViewProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!booking) return null;

  const formatDateTime = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'dd MMMM yyyy เวลา HH:mm น.', { locale: th });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ข้อมูลการชำระเงิน" size="lg">
      <div className="space-y-4">
        {/* Booking Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">ข้อมูลการจอง</h4>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking Number:</span>
              <span className="font-semibold text-gray-900">{booking.bookingNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">ผู้โดยสาร:</span>
              <span className="font-semibold text-gray-900">{booking.passengerName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">เวลาเดินทาง:</span>
              <span className="font-semibold text-gray-900">
                {formatDateTime(booking.travelDateTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">รายละเอียดการชำระเงิน</h4>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">สถานะการชำระเงิน:</span>
              <PaymentBadge status={booking.paymentStatus} />
            </div>

            {booking.finalMeterPrice && (
              <>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ยอดจาก ThaiStar (Meter):</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ฿{booking.finalMeterPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {booking.omiseChargeId && (
                  <div className="bg-white rounded p-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">ชำระเงินสำเร็จ</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Omise Charge ID:</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {booking.omiseChargeId}
                      </code>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      <p>ข้อมูลจาก Omise Webhook</p>
                      <p>ยอดเงินจะถูก sync จาก ThaiStar เมื่อทริปเสร็จสิ้น</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {!booking.finalMeterPrice && (
              <div className="text-center py-4 text-gray-500">
                <p>ยังไม่มีข้อมูลยอดจาก ThaiStar</p>
                <p className="text-sm">ยอดจะแสดงเมื่อทริปเสร็จสิ้น</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {booking.note && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h5 className="text-sm font-semibold text-gray-900 mb-1">หมายเหตุ:</h5>
            <p className="text-sm text-gray-700">{booking.note}</p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            ปิด
          </Button>
        </div>
      </div>
    </Modal>
  );
};
