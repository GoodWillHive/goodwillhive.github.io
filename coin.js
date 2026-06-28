const NAMESPACE = 'goodwillhive';
const KEY = 'ai-coins';
const API = `https://api.countapi.xyz`;

const display = document.getElementById('coin-display');
let currentCount = parseInt(localStorage.getItem('gwh-coin-cache') || '0', 10);

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

// Load initial count — show cached immediately, then update from API silently
display.textContent = currentCount.toLocaleString();
fetch(`${API}/get/${NAMESPACE}/${KEY}`)
  .then(r => r.json())
  .then(data => {
    const fresh = data.value || 0;
    if (fresh !== currentCount) {
      animateCount(display, currentCount, fresh);
      currentCount = fresh;
      localStorage.setItem('gwh-coin-cache', fresh);
    }
  })
  .catch(() => {});

window.payCoin = function() {
  const btn = document.querySelector('.coin-btn');
  btn.disabled = true;

  // Optimistic: show +1 instantly
  const optimistic = currentCount + 1;
  animateCount(display, currentCount, optimistic, 300);
  currentCount = optimistic;
  localStorage.setItem('gwh-coin-cache', optimistic);

  // Scroll to content immediately
  setTimeout(() => {
    document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
  }, 350);

  // Sync real count in background — correct silently if off
  fetch(`${API}/hit/${NAMESPACE}/${KEY}`)
    .then(r => r.json())
    .then(data => {
      const real = data.value || optimistic;
      if (real !== currentCount) {
        animateCount(display, currentCount, real, 300);
        currentCount = real;
        localStorage.setItem('gwh-coin-cache', real);
      }
    })
    .catch(() => {});
};
