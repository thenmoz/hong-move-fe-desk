import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'จองรถรับ-ส่ง | Hongmove',
  description: 'จองรถรับ-ส่งสนามบินกับ Hongmove',
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      {children}
    </div>
  );
}
