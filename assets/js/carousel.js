/* ===================================================================
   carousel.js — Custom coverflow carousels for publications & projects.
   Data-pos attribute states drive CSS transforms (no Swiper).
   Auto-advance 4500ms, hover-pause, keyboard navigation.
   Abstract panel appears below stage (not inside card).
   =================================================================== */

(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────────────────
  function areaToKey(area) {
    const map = {
      'Deep Sequence Modeling':               'seq',
      'Healthcare AI':                        'health',
      'Causal Inference / Survival Analysis': 'causal',
      'Neuro/Biomedical AI':                  'neuro',
      'Representation Learning':              'repr',
      'Multimodal Machine Learning':          'multi',
      'Agentic':                              'agentic',
      // legacy keys (fallback)
      'Sequence Models':                      'seq',
      'Healthcare':                           'health',
      'Causal':                               'causal',
    };
    return map[area] || 'repr';
  }

  function badgeTierClass(badge) {
    if (typeof VENUE_BADGES === 'undefined') return 'badge-preprint';
    const b = VENUE_BADGES[badge];
    if (!b) return 'badge-preprint';
    return `badge-${b.tier || 'preprint'}`;
  }

  function buildAreaTags(areas) {
    return (areas || []).map(a =>
      `<span class="area-tag tag-${areaToKey(a)}">${a}</span>`
    ).join('');
  }

  function buildVenueBadges(badge, extraBadges) {
    const all = [badge, ...(extraBadges || [])];
    return all.map(b =>
      `<span class="venue-badge ${badgeTierClass(b)}">${b}</span>`
    ).join('');
  }

  // Link order: Abstract btn first, then Paper links, then Code/Data links
  function buildLinks(links) {
    const paperKw  = /paper|preprint|arxiv|workshop|openreview/i;
    const codeKw   = /code|data|github|huggingface|patent/i;
    const paper = (links || []).filter(l => paperKw.test(l.label) || !codeKw.test(l.label));
    const code  = (links || []).filter(l => codeKw.test(l.label));
    return [...paper, ...code].map(l =>
      `<a href="${l.url}" target="_blank" rel="noopener" class="btn btn-sm" onclick="event.stopPropagation();">${l.label}</a>`
    ).join('');
  }

  function hexToRgba(hex, alpha) {
    if (!hex || hex.length < 7) return `rgba(59,130,246,${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // ── Coverflow factory ─────────────────────────────────────────────
  function createCoverflow(opts) {
    const list      = document.getElementById(opts.listId);
    const prevBtn   = document.getElementById(opts.prevId);
    const nextBtn   = document.getElementById(opts.nextId);
    const dotsWrap  = document.getElementById(opts.dotsId);
    const absPanel  = document.getElementById(opts.absPanelId);
    const absContent= document.getElementById(opts.absContentId);
    if (!list) return null;

    let items     = opts.items.slice();
    let activeIdx = 0;
    let autoTimer = null;
    let isHovered = false;
    let absOpen   = false;

    function getPos(i) {
      const total = items.length;
      const diff  = ((i - activeIdx) % total + total) % total;
      if (diff === 0)          return 'active';
      if (diff === 1)          return 'next';
      if (diff === total - 1)  return 'prev';
      if (diff === 2)          return 'next-2';
      if (diff === total - 2)  return 'prev-2';
      return 'hidden';
    }

    function updatePositions() {
      list.querySelectorAll('.cf-item').forEach((li, i) => {
        li.setAttribute('data-pos', getPos(i));
      });

      // Sync dots — keep active dot centered if dots overflow
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.cf-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
        const activeDot = dots[activeIdx];
        if (activeDot) {
          const dw = dotsWrap.clientWidth;
          const offset = activeDot.offsetLeft - dw / 2 + activeDot.clientWidth / 2;
          dotsWrap.scrollLeft = offset;
        }
      }

      // Update --cf-glow
      if (opts.type === 'pub' && typeof VENUE_BADGES !== 'undefined') {
        const pub   = items[activeIdx];
        const color = (VENUE_BADGES[pub.venue_badge] || {}).color || '#3b82f6';
        document.documentElement.style.setProperty('--cf-glow', hexToRgba(color, 0.15));
      }

      // Close abstract panel on card change
      if (absOpen) closeAbstractPanel();
    }

    function openAbstractPanel(item) {
      if (!absPanel || !absContent) return;
      absContent.innerHTML = `
        <div class="cf-abs-venue">${item.venue || ''}</div>
        <div class="cf-abs-title">${item.title}</div>
        <div class="cf-abs-authors">${item.authors || ''}</div>
        <div class="cf-abs-body">${(item.abstract || '').replace(/\n/g, '<br>')}</div>
      `;
      absPanel.classList.add('open');
      absOpen = true;
    }

    function closeAbstractPanel() {
      if (!absPanel) return;
      absPanel.classList.remove('open');
      absOpen = false;
      // Reset all abs buttons
      list.querySelectorAll('.abs-btn').forEach(btn => btn.textContent = 'Abstract');
    }

    function navigate(dir) {
      activeIdx = ((activeIdx + dir) % items.length + items.length) % items.length;
      updatePositions();
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => {
        if (!isHovered) navigate(1);
      }, 4500);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // ── Build card HTML ───────────────────────────────────────────
    function buildPubCard(item) {
      return `
        <div class="cf-card" data-id="${item.id}">
          <div class="cf-card-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="cf-card-body">
            <div class="cf-card-badges">
              ${buildVenueBadges(item.venue_badge, item.extra_badges)}
            </div>
            <div class="cf-card-area-tags">
              ${buildAreaTags(item.areas)}
            </div>
            <div class="cf-card-title">${item.title}</div>
            <div class="cf-card-authors">${item.authors}</div>
            <div class="cf-card-links">
              <button class="btn btn-sm abs-btn" type="button" onclick="event.stopPropagation();">Abstract</button>
              ${buildLinks(item.links)}
            </div>
          </div>
        </div>
      `;
    }

    function buildProjCard(item) {
      return `
        <div class="cf-card" data-id="${item.id}">
          <div class="cf-card-image project-card-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="cf-card-body">
            <div class="cf-card-title">${item.title}</div>
            <div class="cf-card-links">${buildLinks(item.links)}</div>
          </div>
        </div>
      `;
    }

    // ── (Re)build DOM ─────────────────────────────────────────────
    function build(newItems) {
      items     = newItems.slice();
      activeIdx = Math.max(0, Math.min(activeIdx, items.length - 1));
      closeAbstractPanel();

      list.innerHTML = '';
      if (dotsWrap) dotsWrap.innerHTML = '';

      items.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'cf-item';
        li.innerHTML = opts.type === 'pub' ? buildPubCard(item) : buildProjCard(item);

        li.addEventListener('click', (e) => {
          const pos = li.getAttribute('data-pos');
          if (pos === 'prev' || pos === 'prev-2') {
            navigate(-1); stopAuto(); startAuto(); return;
          }
          if (pos === 'next' || pos === 'next-2') {
            navigate(1);  stopAuto(); startAuto(); return;
          }
          if (pos === 'active') {
            if (e.target.closest('.btn')) return;
            if (opts.type === 'pub'  && typeof openPubModal     === 'function') openPubModal(item);
            if (opts.type === 'proj' && typeof openProjectModal === 'function') openProjectModal(item);
          }
        });

        // Abstract button
        const absBtn = li.querySelector('.abs-btn');
        if (absBtn) {
          absBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (absOpen && items[activeIdx].id === item.id) {
              closeAbstractPanel();
              absBtn.textContent = 'Abstract';
            } else {
              closeAbstractPanel();
              list.querySelectorAll('.abs-btn').forEach(b => b.textContent = 'Abstract');
              openAbstractPanel(item);
              absBtn.textContent = 'Close';
            }
          });
        }

        list.appendChild(li);

        if (dotsWrap) {
          const dot = document.createElement('span');
          dot.className = 'cf-dot';
          dot.addEventListener('click', () => {
            activeIdx = i;
            updatePositions();
            stopAuto(); startAuto();
          });
          dotsWrap.appendChild(dot);
        }
      });

      updatePositions();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { navigate(-1); stopAuto(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { navigate(1);  stopAuto(); startAuto(); });

    const wrap = list.closest('.carousel-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', () => { isHovered = true; });
      wrap.addEventListener('mouseleave', () => { isHovered = false; });
    }

    return { build, navigate, startAuto, stopAuto };
  }

  // ── Bookshelf ─────────────────────────────────────────────────────
  let pubCf  = null;
  let projCf = null;
  let currentFilter = 'all';

  function filteredPubs(filter) {
    if (filter === 'all') return PUBLICATIONS.filter(p => p.venue_badge !== 'Preprint' || p.id === 'pmoa-tts');
    if (filter === 'all-incl-preprint') return PUBLICATIONS;
    return PUBLICATIONS.filter(p => p.areas && p.areas.includes(filter));
  }

  // Bookshelf shows all (excluding "Agentic-only" working papers from carousel)
  function bookshelfPubs(filter) {
    if (filter === 'all') return PUBLICATIONS.filter(p => !p.areas || !p.areas.every(a => a === 'Agentic'));
    return PUBLICATIONS.filter(p => p.areas && p.areas.includes(filter) && !p.areas.every(a => a === 'Agentic'));
  }

  function initBookshelf() {
    const books = document.querySelectorAll('#research-bookshelf .book');
    books.forEach(book => {
      book.addEventListener('click', () => {
        books.forEach(b => b.classList.remove('active'));
        book.classList.add('active');
        currentFilter = book.dataset.filter;
        if (pubCf) pubCf.build(bookshelfPubs(currentFilter));
      });
    });
  }

  // ── Counts ────────────────────────────────────────────────────────
  function updateCounts() {
    const counts = {
      all: 0,
      'Deep Sequence Modeling': 0,
      'Healthcare AI': 0,
      'Causal Inference / Survival Analysis': 0,
      'Neuro/Biomedical AI': 0,
      'Representation Learning': 0,
      'Multimodal Machine Learning': 0,
    };
    PUBLICATIONS.forEach(p => {
      if (p.areas && p.areas.every(a => a === 'Agentic')) return; // skip agentic-only
      counts.all++;
      (p.areas || []).forEach(a => { if (a in counts) counts[a]++; });
    });
    const map = {
      all:                                       'count-all',
      'Deep Sequence Modeling':                  'count-seq',
      'Healthcare AI':                           'count-health',
      'Causal Inference / Survival Analysis':    'count-causal',
      'Neuro/Biomedical AI':                     'count-neuro',
      'Representation Learning':                 'count-repr',
      'Multimodal Machine Learning':             'count-multi',
    };
    Object.entries(map).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = counts[key] || 0;
    });
  }

  // ── View All ─────────────────────────────────────────────────────
  function initViewAll() {
    const pubBtn = document.getElementById('pub-view-all');
    if (pubBtn) {
      pubBtn.addEventListener('click', () => {
        const filtered = bookshelfPubs(currentFilter);
        if (typeof openExpandOverlay === 'function') openExpandOverlay(filtered, 'Recent Research &amp; Publications', 'pub');
      });
    }
    const projBtn = document.getElementById('proj-view-all');
    if (projBtn) {
      projBtn.addEventListener('click', () => {
        if (typeof openExpandOverlay === 'function') openExpandOverlay(PROJECTS, 'Past Research &amp; Project Experiences', 'proj');
      });
    }
  }

  // ── Keyboard ──────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { if (pubCf)  pubCf.navigate(-1); }
    if (e.key === 'ArrowRight') { if (pubCf)  pubCf.navigate(1);  }
  });

  // ── Init ──────────────────────────────────────────────────────────
  function init() {
    if (typeof PUBLICATIONS === 'undefined' || typeof PROJECTS === 'undefined') {
      console.warn('carousel.js: data.js not loaded');
      return;
    }

    updateCounts();

    pubCf = createCoverflow({
      listId:      'pub-cf',
      prevId:      'pub-prev',
      nextId:      'pub-next',
      dotsId:      'pub-dots',
      absPanelId:  'pub-abstract-panel',
      absContentId:'pub-abstract-content',
      items:       PUBLICATIONS.filter(p => !p.areas || !p.areas.every(a => a === 'Agentic')),
      type:        'pub',
    });
    if (pubCf) { pubCf.build(PUBLICATIONS.filter(p => !p.areas || !p.areas.every(a => a === 'Agentic'))); pubCf.startAuto(); }

    projCf = createCoverflow({
      listId:      'proj-cf',
      prevId:      'proj-prev',
      nextId:      'proj-next',
      dotsId:      'proj-dots',
      absPanelId:  null,
      absContentId:null,
      items:       PROJECTS,
      type:        'proj',
    });
    if (projCf) { projCf.build(PROJECTS); projCf.startAuto(); }

    initBookshelf();
    initViewAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
