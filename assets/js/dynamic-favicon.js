(() => {
  'use strict';

  const BASE_PATH = 'assets/img/icons/';
  const SEQUENCE = Object.freeze([
    Object.freeze({ state: 'idle', durationMs: 4200 }),
    Object.freeze({ state: 'glow', durationMs: 900 }),
    Object.freeze({ state: 'beat', durationMs: 650 }),
    Object.freeze({ state: 'glitch', durationMs: 450 }),
    Object.freeze({ state: 'logo', durationMs: 2600 })
  ]);

  const STATES = Object.freeze(SEQUENCE.map((step) => step.state));

  function nextState(state) {
    const index = STATES.indexOf(state);
    return STATES[(index + 1 + STATES.length) % STATES.length];
  }

  function escapeXml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }

  function buildSvg(state) {
    if (state === 'logo') {
      return { state, href: `${BASE_PATH}favicon.svg` };
    }

    const accent = state === 'beat' ? '#ff3344' : '#ef1024';
    const glow = state === 'glow' || state === 'beat';
    const glitch = state === 'glitch';
    const pulse = state === 'beat' ? 'pulse 0.45s ease-in-out infinite alternate' : 'none';
    const noise = glitch
      ? '<path d="M10 22H118M4 31H124M14 40H112M3 82H125M12 91H118M6 100H122" stroke="#fff" stroke-width="2" opacity=".35"/>'
      : '';
    const glowFilter = glow
      ? '<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      : '';

    const label = glitch ? 'U' : 'N';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#050505"/>
      ${glowFilter}
      <rect x="8" y="8" width="112" height="112" rx="22" fill="none" stroke="${accent}" stroke-width="4" ${glow ? 'filter="url(#g)"' : ''}/>
      <path d="M28 88V40h12l28 31V40h16v48H72L44 57v31z" fill="#fff" style="animation:${pulse}"/>
      <path d="M64 18l8 15-8 15-8-15z" fill="${accent}" opacity=".95"/>
      <circle cx="98" cy="30" r="12" fill="#111" stroke="${accent}" stroke-width="2"/>
      <text x="98" y="35" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="15" font-weight="700" fill="${accent}">${escapeXml(label)}</text>
      ${noise}
    </svg>`;

    return {
      state,
      href: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
    };
  }

  function getSequence() {
    return SEQUENCE.map((step) => ({ ...step }));
  }

  function ensureLink() {
    let link = document.querySelector('link[data-uptempo-dynamic-favicon]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.dataset.uptempoDynamicFavicon = 'true';
      document.head.appendChild(link);
    }
    return link;
  }

  function start(options = {}) {
    if (typeof document === 'undefined') return () => {};

    const intervalOverride = Number.isFinite(options.intervalMs) && options.intervalMs > 0
      ? options.intervalMs
      : null;
    let current = options.initialState && STATES.includes(options.initialState)
      ? options.initialState
      : 'idle';
    let timer = null;
    const link = ensureLink();

    const apply = () => {
      const icon = buildSvg(current);
      link.href = icon.href;
      link.dataset.state = icon.state;
    };

    const schedule = () => {
      const duration = intervalOverride || SEQUENCE.find((step) => step.state === current).durationMs;
      timer = window.setTimeout(() => {
        current = nextState(current);
        apply();
        schedule();
      }, duration);
    };

    apply();
    schedule();

    return () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };
  }

  const api = Object.freeze({ buildSvg, getSequence, nextState, start });
  if (typeof window !== 'undefined') {
    window.UptempoFavicon = api;
    window.addEventListener('DOMContentLoaded', () => {
      if (document.documentElement.dataset.disableDynamicFavicon !== 'true') {
        window.__uptempoFaviconStop = start();
      }
    }, { once: true });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();
