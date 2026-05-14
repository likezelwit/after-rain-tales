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
