import { chapters } from './content';
import { stepPosition, nearestChapter } from './movement';
import { paintWorld } from './pixelWorld';

export function createScene(host, callbacks) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Canvas unavailable');
  host.appendChild(canvas);
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Un alieno esplora un avamposto pixel art nella palude.');
  let position = { x: 0, z: 1.5 }, nearest = null, paused = false;
  let last = performance.now(), time = 0, frame, facing = 1;
  const keyboard = new Set(), touch = new Set();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function resize() {
    canvas.width = 440;
    canvas.height = 310;
    context.imageSmoothingEnabled = false;
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host); resize();
  const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
  function clear() { keyboard.clear(); touch.clear(); }
  function keydown(event) {
    if (paused || !host.contains(document.activeElement)) return;
    const key = event.key.toLowerCase();
    if (movementKeys.includes(key)) { event.preventDefault(); keyboard.add(key); }
    if (key === 'e' && !event.repeat && nearest) { event.preventDefault(); callbacks.onOpen(nearest.id); }
  }
  function keyup(event) { keyboard.delete(event.key.toLowerCase()); }
  function visibility() { clear(); last = performance.now(); }
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
  window.addEventListener('blur', clear);
  document.addEventListener('visibilitychange', visibility);
  function animate(now) {
    const delta = Math.min((now - last) / 1000, .05); last = now;
    if (!document.hidden) {
      const held = (...keys) => keys.some(key => keyboard.has(key) || touch.has(key));
      const dx = paused ? 0 : Number(held('d', 'arrowright')) - Number(held('a', 'arrowleft'));
      const dz = paused ? 0 : Number(held('s', 'arrowdown')) - Number(held('w', 'arrowup'));
      const next = stepPosition(position, dx, dz, delta);
      const moving = Math.hypot(next.x - position.x, next.z - position.z) > .0001;
      if (dx) facing = Math.sign(dx);
      position = next;
      if (!paused && !reduced.matches) time += delta;
      const found = nearestChapter(position, chapters);
      if (found?.id !== nearest?.id) { nearest = found; callbacks.onNear(found?.id ?? null); }
      host.dataset.position = `${position.x.toFixed(2)},${position.z.toFixed(2)}`;
      host.dataset.animation = moving ? 'walk' : 'wait';
      paintWorld(context, canvas.width, canvas.height, { position, nearest, time, moving, facing });
    }
    frame = requestAnimationFrame(animate);
  }
  callbacks.onReady(); frame = requestAnimationFrame(animate);
  return {
    setPaused(value) { paused = value; clear(); },
    setDirection(key, down) { if (down) touch.add(key); else touch.delete(key); },
    dispose() {
      cancelAnimationFrame(frame); observer.disconnect(); clear();
      window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', visibility);
      canvas.remove();
    },
  };
}
