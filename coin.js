// AI Coin counter — uses countapi.xyz for global shared count
// Falls back to localStorage if API fails

const COUNTER_NAMESPACE = 'goodwillhive';
const COUNTER_KEY = 'ai-coins';
const API_BASE = 'https://api.countapi.xyz';

async function fetchCount() {
  try {
    const res = await fetch(`${API_BASE}/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
    const data = await res.json();
    return data.value || 0;
  } catch {
    return parseInt(localStorage.getItem('gwh-coins-local') || '0', 10);
  }
}

async function hitCount() {
  try {
    const res = await fetch(`${API_BASE}/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
    const data = await res.json();
    return data.value || 0;
  } catch {
    const local = parseInt(localStorage.getItem('gwh-coins-local') || '0', 10) + 1;
    localStorage.setItem('gwh-coins-local', local);
    return local;
  }
}

function animateCount(el, from, to, duration = 600) {
  const start = performance.now();
  const diff = to - from;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + diff * ease).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const display = document.getElementById('coin-display');
let currentCount = 0;

fetchCount().then(n => {
  currentCount = n;
  animateCount(display, 0, n);
});

window.payCoin = async function() {
  const btn = document.querySelector('.coin-btn');
  btn.disabled = true;
  btn.style.opacity = '0.7';
  const newCount = await hitCount();
  animateCount(display, currentCount, newCount);
  currentCount = newCount;
  setTimeout(() => {
    btn.disabled = false;
    btn.style.opacity = '1';
    document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
  }, 700);
};
