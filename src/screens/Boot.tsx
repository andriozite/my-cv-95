import { useEffect, useRef, useState } from "react";
import { Pix } from "../icons";

/* ---------- suara (WebAudio) ---------- */
let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}
function tone(freq: number, at: number, dur: number, type: OscillatorType = "square", vol = 0.05) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime + at);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + at + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + at);
  o.stop(c.currentTime + at + dur + 0.02);
}
export function playClick() {
  tone(1100, 0, 0.05, "square", 0.04);
}
export function playOpen() {
  tone(520, 0, 0.06, "square", 0.035);
  tone(780, 0.06, 0.08, "square", 0.035);
}
export function playChime() {
  tone(659.25, 0, 0.28, "sine", 0.09);
  tone(783.99, 0.16, 0.3, "sine", 0.09);
  tone(1046.5, 0.32, 0.5, "sine", 0.1);
  tone(1318.5, 0.5, 0.6, "sine", 0.06);
}
export function playError() {
  tone(220, 0, 0.18, "square", 0.06);
  tone(160, 0.18, 0.25, "square", 0.06);
}

/* ---------- layar mati + tombol power ---------- */
export function PowerOffScreen({ onPower }: { onPower: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-black select-none">
      <div className="pixel floaty text-center text-[#3d3d3d] text-2xl">ANDRIAN-PC</div>
      <button
        onClick={onPower}
        aria-label="Nyalakan komputer"
        className="power-glow group mt-12 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-4 border-[#2a2a2a] bg-[#101010] transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="text-[#4eff78] transition-colors group-hover:text-[#8dffa8]">
          <path d="M12 3v8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
          <path d="M6.2 6.5a8 8 0 1 0 11.6 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      </button>
      <div className="pixel mt-10 text-[#6f6f6f] text-xl">
        Sistem dimatikan — tekan tombol <span className="text-[#4eff78]">POWER</span>
      </div>
      <div className="pixel mt-2 text-[#4a4a4a] text-base">klik untuk memulai boot sequence</div>
    </div>
  );
}

/* ---------- BIOS POST ---------- */
const BIOS_LINES = [
  "ANDRIAN-95 BIOS v4.51          (C) 1995-2026 PermanaSoft Corp.",
  "Pentium(R)-S CPU at 133MHz",
  "__MEM__",
  "Detecting IDE Primary Master ... SWAKARYA-HDD     2026MB ... OK",
  "Detecting IDE Primary Slave  ... LAZADA-CDROM     24X   ... OK",
  "Detecting PnP Devices ... WMS PDA-SCANNER ............... OK",
  "Detecting PnP Devices ... LINEHAUL DOCK-CTRL ............ OK",
  "Detecting PnP Devices ... SORTASI-CONVEYOR 3PH .......... OK",
  "",
  "Boot sequence: C:, A:, CD-ROM",
  "Verifying DMI Pool Data ................................. OK",
  "",
  "Starting ANDRIAN-95 ...",
];

export function BiosScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [mem, setMem] = useState(0);
  const [memDone, setMemDone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      timers.push(setTimeout(onDone, 650));
    };
    const step = () => {
      if (i >= BIOS_LINES.length) {
        finish();
        return;
      }
      const line = BIOS_LINES[i];
      if (line === "__MEM__") {
        setLines((p) => [...p, "__MEM__"]);
        let m = 0;
        const iv = setInterval(() => {
          m += 2048 + Math.floor(Math.random() * 4096);
          if (m >= 65536) {
            m = 65536;
            clearInterval(iv);
            setMem(m);
            setMemDone(true);
            i++;
            timers.push(setTimeout(step, 260));
          } else {
            setMem(m);
          }
        }, 36);
        return;
      }
      setLines((p) => [...p, line]);
      i++;
      timers.push(setTimeout(step, 140 + Math.random() * 220));
    };
    timers.push(setTimeout(step, 500));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [onDone]);

  return (
    <div className="pixel h-full overflow-hidden bg-black p-6 text-[#c9c9c9] select-none sm:p-10" style={{ fontSize: 21 }}>
      {lines.map((l, idx) =>
        l === "__MEM__" ? (
          <div key={idx}>
            Memory Test : {String(mem).padStart(6, " ")} KB {memDone ? "OK" : ""}
          </div>
        ) : (
          <div key={idx}>{l || "\u00A0"}</div>
        )
      )}
      <span className="caret inline-block h-[18px] w-[10px] translate-y-[3px] bg-[#c9c9c9]" />
      <div className="absolute right-6 bottom-6 text-[#5c5c5c]" style={{ fontSize: 17 }}>
        &lt;F1&gt; continue &nbsp; &lt;DEL&gt; enter SETUP
      </div>
    </div>
  );
}

