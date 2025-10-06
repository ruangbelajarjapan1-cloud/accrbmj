import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RBMJ Portal (Next + GAS)",
  description: "Frontend publik terhubung ke Web App Google Apps Script",
};

const nav = [
  { href: "/", label: "Absensi (Next)" },
  { href: "/portal", label: "Portal GAS (lengkap)" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header className="bg-white border-b">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-slate-900" />
              <h1 className="text-lg font-semibold">RBMJ Portal</h1>
              <span className="text-xs text-gray-500">Next.js + GAS</span>
            </div>
            <nav className="flex gap-3 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
