import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { SOURCE_FILES } from "../sourceFiles";
import { Pix } from "../icons";
import { playOpen, playError } from "../screens/Boot";

export default function DownloadApp() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setProgress(0);
      playOpen();

      const zip = new JSZip();
      const total = SOURCE_FILES.length;

      for (let i = 0; i < total; i++) {
        const file = SOURCE_FILES[i];
        zip.file(file.path, file.content);
        setProgress(Math.round(((i + 1) / total) * 100));
        await new Promise((r) => setTimeout(r, 80)); // animasi progress
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "andrian-95-cv-project.zip");

      setDone(true);
      setDownloading(false);
    } catch (err) {
      console.error(err);
      playError();
      setDownloading(false);
      alert("Gagal membuat ZIP. Coba lagi ya.");
    }
  };

  return (
    <div className="flex h-full flex-col text-black">
      {/* toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#808080] bg-[#c0c0c0] p-2">
        <button
          disabled={downloading}
          onClick={handleDownload}
          className="w95-btn flex items-center gap-2 px-4 py-[5px] text-[12px] font-bold disabled:opacity-60"
        >
          <Pix name="floppy" size={18} />
          {downloading ? "Membuat ZIP..." : "Download Semua (ZIP)"}
        </button>
        <span className="text-[11px] text-[#555]">
          {done ? "✓ Berhasil! Cek folder Downloads kamu." : "Klik tombol di atas untuk download seluruh project"}
        </span>
      </div>

      {/* progress bar */}
      {downloading && (
        <div className="border-b border-[#808080] bg-[#c0c0c0] p-2">
          <div className="field h-[18px] w-full overflow-hidden">
            <div
              className="h-full bg-[#000080] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-center text-[11px]">
            Menambahkan file ke ZIP... {progress}%
          </p>
        </div>
      )}

      {/* file list */}
      <div className="w95-scroll field m-[3px] min-h-0 flex-1 overflow-auto p-3">
        <fieldset className="border border-[#808080] px-3 pb-3 pt-1">
          <legend className="px-1 text-[12px] font-bold">
            Daftar File ({SOURCE_FILES.length} file)
          </legend>
          <div className="space-y-[2px]">
            {SOURCE_FILES.map((f) => (
              <div
                key={f.path}
                className="flex items-center gap-2 border-b border-dotted border-[#ccc] py-[3px] text-[11.5px]"
              >
                <Pix name={getFileIcon(f.path)} size={16} />
                <span className="flex-1 font-mono">{f.path}</span>
                <span className="text-[#666]">{formatSize(f.content.length)}</span>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-3 border border-[#808080] px-3 pb-3 pt-1">
          <legend className="px-1 text-[12px] font-bold">Cara Install</legend>
          <ol className="ml-4 space-y-1 text-[12px]">
            <li>1. Extract file ZIP yang sudah didownload</li>
            <li>2. Buka terminal di folder project</li>
            <li>3. Jalankan: <code className="bg-[#e0e0e0] px-1">npm install</code></li>
            <li>4. Jalankan: <code className="bg-[#e0e0e0] px-1">npm run dev</code></li>
            <li>5. Buka browser di <code className="bg-[#e0e0e0] px-1">http://localhost:5173</code></li>
          </ol>
        </fieldset>

        <p className="mt-3 text-center text-[11px] text-[#666]">
          Total ukuran: {formatSize(SOURCE_FILES.reduce((a, f) => a + f.content.length, 0))}
        </p>
      </div>

      {/* status bar */}
      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin px-2 py-[1px]">{SOURCE_FILES.length} objek</div>
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">
          {done ? "Download selesai!" : "Siap untuk didownload"}
        </div>
      </div>
    </div>
  );
}

function getFileIcon(path: string): "doc" | "notepad" | "floppy" | "cert" {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "notepad";
  if (path.endsWith(".css")) return "notepad";
  if (path.endsWith(".json") || path.endsWith(".js")) return "cert";
  return "doc";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
