import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// All shapes and animations are authored here; no imported game assets or textures.
function rounded(parent, size, position, color, radius = .08) {
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map(n => n / 2))),
    new THREE.MeshStandardMaterial({ color, roughness: .75 }),
  );
  mesh.position.set(...position); parent.add(mesh); return mesh;
}
function ellipsoid(parent, size, position, color, shiny = false) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16),
    new THREE.MeshStandardMaterial({ color, roughness: shiny ? .16 : .7 }));
  mesh.scale.set(...size); mesh.position.set(...position); parent.add(mesh); return mesh;
}

export function createOriginalRoom() {
  const room = new THREE.Group();
  const cream = 0xf2dfb8, teal = 0x638f89, coral = 0xc88770, dark = 0x335957;
  rounded(room, [6.3,.35,6.3], [0,-.23,0], dark, .17);
  rounded(room, [6.05,.14,6.05], [0,-.045,0], cream);
  // Ceramic tiles and an open dollhouse silhouette, distinct from the source-game interior.
  for(let x=0;x<8;x++) for(let z=0;z<8;z++)
    rounded(room,[.735,.035,.735],[-2.625+x*.75,.035,-2.625+z*.75],(x+z)%2?0xe6c89f:0xedd5b2,.035);
  rounded(room,[6.2,2.65,.24],[0,1.27,-3],teal,.12);
  rounded(room,[.24,2.65,6.15],[-3,1.27,0],teal,.12);
  rounded(room,[6.2,.12,.32],[0,2.62,-3],cream,.05);
  rounded(room,[.32,.12,6.15],[-3,2.62,0],cream,.05);
  rounded(room,[5.9,.16,.15],[0,.16,-2.83],dark,.04);
  rounded(room,[.15,.16,5.9],[-2.83,.16,0],dark,.04);
  // Circular observatory window, moon and stars.
  const sky = new THREE.Mesh(new THREE.CircleGeometry(.76,48),new THREE.MeshBasicMaterial({color:0x294e68}));
  sky.position.set(.05,1.62,-2.865); room.add(sky);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.78,.09,12,48),new THREE.MeshStandardMaterial({color:cream}));
  rim.position.copy(sky.position); rim.position.z+=.025; room.add(rim);
  ellipsoid(room,[.19,.19,.035],[.28,1.85,-2.81],0xffd990);
  for(const [x,y] of [[-.32,1.82],[.1,1.32],[-.22,1.4],[.47,1.53]])
    ellipsoid(room,[.025,.025,.025],[x,y,-2.81],0xf4e7cb);
  // Reading shelf.
  rounded(room,[.85,1.7,.65],[-2,.87,-1.8],dark,.13);
  for(let row=0;row<3;row++) {
    rounded(room,[.78,.07,.68],[-2,.32+row*.49,-1.78],cream,.03);
    for(let i=0;i<4;i++) rounded(room,[.13,.29+(i%2)*.09,.27],[-2.25+i*.17,.51+row*.49,-1.43],[coral,0xc4b1ce,0xd5c68d,0x99bba9][i],.025);
  }
  // Floating-edge desk with a small pastel computer.
  rounded(room,[1.5,.16,.9],[1.65,.87,-1.85],coral,.08);
  for(const x of [1.1,2.2]) rounded(room,[.18,.8,.55],[x,.42,-1.85],cream);
  rounded(room,[.64,.45,.12],[1.65,1.2,-2],cream);
  rounded(room,[.51,.32,.025],[1.65,1.21,-1.923],0x325958,.02);
  rounded(room,[.5,.035,.2],[1.65,.98,-1.6],0xded1bf,.02);
  for(let i=0;i<3;i++) rounded(room,[.15+i*.05,.025,.012],[1.61,1.3-i*.08,-1.905],0xbcdca1,.005);
  // Rounded project case with two straps, rather than a game-style treasure chest.
  rounded(room,[1,.64,.7],[1.85,.36,1.3],0xb0a1c5,.15);
  for(const x of [1.55,2.15]) rounded(room,[.08,.66,.72],[x,.37,1.3],cream,.035);
  rounded(room,[.28,.07,.16],[1.85,.72,1.3],dark,.025);
  rounded(room,[.2,.15,.035],[1.85,.39,1.665],cream,.025);
  // Welcome letter on a small sculpted pedestal.
  rounded(room,[.48,.7,.45],[-1.85,.35,1.3],teal,.15);
  rounded(room,[.7,.12,.6],[-1.85,.75,1.3],coral);
  rounded(room,[.43,.035,.31],[-1.85,.83,1.3],0xffedc9,.02);
  ellipsoid(room,[.045,.015,.045],[-1.85,.855,1.3],0xbf7369);
  // Welcome mat at the open entrance.
  rounded(room,[1.25,.035,.65],[0,.06,2.32],coral,.015);
  for(let i=0;i<3;i++) rounded(room,[.6-i*.12,.008,.035],[0,.085,2.15+i*.15],cream,.003);
  return room;
}

