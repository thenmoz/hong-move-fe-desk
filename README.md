# Frontdesk Web App

โปรเจคนี้เป็น Frontdesk Dashboard สำหรับจัดการ Booking ของบริการรถรับส่งสนามบิน

## Features

### ✅ Daily Order History
- แสดงรายการ booking ของแต่ละวันพร้อมสถานะการชำระ
- Dashboard แสดงสถิติ: Bookings วันนี้, ทั้งหมด, ยังไม่ชำระ

### ✅ Create Booking
- กรอกข้อมูลผู้โดยสาร: ชื่อ, เบอร์โทร, email
- ข้อมูลเที่ยวบิน: Flight Number
- จุดรับ-ส่ง: Pickup และ Drop-off Location
- เวลาเดินทาง: วันที่และเวลา
- แก้ไขเวลาได้ (update real-time)
- หมายเหตุเพิ่มเติม

### ✅ Email Confirmation
- ส่ง Booking Number ไปยังอีเมลลูกค้า
- มีปุ่ม Resend สำหรับส่งอีเมลซ้ำ
- แสดงสถานะการส่งอีเมล

### ✅ Search & Filter
ค้นหาและกรองข้อมูลด้วย:
- วันที่เริ่มต้น - วันที่สิ้นสุด
- Booking Number
- ชื่อผู้โดยสาร
- Flight Number
- Payment Status (Paid/Unpaid)
- สถานะงาน (รอยืนยัน, ยืนยันแล้ว, กำลังเดินทาง, เสร็จสิ้น, ยกเลิก)

### ✅ Payment View
- เห็นยอดที่ถูกผูกจาก ThaiStar (final_meter_price)
- แสดงข้อมูล Omise Charge ID เมื่อลูกค้าชำระเงิน
- รองรับ Webhook จาก Omise (พร้อมต่อ API)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
frontdesk-app/
├── app/
│   └── page.tsx              # Main Dashboard page
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── booking/              # Booking components
│   │   └── BookingForm.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── SearchFilter.tsx
│   │   └── BookingTable.tsx
│   ├── email/                # Email components
│   │   └── EmailConfirmation.tsx
│   └── payment/              # Payment components
│       └── PaymentView.tsx
├── types/
│   └── booking.ts            # TypeScript types/interfaces
├── data/
│   └── mockBookings.ts       # Mock data for testing
└── lib/                      # Utility functions
```

## Features Breakdown

### Booking Management
- ✅ Create new booking
- ✅ Edit existing booking
- ✅ View booking details
- ✅ Update travel time (real-time)
- ✅ Delete/Cancel booking

### Filtering & Search
- ✅ Date range filter
- ✅ Booking number search
- ✅ Passenger name search
- ✅ Flight number search
- ✅ Payment status filter
- ✅ Job status filter

### Email System
- ✅ Send confirmation email
- ✅ Resend email functionality
- ✅ Email sent status tracking

### Payment Integration
- ✅ Display final meter price from ThaiStar
- ✅ Payment status tracking (Paid/Unpaid)
- ✅ Omise Charge ID display
- 🔄 Webhook integration (ready for API)

## Next Steps (Backend Integration)

เมื่อพร้อมจะต่อ Backend:

1. **Database Setup**
   - เชื่อมต่อ Database (PostgreSQL/MySQL/MongoDB)
   - สร้าง API routes สำหรับ CRUD operations

2. **Email Service**
   - ใช้ service เช่น SendGrid, Resend, หรือ Nodemailer
   - สร้าง email template สำหรับ booking confirmation

3. **ThaiStar Integration**
   - API integration สำหรับ sync ข้อมูลทริป
   - Webhook handler สำหรับรับ final_meter_price

4. **Omise Payment**
   - Webhook handler สำหรับ payment confirmation
   - Update payment status อัตโนมัติ

5. **Authentication**
   - เพิ่ม user authentication (NextAuth.js)
   - Role-based access control

## Notes

- ปัจจุบันใช้ mock data สำหรับ development
- UI/UX สามารถปรับแต่งสีและ styling ได้ตามต้องการ
- Component ทั้งหมดสร้างด้วย TypeScript และ responsive design

## License

Private Project
