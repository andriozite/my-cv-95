/* ================== DATA CV — ANDRIAN PERMANA DIHARJA ================== */

export const IDENTITAS = {
  nama: "Andrian Permana Dihardja",
  panggilan: "Andrian",
  lokasi: "Depok, Jawa Barat",
  email: "andrianpermana187@gmail.com",
  role: "Sortation Operations / Warehouse Team Leader",
};

export const PROFIL =
  "Profesional logistik yang termotivasi dengan pengalaman 6+ tahun di operasi sortasi volume tinggi, manajemen gudang (warehouse management), dan proses return barang (reverse logistics). Rekam jejak terbukti dalam memimpin shift di pusat distribusi yang memproses 15.000–20.000+ paket setiap hari dengan akurasi 99,9%, termasuk penanganan ribuan paket return harian. Terampil dalam mengkoordinasikan tim, mengoptimalkan pemanfaatan WMS, mengelola inventaris gudang, dan melaksanakan perencanaan tenaga kerja strategis untuk menjaga keunggulan operasional serta memenuhi SLA pengiriman 15 menit di lingkungan 24/7 yang bergerak cepat.";

export const KOMPETENSI: { kategori: string; items: string[] }[] = [
  {
    kategori: "Operasional Sortasi",
    items: [
      "Manajemen Sortasi",
      "Pemrosesan Inbound/Outbound",
      "Quality Assurance",
      "Kepatuhan 5R/K3",
    ],
  },
  {
    kategori: "Manajemen Gudang",
    items: [
      "Pengelolaan Inventaris",
      "Penerimaan & Penyimpanan Barang",
      "Stock Opname",
      "Layout Gudang",
      "FIFO/FEFO",
    ],
  },
  {
    kategori: "Return Management",
    items: [
      "Verifikasi Return",
      "Klasifikasi Kondisi Barang",
      "Proses Refund/Replacement",
      "Koordinasi dengan CS & Merchant",
    ],
  },
  {
    kategori: "Kepemimpinan",
    items: [
      "Koordinasi Tim",
      "Penjadwalan Shift",
      "Perencanaan Tenaga Kerja",
      "Evaluasi Kinerja",
      "Resolusi Konflik",
    ],
  },
  {
    kategori: "Teknis",
    items: [
      "Warehouse Management System (WMS)",
      "Operasi PDA Scanner",
      "Analisis Data",
      "MS Office",
    ],
  },
];

export const SKILL_BARS: { nama: string; nilai: number }[] = [
  { nama: "Operasional Sortasi & SLA", nilai: 98 },
  { nama: "Kepatuhan K3 / 5R", nilai: 96 },
  { nama: "Manajemen Gudang & Inventaris", nilai: 95 },
  { nama: "Reverse Logistics (Return)", nilai: 93 },
  { nama: "WMS & PDA Scanner", nilai: 92 },
  { nama: "Kepemimpinan Tim Besar", nilai: 90 },
  { nama: "Excel & Analisis Data", nilai: 85 },
  { nama: "Bahasa Inggris", nilai: 80 },
];

export type Pengalaman = {
  id: string;
  perusahaan: string;
  sub?: string;
  periode: string;
  peran: string;
  ringkasan?: string;
  metrik: string[];
  grup: { judul: string; items: string[] }[];
};

