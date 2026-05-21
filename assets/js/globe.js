/* ===================================================================
   globe.js — Interactive globe using globe.gl.
   Brighter earth texture, glow on location dots, hover pause,
   conference flag pins from CONFERENCE_PINS data array.
   =================================================================== */

(function () {
  'use strict';

  const container = document.getElementById('globe-container');
  if (!container || typeof Globe === 'undefined') return;

  // ── Pin type config ───────────────────────────────────────────────
  const PIN_COLORS = {
    academic: '#60a5fa',
    industry: '#34d399',
    personal: '#f59e0b',
    visitor:  '#a78bfa',
  };

  const PIN_SIZES = {
    academic: 0.55,
    industry: 0.55,
    personal: 0.45,
    visitor:  0.38,
  };

  // ── Build globe ───────────────────────────────────────────────────
  let globe;
  let autoRotating = true;

  function hoverTooltip(d, isConf) {
    const main = isConf ? d.conference : d.label;
    const sub  = isConf ? d.label     : '';
    return `
      <div style="
        background: rgba(7,11,20,0.92);
        border: 1px solid rgba(59,130,246,0.35);
        border-radius: 7px;
        padding: 6px 12px;
        font-family: Roboto, sans-serif;
        font-size: 12px;
        color: #e2e8f0;
        white-space: nowrap;
        pointer-events: none;
        line-height: 1.5;
      ">
        <strong style="color:#93c5fd;">${main}</strong>
        ${sub ? `<br><span style="color:#64748b;">${sub}</span>` : ''}
      </div>
    `;
  }

  function init() {
    const w = container.clientWidth  || 400;
    const h = container.clientHeight || 320;

    globe = Globe({ animateIn: false })(container)
      .width(w)
      .height(h)
      .backgroundColor('rgba(0,0,0,0)')
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .atmosphereColor('#3b82f6')
      .atmosphereAltitude(0.20)
      // Location dots
      .pointsData(GLOBE_PINS)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor(d => PIN_COLORS[d.type] || '#60a5fa')
      .pointRadius(d => PIN_SIZES[d.type] || 0.45)
      .pointAltitude(0.015)
      .pointsMerge(false)
      .pointLabel(d => hoverTooltip(d, false))
      // Conference flag pins via htmlElement
      .htmlElementsData(typeof CONFERENCE_PINS !== 'undefined' ? CONFERENCE_PINS : [])
      .htmlLat('lat')
      .htmlLng('lng')
      .htmlAltitude(0.02)
      .htmlElement(d => {
        const el = document.createElement('div');
        el.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: auto;
          cursor: default;
        `;
        el.innerHTML = `
          <div style="
            background: #7f1d1d;
            color: #fef2f2;
            font-size: 8px;
            font-weight: 600;
            font-family: Roboto, sans-serif;
            padding: 2px 5px;
            border-radius: 2px;
            white-space: nowrap;
            box-shadow: 0 1px 4px rgba(0,0,0,0.6);
            line-height: 1.3;
          ">${d.conference}</div>
          <div style="
            width: 2px;
            height: 10px;
            background: #9f1239;
          "></div>
          <div style="
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #e11d48;
            box-shadow: 0 0 6px rgba(225,29,72,0.8);
          "></div>
        `;
        el.title = `${d.conference} · ${d.label}`;
        return el;
      });

    // Initial view
    globe.pointOfView({ lat: 20, lng: -20, altitude: 1.8 });

    // Auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Hover pause / resume
    container.addEventListener('mouseenter', () => {
      if (globe) globe.controls().autoRotate = false;
    });
    container.addEventListener('mouseleave', () => {
      if (globe) globe.controls().autoRotate = true;
    });

    // Resize observer
    const ro = new ResizeObserver(() => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) globe.width(nw).height(nh);
    });
    ro.observe(container);
  }

  // ── Public: add a visitor pin ─────────────────────────────────────
  window.addVisitorPin = function (lat, lng, label) {
    GLOBE_PINS.push({ lat, lng, label: label || 'Visitor', type: 'visitor' });
    if (globe) globe.pointsData([...GLOBE_PINS]);
  };

  // ── Init (defer until section is near viewport) ───────────────────
  function tryInit() {
    if (typeof Globe === 'undefined') {
      setTimeout(tryInit, 500);
      return;
    }

    const section = document.getElementById('news-globe');
    if (!section) { init(); return; }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          observer.disconnect();
          init();
        }
      });
    }, { rootMargin: '200px' });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }

})();
