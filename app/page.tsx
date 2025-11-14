import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#6B0000]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
      <Image
        src="/hongmove-logo.png"
        alt="Hongmove Logo"
        width={96}
        height={96}
        className="mx-auto h-24 w-24 object-contain"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-16 px-4 py-16 lg:flex-row lg:items-center">
        <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur">
          <div className="text-center">
            <h2 className="mt-4 text-4xl font-bold text-[#121212]">
              ยินดีต้อนรับ
            </h2>
          </div>

          <form action="/dashboard" className="mt-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-lg font-light text-[#121212]"
              >
                ชื่อผู้ใช้งาน
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Admin1234"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#7a0a0a] focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/40"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-lg font-light text-[#121212]"
              >
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#7a0a0a] focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/40"
              />
            </div>

            <div className="text-right text-sm">
              <Link
                href="#"
                className="text-[#7a0a0a] transition-colors hover:text-[#5c0000]"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#7a0a0a] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-[#7a0a0a]/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#5c0000] focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/50"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
