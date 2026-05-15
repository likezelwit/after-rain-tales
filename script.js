/* ================================================================
   DATA ARTIST (Database Sederhana)
=============================================================== */
const artistsData = {
  aiko: {
    name: "Aiko",
    role: "The Speedster & Digital Stylist",
    phone: "+62 895-3292-24959",
    rawPhone: "62895329224959",
    rating: "⭐⭐⭐⭐⭐ (5/5) — Dikenal sangat komunikatif dan tepat waktu.",
    type: "Digital Art Expert. Aiko fokus sepenuhnya pada pengerjaan digital menggunakan software terkini.",
    capabilities: [
      "<strong>Character Design:</strong> Sangat mahir membuat desain karakter orisinal (OC) dari nol.",
      "<strong>Style Versatility:</strong> Bisa mengerjakan Simple Sketch, Chibi, hingga Premium Full Shading.",
      "<strong>Kecepatan Kerja:</strong> Stabil (1–3 jam tergantung kerumitan paket).",
      "<strong>Pengalaman Genre:</strong> Anime/Manga dan Semi-Realism."
    ],
    limits: [ "Tidak ada batasan spesifik (Open to all themes sesuai aturan umum)." ],
    extraNote: ""
  },
  firda: {
    name: "Firda",
    role: "The Aesthetic & Mood Master",
    phone: "+62 858-1937-7503",
    rawPhone: "6285819377503",
    rating: "⭐⭐⭐⭐⭐ (5/5) — Dikenal sangat kuat dalam menciptakan suasana melalui kontras warna dramatis.",
    type: "Traditional Art Specialist. Menggunakan media fisik untuk tekstur otentik.",
    capabilities: [
      "<strong>Master of Contrast:</strong> Ahli memainkan efek cahaya dan bayangan yang tajam.",
      "<strong>Traditional Shading:</strong> Teknik arsir dan gradasi manual yang bervolume.",
      "<strong>Atmospheric Background:</strong> Membangun suasana (mood) melalui detail latar belakang."
    ],
    limits: [ "<strong>No Mecha:</strong> Belum melayani robot/mesin dengan detail teknis kompleks." ],
    extraNote: "Hasil Akhir berupa file digital hasil scan/foto kualitas tinggi."
  },
  putri: {
    name: "Putri",
    role: "The Sticker & Chibi Specialist",
    phone: "+62 857-5755-2350",
    rawPhone: "6285757552350",
    rating: "⭐⭐⭐⭐⭐ (5/5) — Dikenal sangat teliti dan mampu menangkap keinginan pelanggan secara detail.",
    type: "Traditional Art Specialist. Fokus pada karya seni manual dengan sentuhan tekstur unik.",
    capabilities: [
      "<strong>Chibi Style Specialist:</strong> Ahli membuat karakter chibi lucu dan proporsional.",
      "<strong>Traditional Sketching:</strong> Goresan tangan langsung yang rapi dan personal.",
      "<strong>Soft Aesthetic:</strong> Keindahan garis manual lembut, cocok untuk koleksi/hadiah."
    ],
    limits: [
      "<strong>No NSFW:</strong> Tidak menerima konten dewasa.",
      "<strong>No Heavy Gore:</strong> Tidak menerima kekerasan ekstrem.",
      "<strong>No Full Body:</strong> Saat ini hanya melayani maksimal Half Body."
    ],
    extraNote: "Hasil Akhir dikirim via Google Drive (Scan/Foto HRD)."
  }
};

/* ================================================================
   DARK MODE LOGIC
=============================================================== */
function toggleDark(){
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelector('.dark-toggle').textContent = isDark ? '🌙' : '☀️';
}

/* ================================================================
   SPARKLE HOVER EFFECT FOR CARDS
=============================================================== */
const cards = document.querySelectorAll('.sparkle-wrap');
const sparkleEmojis = ['✨','⭐','💫','🌟','❄️','🎨'];

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    if (Math.random() > 0.85) {
      const sp = document.createElement('div');
      sp.className = 'sparkle';
      sp.textContent = sparkleEmojis[Math.floor(Math.random()*sparkleEmojis.length)];
      const rect = card.getBoundingClientRect();
      sp.style.left = (e.clientX - rect.left) + 'px';
      sp.style.top = (e.clientY - rect.top) + 'px';
      card.appendChild(sp);
      setTimeout(() => sp.remove(), 900);
    }
  });
});

/* ================================================================
   LIGHTBOX (IMAGE PREVIEW) LOGIC
=============================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// Buka Lightbox saat gambar diklik
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', (e) => {
    // Jangan trigger jika tombol close atau di dalam modal (kecuali gambar utama lightbox)
    if(e.target.closest('.profile-content') || e.target.closest('.lightbox-close') || e.target.closest('.wa-float')) return;
    
    lightboxImg.src = e.target.src;
    lightbox.classList.add('active');
  });
});

// Tutup Lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
}

lightboxClose.addEventListener('click', closeLightbox);

// Tutup jika klik background gelap
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* ================================================================
   ARTIST PROFILE MODAL (SPA) LOGIC
=============================================================== */
const profileModal = document.getElementById('artist-profile');
const profileCloseBtn = document.querySelector('.profile-close');

// Element untuk diisi data
const pName = document.getElementById('p-name');
const pRole = document.getElementById('p-role');
const pPhone = document.getElementById('p-phone');
const pRating = document.getElementById('p-rating');
const pType = document.getElementById('p-type');
const pCapabilities = document.getElementById('p-capabilities');
const pLimits = document.getElementById('p-limits');
const pExtraNote = document.getElementById('p-extra-note');
const pWaLink = document.getElementById('p-wa-link');

// Event Listener untuk tombol "Pesan Sekarang" di card artist
document.querySelectorAll('.btn-artist-order').forEach(btn => {
  btn.addEventListener('click', () => {
    const artistId = btn.getAttribute('data-artist');
    openArtistProfile(artistId);
  });
});

function openArtistProfile(id) {
  const data = artistsData[id];
  if (!data) return;

  // Isi Data ke Modal
  pName.textContent = data.name;
  pRole.textContent = data.role;
  pPhone.textContent = data.phone;
  pRating.textContent = data.rating;
  pType.textContent = data.type;

  // Isi Capabilities (List)
  pCapabilities.innerHTML = '<ul>' + data.capabilities.map(c => `<li>${c}</li>`).join('') + '</ul>';

  // Isi Limits (List)
  pLimits.innerHTML = data.limits.map(l => `<li>${l}</li>`).join('');
  
  // Isi Catatan Tambahan
  pExtraNote.textContent = data.extraNote;

  // Atur Link WhatsApp
  const message = `Halo ${data.name}, saya ingin memesan komisi denganmu...`;
  pWaLink.href = `https://wa.me/${data.rawPhone}?text=${encodeURIComponent(message)}`;

  // Tampilkan Modal
  profileModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop scroll background
}

function closeProfile() {
  profileModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scroll
}

profileCloseBtn.addEventListener('click', closeProfile);

// Tutup jika klik background gelap
profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    closeProfile();
  }
});
