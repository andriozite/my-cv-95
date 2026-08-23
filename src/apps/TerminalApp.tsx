import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { IDENTITAS } from "../data";

interface Props {
  openApp: (id: string) => void;
  closeSelf: () => void;
}

export default function TerminalApp({ openApp, closeSelf }: Props) {
  const [history, setHistory] = useState<string[]>([
    "ANDRIAN-95 [Versi 4.51.2026]  (C) 1995-2026 PermanaSoft Corp.",
    "Ketik HELP untuk daftar perintah.",
    "",
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase();
    const echo = `C:\\ANDRIAN> ${raw}`;
    let out: string[] = [];
    switch (c) {
      case "":
        break;
      case "help":
        out = [
          "Perintah yang tersedia:",
          "  ABOUT        ... siapa itu Andrian (buka jendela About)",
          "  CV / RESUME  ... buka Resume.docx",
          "  SKILLS       ... buka meteran kompetensi",
          "  KERJA        ... buka riwayat pengalaman",
          "  KONTAK       ... info kontak",
          "  DIR          ... isi direktori",
          "  VER          ... versi sistem",
          "  DATE / TIME  ... jam sistem",
          "  GUDANG       ... status operasional",
          "  CLS          ... bersihkan layar",
          "  EXIT         ... tutup prompt",
        ];
        break;
      case "about":
        openApp("about");
        out = ["Membuka About_Me.txt ..."];
        break;
      case "cv":
      case "resume":
        openApp("resume");
        out = ["Membuka Resume.docx ... jangan lupa di-print."];
        break;
      case "skills":
      case "kompetensi":
        openApp("skills");
        out = ["Mengkalibrasi meteran skill ..."];
        break;
      case "kerja":
      case "pengalaman":
        openApp("experience");
        out = ["Membuka C:\\Pengalaman ..."];
        break;
      case "kontak":
        out = [`Email : ${IDENTITAS.email}`, `Lokasi: ${IDENTITAS.lokasi}`, "(nomor HP sengaja tidak ditampilkan — biar nggak di-spam pinjol)"];
        break;
      case "dir":
        out = [
          " Volume in drive C is ANDRIAN-PC",
          " Directory of C:\\ANDRIAN",
          "",
          "RESUME     DOC      1.024  09-01-2026  06:00a",
          "ABOUT_ME   TXT        512  09-01-2026  06:00a",
          "PENGALAMAN EXE     20.480  09-01-2026  06:00a",
          "SKILLS     EXE      8.192  09-01-2026  06:00a",
          "RAHASIA    ???          0  ??-??-????  ??:??",
          "       5 file(s)        29.208 bytes",
        ];
        break;
      case "ver":
        out = ["ANDRIAN-95 versi 4.51.2026 — build GUDANG-STABIL"];
        break;
      case "date":
        out = [`Tanggal sekarang: ${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`];
        break;
      case "time":
        out = [`Waktu sekarang: ${new Date().toLocaleTimeString("id-ID")}`];
        break;
      case "gudang":
        out = [
          "STATUS OPERASIONAL HARI INI:",
          "  Inbound dock ......... 12 truk antri [NORMAL]",
          "  Conveyor sortasi ..... 20.000 paket/hari [LANCAR]",
          "  Akurasi sortir ....... 99,9% [HIJAU]",
          "  Return harian ........ 1.000+ paket [TERKENDALI]",
          "  Kecelakaan kerja ..... 0 [REKOR 2 TAHUN]",
          "",
          "Semua sistem GO. Siap kirim < 15 menit.",
        ];
        break;
      case "cls":
        setHistory([]);
        setCmd("");
        return;
      case "exit":
        closeSelf();
        return;
      default:
        out = [`Bad command or file name: "${raw.trim()}"`, "Coba ketik HELP."];
    }
    setHistory((h) => [...h, echo, ...out, ""]);
    setCmd("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run(cmd);
  };

  return (
    <div
      className="pixel flex h-full cursor-text flex-col bg-black p-2 text-[#d6d6d6]"
      style={{ fontSize: 18 }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={bodyRef} className="w95-scroll min-h-0 flex-1 overflow-auto whitespace-pre-wrap leading-snug">
        {history.map((l, i) => (
          <div key={i} className={l.startsWith("C:\\ANDRIAN>") ? "text-[#8dff9e]" : undefined}>
            {l || "\u00A0"}
          </div>
        ))}
        <div className="flex items-center text-[#8dff9e]">
          <span>C:\ANDRIAN&gt;&nbsp;</span>
          <span>{cmd}</span>
          <span className="caret ml-[1px] inline-block h-[16px] w-[9px] bg-[#8dff9e]" />
        </div>
      </div>
      <input
        ref={inputRef}
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        onKeyDown={onKey}
        className="absolute h-0 w-0 opacity-0"
        aria-label="Perintah terminal"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
