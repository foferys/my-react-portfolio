import * as THREE from 'three';
import { createOriginalRoom, createAlien } from './originalModels';
import { chapters } from './content';
import { stepPosition, nearestChapter } from './movement';

export function createScene(host, callbacks) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Casa originale esplorabile con un piccolo alieno. Usa le frecce o WASD per muoverti ed E per interagire.');
  renderer.domElement.setAttribute('role', 'img');
  const camera = new THREE.OrthographicCamera(-6, 6, 6, -6, .1, 100);
  camera.position.set(3.5, 11.5, 15);
  camera.lookAt(0, .5, -.9);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9a8660, 2.4));
  const sun = new THREE.DirectionalLight(0xffe1a1, 1.7); sun.position.set(-3, 8, 5); scene.add(sun);
  let ready = true, paused = false, nearest = null;
  let position = { x: 0, z: 1.5 }, last = performance.now(), keyboard = new Set(), touch = new Set();
  scene.add(createOriginalRoom());
  const alien = createAlien();
  const character = alien.root;
  scene.add(character);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const markers = chapters.map(chapter => {
    const marker = new THREE.Mesh(new THREE.OctahedronGeometry(.12), new THREE.MeshBasicMaterial({ color: 0xf4d58a }));
    marker.position.set(chapter.x, chapter.id==='skills'?2.2:1.35, chapter.z);
    scene.add(marker); return marker;
  });
  function disposeModel(root) {
    root.traverse(object => {
      object.geometry?.dispose();
      const mats = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : [];
      for(const material of mats) { for(const value of Object.values(material)) if(value?.isTexture) value.dispose(); material.dispose(); }
    });
  }
  callbacks.onReady();
  function resize() {
    const width=host.clientWidth, height=host.clientHeight, aspect=width/Math.max(height,1);
    const halfHeight=Math.max(5.2,4.4/aspect);
    camera.left=-halfHeight*aspect; camera.right=halfHeight*aspect; camera.top=halfHeight; camera.bottom=-halfHeight; camera.updateProjectionMatrix();
    renderer.setSize(width,height);
  }
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const movementKeys=['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'];
  function keydown(event) {
    if(paused || !host.contains(document.activeElement)) return;
    const key=event.key.toLowerCase();
    if(movementKeys.includes(key)) { event.preventDefault(); keyboard.add(key); }
    if(key==='e' && !event.repeat && nearest) { event.preventDefault(); callbacks.onOpen(nearest.id); }
  }
  function keyup(event) { keyboard.delete(event.key.toLowerCase()); }
  function clear() { keyboard.clear(); touch.clear(); }
  function visibility() { clear(); last=performance.now(); }
  window.addEventListener('keydown',keydown); window.addEventListener('keyup',keyup); window.addEventListener('blur',clear);
  document.addEventListener('visibilitychange',visibility);
  function lost(event) { event.preventDefault(); ready=false; callbacks.onError('La grafica è stata interrotta. Ricarica la pagina o leggi il curriculum.'); }
  renderer.domElement.addEventListener('webglcontextlost',lost);
  renderer.setAnimationLoop(now => {
    const delta=Math.min((now-last)/1000,.05); last=now;
    if(document.hidden) return;
    if(ready) {
      const held=(...keys)=>keys.some(k=>keyboard.has(k)||touch.has(k));
      const dx=paused?0:Number(held('d','arrowright'))-Number(held('a','arrowleft'));
      const dz=paused?0:Number(held('s','arrowdown'))-Number(held('w','arrowup'));
      const next=stepPosition(position,dx,dz,delta);
      const moving=Math.hypot(next.x-position.x,next.z-position.z)>.0001;
      if(moving) character.rotation.y=Math.atan2(next.x-position.x,next.z-position.z);
      position=next; character.position.set(position.x,0,position.z);
      if(!paused) alien.update(delta, moving, reducedMotion.matches);
      const found=nearestChapter(position,chapters);
      if(found?.id!==nearest?.id) { nearest=found; callbacks.onNear(found?.id ?? null); }
      host.dataset.position=`${position.x.toFixed(2)},${position.z.toFixed(2)}`;
      host.dataset.animation=moving?'walk':'wait';
    }
    markers.forEach((marker,i)=>{if(!paused && !reducedMotion.matches) marker.rotation.y=now*.001;marker.scale.setScalar(nearest?.id===chapters[i].id?1.5:1);});
    renderer.render(scene,camera);
  });
  return {
    setPaused(value) { paused=value; clear(); },
    setDirection(key,down) { if(down) touch.add(key); else touch.delete(key); },
    dispose() {
      renderer.setAnimationLoop(null); observer.disconnect(); clear();
      window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);window.removeEventListener('blur',clear);
      document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);
      disposeModel(scene); renderer.dispose(); renderer.domElement.remove();
    },
  };
}

