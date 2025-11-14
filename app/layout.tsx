import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hongmove Booking Dashboard",
    template: "%s | Hongmove Booking Dashboard",
  },
  description:
    "Frontdesk interface for managing Hongmove transportation bookings and daily performance insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
