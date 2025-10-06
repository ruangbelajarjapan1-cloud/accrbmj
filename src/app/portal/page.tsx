"use client";

const GAS_URL = process.env.NEXT_PUBLIC_RBMJ_PORTAL_URL || "";

export default function PortalEmbed() {
  if (!GAS_URL) {
    return (
      <div className="card">
        <p>
          <b>Belum ada URL Portal GAS.</b> Isi variabel
          {" "}
          <code>NEXT_PUBLIC_RBMJ_PORTAL_URL</code>
          {" "}
          di <code>.env.local</code>.
        </p>
      </div>
    );
  }
  return (
    <section className="card" style={{ height: "80vh" }}>
      <h2 className="text-lg font-semibold mb-2">Portal GAS (fitur lengkap)</h2>
      <iframe
        src={GAS_URL}
        title="RBMJ GAS Portal"
        style={{ width: "100%", height: "calc(100% - 2rem)", border: "1px solid #e5e7eb", borderRadius: 12 }}
      />
    </section>
  );
}
