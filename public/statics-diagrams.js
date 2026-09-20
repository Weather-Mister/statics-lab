(() => {
  'use strict';
  if (window.StaticsDiagrams) return;

  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function uid(prefix='sd') {
    return prefix + Math.random().toString(36).slice(2,8);
  }

  function defs(id) {
    return '<defs>' +
      '<marker id="'+id+'Force" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="sdForceHead"/></marker>' +
      '<marker id="'+id+'Axis" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" class="sdAxisHead"/></marker>' +
      '<marker id="'+id+'Cable" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" class="sdCableHead"/></marker>' +
      '<marker id="'+id+'CompX" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" class="sdCompXHead"/></marker>' +
      '<marker id="'+id+'CompY" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" class="sdCompYHead"/></marker>' +
      '<marker id="'+id+'CompZ" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" class="sdCompZHead"/></marker>' +
    '</defs>';
  }

  function svgStart(label, viewBox='0 0 520 280', cls='') {
    return '<svg class="sdDiagram '+cls+'" viewBox="'+viewBox+'" role="img" aria-label="'+esc(label)+'" preserveAspectRatio="xMidYMid meet">';
  }

  function label(x,y,text,cls='sdText',anchor='start') {
    return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" class="'+cls+'">'+esc(text)+'</text>';
  }

  function force3D(F, theta, phi) {
    const id=uid('f3');
    const th=Number(theta)*Math.PI/180, ph=Number(phi)*Math.PI/180;
    const h=Math.sin(th), dx=h*Math.cos(ph), dy=Math.cos(th), dz=h*Math.sin(ph);

    const O={x:118,y:255};
    const ex={x:218,y:0}, ey={x:0,y:-172}, ez={x:-76,y:45};
    const project=(x,y,z)=>({x:O.x+ex.x*x+ey.x*y+ez.x*z,y:O.y+ex.y*x+ey.y*y+ez.y*z});
    const X=project(1.02,0,0), Y=project(0,1.02,0), Z=project(0,0,1.02);
    const H=project(dx,0,dz), P=project(dx,dy,dz), Xh=project(dx,0,0);

    const vScale=78, fy=vScale*Math.cos(th), fh=vScale*Math.sin(th);
    const vO={x:54,y:112}, vTop={x:54,y:112-fy}, vEnd={x:54+fh,y:112-fy};

    const pScale=78, fx=pScale*Math.cos(ph), fz=pScale*Math.sin(ph);
    const pO={x:54,y:110}, pX={x:54+fx,y:110}, pEnd={x:54+fx,y:110-fz};

    return svgStart('3D force decomposed into vertical, horizontal, x, and z components','0 0 720 390','sdForce3D')+
      defs(id)+
      '<polygon class="sdPlane" points="'+O.x+','+O.y+' '+X.x+','+X.y+' '+(X.x+ez.x)+','+(X.y+ez.y)+' '+Z.x+','+Z.y+'"/>'+
      '<line class="sdAxis" x1="'+O.x+'" y1="'+O.y+'" x2="'+X.x+'" y2="'+X.y+'" marker-end="url(#'+id+'Axis)"/>'+
      '<line class="sdAxis" x1="'+O.x+'" y1="'+O.y+'" x2="'+Y.x+'" y2="'+Y.y+'" marker-end="url(#'+id+'Axis)"/>'+
      '<line class="sdAxis" x1="'+O.x+'" y1="'+O.y+'" x2="'+Z.x+'" y2="'+Z.y+'" marker-end="url(#'+id+'Axis)"/>'+
      label(X.x+10,X.y+5,'+x','sdAxisLabel')+
      label(Y.x,Y.y-10,'+y','sdAxisLabel','middle')+
      label(Z.x-10,Z.y+16,'+z','sdAxisLabel','middle')+
      '<line class="sdProjection sdThin" x1="'+O.x+'" y1="'+O.y+'" x2="'+Xh.x+'" y2="'+Xh.y+'"/>'+
      '<line class="sdProjection sdThin" x1="'+Xh.x+'" y1="'+Xh.y+'" x2="'+H.x+'" y2="'+H.y+'"/>'+
      '<line class="sdComponentH" x1="'+O.x+'" y1="'+O.y+'" x2="'+H.x+'" y2="'+H.y+'" marker-end="url(#'+id+'Cable)"/>'+
      '<line class="sdComponentY" x1="'+H.x+'" y1="'+H.y+'" x2="'+P.x+'" y2="'+P.y+'" marker-end="url(#'+id+'CompY)"/>'+
      '<line class="sdProjection" x1="'+P.x+'" y1="'+P.y+'" x2="'+H.x+'" y2="'+H.y+'"/>'+
      '<line class="sdForce" x1="'+O.x+'" y1="'+O.y+'" x2="'+P.x+'" y2="'+P.y+'" marker-end="url(#'+id+'Force)"/>'+
      '<circle class="sdOrigin" cx="'+O.x+'" cy="'+O.y+'" r="4"/>'+
      '<circle class="sdPoint" cx="'+H.x+'" cy="'+H.y+'" r="4"/>'+
      label((O.x+P.x)/2-8,(O.y+P.y)/2-14,'F = '+F+' N','sdForceLabel')+
      label((O.x+H.x)/2,(O.y+H.y)/2+18,'Fh','sdComponentHLabel','middle')+
      label(H.x+12,(H.y+P.y)/2,'Fy','sdComponentYLabel')+
      label(O.x+8,O.y+18,'O','sdPointLabel')+
      label(H.x+9,H.y+15,'H','sdPointLabel')+
      label(56,342,'H = horizontal projection of F onto the x-z plane','sdDiagramCaption')+
      label(56,357,'Use the two clean 2D triangles at right for the exact angle relationships.','sdDiagramCaption')+

      '<g class="sdInset sdInsetSpacious" transform="translate(374 18)">'+
        '<rect x="0" y="0" width="328" height="168"/>'+
        label(16,24,'1 · VERTICAL SPLIT','sdInsetTitle')+
        label(16,44,'angle measured from +y','sdInsetNote')+
        '<g class="sdInsetSketch" transform="translate(10 6)">'+
          '<line class="sdComponentY" x1="'+vO.x+'" y1="'+vO.y+'" x2="'+vTop.x+'" y2="'+vTop.y+'"/>'+
          '<line class="sdComponentH" x1="'+vTop.x+'" y1="'+vTop.y+'" x2="'+vEnd.x+'" y2="'+vEnd.y+'"/>'+
          '<line class="sdForce" x1="'+vO.x+'" y1="'+vO.y+'" x2="'+vEnd.x+'" y2="'+vEnd.y+'"/>'+
          '<path class="sdAngleArc" d="M '+vO.x+' '+(vO.y-22)+' A 22 22 0 0 1 '+(vO.x+22*Math.sin(th))+' '+(vO.y-22*Math.cos(th))+'"/>'+
          label(vO.x+10,vO.y-27,'θy = '+theta+'°','sdAngleText')+
          label(vTop.x-10,(vO.y+vTop.y)/2+2,'Fy','sdComponentYLabel','end')+
          label((vTop.x+vEnd.x)/2,vTop.y-9,'Fh','sdComponentHLabel','middle')+
          label((vO.x+vEnd.x)/2+8,(vO.y+vEnd.y)/2-8,'F','sdForceLabel')+
        '</g>'+
        '<line class="sdInsetRule" x1="16" y1="126" x2="312" y2="126"/>'+
        label(18,148,'Fy = F cos θy','sdInsetFormula')+
        label(177,148,'Fh = F sin θy','sdInsetFormula')+
      '</g>'+

      '<g class="sdInset sdInsetSpacious" transform="translate(374 204)">'+
        '<rect x="0" y="0" width="328" height="168"/>'+
        label(16,24,'2 · HORIZONTAL SPLIT','sdInsetTitle')+
        label(16,44,'plan view of the x-z plane','sdInsetNote')+
        '<g class="sdInsetSketch" transform="translate(10 7)">'+
          '<line class="sdComponentX" x1="'+pO.x+'" y1="'+pO.y+'" x2="'+pX.x+'" y2="'+pX.y+'"/>'+
          '<line class="sdComponentZ" x1="'+pX.x+'" y1="'+pX.y+'" x2="'+pEnd.x+'" y2="'+pEnd.y+'"/>'+
          '<line class="sdComponentH" x1="'+pO.x+'" y1="'+pO.y+'" x2="'+pEnd.x+'" y2="'+pEnd.y+'"/>'+
          '<path class="sdAngleArc" d="M '+(pO.x+22)+' '+pO.y+' A 22 22 0 0 0 '+(pO.x+22*Math.cos(ph))+' '+(pO.y-22*Math.sin(ph))+'"/>'+
          label(pO.x+29,pO.y-8,'φ = '+phi+'°','sdAngleText')+
          label((pO.x+pX.x)/2,pO.y+20,'Fx','sdComponentXLabel','middle')+
          label(pX.x+10,(pX.y+pEnd.y)/2+2,'Fz','sdComponentZLabel')+
          label((pO.x+pEnd.x)/2-2,(pO.y+pEnd.y)/2-10,'Fh','sdComponentHLabel','middle')+
        '</g>'+
        '<line class="sdInsetRule" x1="16" y1="126" x2="312" y2="126"/>'+
        label(18,148,'Fx = Fh cos φ','sdInsetFormula')+
        label(177,148,'Fz = Fh sin φ','sdInsetFormula')+
      '</g>'+
    '</svg>';
  }

  function particle(W,left,right) {
    const id=uid('pt');
    return svgStart('Particle equilibrium with two cable tensions','0 0 520 260','sdParticle')+
      defs(id)+
      '<line class="sdCable" x1="260" y1="132" x2="110" y2="48" marker-end="url(#'+id+'Cable)"/>'+
      '<line class="sdCable" x1="260" y1="132" x2="408" y2="50" marker-end="url(#'+id+'Cable)"/>'+
      '<line class="sdForce" x1="260" y1="132" x2="260" y2="224" marker-end="url(#'+id+'Force)"/>'+
      '<line class="sdConstruction" x1="260" y1="40" x2="260" y2="132"/>'+
      '<circle class="sdJoint" cx="260" cy="132" r="8"/>'+
      label(104,37,'T_L','sdCableLabel','middle')+
      label(414,39,'T_R','sdCableLabel','middle')+
      label(274,220,W+' N','sdForceLabel')+
      label(170,98,left,'sdAngleText','middle')+
      label(348,99,right,'sdAngleText','middle')+
      '<g class="sdLegend" transform="translate(18 170)"><rect x="0" y="0" width="174" height="64"/>'+label(12,20,'FBD RULE','sdLegendTitle')+label(12,39,'tensions pull away from joint','sdLegendText')+label(12,54,'weight acts straight down','sdLegendNote')+'</g>'+
    '</svg>';
  }

  function beam(L, loads, opts={}) {
    const id=uid('bm'), x0=60, x1=455, y=128, span=x1-x0;
    const sx=x=>x0+span*(Number(x)/Number(L));
    let items='';
    loads.forEach(load=>{
      const x=sx(load.x), down=load.dir!=='up';
      const yStart=down?38:220, yEnd=down?108:150;
      items += '<line class="sdForce" x1="'+x+'" y1="'+yStart+'" x2="'+x+'" y2="'+yEnd+'" marker-end="url(#'+id+'Force)"/>';
      items += label(x,down?28:240,load.label,'sdForceLabel','middle');
      if(Number(load.x)>0 && Number(load.x)<Number(L)){
        items += '<line class="sdConstruction" x1="'+x+'" y1="'+(y+8)+'" x2="'+x+'" y2="196"/>';
        items += label(x,210,String(load.x)+' m','sdDimText','middle');
      }
    });
    let supports='';
    if(opts.A==='fixed'){
      supports += '<line class="sdSupport" x1="'+x0+'" y1="82" x2="'+x0+'" y2="172"/>';
      for(let yy=88;yy<=166;yy+=13) supports += '<line class="sdHatch" x1="'+(x0-12)+'" y1="'+(yy-7)+'" x2="'+x0+'" y2="'+yy+'"/>';
      supports += label(x0-14,74,'fixed A','sdSupportLabel','middle');
    } else if(opts.A!=='none'){
      supports += '<polygon class="sdSupportFill" points="'+(x0-15)+','+(y+42)+' '+(x0+15)+','+(y+42)+' '+x0+','+(y+8)+'"/>'+label(x0,y+62,'pin A','sdSupportLabel','middle');
    }
    if(opts.B==='roller' || (!('B' in opts) && opts.A!=='fixed')){
      supports += '<polygon class="sdSupportFill" points="'+(x1-15)+','+(y+42)+' '+(x1+15)+','+(y+42)+' '+x1+','+(y+8)+'"/><circle class="sdRoller" cx="'+(x1-8)+'" cy="'+(y+50)+'" r="5"/><circle class="sdRoller" cx="'+(x1+8)+'" cy="'+(y+50)+'" r="5"/>'+label(x1,y+70,'roller B','sdSupportLabel','middle');
    }
    let couple='';
    if(opts.couple){
      couple='<path class="sdMoment" d="M 105 78 A 28 28 0 1 1 100 122" marker-end="url(#'+id+'Force)"/>'+label(136,76,opts.couple,'sdMomentLabel');
    }
    return svgStart('Beam statics diagram','0 0 520 270','sdBeam')+defs(id)+
      '<line class="sdMember" x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'"/>'+supports+items+couple+
      '<line class="sdDimension" x1="'+x0+'" y1="250" x2="'+x1+'" y2="250"/>'+
      '<line class="sdTick" x1="'+x0+'" y1="244" x2="'+x0+'" y2="256"/><line class="sdTick" x1="'+x1+'" y1="244" x2="'+x1+'" y2="256"/>'+
      label((x0+x1)/2,265,'L = '+L+' m','sdDimText','middle')+
    '</svg>';
  }

  function cableBeam(L,loadX,load,angle) {
    const id=uid('cb'), x0=65,x1=410,y=142,loadAt=x0+(x1-x0)*(Number(loadX)/Number(L));
    const a=Number(angle)*Math.PI/180, cableEnd={x:x1+85*Math.cos(a),y:y-85*Math.sin(a)};
    return svgStart('Pinned beam with cable and point load','0 0 520 270','sdCableBeam')+defs(id)+
      '<line class="sdMember" x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'"/>'+
      '<polygon class="sdSupportFill" points="'+(x0-15)+','+(y+38)+' '+(x0+15)+','+(y+38)+' '+x0+','+(y+7)+'"/>'+label(x0,y+58,'pin A','sdSupportLabel','middle')+
      '<line class="sdCable" x1="'+x1+'" y1="'+y+'" x2="'+cableEnd.x+'" y2="'+cableEnd.y+'" marker-end="url(#'+id+'Cable)"/>'+
      label(cableEnd.x-4,cableEnd.y-10,'T','sdCableLabel','middle')+
      '<path class="sdAngleArc" d="M '+(x1+32)+' '+y+' A 32 32 0 0 0 '+(x1+32*Math.cos(a))+' '+(y-32*Math.sin(a))+'"/>'+
      label(x1+42,y-12,String(angle)+'°','sdAngleText')+
      '<line class="sdForce" x1="'+loadAt+'" y1="45" x2="'+loadAt+'" y2="'+(y-12)+'" marker-end="url(#'+id+'Force)"/>'+
      label(loadAt,34,load+' kN','sdForceLabel','middle')+
      '<line class="sdConstruction" x1="'+loadAt+'" y1="'+(y+8)+'" x2="'+loadAt+'" y2="218"/>'+label(loadAt,232,loadX+' m','sdDimText','middle')+
      '<line class="sdDimension" x1="'+x0+'" y1="250" x2="'+x1+'" y2="250"/>'+label((x0+x1)/2,266,'L = '+L+' m','sdDimText','middle')+
    '</svg>';
  }

  function axisMoment(axisText, pointText, forceText) {
    const id=uid('ax'), O={x:130,y:205};
    return svgStart('Moment about an arbitrary axis','0 0 520 280','sdAxisMoment')+defs(id)+
      '<polygon class="sdPlane" points="130,205 425,205 345,252 50,252"/>'+
      '<line class="sdAxis" x1="130" y1="205" x2="440" y2="205" marker-end="url(#'+id+'Axis)"/>'+
      '<line class="sdAxis" x1="130" y1="205" x2="130" y2="38" marker-end="url(#'+id+'Axis)"/>'+
      '<line class="sdAxis" x1="130" y1="205" x2="42" y2="255" marker-end="url(#'+id+'Axis)"/>'+
      label(448,210,'x','sdAxisLabel')+label(124,28,'y','sdAxisLabel')+label(25,267,'z','sdAxisLabel')+
      '<line class="sdAxisTarget" x1="'+O.x+'" y1="'+O.y+'" x2="355" y2="72" marker-end="url(#'+id+'Cable)"/>'+
      label(365,70,'axis '+axisText,'sdCableLabel')+
      '<line class="sdPosition" x1="'+O.x+'" y1="'+O.y+'" x2="300" y2="165"/>'+
      '<circle class="sdPoint" cx="300" cy="165" r="6"/>'+
      label(311,160,'A '+pointText,'sdPointLabel')+
      '<line class="sdForce" x1="300" y1="165" x2="300" y2="67" marker-end="url(#'+id+'Force)"/>'+
      label(315,78,'F '+forceText,'sdForceLabel')+
      label(114,220,'O','sdPointLabel')+
      '<g class="sdLegend" transform="translate(344 174)"><rect x="0" y="0" width="158" height="78"/>'+label(12,20,'WORKFLOW','sdLegendTitle')+label(12,39,'1  M_O = r × F','sdLegendText')+label(12,56,'2  M_axis = λ · M_O','sdLegendText')+label(12,70,'cross → then project','sdLegendNote')+'</g>'+
    '</svg>';
  }

  function ring(alpha) {
    const id=uid('rg'), a=-Number(alpha)*Math.PI/180, cx=260,cy=120,r=58;
    const ux={x:Math.cos(a),y:-Math.sin(a)}, n={x:-ux.y,y:ux.x};
    const line1={x:55,y:215},line2={x:465,y:215+(465-55)*Math.tan(a)};
    const contact={x:cx-n.x*r,y:cy-n.y*r};
    return svgStart('Eccentric ring on a rough incline','0 0 520 280','sdRing')+defs(id)+
      '<line class="sdGround" x1="'+line1.x+'" y1="'+line1.y+'" x2="'+line2.x+'" y2="'+line2.y+'"/>'+
      '<circle class="sdRingBody" cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>'+
      '<circle class="sdPoint" cx="'+cx+'" cy="'+cy+'" r="5"/>'+label(cx-16,cy-10,'O','sdPointLabel')+
      '<circle class="sdMassPoint" cx="'+(cx+25)+'" cy="'+(cy+12)+'" r="7"/>'+label(cx+37,cy+16,'m₀','sdPointLabel')+
      '<line class="sdForce" x1="'+(cx+25)+'" y1="'+(cy+12)+'" x2="'+(cx+25)+'" y2="'+(cy+105)+'" marker-end="url(#'+id+'Force)"/>'+label(cx+39,cy+94,'m₀g','sdForceLabel')+
      '<line class="sdCable" x1="'+contact.x+'" y1="'+contact.y+'" x2="'+(contact.x+n.x*78)+'" y2="'+(contact.y+n.y*78)+'" marker-end="url(#'+id+'Cable)"/>'+label(contact.x+n.x*86,contact.y+n.y*86,'N','sdCableLabel','middle')+
      '<line class="sdForce sdFriction" x1="'+contact.x+'" y1="'+contact.y+'" x2="'+(contact.x+ux.x*90)+'" y2="'+(contact.y+ux.y*90)+'" marker-end="url(#'+id+'Force)"/>'+label(contact.x+ux.x*98,contact.y+ux.y*98,'F','sdForceLabel','middle')+
      label(72,246,'incline α = '+alpha+'°','sdAngleText')+
    '</svg>';
  }

  window.StaticsDiagrams={force3D,particle,beam,cableBeam,axisMoment,ring};
})();