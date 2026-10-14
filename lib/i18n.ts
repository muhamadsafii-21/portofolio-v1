export type Lang = "id" | "en";

// Semua teks UI dalam 2 bahasa. Tambahkan key baru di sini bila perlu.
export const dict = {
  nav: {
    about: { id: "Tentang", en: "About" },
    skills: { id: "Skill", en: "Skills" },
    projects: { id: "Project", en: "Projects" },
    contact: { id: "Kontak", en: "Contact" },
    hireMe: { id: "Hubungi Saya", en: "Hire Me" },
    menu: { id: "Menu", en: "Menu" },
  },
  hero: {
    viewProjects: { id: "Lihat Project", en: "View Projects" },
    contactMe: { id: "Hubungi Saya", en: "Contact Me" },
    scroll: { id: "Gulir ke bawah", en: "Scroll down" },
  },
  about: {
    label: { id: "Tentang", en: "About" },
    title: { id: "Sedikit Tentang Saya", en: "A Bit About Me" },
  },
  skills: {
    label: { id: "Keahlian", en: "Expertise" },
    title: { id: "Skill & Teknologi", en: "Skills & Technologies" },
    desc: {
      id: "Teknologi yang saya kuasai dan gunakan sehari-hari.",
      en: "Technologies I master and use every day.",
    },
  },
  projects: {
    label: { id: "Portofolio", en: "Portfolio" },
    title: { id: "Project Pribadi", en: "Personal Projects" },
    desc: {
      id: "Beberapa project mandiri yang pernah saya bangun. Klik untuk melihat detail.",
      en: "Some solo projects I've built. Click to see details.",
    },
    viewDetail: { id: "Lihat Detail", en: "View Details" },
    noImage: { id: "Tidak ada gambar", en: "No image" },
    // modal
    featured: { id: "Featured", en: "Featured" },
    aboutProject: { id: "Tentang Project", en: "About Project" },
    mainFeatures: { id: "Fitur Utama", en: "Key Features" },
    myRole: { id: "Peran Saya", en: "My Role" },
    impact: { id: "Hasil / Dampak", en: "Impact / Results" },
    techStack: { id: "Tech Stack", en: "Tech Stack" },
    liveDemo: { id: "Live Demo", en: "Live Demo" },
    viewCode: { id: "Lihat Kode", en: "View Code" },
    close: { id: "Tutup", en: "Close" },
  },
  contact: {
    label: { id: "Kontak", en: "Contact" },
    title: { id: "Mari Terhubung", en: "Let's Connect" },
    desc: {
      id: "Punya pertanyaan atau project? Kirim pesan, saya balas secepatnya.",
      en: "Have a question or project? Send a message, I'll reply ASAP.",
    },
    infoTitle: { id: "Info Kontak", en: "Contact Info" },
    infoDesc: {
      id: "Saya terbuka untuk kolaborasi dan peluang baru.",
      en: "I'm open to collaborations and new opportunities.",
    },
    name: { id: "Nama", en: "Name" },
    namePlaceholder: { id: "Nama kamu", en: "Your name" },
    email: { id: "Email", en: "Email" },
    emailPlaceholder: { id: "email@contoh.com", en: "email@example.com" },
    message: { id: "Pesan", en: "Message" },
    messagePlaceholder: { id: "Tulis pesan kamu...", en: "Write your message..." },
    send: { id: "Kirim Pesan", en: "Send Message" },
    sending: { id: "Mengirim...", en: "Sending..." },
    sent: { id: "Terkirim!", en: "Sent!" },
    thanks: {
      id: "Terima kasih! Pesan kamu sudah terkirim.",
      en: "Thank you! Your message has been sent.",
    },
    failed: { id: "Gagal mengirim. Silakan coba lagi.", en: "Failed to send. Please try again." },
    required: {
      id: "Semua field wajib diisi.",
      en: "All fields are required.",
    },
  },
} as const;
