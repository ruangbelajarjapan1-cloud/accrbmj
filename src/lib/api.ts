const BASE = process.env.NEXT_PUBLIC_GAS_BASE!;
if (!BASE) console.warn("NEXT_PUBLIC_GAS_BASE belum diisi (.env.local)");

async function get<T>(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}?${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GAS error ${res.status}`);
  return (await res.json()) as T;
}

async function post<T>(body: any) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GAS error ${res.status}`);
  return (await res.json()) as T;
}

/** ==== Endpoints ==== */
export type Kelas = { id: string; nama: string };

export const api = {
  listKelas: () => get<Kelas[]>({ action: "list-kelas" }),
  rekapKelas: (kelas_id: string, dari: string, sampai: string) =>
    get<{ range: any; items: any[] }>({
      action: "rekap-absensi-kelas",
      kelas_id,
      dari,
      sampai,
    }),
  rekapSekolah: (dari: string, sampai: string) =>
    get<{ range: any; items: any[]; summary: any }>({
      action: "rekap-absensi-sekolah",
      dari,
      sampai,
    }),
  exportSekolahCsv: (dari: string, sampai: string) =>
    get<{ url: string }>({ action: "export-absensi-sekolah-csv", dari, sampai }),
  exportKelasCsv: (kelas_id: string, dari: string, sampai: string) =>
    get<{ url: string }>({
      action: "export-absensi-kelas-csv",
      kelas_id,
      dari,
      sampai,
    }),
  waKelas: (kelas_id: string, tanggal: string) =>
    get<{ wa: string }>({ action: "wa-absensi-kelas", kelas_id, tanggal }),
  waSekolah: (dari: string, sampai: string) =>
    get<{ wa: string }>({ action: "wa-absensi-sekolah", dari, sampai }),
  saveAbsensiBatch: (payload: any) =>
    post<{ ok: boolean; saved: number }>({ action: "save-absensi-batch", payload }),
};
