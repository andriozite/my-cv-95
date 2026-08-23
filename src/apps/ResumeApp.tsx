import { useState } from "react";
import {
  IDENTITAS,
  PROFIL,
  KOMPETENSI,
  PENGALAMAN,
  PENDIDIKAN,
  SERTIFIKASI,
  BAHASA,
} from "../data";
import { playError, playOpen } from "../screens/Boot";

const MENU = ["File", "Edit", "View", "Insert", "Format", "Tools", "Table", "Window", "Help"];

export default function ResumeApp() {
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fakeSave = () => {
    playOpen();
    setMsg("Dokumen disimpan ke C:\\My Documents\\Resume_Andrian.doc\n(1.024 kata — siap dikirim ke HR)");
    setSaved(true);
  };

  return (
    <div className="relative flex h-full flex-col text-black">
      {/* menu bar */}
      <div className="flex shrink-0 items-center gap-[2px] border-b border-[#808080] bg-[#c0c0c0] px-1 py-[2px]">
        {MENU.map((m) => (
          <button
            key={m}
            onClick={() => {
              playError();
              setMsg(`Menu "${m}" tidak tersedia di versi evaluasi ini.`);
            }}
            className="cursor-default px-[7px] py-[1px] hover:bg-[#000080] hover:text-white"
          >
            <span className="underline">{m[0]}</span>
            {m.slice(1)}
          </button>
        ))}
      </div>

      {/* toolbar */}
      <div className="flex shrink-0 items-center gap-[3px] border-b border-[#808080] bg-[#c0c0c0] px-1 py-[3px]">
        <TB title="New" onClick={() => setMsg("Dokumen baru? CV ini sudah final sejak 2026.")}>
          <DocGlyph />
        </TB>
        <TB title="Open" onClick={() => setMsg("Membuka... ternyata isinya sama: prestasi semua.")}>
          <FolderGlyph />
        </TB>
        <TB title="Save" onClick={fakeSave}>
          <SaveGlyph />
        </TB>
        <span className="mx-1 h-[18px] w-[2px] border-l border-[#808080] border-r border-r-white" />
        <TB title="Print (cetak CV)" onClick={() => window.print()}>
          <PrintGlyph />
        </TB>
        <span className="mx-1 h-[18px] w-[2px] border-l border-[#808080] border-r border-r-white" />
        <TB title="Bold" onClick={() => setMsg("Semua pencapaian sudah ditebalkan oleh kenyataan.")}>
          <span className="text-[12px] font-bold">B</span>
        </TB>
        <TB title="Italic" onClick={() => setMsg("Tidak ada yang perlu dimiringkan.")}>
          <span className="text-[12px] italic font-serif">I</span>
        </TB>
        <TB title="Underline" onClick={() => setMsg("Garis bawah? Angka 99,9% sudah cukup.")}>
          <span className="text-[12px] underline">U</span>
        </TB>
        <span className="ml-auto flex items-center gap-1 pr-1">
          <span className="field px-2 py-[1px] text-[11px]">100%</span>
        </span>
      </div>

      {/* ruler */}
      <div className="flex h-[14px] shrink-0 items-end border-b border-[#808080] bg-white px-2">
        <div
          className="h-[8px] w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,#000 0 1px,transparent 1px 28px), linear-gradient(#fff,#fff)",
            backgroundSize: "28px 100%",
          }}
        />
      </div>

      {/* halaman */}
      <div className="w95-scroll min-h-0 flex-1 overflow-auto border-t border-white bg-[#808080] p-4 sm:p-6 print:overflow-visible print:border-0 print:bg-white print:p-0">
        <div
          id="print-area"
          className="mx-auto mb-6 w-full max-w-[760px] border border-black bg-white px-8 py-9 shadow-[6px_6px_0_rgba(0,0,0,0.4)] sm:px-12 print:max-w-none print:border-0 print:shadow-none"
          style={{ fontSize: 13, lineHeight: 1.5 }}
        >
          {/* kepala CV */}
          <header className="border-b-2 border-[#000080] pb-3 text-center">
            <h1 className="text-[26px] font-bold tracking-wide text-[#000080]">{IDENTITAS.nama.toUpperCase()}</h1>
            <p className="mt-1 text-[13px] font-bold">{IDENTITAS.role}</p>
            <p className="mt-1 text-[12px] text-[#333]">
              {IDENTITAS.lokasi} &nbsp;·&nbsp; <span className="text-[#000080] underline">{IDENTITAS.email}</span>
            </p>
          </header>

          <Section title="PROFIL">{PROFIL}</Section>

          <Section title="KOMPETENSI INTI">
            {KOMPETENSI.map((k) => (
              <p key={k.kategori} className="mb-1">
                <span className="font-bold">• {k.kategori}:</span> {k.items.join(", ")}
              </p>
            ))}
          </Section>

          <Section title="PENGALAMAN KERJA">
            {PENGALAMAN.map((p) => (
              <div key={p.id} className="mb-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-bold">
                    {p.perusahaan}
                    {p.sub ? <span className="font-normal italic"> — {p.sub}</span> : null}
                  </p>
                  <p className="font-bold text-[#000080]">{p.periode}</p>
                </div>
                <p className="italic">{p.peran}</p>
                {p.grup.map((g) => (
                  <div key={g.judul} className="mt-1">
                    {g.judul !== "Ringkasan" ? <p className="font-bold underline">{g.judul}:</p> : null}
                    <ul className="ml-4 list-disc">
                      {g.items.map((it, i) => (
                        <li key={i} className="mb-[2px]">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </Section>

          <Section title="PENDIDIKAN & KUALIFIKASI">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-bold">{PENDIDIKAN.sekolah}</p>
              <p className="font-bold text-[#000080]">{PENDIDIKAN.tahun}</p>
            </div>
            <p className="italic">{PENDIDIKAN.jurusan}</p>
            <p className="mt-2 font-bold">Sertifikasi:</p>
            <ul className="ml-4 list-disc">
              {SERTIFIKASI.map((s) => (
                <li key={s.nama}>
                  {s.nama} <span className="italic">({s.lembaga})</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="BAHASA">
            <p>
              {BAHASA.map((b) => (
                <span key={b.nama} className="mr-6">
                  <span className="font-bold">• {b.nama}:</span> {b.level}
                </span>
              ))}
            </p>
          </Section>

          <footer className="mt-6 border-t border-[#999] pt-2 text-center text-[10px] text-[#666]">
            Resume_Andrian.doc — diperbarui 2026 · referensi & detail proyek tersedia atas permintaan
          </footer>
        </div>
      </div>

      {/* status bar */}
      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <StatusCell className="w-[110px]">{saved ? "Tersimpan ✓" : "Hal 1/1"}</StatusCell>
        <StatusCell className="flex-1">1.024 kata · Bahasa Indonesia (ID)</StatusCell>
        <StatusCell className="w-[70px]">100%</StatusCell>
      </div>

      {/* message box */}
      {msg && (
        <div className="no-print absolute inset-0 z-20 flex items-center justify-center bg-black/10">
          <div className="bevel-out w-[340px] border border-black p-[3px]">
            <div className="titlebar flex h-[20px] items-center px-2 text-[11px] font-bold">Microsoft Word</div>
            <div className="flex gap-3 bg-[#c0c0c0] p-4">
              <InfoGlyph />
              <p className="whitespace-pre-line text-[12px] leading-snug">{msg}</p>
            </div>
            <div className="flex justify-center bg-[#c0c0c0] pb-3">
              <button className="w95-btn w-[86px] py-[3px] text-[12px]" onClick={() => setMsg(null)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1 border-b border-[#000080] pb-[2px] text-[14px] font-bold tracking-wide text-[#000080]">
        {title}
      </h2>
      <div className="text-[12.5px] text-[#111]">{children}</div>
    </section>
  );
}

function StatusCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bevel-in-thin px-2 py-[1px] ${className}`}>{children}</div>;
}

function TB({ children, title, onClick }: { children: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button title={title} aria-label={title} onClick={onClick} className="w95-btn flex h-[22px] w-[24px] items-center justify-center">
      {children}
    </button>
  );
}

function DocGlyph() {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14">
      <rect x="1.5" y="0.5" width="9" height="13" fill="#fff" stroke="#000" />
      <path d="M7 0.5h3.5V4z" fill="#c0c0c0" stroke="#000" strokeWidth="0.7" />
      <rect x="3" y="5" width="6" height="1" fill="#000080" />
      <rect x="3" y="7" width="6" height="1" fill="#808080" />
      <rect x="3" y="9" width="6" height="1" fill="#808080" />
      <rect x="3" y="11" width="4" height="1" fill="#808080" />
    </svg>
  );
}
function FolderGlyph() {
  return (
    <svg width="15" height="13" viewBox="0 0 15 13">
      <path d="M0.5 2h5l1.5 1.5H14.5v9H0.5z" fill="#ecc94b" stroke="#000" />
      <path d="M0.5 4.5h14" stroke="#8f6b00" strokeWidth="0.8" />
    </svg>
  );
}
function SaveGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <rect x="0.5" y="0.5" width="13" height="13" fill="#000080" stroke="#000" />
      <rect x="3" y="1" width="8" height="4" fill="#c0c0c0" />
      <rect x="8.5" y="1.5" width="1.5" height="3" fill="#808080" />
      <rect x="2.5" y="7.5" width="9" height="6" fill="#fff" />
      <rect x="4" y="9" width="6" height="1" fill="#808080" />
      <rect x="4" y="11" width="6" height="1" fill="#808080" />
    </svg>
  );
}
function PrintGlyph() {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14">
      <rect x="3" y="0.5" width="9" height="4" fill="#fff" stroke="#000" />
      <rect x="0.5" y="4" width="14" height="6" fill="#c0c0c0" stroke="#000" />
      <rect x="2" y="5.5" width="2" height="1.5" fill="#21b039" />
      <rect x="3" y="8" width="9" height="5.5" fill="#fff" stroke="#000" />
      <rect x="4.5" y="9.5" width="6" height="1" fill="#808080" />
      <rect x="4.5" y="11.5" width="6" height="1" fill="#808080" />
    </svg>
  );
}
function InfoGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" className="shrink-0">
      <circle cx="15" cy="15" r="13" fill="#000080" />
      <circle cx="15" cy="15" r="13" fill="none" stroke="#1084d0" strokeWidth="2" />
      <rect x="13.5" y="8" width="3" height="3" fill="#fff" />
      <rect x="13.5" y="13" width="3" height="10" fill="#fff" />
    </svg>
  );
}
