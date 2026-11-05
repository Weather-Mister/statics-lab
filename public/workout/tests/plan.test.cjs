const {test}=require('node:test');
const assert=require('node:assert/strict');
const P=require('../plan.js');

test('introductory weeks avoid bridges and extra lower-body sets',()=>{
  const s=P.create('2026-11-05');
  assert.equal(s.start,'2026-11-02');
  for(const w of s.weeks.slice(0,2))for(const d of ['A','B']){
    const items=P.items(w,d);
    assert.equal(items.length,8);
    assert.equal(items.find(x=>x.key==='legpress').dose,'1 × 8');
    assert.ok(!items.some(x=>x.key==='bridge'||x.key==='pulldown'));
  }
});
test('strength volume follows the agreed independent milestones',()=>{
  const s=P.create('2026-11-05');
  assert.equal(P.items(s.weeks[2],'B').find(x=>x.key==='pulldown').dose,'1 × 8-12');
  assert.equal(P.items(s.weeks[4],'A').find(x=>x.key==='legpress').dose,'2 × 8-12');
  assert.equal(P.items(s.weeks[4],'A').find(x=>x.key==='curl').dose,'1 × 8-12');
  assert.equal(P.items(s.weeks[6],'A').find(x=>x.key==='curl').dose,'2 × 8-12');
  assert.equal(P.items(s.weeks[11],'B').find(x=>x.key==='bridge').dose,'1 × 8-12');
  assert.deepEqual(P.cardio,[8,10,12,15,18,20,22,25,28,30,30,30]);
});
test('repeat inserts a fresh week while preserving all history and phase',()=>{
  const s=P.create('2026-11-05');s.weeks[0].sessions.A.done=true;
  s.weeks[0].sessions.A.items.legpress={checked:true,weight:'10',reps1:'8'};
  const before=JSON.stringify(s.weeks[0]);
  P.repeat(s,0);
  assert.equal(s.weeks.length,13);assert.equal(s.view,1);
  assert.equal(s.weeks[1].phase,1);assert.equal(s.weeks[2].phase,2);
  assert.equal(JSON.stringify(s.weeks[0]),before);
  assert.equal(s.weeks[1].sessions.A.done,false);assert.deepEqual(s.weeks[1].sessions.A.items,{});
});
test('schedule enforces recovery spacing within and across calendar weeks',()=>{
  assert.equal(P.scheduleValid(1,5),true);assert.equal(P.scheduleValid(3,6),true);
  assert.equal(P.scheduleValid(0,2),true);
  for(const pair of [[0,1],[0,6],[2,2],[5,1],[-1,3],[1,7]])assert.equal(P.scheduleValid(...pair),false);
});
test('backup round-trip retains logged values, checkmarks, notes and substitutions',()=>{
  const s=P.create('2026-11-05');s.view=4;
  const a=s.weeks[4].sessions.A;a.done=true;a.notes='Seat 3';a.soreness='mild';a.back='pulldown';
  a.items.pulldown={checked:true,weight:'12.5',reps1:'12',reps2:'10',reserve:'3',equipment:'Cable #2'};
  const copy=P.normalize(JSON.parse(JSON.stringify(s)));
  assert.equal(copy.view,4);assert.deepEqual(copy.weeks[4].sessions.A,a);
  assert.equal(copy.weeks[4].sessions.B.done,false);
  assert.throws(()=>P.normalize({version:1,weeks:[]}));
  assert.throws(()=>P.normalize({...s,schedule:{A:1,B:2}}));
  const bad=structuredClone(s);bad.weeks[0].phase=13;assert.throws(()=>P.normalize(bad));
});
test('calendar handles month/year and leap-day boundaries without UTC drift',()=>{
  assert.equal(P.addDays('2026-12-28',7),'2027-01-04');
  assert.equal(P.addDays('2028-02-28',2),'2028-03-01');
  assert.equal(P.monday('2026-11-08'),'2026-11-02');
  assert.throws(()=>P.parseDate('2026-02-30'));
});
test('every prescribed machine has a concrete YouTube demonstration',()=>{
  for(const key of ['legpress','chest','row','pulldown','curl'])assert.match(P.exercises[key].video,/^[A-Za-z0-9_-]{11}$/);
});
