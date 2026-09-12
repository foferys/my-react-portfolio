import { chapters } from './content';
import { backpack } from './movement';

const C = { water:'#638a80', ripple:'#80a295', deep:'#476c66', earth:'#554349', edge:'#302e32', rock:'#39383b', light:'#575052', moss:'#81844b', grass:'#b2ad53', wood:'#9b673d', gold:'#e8c47e', green:'#a8d967' };
const alien = [
  '      ooooo       ',
  '    oogggggoo     ',
  '   oggllllgggo    ',
  '  oglllllllgggo   ',
  '  oglllllllgggo   ',
  '  oglllkkllkkgo   ',
  '   ggllkwklkwgo   ',
  '   ogglkkllkkgo   ',
  '    ogggllgggo    ',
  '     ooggggoo     ',
  '      ppppp      ',
  '    kkhhhhk      ',
  '   kkhhsshhkk    ',
  '   khhhsshhhk    ',
  '   kghhsshhgk    ',
  '   ogkkcckkgo    ',
  '    okkkkkko     ',
  '     kk kkk      ',
  '     kk  kk      ',
  '    ogg  gggo    ',
  '    ooo  oooo    ',
];
const colors = { o:'#324b39', g:'#77a846', l:'#abd969', k:'#26262e', w:'#eeeacb', p:'#654461', h:'#526362', s:'#8b9990', c:'#69c9bc' };
const walkFrames = [
  { bodyY:0, bodyX:0, headX:0, leftLeg:0, rightLeg:0, leftArm:0, rightArm:0 },
  { bodyY:-1, bodyX:0, headX:0, leftLeg:-1, rightLeg:1, leftArm:1, rightArm:-1 },
  { bodyY:-2, bodyX:1, headX:1, leftLeg:-2, rightLeg:2, leftArm:2, rightArm:-2 },
  { bodyY:-1, bodyX:1, headX:1, leftLeg:-1, rightLeg:1, leftArm:1, rightArm:-1 },
  { bodyY:0, bodyX:0, headX:0, leftLeg:0, rightLeg:0, leftArm:0, rightArm:0 },
  { bodyY:1, bodyX:-1, headX:-1, leftLeg:2, rightLeg:-2, leftArm:-2, rightArm:2 },
  { bodyY:0, bodyX:-1, headX:-1, leftLeg:2, rightLeg:-2, leftArm:-2, rightArm:2 },
  { bodyY:-1, bodyX:-1, headX:-1, leftLeg:1, rightLeg:-1, leftArm:-1, rightArm:1 },
];

function drawAlien(rect, x, y, state) {
  let frame = state.moving ? {...walkFrames[Math.floor(state.gait * 8) % walkFrames.length]} : null;
  if (frame && state.animation === 'walk') frame.bodyY = Math.trunc(frame.bodyY / 2);
  if (frame && state.animation === 'run') { frame.headX += 1; frame.bodyX += 1; }
  if (state.animation === 'jump') frame = {bodyY:-1,headX:1,leftLeg:-2,rightLeg:1,leftArm:-2,rightArm:2};
  if (state.animation === 'fall') frame = {bodyY:0,headX:0,leftLeg:-1,rightLeg:1,leftArm:-3,rightArm:3};
  if (state.animation === 'land') frame = {bodyY:2,headX:0,leftLeg:-1,rightLeg:1,leftArm:1,rightArm:-1};
  if (state.interaction) frame = {bodyY:0,headX:1,bodyX:1,rightArm:3,leftArm:0};
  if (state.interaction?.id === backpack.id) frame = {bodyY:3,headX:0,bodyX:0,leftLeg:-3,rightLeg:3,leftArm:2,rightArm:2};
  if (state.reduced) frame = null;
  const idleBob = state.animation === 'idle' && !state.reduced ? Math.round(Math.sin(state.time * 2) * .6) : 0;
  y -= Math.round(state.height || 0);
  alien.forEach((row, rowIndex) => [...row].forEach((pixel, columnIndex) => {
    if (!colors[pixel]) return;
    const leftSide = columnIndex < 8;
    const isHead = rowIndex < 11;
    const isLeg = rowIndex > 16;
    const isArm = rowIndex > 10 && rowIndex < 17 && (columnIndex < 5 || columnIndex > 10);
    const stride = isLeg ? (leftSide ? frame?.leftLeg : frame?.rightLeg) ?? 0 : 0;
    const arm = isArm ? (leftSide ? frame?.leftArm : frame?.rightArm) ?? 0 : 0;
    const torsoShift = !isHead && !isLeg ? frame?.bodyX ?? 0 : 0;
    const headShift = isHead ? frame?.headX ?? 0 : 0;
    const footStride = rowIndex > 18 ? stride : Math.trunc(stride / 2);
    const pixelX = x + (columnIndex - 8 + headShift + torsoShift + footStride + arm) * state.facing;
    const pixelY = y - 22 + rowIndex + idleBob + (frame?.bodyY ?? 0) + (isLeg ? Math.abs(stride) > 1 && rowIndex > 18 ? 1 : 0 : 0);
    rect(pixelX, pixelY, 1, 1, colors[pixel]);
  }));
}

