import test from 'node:test';
import assert from 'node:assert/strict';
import {canStand, stepPosition, nearestChapter} from '../src/cv/movement.js';
import {chapters} from '../src/cv/content.js';

test('walls and furniture keep the character on the walkable floor',()=>{
  assert.equal(canStand(0,0),true);
  for(const p of [[-3,0],[3,0],[0,-3],[0,3],[-2,-1.8],[1.65,-1.85],[1.85,1.3],[-1.85,1.3]]) assert.equal(canStand(...p),false);
  let p={x:0,z:0};for(let i=0;i<300;i++)p=stepPosition(p,1,0,.016);
  assert.ok(p.x<=2.65);
});
test('diagonal movement is normalized and a delayed frame cannot tunnel',()=>{
  const straight=stepPosition({x:0,z:0},1,0,.04), diagonal=stepPosition({x:0,z:0},1,1,.04);
  assert.ok(Math.abs(straight.x-Math.hypot(diagonal.x,diagonal.z))<1e-10);
  assert.ok(stepPosition({x:0,z:0},1,0,10).x<=.12);
});
test('every chapter has a reachable interaction point',()=>{
  for(const chapter of chapters){
    let reachable=false;
    for(let x=-2.6;x<2.6;x+=.15)for(let z=-2.5;z<2.4;z+=.15)if(canStand(x,z)&&nearestChapter({x,z},chapters)?.id===chapter.id)reachable=true;
    assert.ok(reachable,chapter.id);
  }
});
