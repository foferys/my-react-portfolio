import { chapters } from './content';
import { stepPosition, nearestChapter, hasReachedExit } from './movement';
import { paintWorld } from './pixelWorld';

export function createScene(host, callbacks) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Canvas unavailable');
  host.appendChild(canvas);
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Un alieno esplora un avamposto pixel art nella palude.');
  let position = { x: 0, z: 1.5 }, nearest = null, paused = false, exiting = false;
  let last = performance.now(), time = 0, frame, facing = 1;
  let height = 0, velocity = 0, landing = 0, gait = 0, interaction = null;
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
  function jump() {
    if (!paused && !exiting && !interaction && height === 0 && landing === 0) velocity = 100;
  }
  function interact() {
    if (paused || exiting || interaction || height > 0 || velocity || !nearest) return;
    facing = Math.sign(nearest.x - position.x) || facing;
    interaction = { id: nearest.id, progress: 0 };
    clear();
  }
  function keydown(event) {
    if (paused || !host.contains(document.activeElement)) return;
    const key = event.key.toLowerCase();
    if (movementKeys.includes(key) || key === 'shift') { event.preventDefault(); keyboard.add(key); }
    if (key === ' ' && !event.repeat) { event.preventDefault(); jump(); }
    if (key === 'e' && !event.repeat) { event.preventDefault(); interact(); }
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
      const locked = paused || exiting || Boolean(interaction);
      const dx = locked ? 0 : Number(held('d', 'arrowright')) - Number(held('a', 'arrowleft'));
      const dz = locked ? 0 : Number(held('s', 'arrowdown')) - Number(held('w', 'arrowup'));
      const running = held('shift');
      const next = stepPosition(position, dx, dz, delta, running ? 3.6 : 1.8);
      const distance = Math.hypot(next.x - position.x, next.z - position.z);
      const moving = distance > .0001;
      if (!paused) {
        gait = moving ? gait + distance * (running ? 3 : 4) : 0;
        landing = Math.max(0, landing - delta);
        if (height > 0 || velocity > 0) {
          height = Math.max(0, height + velocity * delta - 140 * delta * delta);
          velocity -= 280 * delta;
          if (height === 0) { velocity = 0; landing = .18; }
        }
        if (interaction) {
          interaction.progress += delta / (reduced.matches ? .15 : .75);
          if (interaction.progress >= 1) {
            const id = interaction.id;
            interaction = null; paused = true; callbacks.onOpen(id);
          }
        }
      }
      if (dx) facing = Math.sign(dx);
      position = next;
      if (!exiting && height === 0 && !velocity && hasReachedExit(position)) {
        exiting = true;
        paused = true;
        clear();
        callbacks.onExit();
      }
      if (!paused && !reduced.matches) time += delta;
      const found = nearestChapter(position, chapters);
      if (found?.id !== nearest?.id) { nearest = found; callbacks.onNear(found?.id ?? null); }
      host.dataset.position = `${position.x.toFixed(2)},${position.z.toFixed(2)}`;
      const animation = interaction ? 'interact' : height > 0 ? (velocity > 0 ? 'jump' : 'fall') : landing > 0 ? 'land' : moving ? (running ? 'run' : 'walk') : 'idle';
      host.dataset.animation = animation;
      host.dataset.height = height.toFixed(2);
      paintWorld(context, canvas.width, canvas.height, { position, nearest, time, moving, facing, animation, height, gait, interaction, reduced: reduced.matches });
    }
    frame = requestAnimationFrame(animate);
  }
  callbacks.onReady(); frame = requestAnimationFrame(animate);
  return {
    jump, interact,
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
