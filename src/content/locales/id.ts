import type { Messages } from "../types";

export const id: Messages = {
  meta: {
    title: "Fazlur Rahman (Alul) — Frontend Engineer",
    description:
      "Fazlur Rahman (Alul), frontend engineer dari Indonesia yang suka membangun produk web scalable dengan Next.js dan GraphQL.",
    caseStudy: "Studi kasus",
  },
  nav: {
    label: "Utama",
    skipToContent: "Langsung ke konten",
    about: "Tentang",
    skills: "Keahlian",
    experience: "Pengalaman",
    projects: "Proyek",
    contact: "Kontak",
    language: "Bahasa",
    theme: "Ganti mode terang atau gelap",
  },
  languages: {
    en: "English",
    id: "Bahasa Indonesia",
  },
  profile: {
    location: "Jember, Jawa Timur, Indonesia",
    tagline:
      "Aku membangun produk web yang scalable dan cepat dengan Next.js dan GraphQL, dari commit pertama sampai rilis ke production.",
    about: [
      "Halo, aku Alul, frontend engineer dengan pengalaman lebih dari 5 tahun membangun aplikasi web dan produk SaaS dari nol. Kebanyakan kerjaanku ada di titik temu antara logika bisnis yang rumit dan pengguna sehari-hari: dashboard omnichannel, page builder low-code, dan platform e-commerce.",
      "Aku kuliah Statistika di ITS, lalu pindah haluan ke software lewat bootcamp full-stack Alterra Academy. Aku peduli sama clean code, arsitektur berbasis fitur, dan pengalaman pengguna yang tetap ngebut walau datanya terus bertambah.",
    ],
    facts: {
      location: { label: "Domisili", value: "Jember, Jawa Timur, Indonesia" },
      experience: { label: "Pengalaman", value: "5+ tahun" },
      current: {
        label: "Sekarang",
        value: "Associate Software Engineer di ICUBE",
      },
      education: { label: "Pendidikan", value: "S1 Statistika, ITS" },
    },
    contactBlurb:
      "Aku terbuka untuk posisi frontend engineer maupun proyek freelance. Cara paling cepat untuk menghubungiku lewat email, ya.",
  },
  hero: {
    label: "Perkenalan",
    stats: [{ value: "5+", label: "tahun pengalaman" }],
    viewProjects: "Lihat Proyek",
    downloadCv: "Unduh CV",
  },
  sections: {
    about: "Tentang",
    skills: "Keahlian",
    experience: "Pengalaman",
    projects: "Proyek",
    contact: "Kontak",
  },
  about: {
    photoAlt: "Foto {{name}}",
  },
  skills: {
    core: "Inti",
    styling: "Styling & UI",
    data: "Data & State",
    also: "Lainnya",
  },
  experience: {
    present: "Sekarang",
    stack: "Teknologi",
    items: {
      icube: {
        highlights: [
          "Memimpin pengembangan Belanjaku dari nol, ekosistem e-commerce milik ICUBE sendiri, mulai dari desain arsitektur sampai rilis penuh ke production.",
          "Membangun Page Builder drag-and-drop low-code plus Menu Builder, jadi merchant bisa mengatur tampilan tokonya sendiri.",
          "Membangun Affiliate Management System dari nol, lengkap dengan tracking otomatis dan pemantauan performa komisi.",
          "Menerapkan arsitektur modular berbasis fitur supaya platform tetap scalable dan gampang dirawat.",
        ],
      },
      "icube-sirclo": {
        highlights: [
          "Mengembangkan omnichannel sales aggregator yang menyinkronkan stok dan pesanan di Shopee, Lazada, TikTok, dan Tokopedia.",
          "Merancang dashboard manajemen terpusat untuk mengotomatiskan alur e-commerce, termasuk proses pesanan dan retur.",
          "Mengoptimalkan pengambilan data skala besar dengan Apollo Client, jadi katalog produk yang kompleks dan update real-time terasa lebih lancar.",
        ],
      },
      bit: {
        highlights: [
          "Mengembangkan dan merilis KlikDiabetes, aplikasi React Native untuk memantau kesehatan yang tersedia di Play Store dan App Store.",
          "Menghubungkan Google Fit SDK dan GPS untuk memantau aktivitas dan metrik kesehatan secara real-time, seperti langkah kaki dan gula darah.",
          "Menerjemahkan desain Figma jadi tampilan iOS dan Android yang rapi dan presisi.",
          "Mengelola state aplikasi yang kompleks dengan Redux dan menghubungkan REST API supaya data selalu sinkron.",
        ],
      },
    },
  },
  projects: {
    comingSoon: "Segera hadir",
    groups: {
      belanjaku: {
        name: "Belanjaku",
        description:
          "Ekosistem e-commerce milik ICUBE: tools seller, storefront, afiliasi, sampai platform kreator, semuanya dibangun dari nol.",
      },
      swift: {
        name: "SWIFT",
        description:
          "Tools commerce omnichannel yang bikin produk, stok, dan pesanan tetap sinkron, untuk brand maupun seller kecil.",
      },
      other: {
        name: "Proyek lain",
        description:
          "Platform belajar hasil freelance dan aplikasi mobile tempat karierku dimulai.",
      },
    },
    types: {
      work: "Kerja",
      freelance: "Freelance",
    },
    coverAlt: "Ilustrasi untuk {{title}}",
    stack: "Teknologi",
    items: {
      "belanjaku-seller-dashboard": {
        title: "Belanjaku Seller Dashboard",
        summary:
          "Dashboard seller multi-tenant dengan page builder low-code, dibangun dari nol sampai production untuk ekosistem e-commerce ICUBE.",
        role: "Frontend lead (dari nol)",
        problem:
          "ICUBE ingin punya ekosistem e-commerce sendiri, tempat merchant bisa daftar, mengelola toko, dan jualan di banyak channel tanpa bergantung pada platform pihak ketiga. Dashboard seller-nya harus bisa melayani banyak merchant dan brand partner dari satu codebase.",
        whatIDid: [
          "Memimpin frontend dari arsitektur awal sampai rilis production, dengan struktur modular berbasis fitur supaya tetap gampang dirawat seiring platform berkembang.",
          "Membangun onboarding seller dari awal sampai akhir: registrasi akun, verifikasi nomor HP, dan KYC.",
          "Menghadirkan white-label berbasis konfigurasi, jadi customer bisa pakai dashboard yang sama dengan nama, logo, dan domain mereka sendiri.",
          "Membangun operasional toko: pesanan dengan ambil di toko, promosi, loyalty, jurnal pendapatan, dan penarikan saldo seller.",
          "Membangun Page Builder drag-and-drop di atas GrapesJS, dengan plugin commerce khusus (etalase produk, banner carousel, video), section yang bisa dipakai ulang, dan template custom lengkap dengan preview thumbnail.",
          "Membangun Menu Builder untuk header dan footer, jadi merchant bisa mengatur navigasi tokonya tanpa perlu developer.",
          "Menambahkan pencarian berbasis Algolia dan marketing suite berupa form survei dan booking janji temu.",
        ],
        result:
          "Belanjaku tumbuh dari sketsa arsitektur pertama jadi platform yang live di belanjaku.id. Dashboard ini juga sudah di-white-label oleh beberapa customer untuk brand mereka.",
      },
      "belanjaku-storefront": {
        title: "Belanjaku Storefront",
        summary:
          "Engine storefront yang mengubah halaman buatan Belanjaku Page Builder jadi toko online merchant yang live dan siap belanja.",
        role: "Frontend engineer, kontributor utama",
        problem:
          "Halaman yang didesain merchant di builder harus bisa langsung live sebagai toko yang cepat dan gampang dibagikan, baik di alamat Belanjaku maupun custom domain milik merchant, tanpa developer perlu deploy apa pun.",
        whatIDid: [
          "Membangun routing multi-tenant yang menyajikan toko tiap merchant berdasarkan vendor code atau custom domain, dengan caching di sisi server supaya cepat dimuat.",
          "Membangun alur belanja: etalase produk, halaman detail produk dengan validasi stok dan galeri multi-gambar, keranjang, sampai pemulihan abandoned cart di mini cart.",
          "Merender widget dan template dari builder di storefront, termasuk banner carousel, header dan footer custom dari Menu Builder, font custom, favicon, dan script di head.",
          "Menambahkan booking janji temu di halaman produk dan landing page, pencarian Algolia, mode maintenance, dan password gate untuk toko yang masih dalam pengembangan.",
        ],
        result:
          "Apa pun yang didesain merchant di builder langsung terbit jadi toko yang berfungsi, termasuk di domain mereka sendiri.",
      },
      "belanjaku-creator": {
        title: "Belanjaku Creator",
        summary:
          "Platform kreator tempat developer dan desainer bikin plugin dan template untuk storefront Belanjaku, secara visual maupun lewat kode.",
        role: "Frontend engineer",
        problem:
          "Merchant butuh lebih banyak widget dan template halaman daripada yang sanggup dibuat satu tim internal. Belanjaku perlu cara supaya kreator dari luar bisa ikut bikin dengan aman, tanpa menyentuh dashboard, storefront, atau plugin service di production.",
        whatIDid: [
          "Menyiapkan fondasi dashboard kreator: sistem core override, Apollo GraphQL, i18n, dan theming partner.",
          "Membangun sign-in kreator dengan auth guard dan kode kontributor, plus proxy GraphQL yang cuma melayani kreator yang sudah login.",
          "Membangun app shell dan library komponen bersama (tombol, field, modal, halaman list, toast, dan loader).",
          "Menghubungkan template builder ke API GraphQL plugin, lengkap dengan simpan thumbnail dan feedback publish, sekaligus memulai modul listing marketplace.",
        ],
        result:
          "Segera hadir. Kreator sudah bisa bikin widget secara visual dengan GrapesJS atau lewat kode pakai plugin SDK asli, melihat preview-nya langsung di storefront, lalu mengekspornya untuk diunggah.",
      },
      swiftoms: {
        title: "SwiftOMS — Omnichannel Order Management",
        summary:
          "Back office omnichannel yang bikin produk, stok, dan pesanan tetap sinkron di marketplace besar Indonesia.",
        role: "Frontend engineer utama",
        problem:
          "Brand yang jualan di Shopee, Lazada, TikTok, dan Tokopedia sekaligus harus mengelola stok dan pesanan di tiap marketplace secara terpisah. Akibatnya sering terjadi overselling dan fulfillment jadi lambat.",
        whatIDid: [
          "Memegang porsi besar pengembangan frontend sebagai kontributor terbesar di codebase ini sejak 2021.",
          "Membangun manajemen produk channel marketplace: master product, channel product, varian, update massal, dan pengaturan harga per gudang.",
          "Mengerjakan alur pesanan: pesanan seller, retur (RMA), credit memo, cetak label, sampai pick-and-pack dengan barcode scanner.",
          "Membangun UI aturan alokasi pesanan dan sistem virtual stock yang membantu mencegah overselling di channel online maupun offline.",
          "Menambahkan promosi dan bundle produk, integrasi aplikasi pihak ketiga dengan validasi webhook, dukungan multi-bahasa, dan optimasi pengambilan data Apollo Client untuk katalog besar.",
        ],
        result:
          "Satu dashboard bisa menangani stok, pesanan, dan retur di semua channel penjualan yang terhubung. Codebase-nya juga jadi fondasi SWIFT Hub dan Belanjaku Seller Dashboard.",
      },
      "swift-hub": {
        title: "SWIFT Hub",
        summary:
          "Seller hub multi-tenant yang dibangun dari codebase SwiftOMS, supaya bisnis kecil bisa mengelola operasional marketplace dari satu tempat.",
        role: "Frontend engineer, kontributor utama",
        problem:
          "Bisnis kecil yang jualan di beberapa marketplace harus bolak-balik antara notifikasi, halaman stok, dan pelacak pesanan yang berbeda-beda. Mereka butuh sesuatu yang lebih simpel daripada OMS enterprise, dan reseller platform ini butuh produknya dengan brand mereka sendiri.",
        whatIDid: [
          "Mengubah codebase SwiftOMS jadi MVP multi-tenant dengan UI seller yang bersih dan nyaman di mobile.",
          "Menggabungkan notifikasi dan pelacakan pesanan dari berbagai platform ke dalam satu tampilan.",
          "Membangun white-label berbasis konfigurasi, jadi tiap tenant punya branding dan pengaturan sendiri.",
          "Menambahkan registrasi akun, manajemen channel multi-seller, page dan menu builder, jurnal pendapatan, dan alur pesanan ambil di toko.",
        ],
        result:
          "Seller bisa mengelola stok, channel, dan pesanan dari satu dashboard, dan produk ini sudah di-white-label oleh beberapa customer.",
      },
      "belanjaku-affiliate": {
        title: "Belanjaku Affiliate",
        summary:
          "Dashboard program afiliasi lengkap dengan tracking otomatis dan pemantauan komisi.",
        role: "Frontend engineer",
        problem:
          "Merchant ingin menaikkan penjualan lewat afiliasi, tapi melacak referral dan membayar komisi yang tepat secara manual jadi nggak realistis begitu skalanya membesar.",
        whatIDid: [
          "Membangun dashboard afiliasi dari nol, dengan setup yang mengenali domain supaya bisa di-deploy pakai brand milik customer.",
          "Membangun tracking otomatis dan pemantauan performa komisi.",
          "Menghubungkan komisi afiliasi dengan saldo seller supaya pembayaran selalu konsisten dengan penjualan.",
        ],
        result:
          "Merchant bisa menjalankan program afiliasi lengkap dengan tracking dan laporan komisi, dan dashboard ini sudah di-white-label untuk customer.",
      },
      "waves-ssi": {
        title: "WAVES-SSI Learning Platform",
        summary:
          "Website belajar dua bahasa tempat mahasiswa calon guru biologi menyelidiki kasus nyata pencemaran plastik.",
        role: "Freelance, satu-satunya developer",
        problem:
          "Tim peneliti dari Western Australia–East Java Universities Consortium butuh website yang memandu kelompok mahasiswa lewat investigasi enam tahap tentang mikroplastik di Pantai Pancer dan TPI Puger, Jember.",
        whatIDid: [
          "Membangun seluruh website, dari landing page sampai alur belajar yang terpandu.",
          "Membangun enam tahap investigasi dengan jawaban rich-text, editor diagram untuk memetakan perpindahan mikroplastik, dan ekspor PDF hasil kerja mahasiswa.",
          "Menambahkan login, penyimpanan progres kelompok dengan Supabase, dan pilihan bahasa Indonesia/Inggris.",
          "Menyematkan video 360° dan konten augmented reality supaya mahasiswa bisa mengamati lokasi lapangan dari jauh.",
        ],
        result:
          "Platform ini sudah live dan dipakai sebagai bagian dari riset konsorsium tentang pendidikan keberlanjutan.",
      },
      klikdiabetes: {
        title: "KlikDiabetes",
        summary:
          "Aplikasi React Native yang membantu penyandang diabetes memantau aktivitas, gula darah, dan obat.",
        role: "Junior frontend engineer",
        problem:
          "Penyandang diabetes perlu mencatat banyak metrik harian dan ingat jadwal minum obat, sesuatu yang susah dilakukan tanpa alat khusus.",
        whatIDid: [
          "Menerjemahkan desain Figma jadi layar iOS dan Android yang rapi dan presisi.",
          "Menghubungkan Google Fit SDK dan GPS untuk melacak langkah harian dan aktivitas fisik.",
          "Membangun pengingat untuk minum obat, pencatatan gula darah, dan pemantauan tekanan darah.",
          "Mengelola state aplikasi dengan Redux dan menghubungkan REST API supaya data selalu sinkron.",
        ],
        result: "Aplikasinya rilis di Play Store dan App Store.",
      },
    },
  },
  caseStudy: {
    back: "Semua proyek",
    role: "Peran",
    stack: "Teknologi",
    workplace: "Tempat kerja",
    live: "Lihat situs",
    source: "Source code",
    problem: "Masalahnya",
    whatIDid: "Yang aku kerjakan",
    result: "Hasilnya",
    gallery: "Galeri",
    screenshotAlt: "Screenshot {{title}} {{number}}",
    moreProjects: "Proyek lainnya",
    previous: "Sebelumnya",
    next: "Berikutnya",
  },
  contact: {
    heading: "Yuk, bangun sesuatu",
    headingAccent: "yang keren bareng.",
    location: "Jember, Indonesia · WIB (UTC+7)",
    email: "Email",
    send: "Kirim email",
    copy: "Salin email",
    copied: "Tersalin!",
    cv: "CV",
    cvAction: "Unduh PDF",
  },
  footer: {
    builtWith: "Dibuat dengan Next.js",
  },
  notFound: {
    title: "Halamannya nggak ketemu.",
    back: "Balik ke beranda",
  },
};
