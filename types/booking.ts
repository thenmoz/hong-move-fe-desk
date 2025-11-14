export type PaymentStatus = 'paid' | 'unpaid';

export type JobStatus =
  | 'pending'      // รอยืนยัน
  | 'confirmed'    // ยืนยันแล้ว
  | 'in_progress'  // กำลังเดินทาง
  | 'completed'    // เสร็จสิ้น
  | 'cancelled';   // ยกเลิก

export interface Booking {
  id: string;
  bookingNumber: string;

  // ข้อมูลผู้โดยสาร
  passengerName: string;
  phone: string;
  email: string;

  // จุดรับ-ส่ง
  pickupLocation: string;
  dropoffLocation: string;

  // เวลา
  travelDateTime: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;

  // สถานะ
  paymentStatus: PaymentStatus;
  jobStatus: JobStatus;

  // ข้อมูลการชำระเงิน
  finalMeterPrice?: number; // ยอดจาก ThaiStar เมื่อเสร็จทริป
  omiseChargeId?: string;   // Charge ID จาก Omise webhook

  // อื่นๆ
  note?: string;
  emailSentAt?: Date | string;
}

export interface BookingFormData {
  passengerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropoffLocation: string;
  travelDateTime: string;
  note?: string;
}

export interface SearchFilters {
  dateFrom?: string;
  dateTo?: string;
  bookingNumber?: string;
  passengerName?: string;
  paymentStatus?: PaymentStatus | 'all';
  jobStatus?: JobStatus | 'all';
}