/* ---------- logo boot ANDRIAN-95 ---------- */
export function LogoScreen({ onDone }: { onDone: () => void }) {
  const [segs, setSegs] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setSegs((s) => Math.min(s + 1, 9)), 260);
    const t = setTimeout(onDone, 2750);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg,#2456c4 0%,#3b74dd 45%,#5b93e8 100%)" }}
    >
      {/* awan pixel */}
      <div className="absolute top-[12%] left-[6%] h-14 w-44 rounded-[40px] bg-white/85" style={{ boxShadow: "40px 18px 0 -6px rgba(255,255,255,0.85), -28px 20px 0 -10px rgba(255,255,255,0.7)" }} />
      <div className="absolute top-[64%] right-[4%] h-16 w-56 rounded-[50px] bg-white/80" style={{ boxShadow: "-46px 16px 0 -8px rgba(255,255,255,0.8), 30px -22px 0 -12px rgba(255,255,255,0.65)" }} />
      <div className="absolute top-[30%] right-[16%] h-10 w-32 rounded-[36px] bg-white/60" style={{ boxShadow: "26px 14px 0 -6px rgba(255,255,255,0.6)" }} />
      <div className="absolute bottom-[14%] left-[14%] h-10 w-36 rounded-[36px] bg-white/70" style={{ boxShadow: "30px -14px 0 -8px rgba(255,255,255,0.6)" }} />

      <div className="floaty flex items-end gap-3">
        <Pix name="flag" size={72} />
        <div className="leading-none">
          <div className="pixel text-white" style={{ fontSize: 88, textShadow: "4px 4px 0 rgba(0,0,40,0.35)" }}>
            ANDRIAN
          </div>
          <div className="pixel mt-1 flex items-center gap-3 text-[#ffe14d]" style={{ fontSize: 40, textShadow: "3px 3px 0 rgba(0,0,40,0.35)" }}>
            95 <span className="text-white/90" style={{ fontSize: 22 }}>edisi logistik</span>
          </div>
        </div>
      </div>

      <div className="mt-14 flex gap-[3px] border border-[#0a1e5c] bg-[#0d2a7a] p-[3px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`h-[14px] w-[26px] ${i < segs ? "bg-[#ffe14d]" : "bg-[#173a97]"}`} />
        ))}
      </div>
      <div className="pixel mt-4 text-white/85" style={{ fontSize: 20 }}>
        Memuat WMS.EXE ... SORTASI.DLL ... GUDANG.SYS
      </div>
      <div className="pixel absolute bottom-5 text-[#bcd2ff]" style={{ fontSize: 16 }}>
        (C) 1995-2026 PermanaSoft Corp. — PT Swakarya Insan Mandiri approved
      </div>
    </div>
  );
}

/* ---------- layar aman dimatikan ---------- */
export function SafeShutdownScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <button
      onClick={onRestart}
      className="pixel flex h-full w-full cursor-pointer flex-col items-center justify-center bg-black text-center select-none"
    >
      <div className="px-6 text-[#ff9d2e]" style={{ fontSize: 44, lineHeight: 1.15 }}>
        Sekarang komputer aman
        <br />
        untuk dimatikan.
      </div>
      <div className="mt-8 text-[#7a5a22]" style={{ fontSize: 22 }}>
        ( klik di mana saja untuk menyalakan ulang )
      </div>
    </button>
  );
}
