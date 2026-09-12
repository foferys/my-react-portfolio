export const bounds = { minX: -2.65, maxX: 2.65, minZ: -2.55, maxZ: 4.2 };
export const obstacles = [
  { x: -2, z: -1.8, width: .85, depth: 1.2 },
  { x: 1.65, z: -1.85, width: 1.5, depth: .9 },
  { x: 1.85, z: 1.3, width: 1, depth: .7 },
  { x: -1.85, z: 1.3, width: .7, depth: .6 },
];
export function canStand(x, z) {
  const radius = .22;
  return x >= bounds.minX && x <= bounds.maxX && z >= bounds.minZ && z <= bounds.maxZ &&
    (z <= 2.5 || Math.abs(x) <= .52) &&
    !obstacles.some(o => Math.abs(x - o.x) < o.width / 2 + radius && Math.abs(z - o.z) < o.depth / 2 + radius);
}

export function hasReachedExit(position) {
  return position.z >= 3.92 && Math.abs(position.x) <= .52;
}
export function stepPosition(position, dx, dz, seconds, speed = 2.4) {
  const length = Math.hypot(dx, dz);
  if (!length) return { ...position };
  const distance = Math.min(seconds, .05) * speed;
  const next = { ...position };
  const x = next.x + dx / length * distance;
  if (canStand(x, next.z)) next.x = x;
  const z = next.z + dz / length * distance;
  if (canStand(next.x, z)) next.z = z;
  return next;
}
export function nearestChapter(position, chapters) {
  return chapters.map(chapter => ({ chapter, distance: Math.hypot(chapter.x - position.x, chapter.z - position.z) }))
    .filter(item => item.distance < 1.5).sort((a, b) => a.distance - b.distance)[0]?.chapter ?? null;
}
