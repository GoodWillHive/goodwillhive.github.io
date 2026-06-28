// Coin counter — localStorage (per browser).
// When VPS is ready: replace with real API endpoint for global shared count.

const STORAGE_KEY = 'gwh-coins';
const display = document.getElementById('coin-display');
let currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

function animateCount(el, from, to, duration = 400) {
  const start = performance.now();
  const diff = to - from;
  if (diff === 0) { el.textContent = to.toLocaleString(); return; }
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + diff * ease).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

display.textContent = currentCount.toLocaleString();

window.payCoin = function() {
  const btn = document.querySelector('.coin-btn');
  btn.disabled = true;

  const next = currentCount + 1;
  animateCount(display, currentCount, next, 300);
  currentCount = next;
  localStorage.setItem(STORAGE_KEY, next);

  setTimeout(() => {
    document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
  }, 350);
};
