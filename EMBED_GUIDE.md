# คู่มือการ Embed หน้าจองใน Webflow

## วิธีการ Embed ใน Webflow

### Option 1: ใช้ iframe (แนะนำ)

เพิ่ม **Embed Element** ใน Webflow แล้ววาง code นี้:

```html
<iframe
  src="https://your-domain.com/book"
  width="100%"
  height="900"
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
  title="Hongmove Booking Form"
></iframe>
```

#### ปรับแต่งความสูงอัตโนมัติ (Optional)

หากต้องการให้ iframe ปรับความสูงตามเนื้อหาอัตโนมัติ เพิ่ม script นี้:

```html
<iframe
  id="hongmove-booking"
  src="https://your-domain.com/book"
  width="100%"
  height="900"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="Hongmove Booking Form"
></iframe>

<script>
  // Auto-resize iframe
  window.addEventListener('message', function(e) {
    if (e.data.type === 'resize') {
      document.getElementById('hongmove-booking').style.height = e.data.height + 'px';
    }
  });
</script>
```

### Option 2: ใช้ Custom Domain

หากต้องการให้หน้าจองอยู่ใน subdomain ของคุณ:

1. ตั้งค่า DNS CNAME record:
   ```
   book.your-domain.com -> your-nextjs-app.vercel.app
   ```

2. ใน Webflow สร้าง redirect หรือใช้ link ไปที่:
   ```
   https://book.your-domain.com
   ```

## การตั้งค่า Responsive

หน้าจองถูกออกแบบให้ responsive อัตโนมัติ:

- **Desktop**: แสดงผลแบบเต็มหน้า
- **Tablet**: ปรับ layout ให้เหมาะสม
- **Mobile**: แสดงผลแบบ single column

### ตัวอย่างการปรับแต่ง CSS ใน Webflow

```css
/* สำหรับ Desktop */
@media (min-width: 768px) {
  #hongmove-booking {
    height: 900px;
  }
}

/* สำหรับ Mobile */
@media (max-width: 767px) {
  #hongmove-booking {
    height: 1200px;
  }
}
```

## การทดสอบ

1. ทดสอบหน้าจองที่: `http://localhost:3000/book`
2. ทดสอบใน iframe:
   ```html
   <iframe src="http://localhost:3000/book" width="100%" height="900"></iframe>
   ```

## Features

- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Form validation
- ✅ หน้ายืนยันการจอง
- ✅ สร้าง booking number อัตโนมัติ
- ✅ รองรับการ embed ใน iframe
- ⏳ ส่งอีเมลยืนยัน (TODO)
- ⏳ เชื่อมต่อ Hongmove API (TODO)

## API Endpoints

- `POST /api/bookings` - สร้าง booking ใหม่
- `GET /api/bookings` - ดึงรายการ bookings

## ข้อมูลที่จำเป็นในการจอง

- ชื่อผู้โดยสาร *
- เบอร์โทรศัพท์ *
- อีเมล *
- จุดรับ *
- จุดส่ง *
- วันที่และเวลา *
- หมายเหตุ (optional)

## Security

- Form validation ทั้งฝั่ง client และ server
- HTTPS recommended สำหรับ production
- CORS configuration (ถ้าจำเป็น)

## Next Steps

1. Deploy ไปยัง production (Vercel แนะนำ)
2. ตั้งค่า custom domain
3. เชื่อมต่อ email service (SendGrid, Resend, etc.)
4. เชื่อมต่อ Hongmove API
5. เพิ่ม analytics tracking

## Support

หากมีปัญหาในการ embed กรุณาติดต่อทีมพัฒนา
