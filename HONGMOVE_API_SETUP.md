# Hongmove API Integration Setup Guide

## ภาพรวม

แอปพลิเคชันนี้เชื่อมต่อกับ Hongmove API สำหรับการจัดการ bookings, trips, และ payments

**API Base URL**: `https://hongmove-api-staging.up.railway.app`

## ขั้นตอนการตั้งค่า

### 1. ตั้งค่า Environment Variables

คัดลอกไฟล์ `.env.example` เป็น `.env.local`:

```bash
cp .env.example .env.local
```

แก้ไขไฟล์ `.env.local` และใส่ค่าจริง:

```env
NEXT_PUBLIC_HONGMOVE_API_URL=https://hongmove-api-staging.up.railway.app
HONGMOVE_AGENT_TOKEN=<your-agent-token>
```

**หมายเหตุ**:
- `HONGMOVE_AGENT_TOKEN` จำเป็นสำหรับการ list/manage bookings
- สำหรับ customer bookings (หน้า `/book`) สามารถใช้งานได้โดยไม่ต้องมี token (ถ้า API อนุญาต)

### 2. รับ Agent Token

ติดต่อ Hongmove API administrator เพื่อขอ:
- Agent Token สำหรับ staff/admin operations
- (Optional) Driver Token สำหรับ trip operations
- (Optional) POS API Key สำหรับ meter operations

### 3. ทดสอบการเชื่อมต่อ

```bash
# ทดสอบ API connection
curl https://hongmove-api-staging.up.railway.app

# ควรได้รับ response:
# {"success":true,"data":"Hello World!"}
```

### 4. ทดสอบ Create Booking (ต้องมี token)

```bash
curl -X POST https://hongmove-api-staging.up.railway.app/bookings \
  -H "Authorization: Bearer YOUR_AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "passenger_name": "John Doe",
    "passenger_email": "john@example.com",
    "passenger_phone": "+66812345678",
    "pickup_location": "Suvarnabhumi Airport",
    "dropoff_location": "Sukhumvit Soi 11",
    "pickup_time": "2025-11-15T14:30:00+07:00",
    "pickup_timezone": "Asia/Bangkok"
  }'
```

## API Endpoints ที่ใช้งาน

### Bookings

- `POST /bookings` - สร้าง booking ใหม่
- `GET /bookings` - ดึงรายการ bookings (ต้องมี token)
- `GET /bookings/:id` - ดูรายละเอียด booking (ต้องมี token)
- `PATCH /bookings/:id` - แก้ไข booking (ต้องมี token)
- `DELETE /bookings/:id` - ยกเลิก booking (ต้องมี token)
- `POST /bookings/:id/resend-email` - ส่งอีเมลยืนยันอีกครั้ง (ต้องมี token)

### Trips (สำหรับ POS/Driver)

- `POST /trips/start` - เริ่มทริป
- `POST /trips/:id/stop` - จบทริป

### Payments

- `GET /payments/:id` - ตรวจสอบสถานะการชำระเงิน
- `GET /payments` - ดูรายการ payments (ต้องมี token)
- `POST /payments/omise/webhook` - Webhook จาก Omise

## โครงสร้างไฟล์

```
lib/
  hongmove-api.ts          # API client library
app/
  api/
    bookings/
      route.ts             # Next.js API route (proxy to Hongmove API)
  book/
    page.tsx               # Customer booking page
```

## Data Mapping

### Frontend → API

```typescript
{
  passengerName → passenger_name
  email → passenger_email
  phone → passenger_phone
  pickupLocation → pickup_location
  dropoffLocation → dropoff_location
  travelDateTime → pickup_time
  note → passenger_notes
}
```

### API → Frontend

```typescript
{
  booking_id → id
  booking_number → bookingNumber
  passenger_name → passengerName
  passenger_email → email
  passenger_phone → phone
  pickup_location → pickupLocation
  dropoff_location → dropoffLocation
  pickup_time → travelDateTime
  passenger_notes → note
}
```

## Error Handling

API จะส่ง response ในรูปแบบ envelope:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  }
}
```

## การพัฒนาต่อ

### TODO List

- [ ] เพิ่มการส่งอีเมลยืนยันอัตโนมัติ
- [ ] เชื่อมต่อ Dashboard กับ Hongmove API
- [ ] เพิ่ม Payment integration กับ Omise
- [ ] เพิ่ม Trip management UI
- [ ] เพิ่ม Real-time updates (WebSocket/Polling)

### การทดสอบ

```bash
# Run development server
npm run dev

# ทดสอบหน้าจองลูกค้า
open http://localhost:3000/book

# ทดสอบ API route
curl http://localhost:3000/api/bookings
```

## Security Notes

- ไม่ commit `.env.local` ลง git
- เก็บ API tokens ไว้ที่ server-side เท่านั้น (ไม่ใช่ใน `NEXT_PUBLIC_*`)
- ใช้ HTTPS ใน production
- Validate input ทั้งฝั่ง client และ server

## Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:
1. ตรวจสอบ console logs
2. ตรวจสอบ API response ใน Network tab
3. ดู Postman collection: `hongmove.postman_collection.json`
4. ติดต่อทีม Hongmove API
