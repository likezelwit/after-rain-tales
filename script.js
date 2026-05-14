/* ================================================================
   DARK MODE LOGIC
=============================================================== */
function toggleDark(){
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  
  const btn = document.querySelector('.dark-toggle');
  btn.textContent = isDark ? '🌙' : '☀️';
}

/* ================================================================
   SPARKLE HOVER EFFECT FOR CARDS
=============================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.sparkle-wrap');
  const sparkleEmojis = ['✨','⭐','💫','🌟','❄️','🎨'];

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (Math.random() > 0.85) { // Only sparkle sometimes
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        sp.textContent = sparkleEmojis[Math.floor(Math.random()*sparkleEmojis.length)];
        
        const rect = card.getBoundingClientRect();
        sp.style.left = (e.clientX - rect.left) + 'px';
        sp.style.top = (e.clientY - rect.top) + 'px';
        
        card.appendChild(sp);
        
        // Remove sparkle after animation
        setTimeout(() => sp.remove(), 900);
      }
    });
  });
});
