(()=>{
  'use strict';
  const PREF_KEY='staticsWhiteboardPrefs:v2';
  const DEFAULTS={color:'#172033',width:3,stylusOnly:false};
  const MIN_SCALE=.65,MAX_SCALE=5;
  let activeBoard=null;

  function safeJson(raw,fallback){try{return JSON.parse(raw)||fallback}catch(_){return fallback}}
  function prefs(){
    const raw=safeJson(localStorage.getItem(PREF_KEY),{});
    return {
      color:/^#[0-9a-f]{6}$/i.test(String(raw.color||''))?String(raw.color):DEFAULTS.color,
      width:Math.max(1,Math.min(12,Number(raw.width)||DEFAULTS.width)),
      stylusOnly:false
    };
  }
  function writePrefs(patch){
    const next={...prefs(),...patch};
    try{localStorage.setItem(PREF_KEY,JSON.stringify(next))}catch(_){}
    syncVisiblePrefs(next);
    return next;
  }
  function syncVisiblePrefs(p){
    document.querySelectorAll('[data-wb-color]').forEach(el=>{if(document.activeElement!==el)el.value=p.color});
    document.querySelectorAll('[data-wb-width]').forEach(el=>{if(document.activeElement!==el)el.value=String(p.width)});
    document.querySelectorAll('[data-wb-stylus]').forEach(el=>{el.classList.toggle('active',p.stylusOnly);el.setAttribute('aria-pressed',p.stylusOnly?'true':'false')});
    document.querySelectorAll('[data-wb-preset]').forEach(el=>el.classList.toggle('selected',String(el.dataset.wbPreset).toLowerCase()===String(p.color).toLowerCase()));
  }
  function cloneStrokes(strokes){return JSON.parse(JSON.stringify(Array.isArray(strokes)?strokes:[]))}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function pressureOf(e){if(e.pointerType==='pen')return clamp(Number(e.pressure)||.35,.08,1);return .55}
  function isTypingTarget(el){return !!el?.closest?.('input,textarea,select,[contenteditable="true"]')}

  class WhiteboardPro{
    constructor(opts){
      this.root=opts.root;
      this.canvas=opts.canvas||this.root?.querySelector('[data-pro-canvas]');
      this.viewport=opts.viewport||this.canvas?.parentElement;
      this.fullscreenTarget=opts.fullscreenTarget||this.root;
      this.getBoard=opts.getBoard;
      this.save=opts.save||(()=>{});
      this.onInk=opts.onInk||(()=>{});
      this.questionText=opts.questionText||'';
      this.ctx=this.canvas?.getContext('2d');
      this.undo=[];this.redo=[];
      this.selectedTool='pen';this.keyboardEraser=false;this.keyboardPan=false;this.holdEraser=false;this.suppressEraserClick=false;
      this.pointers=new Map();this.drawingPointer=null;this.currentStroke=null;this.lastPenAt=0;
      this.dragPointer=null;this.dragStart=null;
      this.view={scale:1,panX:0,panY:0};this.gesture=null;
      this.eraserPreview=null;
      this.raf=0;this.lastPresetTap={el:null,at:0};
      if(!this.root||!this.canvas||!this.ctx||typeof this.getBoard!=='function')return;
      this.init();
    }
    board(){
      const b=this.getBoard();
      if(!b.strokes||!Array.isArray(b.strokes))b.strokes=[];
      if(!Number.isFinite(Number(b.updatedAt)))b.updatedAt=0;
      return b;
    }
    init(){
      this.root.dataset.wbPro='1';
      this.canvas.dataset.proReady='1';
      const p=prefs();syncVisiblePrefs(p);
      this.ensureEraserPreview();
      document.querySelectorAll('.wbFullscreenExit').forEach(btn=>btn.remove());
      this.bindToolbar();this.bindCanvas();
      this.resizeObserver=new ResizeObserver(()=>this.paint());
      this.resizeObserver.observe(this.viewport);
      this.root.addEventListener('pointerenter',()=>{activeBoard=this});
      this.root.addEventListener('focusin',()=>{activeBoard=this});
      this.root.addEventListener('click',()=>{activeBoard=this});
      setTimeout(()=>this.paint(),20);
    }
    ensureEraserPreview(){
      if(!this.viewport||this.eraserPreview)return;
      const el=document.createElement('div');
      el.className='wbEraserPreview';
      el.setAttribute('aria-hidden','true');
      this.viewport.appendChild(el);
      this.eraserPreview=el;
    }
    hideEraserPreview(){if(this.eraserPreview)this.eraserPreview.style.display='none'}
    ensureFullscreenExit(){
      if(this.fullscreenExit)return;
      const btn=document.createElement('button');
      btn.type='button';btn.className='wbFullscreenExit';btn.dataset.wbExitFloat='1';btn.textContent='EXIT';btn.title='Exit fullscreen (F or Esc)';
      btn.style.display='none';
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();activeBoard=this;this.toggleFullscreen(false)});
      document.body.appendChild(btn);
      this.fullscreenExit=btn;
    }
    updateEraserPreview(e){
      if(!this.eraserPreview||this.effectiveTool()!=='eraser'){this.hideEraserPreview();return}
      const p=this.localPoint(e);const size=Math.max(8,(prefs().width||3)*2.6);
      this.eraserPreview.style.width=size+'px';this.eraserPreview.style.height=size+'px';
      this.eraserPreview.style.left=p.x+'px';this.eraserPreview.style.top=p.y+'px';this.eraserPreview.style.display='block';
    }
    effectiveTool(){return this.keyboardPan?'drag':((this.keyboardEraser||this.holdEraser)?'eraser':this.selectedTool)}
    updateToolUi(){
      const tool=this.effectiveTool();
      this.root.querySelectorAll('[data-wb-tool]').forEach(b=>b.classList.toggle('active',b.dataset.wbTool===tool));
      this.root.classList.toggle('temporaryEraser',this.keyboardEraser||this.holdEraser);
      this.root.classList.toggle('temporaryPan',this.keyboardPan);
      this.root.classList.toggle('wbDragMode',tool==='drag');
      if(tool!=='eraser')this.hideEraserPreview();
    }
    bindToolbar(){
      const p=prefs();
      const color=this.root.querySelector('[data-wb-color]');
      const width=this.root.querySelector('[data-wb-width]');
      if(color){color.value=p.color;color.addEventListener('input',()=>writePrefs({color:color.value}))}
      if(width){width.value=String(p.width);width.addEventListener('input',()=>writePrefs({width:Number(width.value)||3}))}
      this.root.querySelectorAll('[data-wb-preset]').forEach(btn=>{
        btn.addEventListener('click',e=>{
          const now=Date.now();
          if(this.lastPresetTap.el===btn&&now-this.lastPresetTap.at<330){e.preventDefault();color?.click();this.lastPresetTap={el:null,at:0};return}
          this.lastPresetTap={el:btn,at:now};writePrefs({color:btn.dataset.wbPreset});
        });
        btn.addEventListener('dblclick',e=>{e.preventDefault();color?.click()});
      });
      const pen=this.root.querySelector('[data-wb-tool="pen"]');
      const eraser=this.root.querySelector('[data-wb-tool="eraser"]');
      const drag=this.root.querySelector('[data-wb-tool="drag"]');
      pen?.addEventListener('click',()=>{this.selectedTool='pen';this.updateToolUi()});
      drag?.addEventListener('click',()=>{this.selectedTool='drag';this.updateToolUi()});
      if(eraser){
        let timer=null;
        eraser.addEventListener('pointerdown',e=>{
          if(e.pointerType==='mouse'&&e.button!==0)return;
          activeBoard=this;
          timer=setTimeout(()=>{this.holdEraser=true;this.suppressEraserClick=true;this.updateToolUi()},240);
        });
        const release=()=>{clearTimeout(timer);timer=null;if(this.holdEraser){this.holdEraser=false;this.updateToolUi()}};
        eraser.addEventListener('pointerup',release);eraser.addEventListener('pointercancel',release);eraser.addEventListener('pointerleave',release);
        eraser.addEventListener('click',e=>{if(this.suppressEraserClick){e.preventDefault();this.suppressEraserClick=false;return}this.selectedTool='eraser';this.updateToolUi()});
      }
      this.root.querySelector('[data-wb-stylus]')?.addEventListener('click',e=>{const next=!prefs().stylusOnly;writePrefs({stylusOnly:next});e.currentTarget.classList.toggle('active',next)});
      this.root.querySelector('[data-wb-undo]')?.addEventListener('click',()=>this.doUndo());
      this.root.querySelector('[data-wb-redo]')?.addEventListener('click',()=>this.doRedo());
      this.root.querySelector('[data-wb-clear]')?.addEventListener('click',()=>this.clear());
      this.root.querySelector('[data-wb-fit]')?.addEventListener('click',()=>this.fitView());
      this.root.querySelector('[data-wb-fullscreen]')?.addEventListener('click',()=>this.toggleFullscreen());
      this.root.querySelectorAll('[data-wb-question]').forEach(btn=>btn.addEventListener('click',()=>this.toggleQuestion()));
      this.updateToolUi();this.updateZoomUi();
    }
    snapshot(){return cloneStrokes(this.board().strokes)}
    pushHistory(){this.undo.push(this.snapshot());if(this.undo.length>30)this.undo.shift();this.redo=[]}
    saveBoard(){const b=this.board();b.updatedAt=Date.now();this.save();this.onInk();}
    restore(strokes){this.board().strokes=cloneStrokes(strokes);this.board().updatedAt=Date.now();this.save();this.paint();this.onInk()}
    doUndo(){if(!this.undo.length)return;this.redo.push(this.snapshot());this.restore(this.undo.pop())}
    doRedo(){if(!this.redo.length)return;this.undo.push(this.snapshot());this.restore(this.redo.pop())}
    clear(){if(!this.board().strokes.length)return;this.pushHistory();this.board().strokes=[];this.saveBoard();this.paint()}
    fitView(){this.view={scale:1,panX:0,panY:0};this.updateZoomUi();this.paint()}
    updateZoomUi(){const el=this.root.querySelector('[data-wb-zoom]');if(el)el.textContent=Math.round(this.view.scale*100)+'%'}
    toggleFullscreen(force){
      const target=this.fullscreenTarget;if(!target)return;
      const next=typeof force==='boolean'?force:!target.classList.contains('wbFullscreen');
      document.querySelectorAll('.wbFullscreen').forEach(el=>{
        if(el===target)return;
        el.classList.remove('wbFullscreen');
        el.querySelectorAll('[data-wb-fullscreen]').forEach(btn=>btn.textContent='FULLSCREEN');
      });
      document.querySelectorAll('.wbFullscreenExit').forEach(btn=>btn.remove());
      target.classList.toggle('wbFullscreen',next);
      if(next)target.querySelectorAll('.fullscreenSolutionReveal').forEach(el=>{el.open=false;});
      if(this.fullscreenQuestionObserver){this.fullscreenQuestionObserver.disconnect();this.fullscreenQuestionObserver=null;}
      if(next){
        const question=target.querySelector('.fullscreenProblemContext');
        const syncQuestionOffset=()=>target.style.setProperty('--fs-question-h',`${question?.offsetHeight||0}px`);
        syncQuestionOffset();
        if(question&&window.ResizeObserver){this.fullscreenQuestionObserver=new ResizeObserver(syncQuestionOffset);this.fullscreenQuestionObserver.observe(question);}
        requestAnimationFrame(syncQuestionOffset);
      }else target.style.removeProperty('--fs-question-h');
      document.body.classList.toggle('whiteboardFullscreenOpen',!!document.querySelector('.wbFullscreen'));
      this.root.querySelectorAll('[data-wb-fullscreen]').forEach(btn=>btn.textContent=next?'EXIT':'FULLSCREEN');
      if(next)activeBoard=this;else this.root.classList.remove('showQuestionOverlay');
      setTimeout(()=>{if(next){const question=target.querySelector('.fullscreenProblemContext');target.style.setProperty('--fs-question-h',`${question?.offsetHeight||0}px`);}this.paint()},30);
    }
    toggleQuestion(){this.root.classList.toggle('showQuestionOverlay')}
    localPoint(e){const r=this.canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,r}}
    worldPoint(e){
      const {x,y,r}=this.localPoint(e);
      const nx=((x-this.view.panX)/this.view.scale)/Math.max(1,r.width);
      const ny=((y-this.view.panY)/this.view.scale)/Math.max(1,r.height);
      // Deliberately do not clamp to 0..1. The visible canvas is only a viewport
      // onto a much larger virtual workspace, so panned-to regions must remain writable.
      return [nx,ny,pressureOf(e)];
    }
    bindCanvas(){
      this.canvas.addEventListener('contextmenu',e=>e.preventDefault());
      this.canvas.addEventListener('pointerdown',e=>this.pointerDown(e));
      this.canvas.addEventListener('pointermove',e=>this.pointerMove(e));
      this.canvas.addEventListener('pointerup',e=>this.pointerUp(e));
      this.canvas.addEventListener('pointercancel',e=>this.pointerUp(e));
      this.canvas.addEventListener('pointerleave',()=>this.hideEraserPreview());
      this.canvas.addEventListener('wheel',e=>{
        if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();activeBoard=this;
        const r=this.canvas.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;
        const old=this.view.scale,newScale=clamp(old*Math.exp(-e.deltaY*.002),MIN_SCALE,MAX_SCALE);
        const wx=(x-this.view.panX)/old,wy=(y-this.view.panY)/old;
        this.view.scale=newScale;this.view.panX=x-wx*newScale;this.view.panY=y-wy*newScale;this.updateZoomUi();this.paint();
      },{passive:false});
    }
    cancelTouchStroke(){
      if(this.drawingPointer==null||!this.currentStroke)return;
      const prior=this.undo.pop();if(prior)this.board().strokes=cloneStrokes(prior);
      this.currentStroke=null;this.drawingPointer=null;this.paint();
    }
    startGesture(){
      if(this.pointers.size<2)return;
      this.dragPointer=null;this.dragStart=null;this.root.classList.remove('wbDragging');
      this.cancelTouchStroke();
      const pts=[...this.pointers.values()].slice(0,2);const dx=pts[1].x-pts[0].x,dy=pts[1].y-pts[0].y;
      const mid={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2};const dist=Math.max(10,Math.hypot(dx,dy));
      this.gesture={dist,startScale:this.view.scale,worldX:(mid.x-this.view.panX)/this.view.scale,worldY:(mid.y-this.view.panY)/this.view.scale};
    }
    pointerDown(e){
      activeBoard=this;this.updateEraserPreview(e);
      if(e.pointerType==='pen')this.lastPenAt=Date.now();
      if(e.pointerType==='touch'){
        const p=this.localPoint(e);this.pointers.set(e.pointerId,{x:p.x,y:p.y});
        if(this.pointers.size>=2){e.preventDefault();this.startGesture();return}
        if(prefs().stylusOnly||Date.now()-this.lastPenAt<1800)return;
      }
      if(e.pointerType==='mouse'&&e.button!==0)return;
      e.preventDefault();try{this.canvas.setPointerCapture?.(e.pointerId)}catch(_){}
      if(this.effectiveTool()==='drag'||(e.pointerType==='mouse'&&e.ctrlKey)){
        const p=this.localPoint(e);this.dragPointer=e.pointerId;this.dragStart={x:p.x,y:p.y,panX:this.view.panX,panY:this.view.panY};this.root.classList.add('wbDragging');return;
      }
      this.pushHistory();
      const p=this.worldPoint(e);const cfg=prefs();
      this.currentStroke={tool:this.effectiveTool(),color:cfg.color,width:cfg.width,points:[[+p[0].toFixed(5),+p[1].toFixed(5),+p[2].toFixed(3)]]};
      this.board().strokes.push(this.currentStroke);this.drawingPointer=e.pointerId;this.redo=[];this.paint();
    }
    pointerMove(e){
      this.updateEraserPreview(e);
      if(e.pointerType==='touch'&&this.pointers.has(e.pointerId)){
        const p=this.localPoint(e);this.pointers.set(e.pointerId,{x:p.x,y:p.y});
        if(this.pointers.size>=2&&this.gesture){
          e.preventDefault();const pts=[...this.pointers.values()].slice(0,2);const dx=pts[1].x-pts[0].x,dy=pts[1].y-pts[0].y;
          const dist=Math.max(10,Math.hypot(dx,dy));const mid={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2};
          const scale=clamp(this.gesture.startScale*(dist/this.gesture.dist),MIN_SCALE,MAX_SCALE);
          this.view.scale=scale;this.view.panX=mid.x-this.gesture.worldX*scale;this.view.panY=mid.y-this.gesture.worldY*scale;this.updateZoomUi();this.schedulePaint();return;
        }
      }
      if(this.dragPointer===e.pointerId&&this.dragStart){
        e.preventDefault();const p=this.localPoint(e);this.view.panX=this.dragStart.panX+(p.x-this.dragStart.x);this.view.panY=this.dragStart.panY+(p.y-this.dragStart.y);this.schedulePaint();return;
      }
      if(this.drawingPointer!==e.pointerId||!this.currentStroke)return;
      e.preventDefault();const p=this.worldPoint(e);const prev=this.currentStroke.points[this.currentStroke.points.length-1];const r=this.canvas.getBoundingClientRect();
      const dx=(p[0]-prev[0])*r.width*this.view.scale,dy=(p[1]-prev[1])*r.height*this.view.scale;
      if(dx*dx+dy*dy<1.2)return;
      this.currentStroke.points.push([+p[0].toFixed(5),+p[1].toFixed(5),+p[2].toFixed(3)]);this.schedulePaint();
    }
    pointerUp(e){
      if(e.pointerType==='touch'){
        this.pointers.delete(e.pointerId);
        if(this.pointers.size<2)this.gesture=null;
      }
      if(this.dragPointer===e.pointerId){
        e.preventDefault();this.dragPointer=null;this.dragStart=null;this.root.classList.remove('wbDragging');try{this.canvas.releasePointerCapture?.(e.pointerId)}catch(_){}this.paint();return;
      }
      if(this.drawingPointer!==e.pointerId)return;
      e.preventDefault();this.drawingPointer=null;this.currentStroke=null;try{this.canvas.releasePointerCapture?.(e.pointerId)}catch(_){}this.saveBoard();this.paint();
    }
    schedulePaint(){if(this.raf)return;this.raf=requestAnimationFrame(()=>{this.raf=0;this.paint()})}
    screenPoint(pt,r){return {x:pt[0]*r.width*this.view.scale+this.view.panX,y:pt[1]*r.height*this.view.scale+this.view.panY,p:pt.length>2?clamp(Number(pt[2])||.55,.08,1):.55}}
    drawStroke(s,r){
      const pts=Array.isArray(s?.points)?s.points:[];if(!pts.length)return;
      const scr=pts.map(p=>this.screenPoint(p,r));const erasing=s.tool==='eraser';
      this.ctx.globalCompositeOperation=erasing?'destination-out':'source-over';this.ctx.strokeStyle=s.color||'#172033';this.ctx.lineCap='round';this.ctx.lineJoin='round';
      if(scr.length===1){const w=(s.width||3)*(erasing?2.6:(.5+scr[0].p));this.ctx.lineWidth=w;this.ctx.beginPath();this.ctx.moveTo(scr[0].x,scr[0].y);this.ctx.lineTo(scr[0].x+.01,scr[0].y+.01);this.ctx.stroke();this.ctx.globalCompositeOperation='source-over';return}
      let start=scr[0];
      for(let i=1;i<scr.length;i++){
        const cur=scr[i],next=scr[i+1]||cur;const end=i<scr.length-1?{x:(cur.x+next.x)/2,y:(cur.y+next.y)/2}:cur;
        const pressure=(start.p+cur.p)/2;this.ctx.lineWidth=(s.width||3)*(erasing?2.6:(.45+pressure*1.05));
        this.ctx.beginPath();this.ctx.moveTo(start.x,start.y);this.ctx.quadraticCurveTo(cur.x,cur.y,end.x,end.y);this.ctx.stroke();start={...end,p:cur.p};
      }
      this.ctx.globalCompositeOperation='source-over';
    }
    paint(){
      const r=this.canvas.getBoundingClientRect();if(!r.width||!r.height)return;
      const isQuestion=this.viewport?.classList?.contains('questionBoardCanvasShell');
      const major=(isQuestion?32:40)*this.view.scale,minor=8*this.view.scale;
      if(this.viewport){
        const pos=`${this.view.panX}px ${this.view.panY}px`;
        this.viewport.style.backgroundPosition=`${pos},${pos},${pos},${pos}`;
        this.viewport.style.backgroundSize=`${major}px ${major}px,${major}px ${major}px,${minor}px ${minor}px,${minor}px ${minor}px`;
      }
      const dpr=Math.max(1,window.devicePixelRatio||1),w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);
      if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h}
      this.ctx.setTransform(dpr,0,0,dpr,0,0);this.ctx.clearRect(0,0,r.width,r.height);this.board().strokes.forEach(s=>this.drawStroke(s,r));
    }
    setKeyboardEraser(on){this.keyboardEraser=on;this.updateToolUi()}
    setKeyboardPan(on){this.keyboardPan=on;this.updateToolUi()}
  }

  window.addEventListener('keydown',e=>{
    if(isTypingTarget(e.target))return;
    const key=String(e.key||'').toLowerCase();
    const command=e.ctrlKey||e.metaKey;
    if(key==='control'&&activeBoard){activeBoard.setKeyboardPan(true);return}
    if(command&&key==='z'&&activeBoard){e.preventDefault();e.shiftKey?activeBoard.doRedo():activeBoard.doUndo();return}
    if(command&&key==='y'&&activeBoard){e.preventDefault();activeBoard.doRedo();return}
    if(key==='f'&&!command&&!e.altKey&&!e.shiftKey&&activeBoard){e.preventDefault();activeBoard.toggleFullscreen();return}
    if(e.key==='Escape'){
      const target=document.querySelector('.wbFullscreen');
      if(target){e.preventDefault();const board=target._wbPro||activeBoard;if(board?.fullscreenTarget===target)board.toggleFullscreen(false);else{target.classList.remove('wbFullscreen');document.body.classList.remove('whiteboardFullscreenOpen')}}
      return;
    }
    if(key==='e'&&!e.repeat&&activeBoard){activeBoard.setKeyboardEraser(true);e.preventDefault()}
  });
  window.addEventListener('keyup',e=>{
    if(!activeBoard)return;
    if(e.key==='Control')activeBoard.setKeyboardPan(false);
    if(e.key==='e'||e.key==='E')activeBoard.setKeyboardEraser(false);
  });
  window.addEventListener('blur',()=>{
    if(!activeBoard)return;
    activeBoard.setKeyboardPan(false);
    activeBoard.setKeyboardEraser(false);
  });

  window.StaticsWhiteboardPro={
    enhance(opts){
      if(opts?.root?._wbPro){opts.root._wbPro.paint();return opts.root._wbPro}
      const instance=new WhiteboardPro(opts);if(opts?.root)opts.root._wbPro=instance;return instance;
    },
    prefs,
    syncPrefs(){syncVisiblePrefs(prefs())}
  };
})();