export function createAlien() {
  const root=new THREE.Group(), body=new THREE.Group(); root.add(body);
  const skin=0xa9d9ba, suit=0xb6a7ce;
  ellipsoid(body,[.29,.38,.23],[0,.58,0],suit);
  rounded(body,[.22,.15,.065],[0,.63,.225],0xf0deb6,.045);
  ellipsoid(body,[.045,.045,.025],[0,.64,.266],0xd58f82);
  const head=ellipsoid(body,[.43,.36,.32],[0,1.05,.035],skin);
  const eyes=[];
  for(const side of [-1,1]) {
    ellipsoid(body,[.19,.095,.11],[side*.43,1.05,0],skin);
    const eye=ellipsoid(body,[.105,.145,.065],[side*.17,1.075,.32],0x233d3d,true);
    eye.rotation.z=side*-.12; eyes.push(eye);
    ellipsoid(body,[.032,.043,.015],[side*.17-.026,1.12,.379],0xffffff);
    ellipsoid(body,[.073,.036,.019],[side*.255,.97,.294],0xe9aaa0);
    const stem=rounded(body,[.035,.23,.035],[side*.2,1.43,.01],skin,.017);stem.rotation.z=-side*.25;
    ellipsoid(body,[.075,.075,.075],[side*.23,1.55,.01],0xe4b195);
  }
  const smile=new THREE.Mesh(new THREE.TorusGeometry(.069,.011,8,20,Math.PI),new THREE.MeshStandardMaterial({color:0x486758}));
  smile.position.set(0,.982,.347);smile.rotation.z=Math.PI;body.add(smile);
  const arms=[],legs=[];
  for(const side of [-1,1]) {
    const arm=new THREE.Group();arm.position.set(side*.3,.75,0);body.add(arm);
    ellipsoid(arm,[.085,.2,.085],[side*.025,-.16,0],skin);arms.push(arm);
    const leg=new THREE.Group();leg.position.set(side*.14,.3,0);root.add(leg);
    ellipsoid(leg,[.1,.17,.1],[0,-.09,0],suit);
    ellipsoid(leg,[.12,.075,.17],[0,-.22,.055],0xf0deb6);legs.push(leg);
  }
  let phase=0;
  return {root,update(delta,moving,reducedMotion=false){
    phase+=delta*(moving?11:2);
    body.position.y=moving?Math.abs(Math.sin(phase))*.035:(reducedMotion?0:Math.sin(phase)*.012);
    head.rotation.z=moving?Math.sin(phase)*.025:0;
    arms.forEach((arm,i)=>{arm.rotation.x=moving?Math.sin(phase+i*Math.PI)*.4:0;});
    legs.forEach((leg,i)=>{leg.rotation.x=moving?Math.sin(phase+i*Math.PI)*.5:0;});
    const blink=!reducedMotion && phase%13>12.75;
    eyes.forEach(eye=>{eye.scale.y=blink?.025:.145;});
  }};
}
