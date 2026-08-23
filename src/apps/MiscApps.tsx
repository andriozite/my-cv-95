import { useState, type ReactNode } from "react";
import { PENDIDIKAN, SERTIFIKASI, BAHASA } from "../data";
import { Pix } from "../icons";
import { playError, playOpen } from "../screens/Boot";

/* ---------- Message Box (dipakai bersama) ---------- */
export function MsgBox({
  title,
  text,
  onClose,
  kind = "info",
}: {
  title: string;
  text: string;
  onClose: () => void;
  kind?: "info" | "error";
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/15">
      <div className="bevel-out w-[320px] border border-black p-[3px]">
        <div className="titlebar flex h-[20px] items-center justify-between px-2 text-[11px] font-bold">
          {title}
          <button className="w95-btn flex h-[14px] w-[16px] items-center justify-center" onClick={onClose} aria-label="Tutup">
            <svg width="7" height="6" viewBox="0 0 7 6">
              <path d="M0 0h2l1.5 1.5L5 0h2v1L5.5 2.5 7 4v2H5L3.5 4.5 2 6H0V4l1.5-1.5L0 1z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className="flex gap-3 bg-[#c0c0c0] p-4">
          {kind === "error" ? (
            <svg width="30" height="30" viewBox="0 0 30 30" className="shrink-0">
              <circle cx="15" cy="15" r="13" fill="#e03c31" />
              <rect x="13" y="7" width="4" height="11" fill="#fff" />
              <rect x="13" y="20" width="4" height="4" fill="#fff" />
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 30 30" className="shrink-0">
              <circle cx="15" cy="15" r="13" fill="#000080" />
              <rect x="13.5" y="8" width="3" height="3" fill="#fff" />
              <rect x="13.5" y="13" width="3" height="10" fill="#fff" />
            </svg>
          )}
          <p className="whitespace-pre-line text-[12px] leading-snug">{text}</p>
        </div>
        <div className="flex justify-center bg-[#c0c0c0] pb-3">
          <button
            className="w95-btn w-[86px] py-[3px] text-[12px]"
            onClick={() => {
              playOpen();
              onClose();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- My Computer ---------- */
export function MyComputerApp({ openApp }: { openApp: (id: string) => void }) {
  const [view, setView] = useState<"root" | "c">("root");
  const [msg, setMsg] = useState<{ title: string; text: string; kind: "info" | "error" } | null>(null);

  const openDrive = (d: string) => {
    if (d === "c") {
      playOpen();
      setView("c");
    } else if (d === "a") {
      playError();
      setMsg({ title: "Drive A:", text: "Tidak ada disket di drive A:.\nMasukkan disket 'DATA_CV_1995' lalu coba lagi.", kind: "error" });
    } else {
      playError();
      setMsg({ title: "Drive D:", text: "D:\\ (LAZADA-CDROM 24X)\nTerbaca: INSTALL_LOGISTIK_2026.ISO — 650 MB.\nSayangnya drive ini cuma buat kenangan.", kind: "info" });
    }
  };

  const C_FILES = [
    { icon: "doc" as const, nama: "Resume.docx", aksi: () => openApp("resume") },
    { icon: "notepad" as const, nama: "About_Me.txt", aksi: () => openApp("about") },
    { icon: "briefcase" as const, nama: "Pengalaman.exe", aksi: () => openApp("experience") },
    { icon: "sliders" as const, nama: "Kompetensi.exe", aksi: () => openApp("skills") },
    { icon: "gradcap" as const, nama: "Pendidikan.lnk", aksi: () => openApp("education") },
    { icon: "cert" as const, nama: "Sertifikat.lnk", aksi: () => openApp("education") },
  ];

  return (
    <div className="relative flex h-full flex-col text-black">
      <div className="flex shrink-0 items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] p-1">
        <button
          disabled={view === "root"}
          onClick={() => setView("root")}
          className="w95-btn flex h-[22px] items-center gap-1 px-2 text-[11px]"
        >
          <svg width="10" height="12" viewBox="0 0 10 12">
            <path d="M0 12h10L5 2z M3 2h4V0H3z" fill="currentColor" />
          </svg>
          Up
        </button>
        <span className="ml-1 text-[11px] text-[#555]">{view === "root" ? "Silakan pilih drive:" : "C:\\ (SWAKARYA-HDD)"}</span>
      </div>
      <div className="field m-[3px] flex min-h-0 flex-1 flex-wrap content-start gap-4 overflow-auto p-4 w95-scroll">
        {view === "root" ? (
          <>
            <DriveTile icon="floppy" label={"Floppy (A:)"} onOpen={() => openDrive("a")} />
            <DriveTile icon="drive" label={"SWAKARYA-HDD (C:)"} onOpen={() => openDrive("c")} sub="2.026 MB · 99,5% free" />
            <DriveTile icon="cd" label={"LAZADA-CDROM (D:)"} onOpen={() => openDrive("d")} />
          </>
        ) : (
          C_FILES.map((f) => (
            <DriveTile key={f.nama} icon={f.icon} label={f.nama} onOpen={f.aksi} />
          ))
        )}
      </div>
      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin px-2 py-[1px]">{view === "root" ? "3 objek" : "6 objek"}</div>
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">klik dua kali untuk membuka</div>
      </div>
      {msg && <MsgBox title={msg.title} text={msg.text} kind={msg.kind} onClose={() => setMsg(null)} />}
    </div>
  );
}

function DriveTile({
  icon,
  label,
  sub,
  onOpen,
}: {
  icon: "floppy" | "drive" | "cd" | "doc" | "notepad" | "briefcase" | "sliders" | "gradcap" | "cert";
  label: string;
  sub?: string;
  onOpen: () => void;
}) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={(e) => {
        if (e.detail === 1) return;
      }}
      className="flex w-[110px] cursor-default flex-col items-center gap-1 border border-transparent p-2 text-center hover:border-dotted hover:border-black"
    >
      <Pix name={icon} size={36} />
      <span className="text-[11px] leading-tight">{label}</span>
      {sub ? <span className="text-[10px] text-[#666]">{sub}</span> : null}
    </button>
  );
}

/* ---------- Recycle Bin ---------- */
export function RecycleApp() {
  const [items, setItems] = useState([
    { nama: "cv_final_FINAL_v2_FIX.doc", ukuran: "666 KB" },
    { nama: "surat_lamaran_copy(3).doc", ukuran: "214 KB" },
    { nama: "jadwal_shift_lebaran.xls", ukuran: "128 KB" },
  ]);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="relative flex h-full flex-col text-black">
      <div className="flex shrink-0 items-center gap-2 border-b border-[#808080] bg-[#c0c0c0] p-1">
        <button
          className="w95-btn px-3 py-[3px] text-[11px] disabled:opacity-60"
          disabled={items.length === 0}
          onClick={() => {
            playOpen();
            setItems([]);
          }}
        >
          Empty Recycle Bin
        </button>
        <span className="text-[11px] text-[#555]">file lama yang sudah ikhlas dilepas</span>
      </div>
      <div className="field m-[3px] flex min-h-0 flex-1 flex-wrap content-start gap-4 overflow-auto p-4 w95-scroll">
        {items.length === 0 ? (
          <p className="w-full pt-8 text-center text-[12px] text-[#666]">
            Recycle Bin kosong.
            <br />
            Seperti stok opname yang rapi — tidak ada yang nyangkut.
          </p>
        ) : (
          items.map((it) => (
            <button
              key={it.nama}
              onDoubleClick={() => {
                playError();
                setMsg(`"${it.nama}" terlalu berat kenangan untuk dibuka.\nBiarkan dia beristirahat dengan tenang.`);
              }}
              className="flex w-[120px] cursor-default flex-col items-center gap-1 border border-transparent p-2 text-center hover:border-dotted hover:border-black"
            >
              <Pix name="trashfile" size={34} />
              <span className="text-[11px] leading-tight">{it.nama}</span>
              <span className="text-[10px] text-[#666]">{it.ukuran}</span>
            </button>
          ))
        )}
      </div>
      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin px-2 py-[1px]">{items.length} objek</div>
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">ruang yang dibebaskan: ketenangan batin</div>
      </div>
      {msg && <MsgBox title="Recycle Bin" text={msg} kind="error" onClose={() => setMsg(null)} />}
    </div>
  );
}

/* ---------- Pendidikan & Sertifikat ---------- */
export function EducationApp() {
  return (
    <div className="flex h-full flex-col text-black">
      <div className="w95-scroll m-[3px] min-h-0 flex-1 overflow-auto p-4">
        <fieldset className="border border-[#808080] px-3 pb-3 pt-1">
          <legend className="flex items-center gap-1 px-1 text-[12px] font-bold">
            <Pix name="gradcap" size={16} /> Pendidikan Formal
          </legend>
          <div className="flex items-start gap-3 p-2">
            <Pix name="computer" size={40} />
            <div>
              <p className="text-[14px] font-bold">{PENDIDIKAN.sekolah}</p>
              <p className="text-[12px]">{PENDIDIKAN.jurusan}</p>
              <p className="mt-[2px] text-[12px] text-[#000080] font-bold">Lulus {PENDIDIKAN.tahun}</p>
              <p className="mt-1 text-[11.5px] text-[#555]">
                Dari TKJ belajar satu hal yang terpakai sampai sekarang: kalau sistem error, cek kabelnya dulu.
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-3 border border-[#808080] px-3 pb-3 pt-1">
          <legend className="flex items-center gap-1 px-1 text-[12px] font-bold">
            <Pix name="cert" size={16} /> Sertifikasi
          </legend>
          <ul className="space-y-2 p-1">
            {SERTIFIKASI.map((s, i) => (
              <li key={s.nama} className="flex items-center gap-2 text-[12.5px]">
                <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#808080] bg-[#000080] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-bold">{s.nama}</span>
                <span className="text-[#666]">— {s.lembaga}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className="mt-3 border border-[#808080] px-3 pb-3 pt-1">
          <legend className="px-1 text-[12px] font-bold">Bahasa</legend>
          <div className="flex gap-8 p-1">
            {BAHASA.map((b) => (
              <p key={b.nama} className="text-[12.5px]">
                <span className="font-bold">{b.nama}</span>: {b.level}
              </p>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">belajar nggak pernah EOL (end of life)</div>
      </div>
    </div>
  );
}

/* ---------- Display Properties (wallpaper) ---------- */
export const WALLPAPERS: { id: string; nama: string; cls?: string; bg?: string }[] = [
  { id: "teal", nama: "Teal Klasik", bg: "#008080" },
  { id: "ditherteal", nama: "Dither Teal", cls: "dither-bg" },
  { id: "navy", nama: "Navy Dock", bg: "#000080" },
  { id: "dithernavy", nama: "Dither Navy", cls: "dither-navy" },
  { id: "green", nama: "Hijau Gudang", bg: "#2f6e45" },
  { id: "crt", nama: "Hitam CRT", bg: "#101410" },
];

export function DisplayPropsApp({
  current,
  onChange,
  onClose,
}: {
  current: string;
  onChange: (id: string) => void;
  onClose: () => void;
}) {
  const [sel, setSel] = useState(current);
  const wp = WALLPAPERS.find((w) => w.id === sel)!;

  return (
    <div className="flex h-full flex-col p-3 text-black">
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {/* preview monitor */}
        <div className="flex justify-center">
          <div className="bevel-out border border-black p-2">
            <div className={`h-[92px] w-[150px] ${wp.cls ?? ""}`} style={{ backgroundColor: wp.bg }}>
              <div className="m-1 flex items-center gap-[2px] bg-[#c0c0c0] p-[2px]">
                <Pix name="computer" size={12} />
                <span className="h-[8px] flex-1 bg-gradient-to-r from-[#000080] to-[#1084d0]" />
              </div>
            </div>
          </div>
        </div>

        <fieldset className="min-h-0 flex-1 overflow-auto border border-[#808080] px-3 pb-2 pt-1 w95-scroll">
          <legend className="px-1 text-[12px] font-bold">Pola (Wallpaper)</legend>
          <div className="space-y-[2px]">
            {WALLPAPERS.map((w) => (
              <label key={w.id} className="flex cursor-pointer items-center gap-2 px-1 py-[2px] text-[12px] hover:bg-[#dcdcdc]">
                <span
                  className={`flex h-[12px] w-[12px] items-center justify-center border border-[#808080] bg-white`}
                >
                  {sel === w.id ? <span className="h-[6px] w-[6px] bg-black" /> : null}
                </span>
                <input type="radio" name="wp" className="hidden" checked={sel === w.id} onChange={() => setSel(w.id)} />
                <span className={`h-[12px] w-[16px] border border-[#808080] ${w.cls ?? ""}`} style={{ backgroundColor: w.bg }} />
                {w.nama}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          className="w95-btn w-[80px] py-[3px] text-[12px]"
          onClick={() => {
            playOpen();
            onChange(sel);
            onClose();
          }}
        >
          OK
        </button>
        <button className="w95-btn w-[80px] py-[3px] text-[12px]" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export type AppSlotProps = { children?: ReactNode };