export function paintWorld(ctx, width, height, state) {
  const rect = (x,y,w,h,c) => { ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h); };
  const poly = (points,c) => { ctx.fillStyle=c;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill(); };
  rect(0,0,width,height,C.water);
  ctx.save();
  // Rendering and collision share the same world coordinates.
  const scale = Math.min(width / 440, height / 310);
  ctx.translate(Math.round(width/2),Math.round(height/2 + 7));
  ctx.scale(scale,scale);
  const point = (x,z) => [Math.round(x*43),Math.round(z*30)];
  for(let i=0;i<115;i++) {
    const x=(i*137%490)-245, y=(i*79%350)-175;
    rect(x,y,4+i%11,1,i%3?C.deep:C.ripple);
    if(i%4===0) { rect(x+2,y-2,7,2,C.moss);rect(x+4,y-3,3,1,C.grass); }
  }
  function rock(x,y,s=1) {
    ctx.save();ctx.translate(x,y);ctx.scale(s,s);
    poly([[-16,1],[-12,-12],[-3,-18],[9,-16],[17,-6],[17,6],[6,11],[-10,8]],C.edge);
    poly([[-14,-3],[-10,-12],[-3,-18],[9,-16],[15,-6],[2,-2]],C.light);
    poly([[-14,-3],[2,-2],[2,8],[-10,6]],C.rock);
    rect(-10,-10,6,2,'#67605b');rect(-14,3,5,3,C.moss);rect(7,7,7,2,C.moss);
    ctx.restore();
  }
  function reeds(x,y,i) {
    rect(x,y,2,12,C.moss);rect(x-3,y-5,2,8,C.grass);rect(x-5,y-8,2,5,C.grass);
    rect(x+4,y-3,2,13,C.grass);rect(x+6,y-7,2,5,C.grass);
    if(i%2)rect(x+6,y-10,3,4,C.wood);
  }
  [[-174,-78,1.3],[172,-84,1.5],[-178,105,.9],[165,103,1.1],[-64,-139,.7],[96,137,.6]].forEach(args=>rock(...args));
  for(let i=0;i<30;i++) {const x=i*97%390-195,y=i*71%270-135;if(Math.abs(x)>139||Math.abs(y)>105)reeds(x,y,i);}
  const outline=[[-137,-94],[-123,-102],[119,-102],[137,-88],[137,86],[124,101],[-122,101],[-137,87]];
  poly(outline.map(([x,y])=>[x,y+7]),C.deep);
  poly(outline,C.edge);
  poly(outline.map(([x,y])=>[x*.97,y*.97]),C.earth);
  rect(-122,-98,238,2,'#867568');rect(-134,-84,2,160,'#817768');rect(-118,97,237,2,C.moss);
  for(let i=0;i<155;i++) {
    const x=i*73%258-129,y=i*47%182-91;
    rect(x,y,i%3+1,1,i%3?'#665054':'#887063');
  }
  for(let y=-65;y<90;y+=23)for(let x=-44;x<60;x+=27){
    rect(x+(y%2)*3,y,23,18,'#494247');rect(x+(y%2)*3,y,20,2,'#6b5c5d');rect(x+2,y+16,16,2,'#39383d');
  }
  for(let y=96;y<154;y+=8){rect(-19,y+3,42,6,C.edge);rect(-21,y,42,6,C.wood);rect(-18,y,32,1,'#c18b4a');rect((y%3)*9-10,y+3,8,1,'#755039');}
  function wall(x,y,length) {
    rect(x,y-27,length,30,C.edge);
    for(let row=0;row<3;row++)for(let col=0;col<length/17;col++){
      const xx=x+col*17+(row%2)*5;if(xx+15>x+length)continue;
      rect(xx,y-27+row*9,15,7,row===0?'#625657':'#454047');rect(xx,y-27+row*9,13,1,'#79685f');
    }
    rect(x+3,y-29,length-7,2,C.moss);
  }
  wall(-131,-81,90);wall(27,-81,103);wall(-132,8,22);
  function lamp(x,y) {
    rect(x+2,y,15,3,'#3d363c');rect(x,y-31,3,32,C.edge);
    rect(x-3,y-33,9,9,'#ae7854');rect(x-2,y-34,7,6,C.gold);rect(x,y-36,3,7,'#fff0bb');
  }
  lamp(-119,-25);lamp(121,-25);lamp(-76,89);
  function deadTree(x,y,flip) {
    ctx.save();ctx.translate(x,y);ctx.scale(flip,1);
    rect(-4,0,27,3,C.deep);rect(-3,-35,6,37,C.edge);
    rect(-6,-54,5,22,C.edge);rect(-10,-62,5,12,C.edge);
    rect(-21,-47,19,4,C.edge);rect(-25,-55,4,11,C.edge);
    rect(-1,-38,19,4,C.edge);rect(15,-49,4,14,C.edge);
    rect(18,-51,10,3,C.edge);rect(-2,-20,2,16,C.light);
    rect(-6,-52,2,10,C.moss);rect(-5,-3,12,3,C.moss);
    ctx.restore();
  }
  deadTree(-156,38,1);deadTree(158,32,-1);
  function drawBackpack(x,y,active,reaction=0) {
    const lift = Math.round(reaction * 5);
    rect(x-12,y-5,24,4,'#342f36');
    rect(x-11,y-25-lift,22,22,'#263034');
    rect(x-8,y-28-lift,16,7,'#40584f');
    rect(x-7,y-22-lift,14,16,'#7c5b45');
    rect(x-4,y-19-lift,8,8,'#513f42');
    rect(x-9,y-25-lift,4,20,'#a67a49');
    rect(x+5,y-25-lift,4,20,'#a67a49');
    rect(x-1,y-16-lift,3,4,C.gold);
    if (reaction > 0) {
      rect(x-15,y-33-lift,30,4,C.edge);
      rect(x-12,y-37-lift,24,6,C.wood);
      rect(x+10,y-42-lift,10,2,C.green);
      rect(x+14,y-46-lift,2,6,C.green);
    }
    const marker = active ? C.green : C.gold;
    rect(x-3,y-46+Math.round(Math.sin(state.time*3)*2),6,6,marker);
    rect(x-1,y-50+Math.round(Math.sin(state.time*3)*2),2,10,marker);
  }
  // Props use the existing collider footprints and sort behind/in front of the player.
  const objects=chapters.map(chapter=>({y:chapter.z*30,draw(){
    const [x,y]=point(chapter.x,chapter.z);
    const reaction = state.interaction?.id === chapter.id && !state.reduced ? Math.sin(Math.min(1,state.interaction.progress)*Math.PI) : 0;
    rect(x-18,y+2,40,5,'#3e363d');
    if(chapter.id==='skills') {
      rect(x-17,y-41,34,45,C.edge);rect(x-14,y-39,28,3,'#7b6961');
      for(let row=0;row<3;row++){rect(x-14,y-32+row*12,28,10,'#292b31');for(let j=0;j<6;j++)rect(x-12+j*4,y-31+row*12,3,7,[C.moss,'#ae765b','#78918c',C.gold][(j+row)%4]);rect(x-15,y-23+row*12,30,2,'#806653');}
    } else if(chapter.id==='experience') {
      rect(x-28,y-8,55,10,C.wood);rect(x-25,y+2,4,8,C.edge);rect(x+21,y+2,4,8,C.edge);
      rect(x-13,y-32,27,23,C.edge);rect(x-10,y-29,21,15,'#426a62');rect(x-7,y-26,9,2,C.green);rect(x-7,y-22,14,1,'#a1bca0');rect(x-4,y-9,11,2,'#b4aca0');rect(x+19,y-17,6,9,'#b7a284');
      rect(x-10,y-4,24,3,'#afa08b');
    } else if(chapter.id==='about') {
      rect(x-10,y-13,20,17,C.rock);rect(x-13,y-17,26,6,'#7b6b64');
      rect(x-8,y-25,17,11,C.gold);rect(x-5,y-23,10,1,'#987f65');rect(x-5,y-20,7,1,'#987f65');
    } else {
      rect(x-20,y-20,40,25,C.edge);rect(x-18,y-24,36,10,'#b3804c');rect(x-18,y-12,36,15,'#855e42');
      rect(x-14,y-23,3,26,C.gold);rect(x+11,y-23,3,26,C.gold);rect(x-2,y-13,5,7,C.gold);rect(x-17,y-14,34,2,C.edge);
    }
    const bob=Math.round(Math.sin(state.time*3)*2), top=chapter.id==='skills'?52:43;
    const active=state.nearest?.id===chapter.id;
    if(reaction > 0) {
      const lift = Math.round(reaction * 10);
      if(chapter.id === 'projects') {
        rect(x-18,y-24,36,10,C.edge);
        rect(x-18,y-24-lift,36,6,C.wood);
        rect(x-15,y-22,30,8,C.gold);
      } else if(chapter.id === 'about') {
        rect(x-8,y-25,17,11,C.rock);
        rect(x-8,y-25-lift,17,11,C.gold);
        rect(x-5,y-22-lift,11,1,C.wood);
      } else if(chapter.id === 'skills') {
        rect(x-8,y-30-lift,12,16,C.gold);
        rect(x-5,y-28-lift,2,12,C.wood);
      } else {
        rect(x-10,y-29,21,15,'#9ed695');
        for(let row=0;row<3;row++)rect(x-7,y-26+row*4,Math.round(reaction*14),1,C.deep);
      }
      for(let n=0;n<4;n++)rect(x-22+n*14,y-38-lift+(n%2)*5,2,2,C.gold);
    }
    rect(x-3,y-top+bob,6,6,active?C.green:C.gold);rect(x-1,y-top-2+bob,2,10,active?C.green:C.gold);
  }}));
  objects.push({y:backpack.z*30,draw(){
    const [x,y]=point(backpack.x,backpack.z);
    const reaction = state.interaction?.id === backpack.id && !state.reduced ? Math.sin(Math.min(1,state.interaction.progress)*Math.PI) : 0;
    drawBackpack(x,y,state.nearest?.id===backpack.id,reaction);
  }});
  objects.push({y:state.position.z*30,draw(){
    const [x,y]=point(state.position.x,state.position.z);
    rect(x-8,y-1,16,3,'#342f36');
    if(state.animation === 'land' && !state.reduced) {
      rect(x-13,y-2,3,2,C.light);rect(x+10,y,4,2,C.light);
    }
    drawAlien(rect, x, y, state);
    if(state.interaction?.id === backpack.id) {
      const open = Math.min(1, state.interaction.progress * 1.45);
      const bob = Math.round(Math.sin(open * Math.PI) * 3);
      rect(x-18,y-8-bob,35,4,'#1f2428');
      rect(x-16,y-12-bob,31,5,'#485c58');
      rect(x-14,y-11-bob,12,1,C.green);
      rect(x+1,y-11-bob,10,1,C.gold);
      rect(x-16,y-13-bob-Math.round(open*10),31,3,'#1f2428');
      rect(x-14,y-26-bob-Math.round(open*10),27,13,'#2b3938');
      rect(x-11,y-23-bob-Math.round(open*10),21,7,'#78a890');
      rect(x-9,y-21-bob-Math.round(open*10),7,1,'#263b38');
      rect(x-9,y-19-bob-Math.round(open*10),14,1,'#263b38');
      rect(x+7,y-24-bob-Math.round(open*10),2,2,C.gold);
    }
  }});
  objects.sort((a,b)=>a.y-b.y).forEach(object=>object.draw());
  rock(-126,79,.65);rock(127,79,.55);
  for(let i=0;i<14;i++) {
    const x=i*83%290-145, y=i*53%210-105;
    if(Math.sin(state.time*1.5+i)>.5)rect(x,y+Math.round(Math.sin(state.time+i)*3),1,2,'#d2df8b');
  }
  ctx.restore();
}
