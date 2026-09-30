/* =============================================================
   💌 Gửi Tít — script
   Nội dung cần sửa nằm trong config.js, không cần đụng file này.
   ============================================================= */
(function () {
  'use strict';

  const CFG = Object.assign(
    {
      herName: 'Duyên',
      hisName: 'Tít',
      music: 'music/love-song.mp3',
      playMusicOnOpen: false,
      timeline: [],
      photos: [],
    },
    window.LOVE_CONFIG || {}
  );

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? Math.min(ms, 60) : ms));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  const SOFT_COLORS = ['#ff8fb1', '#ffb0c8', '#ffc2d4', '#f7a1c4', '#ffd0dd', '#a9d3ff', '#ffdf8a'];
  const BURST_COLORS = ['#e64a74', '#f0668f', '#ff8fb1', '#ffb0c8', '#ffcf5c', '#8fc4ff'];

  /* ---------- Tên ---------- */
  $$('.js-her').forEach((el) => (el.textContent = CFG.herName));
  $$('.js-him').forEach((el) => (el.textContent = CFG.hisName));
  document.title = 'Gửi ' + CFG.hisName + ' 💌';

  /* ---------- Timeline từ config ---------- */
  const timelineEl = $('#timeline');
  CFG.timeline.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'tl-item reveal' + (item.future ? ' future' : '');
    li.style.setProperty('--d', (i % 2) * 0.1 + 's');
    li.innerHTML =
      '<span class="tl-dot" aria-hidden="true">♥</span>' +
      '<div class="tl-card glass"><span class="tl-date"></span><h3 class="tl-title"></h3><p class="tl-note"></p></div>';
    $('.tl-date', li).textContent = item.date || '';
    $('.tl-title', li).textContent = item.title || '';
    $('.tl-note', li).textContent = item.note || '';
    timelineEl.appendChild(li);
  });

  /* ---------- Hiện dần khi cuộn ---------- */
  const hasIO = 'IntersectionObserver' in window;
  const revealObs = hasIO
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              revealObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    : null;
  $$('.reveal').forEach((el) => (revealObs ? revealObs.observe(el) : el.classList.add('is-visible')));

  function onceVisible(el, cb, threshold = 0.3) {
    if (!el) return;
    if (!hasIO) return void cb();
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          obs.disconnect();
          cb();
        }
      },
      { threshold }
    );
    obs.observe(el);
  }

  /* ---------- Trái tim bay nền ---------- */
  const heartLayer = $('#hearts');
  let ambientCount = 0;

  function spawnHeart({ fast = false, delay = 0 } = {}) {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = Math.random() < 0.8 ? '♥' : '♡';
    h.style.left = rand(0, 97) + '%';
    h.style.fontSize = (fast ? rand(14, 30) : rand(9, 20)) + 'px';
    h.style.color = pick(SOFT_COLORS);
    h.style.setProperty('--dur', (fast ? rand(4.5, 7.5) : rand(13, 22)) + 's');
    h.style.setProperty('--sway', rand(-50, 50) + 'px');
    h.style.setProperty('--op', fast ? rand(0.6, 0.95) : rand(0.25, 0.55));
    if (delay) h.style.animationDelay = delay + 's';
    if (!fast) ambientCount++;
    h.addEventListener('animationend', () => {
      h.remove();
      if (!fast) ambientCount--;
    });
    heartLayer.appendChild(h);
  }

  function heartRain(n = 24) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) setTimeout(() => spawnHeart({ fast: true }), i * 70);
  }

  if (!reduceMotion) {
    for (let i = 0; i < 7; i++) spawnHeart({ delay: -rand(0, 12) });
    setInterval(() => {
      if (!document.hidden && ambientCount < 16) spawnHeart();
    }, 1400);
  }

  /* ---------- Nổ tim ---------- */
  const fx = $('#fx');

  function burst(x, y, n = 16, power = 1) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'burst-heart';
      s.textContent = pick(['♥', '♥', '♥', '♡', '✦']);
      const angle = rand(0, Math.PI * 2);
      const dist = rand(50, 130) * power;
      s.style.setProperty('--x', x + 'px');
      s.style.setProperty('--y', y + 'px');
      s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--dy', Math.sin(angle) * dist - 40 * power + 'px');
      s.style.setProperty('--s', rand(0.8, 1.5));
      s.style.setProperty('--r', rand(-60, 60) + 'deg');
      s.style.setProperty('--t', rand(0.8, 1.3) + 's');
      s.style.fontSize = rand(12, 22) * Math.max(power, 0.7) + 'px';
      s.style.color = pick(BURST_COLORS);
      s.addEventListener('animationend', () => s.remove());
      fx.appendChild(s);
    }
  }

  function burstFrom(el, n) {
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, n);
  }

  // chạm vào chỗ trống cũng rơi ra vài trái tim nhỏ
  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a, .modal')) return;
    burst(e.clientX, e.clientY, 5, 0.55);
  });

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  /* ---------- Nhạc ---------- */
  const audio = $('#bgm');
  const musicBtn = $('#musicBtn');
  const musicTip = $('#musicTip');
  audio.src = CFG.music;
  audio.volume = 0.7;

  function setPlaying(on) {
    musicBtn.classList.toggle('playing', on);
    musicBtn.setAttribute('aria-pressed', String(on));
    musicBtn.setAttribute('aria-label', on ? 'Tắt nhạc' : 'Bật nhạc');
  }

  async function startMusic(silent) {
    try {
      await audio.play();
      setPlaying(true);
    } catch (err) {
      setPlaying(false);
      if (!silent) toast(CFG.herName + ' chưa kịp bỏ nhạc vào nè 🥲');
    }
  }

  musicBtn.addEventListener('click', () => {
    musicTip.classList.remove('show');
    if (audio.paused) startMusic(false);
    else audio.pause();
  });
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('playing', () => setPlaying(true));

  /* ---------- 1. Opening ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  html.classList.add('locked');

  const opening = $('#opening');
  const hey = $('#hey');

  async function typeInto(host, speed) {
    const text = (host.dataset.text || host.textContent).normalize('NFC');
    host.textContent = '';
    host.classList.add('type-host');
    const ghost = document.createElement('span');
    ghost.className = 'ghost';
    ghost.textContent = text;
    const typed = document.createElement('span');
    typed.className = 'typed typing';
    typed.setAttribute('aria-hidden', 'true');
    host.setAttribute('aria-label', text);
    host.append(ghost, typed);
    host.classList.add('ready');

    for (const ch of Array.from(text)) {
      typed.textContent += ch;
      await wait(ch === '.' ? speed * 2.6 : speed + rand(-30, 40));
    }
    await wait(700);
    typed.classList.remove('typing');
  }

  (async function runOpening() {
    await wait(400);
    $('#openTag').classList.add('show');
    await wait(600);
    await typeInto(hey, 130);
    $('#openSub').classList.add('show');
    await wait(1000);
    $('#openBtn').classList.add('show');
  })();

  $('#openBtn').addEventListener('click', (e) => {
    burstFrom(e.currentTarget, 24);
    heartRain(12);
    opening.classList.add('opened');
    $('#scrollHint').classList.add('show');
    html.classList.remove('locked');

    if (CFG.playMusicOnOpen) startMusic(true);
    else {
      musicTip.classList.add('show');
      setTimeout(() => musicTip.classList.remove('show'), 5000);
    }

    setTimeout(() => {
      $('#confess').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, 700);
  });

  /* ---------- 2. Chat ---------- */
  const msgs = $$('.msg', $('#chatBody'));
  msgs.forEach((m) => m.classList.add('pending'));

  onceVisible($('#chat'), async () => {
    await wait(500);
    for (const m of msgs) {
      const dots = document.createElement('div');
      dots.className = 'typing-dots';
      dots.setAttribute('aria-hidden', 'true');
      dots.innerHTML = '<i></i><i></i><i></i>';
      m.before(dots);
      await wait(800 + Math.min(m.textContent.length * 18, 1200));
      dots.remove();
      m.classList.remove('pending');
      m.classList.add('pop');
      await wait(700);
    }
    $('#chatSeen').classList.add('show');
  }, 0.4);

  /* ---------- 3. Cards ---------- */
  $$('.flip').forEach((card) => {
    card.addEventListener('click', () => {
      const on = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(on));
      if (on) burstFrom(card, 8);
    });
  });

  /* ---------- 6. Lá thư ---------- */
  $('#butBtn').addEventListener('click', (e) => {
    burstFrom(e.currentTarget, 12);
    e.currentTarget.hidden = true;
    $('#promise').classList.add('show');
  });

  /* ---------- 7. Câu hỏi ---------- */
  let answered = false;

  async function showEl(el) {
    el.hidden = false;
    await nextFrame();
    el.classList.add('show');
  }

  $$('[data-answer]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (answered) return;
      answered = true;
      burstFrom(btn, 10);

      const btns = $('#askBtns');
      btns.classList.add('gone');
      await wait(350);
      btns.hidden = true;

      const lines =
        btn.dataset.answer === 'yes'
          ? ['Biết thật không đó? 🤨', 'Thôi, để em nói lại cho chắc nha...']
          : ['Thế thì để em nói lại nhé...'];

      const reply = $('#askReply');
      for (const text of lines) {
        const p = document.createElement('p');
        p.className = 'q-line';
        p.textContent = text;
        reply.appendChild(p);
        await nextFrame();
        p.classList.add('show');
        await wait(1500);
      }

      const big = $('#loveBig');
      await showEl(big);
      burstFrom(big, 32);
      heartRain(30);

      await wait(1600);
      showEl($('#loveAfter'));
    });
  });

  /* ---------- 8. Lời cuối ---------- */
  const sparkles = $('#sparkles');
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = pick(['✦', '✧', '·', '♡']);
    s.style.left = rand(3, 97) + '%';
    s.style.top = rand(3, 97) + '%';
    s.style.fontSize = rand(10, 20) + 'px';
    s.style.animationDelay = -rand(0, 3.2) + 's';
    s.style.animationDuration = rand(2.6, 4.4) + 's';
    sparkles.appendChild(s);
  }

  onceVisible($('#finalContent'), async () => {
    for (const line of $$('.final-line')) {
      await wait(Number(line.dataset.wait || 900));
      line.classList.add('show');
      if (line.hasAttribute('data-burst')) {
        burstFrom(line, 28);
        heartRain(20);
      }
    }
  }, 0.15);

  $('#replayBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Easter egg ---------- */
  const modal = $('#secretModal');
  const secretBig = $('#secretBig');
  let lastFocus = null;
  let bigTimer;

  function openSecret(e) {
    lastFocus = document.activeElement;
    modal.hidden = false;
    void modal.offsetWidth; // để animation chạy lại mỗi lần mở
    modal.classList.add('open');
    html.classList.add('modal-open');
    if (e) burstFrom(e.currentTarget, 16);
    $('.modal-card', modal).focus({ preventScroll: true });

    bigTimer = setTimeout(() => {
      secretBig.classList.add('show');
      burstFrom(secretBig, 26);
      heartRain(22);
    }, reduceMotion ? 0 : 1400);
  }

  function closeSecret() {
    if (modal.hidden || modal.classList.contains('closing')) return;
    clearTimeout(bigTimer);
    modal.classList.remove('open');
    modal.classList.add('closing');
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('closing');
      secretBig.classList.remove('show');
      html.classList.remove('modal-open');
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }, 260);
  }

  $('#secretBtn').addEventListener('click', openSecret);
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeSecret));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSecret();
  });
})();