export const PENGALAMAN: Pengalaman[] = [
  {
    id: "sim",
    perusahaan: "PT Swakarya Insan Mandiri",
    sub: "Lazada Logistics — Cimanggis",
    periode: "2020 – 2026",
    peran: "Sortation Operations / Team Leader",
    metrik: [
      "15.000–20.000+ paket/hari",
      "Akurasi 99,9%",
      "SLA 100% · kirim < 15 menit",
      "Tim 35–50 personel/shift",
      "0 kecelakaan selama 2 tahun",
    ],
    grup: [
      {
        judul: "Ringkasan",
        items: [
          "Memimpin operasi multi-shift yang menangani 15.000–20.000+ paket setiap hari, secara konsisten mencapai 100% kepatuhan SLA dengan akurasi 99,9% dan pengiriman tepat waktu di bawah 15 menit.",
        ],
      },
      {
        judul: "Manajemen Sortasi",
        items: [
          "Mengelola proses sortasi siklus penuh: penerimaan truk, routing zona, staging, dan serah terima, memanfaatkan pemantauan WMS real-time untuk mencegah kemacetan.",
          "Bertindak sebagai Shift Leader selama musim promosi puncak (lonjakan volume hingga 200%), memastikan operasi 24/7 berjalan lancar dan alokasi sumber daya optimal.",
          "Berkolaborasi erat dengan tim Warehouse, Line Haul, QC, dan 3PL untuk menghilangkan kesalahan sortir dan menjamin jadwal pengiriman tepat waktu.",
        ],
      },
      {
        judul: "Manajemen Gudang (Warehouse)",
        items: [
          "Mengelola penerimaan barang dari supplier dan alokasi penyimpanan di area gudang dengan sistem FIFO dan FEFO untuk menjaga kualitas produk.",
          "Melakukan stock opname rutin dan memastikan akurasi inventaris mencapai 99,5% melalui sistem WMS terintegrasi.",
          "Mengoptimalkan tata letak gudang untuk memaksimalkan kapasitas penyimpanan dan memperlancar arus barang inbound dan outbound.",
          "Mengelola proses picking dan packing untuk memastikan kesesuaian pesanan sebelum dikirim ke pelanggan.",
          "Mengawasi kondisi penyimpanan barang sensitif (elektronik & produk perishable) sesuai standar kualitas yang ditetapkan.",
        ],
      },
      {
        judul: "Manajemen Return (Reverse Logistics)",
        items: [
          "Mengelola proses return barang secara end-to-end: penerimaan paket return, verifikasi, inspeksi kondisi barang, hingga sortasi ulang ke gudang atau merchant.",
          "Mengkoordinasikan tim khusus return 10–15 personel per shift untuk memproses 500–1.000+ paket return harian dengan akurasi 100%.",
          "Menerapkan sistem klasifikasi kondisi barang return (layak jual kembali, rusak ringan, rusak berat, perlu perbaikan) untuk mempercepat refund & replacement.",
          "Berkolaborasi dengan tim Customer Service dan Merchant untuk memverifikasi kelengkapan dokumen return dan mempercepat penyelesaian klaim pelanggan.",
          "Mengembangkan SOP khusus penanganan return: pengecekan kemasan, pencocokan data, dan pelaporan kondisi fisik barang.",
        ],
      },
      {
        judul: "Kepemimpinan & Pengembangan Tim",
        items: [
          "Mengkoordinasikan dan membimbing tim 35–50 personel per shift, memimpin briefing harian untuk menyelaraskan target, protokol keselamatan, dan metrik operasional.",
          "Melaksanakan perencanaan tenaga kerja strategis berdasarkan perkiraan volume — meningkatkan throughput sortasi 22% tanpa tambahan headcount.",
          "Melakukan evaluasi kinerja berkala dan pembinaan anggota tim, meningkatkan produktivitas individu dan mengurangi tingkat kesalahan.",
          "Mengembangkan prosedur serah terima shift standar, memastikan transisi mulus antar shift dan meminimalkan waktu henti operasional.",
          "Memimpin analisis akar penyebab masalah operasional — mengurangi insiden kesalahan sortir return sebesar 30%.",
          "Membimbing supervisor junior dan staf berpotensi tinggi, membangun jalur suksesi kepemimpinan yang kuat.",
        ],
      },
      {
        judul: "Keselamatan & Kepatuhan",
        items: [
          "Mempertahankan rekor nol kecelakaan dan nol kerugian selama 2 tahun berturut-turut dengan penerapan ketat K3, 5R, dan SOP.",
          "Mengawasi kepatuhan keselamatan di seluruh shift — audit keselamatan rutin dan toolbox talks untuk budaya nol kecelakaan.",
          "Mengelola komunikasi real-time dengan tim Line Haul & Transportasi, mengurangi waktu tunggu sebesar 15%.",
          "Menginisiasi proyek perbaikan berkelanjutan: optimasi alur kerja dan penyesuaian tata letak yang meningkatkan efisiensi sortasi.",
        ],
      },
    ],
  },
  {
    id: "fif",
    perusahaan: "PT Federal International Finance",
    periode: "2016 – 2019",
    peran: "Junior Remedial Field",
    metrik: ["Penyelesaian 95%+ dari target", "3 tahun field collection"],
    grup: [
      {
        judul: "Ringkasan",
        items: [
          "Melaksanakan strategi penagihan lapangan yang terarah, secara konsisten melampaui target pemulihan bulanan dengan tingkat penyelesaian 95%+.",
        ],
      },
      {
        judul: "Tanggung Jawab Utama",
        items: [
          "Menganalisis portofolio nasabah bermasalah untuk memetakan prioritas kunjungan secara strategis dan mempersonalisasi pendekatan negosiasi.",
          "Memfasilitasi komunikasi profesional dengan nasabah, menyelesaikan kewajiban melalui rencana restrukturisasi pembayaran yang efektif.",
          "Berkoordinasi dengan tim hukum internal dan surveyor untuk memverifikasi kelengkapan dokumen dan memperlancar proses eksekusi aset.",
        ],
      },
    ],
  },
];

