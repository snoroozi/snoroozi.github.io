/* ===================================================================
   starfield.js — Animated starry sky background for the right panel.
   Sparse stars with subtle twinkle + rare comet / shooting star.
   Mouse parallax gives subtle depth.
   =================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Config
  const STAR_COUNT     = 220;   // richer sky
  const STAR_MIN_R     = 0.3;
  const STAR_MAX_R     = 1.8;
  const TWINKLE_SPEED  = 0.018; // noticeably alive
  const PARALLAX_DEPTH = 0.004; // very subtle mouse tracking
  const COMET_MIN_MS   = 28000; // ~28s minimum
  const COMET_MAX_MS   = 55000; // ~55s maximum

  let W = 0, H = 0;
  let stars = [];
  let mouse = { x: 0, y: 0 };
  let cometActive = false;
  let comet = null;
  let nextCometTimer = null;
  let animId = null;

  // ── Sizing ────────────────────────────────────────────────────────
  function resize() {
    const sidebar = document.getElementById('sidebar');
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 52;
    const sideW = sidebar ? sidebar.getBoundingClientRect().width : 300;
    W = window.innerWidth - sideW;
    H = window.innerHeight - navH;
    canvas.width  = W;
    canvas.height = H;
    if (stars.length === 0) initStars();
  }

  // ── Stars ─────────────────────────────────────────────────────────
  function randomStar() {
    const speed = (0.4 + Math.random() * 1.4) * TWINKLE_SPEED;
    return {
      x:         Math.random() * W,
      y:         Math.random() * H,
      r:         STAR_MIN_R + Math.random() * (STAR_MAX_R - STAR_MIN_R),
      depth:     0.3 + Math.random() * 0.7,
      phase:     Math.random() * Math.PI * 2,
      speed,
      // subtle drift — very slow random walk
      driftX:    (Math.random() - 0.5) * 0.012,
      driftY:    (Math.random() - 0.5) * 0.008,
      baseAlpha: 0.40 + Math.random() * 0.48,
    };
  }

  function initStars() {
    stars = Array.from({ length: STAR_COUNT }, randomStar);
  }

  // ── Comet ─────────────────────────────────────────────────────────
  function scheduleComet() {
    if (nextCometTimer) clearTimeout(nextCometTimer);
    const delay = COMET_MIN_MS + Math.random() * (COMET_MAX_MS - COMET_MIN_MS);
    nextCometTimer = setTimeout(spawnComet, delay);
  }

  function spawnComet() {
    if (cometActive) { scheduleComet(); return; }
    cometActive = true;

    // Start from top edge, slight random angle
    const angle = (Math.PI / 8) + Math.random() * (Math.PI / 6); // 22.5–52.5°
    const startX = Math.random() * W * 0.6;
    const speed  = 3.5 + Math.random() * 2.5;

    comet = {
      x:    startX,
      y:    -10,
      vx:   Math.cos(angle) * speed,
      vy:   Math.sin(angle) * speed,
      len:  80 + Math.random() * 60,
      alpha: 0,
      fade: 'in',  // 'in' | 'hold' | 'out'
      life: 0,
      maxLife: 60 + Math.random() * 40,
    };
    scheduleComet();
  }

  function updateComet() {
    if (!comet) return;
    comet.x += comet.vx;
    comet.y += comet.vy;
    comet.life++;

    if (comet.fade === 'in') {
      comet.alpha = Math.min(comet.alpha + 0.06, 0.9);
      if (comet.alpha >= 0.9) comet.fade = 'hold';
    } else if (comet.fade === 'hold') {
      if (comet.life > comet.maxLife) comet.fade = 'out';
    } else {
      comet.alpha = Math.max(comet.alpha - 0.05, 0);
      if (comet.alpha <= 0) {
        comet = null;
        cometActive = false;
        return;
      }
    }

    if (comet && (comet.x > W + 100 || comet.y > H + 100)) {
      comet = null;
      cometActive = false;
    }
  }

  function drawComet() {
    if (!comet) return;
    const { x, y, vx, vy, len, alpha } = comet;
    const mag = Math.sqrt(vx * vx + vy * vy);
    const tailX = x - (vx / mag) * len;
    const tailY = y - (vy / mag) * len;

    const grad = ctx.createLinearGradient(tailX, tailY, x, y);
    grad.addColorStop(0, `rgba(180, 210, 255, 0)`);
    grad.addColorStop(0.6, `rgba(180, 210, 255, ${alpha * 0.4})`);
    grad.addColorStop(1, `rgba(220, 235, 255, ${alpha})`);

    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Head glow
    const headGlow = ctx.createRadialGradient(x, y, 0, x, y, 5);
    headGlow.addColorStop(0, `rgba(220, 240, 255, ${alpha * 0.9})`);
    headGlow.addColorStop(1, `rgba(220, 240, 255, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = headGlow;
    ctx.fill();
  }

  // ── Nebula clouds & galaxy dust ───────────────────────────────────
  function drawNebula() {
    // Cloud 1: violet, upper-right (main)
    const g1 = ctx.createRadialGradient(W * 0.78, H * 0.15, 0, W * 0.78, H * 0.15, W * 0.35);
    g1.addColorStop(0, 'rgba(167,139,250,0.075)');
    g1.addColorStop(0.45, 'rgba(139,92,246,0.038)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

    // Cloud 2: blue, center-left (main)
    const g2 = ctx.createRadialGradient(W * 0.16, H * 0.42, 0, W * 0.16, H * 0.42, W * 0.38);
    g2.addColorStop(0, 'rgba(59,130,246,0.065)');
    g2.addColorStop(0.55, 'rgba(37,99,235,0.026)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

    // Cloud 3: cyan, lower-right (main)
    const g3 = ctx.createRadialGradient(W * 0.70, H * 0.80, 0, W * 0.70, H * 0.80, W * 0.30);
    g3.addColorStop(0, 'rgba(34,211,238,0.058)');
    g3.addColorStop(0.45, 'rgba(6,182,212,0.025)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);

    // Cloud 4: warm amber accent, center-bottom
    const g4 = ctx.createRadialGradient(W * 0.45, H * 0.88, 0, W * 0.45, H * 0.88, W * 0.22);
    g4.addColorStop(0, 'rgba(212,168,83,0.038)');
    g4.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g4; ctx.fillRect(0, 0, W, H);

    // Cloud 5: small dense bright violet patch (upper-left)
    const g5 = ctx.createRadialGradient(W * 0.08, H * 0.20, 0, W * 0.08, H * 0.20, W * 0.14);
    g5.addColorStop(0, 'rgba(167,139,250,0.045)');
    g5.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g5; ctx.fillRect(0, 0, W, H);

    // Galaxy dust band: faint irregular diagonal haze
    ctx.save();
    ctx.translate(W * 0.5, H * 0.5);
    ctx.rotate(-Math.PI / 7.5);
    const bandLen = Math.sqrt(W * W + H * H);
    const dustGrad = ctx.createLinearGradient(0, -80, 0, 80);
    dustGrad.addColorStop(0,    'rgba(0,0,0,0)');
    dustGrad.addColorStop(0.22, 'rgba(120,140,185,0.020)');
    dustGrad.addColorStop(0.42, 'rgba(155,170,215,0.038)');
    dustGrad.addColorStop(0.50, 'rgba(170,185,225,0.048)');
    dustGrad.addColorStop(0.60, 'rgba(155,170,215,0.035)');
    dustGrad.addColorStop(0.78, 'rgba(120,140,185,0.018)');
    dustGrad.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = dustGrad;
    ctx.fillRect(-bandLen / 2, -80, bandLen, 160);
    ctx.restore();

    // Second dust band — offset for non-uniformity
    ctx.save();
    ctx.translate(W * 0.35, H * 0.62);
    ctx.rotate(-Math.PI / 5);
    const bLen2 = Math.sqrt(W * W + H * H) * 0.7;
    const dg2 = ctx.createLinearGradient(0, -45, 0, 45);
    dg2.addColorStop(0,   'rgba(0,0,0,0)');
    dg2.addColorStop(0.5, 'rgba(100,120,175,0.022)');
    dg2.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = dg2;
    ctx.fillRect(-bLen2 / 2, -45, bLen2, 90);
    ctx.restore();
  }

  // ── Draw frame ────────────────────────────────────────────────────
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawNebula();
    t += 1;

    const mx = (mouse.x / W - 0.5) * 2;  // -1 to 1
    const my = (mouse.y / H - 0.5) * 2;

    stars.forEach(s => {
      // Subtle drift — wrap at edges
      s.x = (s.x + s.driftX + W) % W;
      s.y = (s.y + s.driftY + H) % H;

      const px = s.x + mx * s.depth * W * PARALLAX_DEPTH;
      const py = s.y + my * s.depth * H * PARALLAX_DEPTH;

      const twinkle = Math.sin(t * s.speed + s.phase);
      const alpha = s.baseAlpha + twinkle * 0.28; // more pronounced twinkle

      // Color: slightly blue-tinted; deeper stars warmer
      const blue = Math.floor(195 + s.depth * 60);
      const red  = Math.floor(195 + (1 - s.depth) * 25);
      const a    = Math.max(0.06, Math.min(1, alpha));

      // Brighter stars get a tiny soft glow
      if (s.r > 1.2 && a > 0.6) {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 3.5);
        glow.addColorStop(0, `rgba(${red},${blue},255,${a * 0.35})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red},${blue},255,${a})`;
      ctx.fill();
    });

    updateComet();
    drawComet();

    animId = requestAnimationFrame(draw);
  }

  // ── Mouse ─────────────────────────────────────────────────────────
  function onMouseMove(e) {
    const sidebar = document.getElementById('sidebar');
    const sideW = sidebar ? sidebar.getBoundingClientRect().width : 300;
    mouse.x = e.clientX - sideW;
    mouse.y = e.clientY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 52);
  }

  // ── Init ──────────────────────────────────────────────────────────
  function init() {
    resize();
    draw();
    scheduleComet();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    // Remove preload class after first paint
    requestAnimationFrame(() => {
      document.body.classList.remove('is-preload');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
