import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RBMJ Portal (Next + GAS)",
  description: "Frontend publik yang terhubung ke Google Apps Script Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header className="bg-white border-b">
          <div className="container flex items-center gap-3 py-3">
            <div className="h-7 w-7 rounded bg-slate-900" />
            <h1 className="text-lg font-semibold">RBMJ Portal</h1>
            <span className="text-xs text-gray-500">Next.js + GAS</span>
          </div>
        </header>
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