export const PENDIDIKAN = {
  sekolah: "SMK PGRI 1 Cibinong",
  tahun: "2011",
  jurusan: "Sekolah Menengah Kejuruan — Teknik Komputer & Jaringan",
};

export const SERTIFIKASI = [
  { nama: "Manajemen Proyek", lembaga: "LinkedIn Learning" },
  { nama: "Dasar-Dasar Keamanan Jaringan", lembaga: "Open University" },
  { nama: "Excel Power Pivot", lembaga: "LinkedIn Learning" },
];

export const BAHASA = [
  { nama: "Indonesia", level: "Bahasa Ibu" },
  { nama: "Inggris", level: "Lancar" },
];

export const TENTANG_SAYA = [
  "Halo! Gue Andrian Permana Dihardja — teman-teman di gudang biasa manggil gue Andrian. Sudah 6 tahun lebih gue hidup di dunia logistik: dari bunyi scanner PDA jam 6 pagi sampai truk line haul terakhir keluar dock tengah malam.",
  "Sehari-hari gue memimpin 35–50 personel per shift di pusat distribusi yang memproses 15.000–20.000+ paket/hari. Prinsip gue simpel: gudang yang rapi = hidup yang rapi. Makanya gue ngotot soal 5R, K3, dan akurasi data — hasilnya: akurasi sortir 99,9%, SLA 15 menit, dan rekor nol kecelakaan 2 tahun berturut-turut.",
  "Selain sortasi, gue juga jatuh cinta sama reverse logistics. Ngurusin 500–1.000+ paket return per hari itu kayak jadi detektif: verifikasi, klasifikasi kondisi barang, cocokkan data, dan pastikan refund pelanggan nggak ngaret.",
  "Di luar gudang? Gue anak futsal, penikmat kopi hitam, dan — seperti yang bisa lo tebak dari situs ini — penggemar berat komputer retro. CV ini sengaja gue bikin ala Windows 95 karena menurut gue kerjaan logistik itu mirip OS jadul: sederhana di permukaan, tapi kalau dikelola benar, nggak pernah crash.",
  "Saat ini gue terbuka untuk peluang baru di bidang operasional gudang & logistik. Kalau lo cari orang yang betah di lapangan, teliti soal angka, dan bisa bikin tim 50 orang gerak seirama — kabarin gue lewat email.",
];

export const FAKTA_SISTEM = [
  { label: "Uptime di logistik", nilai: "6+ tahun" },
  { label: "Paket diproses/hari", nilai: "20.000+" },
  { label: "Akurasi sortir", nilai: "99,9%" },
  { label: "SLA pengiriman", nilai: "< 15 menit" },
  { label: "Anggota tim/shift", nilai: "35–50 orang" },
  { label: "Kecelakaan kerja", nilai: "0 (2 tahun)" },
];
