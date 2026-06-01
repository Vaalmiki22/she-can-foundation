// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .card, .blog-card, .value-card, .about-card, select, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

// ── Progress Bar ──
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Dark Mode ──
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// ── Mobile Nav ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ── Animated Counter ──
function animateCount(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 20);
}
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const raw = el.textContent;
        const val = parseInt(raw);
        const suf = raw.replace(/[0-9]/g, '');
        animateCount(el, val, suf);
      });
      statsObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  statsObs.observe(statsStrip);
}

// ── Toast auto-dismiss ──
document.querySelectorAll('.toast').forEach(t => {
  setTimeout(() => t.remove(), 5000);
});

// ── Form char counter ──
document.querySelectorAll('textarea[maxlength]').forEach(ta => {
  const counter = document.createElement('small');
  counter.style.cssText = 'display:block;text-align:right;color:var(--ink2);margin-top:.3rem;font-size:.75rem';
  counter.textContent = `0 / ${ta.maxLength}`;
  ta.parentNode.appendChild(counter);
  ta.addEventListener('input', () => counter.textContent = `${ta.value.length} / ${ta.maxLength}`);
});
