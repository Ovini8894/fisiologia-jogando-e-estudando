{
const P=window.FASES,BOSS=window.BOSS,CE=window.CE,MATCH=window.PARES,LEIT=window.LEITURA;
const SENHA='2024-10-18';
const CODIGO='eu sou a pretinha mais linda desse mundo';

const COR={mus:'#ff7a59',card:'#e5383b',pa:'#3a86ff',sraa:'#00b894',resp:'#4cc9f0',dig:'#f59e0b',boss:'#7048e8',erros:'#e5383b'};
const ICO={
mus:'<path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/>',
card:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/><path d="M7 12h3l1-2 2 4 1-2h3"/>',
pa:'<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.2"/>',
sraa:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
resp:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8"/>',
dig:'<path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M7 15h10"/>',
boss:'<path d="M3 9l9-5 9 5z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8M3 20h18"/>',
bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
pairs:'<rect x="3" y="4" width="8" height="6" rx="2"/><rect x="13" y="14" width="8" height="6" rx="2"/><path d="M7 10v7h6"/>',
book:'<path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z"/><path d="M9 3v18M12.5 8h3M12.5 12h3"/>',
crown:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'};
const icon=(k,c='#fff')=>`<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICO[k]}</svg>`;

/* ---------- quem está jogando ---------- */
let QUEM=null;try{QUEM=localStorage.getItem('fisio-quem')}catch(e){}
const MARI=()=>QUEM==='mari';
const KEY=()=>MARI()?'fisio-mari-v1':'fisio-std-v1';
const blank=()=>({stars:{},xp:0,best:0,erros:[],matched:[],pts:0,ganhos:0,vales:[],cravos:0});
let S;
function load(){try{S=Object.assign(blank(),JSON.parse(localStorage.getItem(KEY())||'{}'))}catch(e){S=blank()}S.erros=S.erros.filter(id=>byId[id])}
const save=()=>{try{localStorage.setItem(KEY(),JSON.stringify(S))}catch(e){}};
const ALL=P.flatMap(p=>p.qs.map((q,i)=>Object.assign({},q,{id:p.id+'-'+i,fase:p.nome,cor:COR[p.id]})));
const byId=Object.fromEntries(ALL.map(q=>[q.id,q]));

const $=s=>document.querySelector(s);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const starStr=n=>'★'.repeat(n)+'<i>'+'★'.repeat(3-n)+'</i>';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let timer=null,prevView='login';
function show(v){clearInterval(timer);const cur=[...document.querySelectorAll('.view')].find(x=>!x.hidden);if(cur&&cur.id!=='read')prevView=cur.id;document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!==v);window.scrollTo(0,0)}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('on'),1600)}
function modal(t,p){$('#mtitle').textContent=t;$('#mtext').textContent=p;$('#modal').hidden=false;$('#mclose').focus()}

const fasesFeitas=()=>P.filter(p=>(S.stars[p.id]||0)>=1).length;
const jogoCompleto=()=>(S.stars.boss||0)>=1;

/* ---------- confete ---------- */
function confetti(n=140){
 if(RM)return;
 const cv=$('#fx'),cx=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
 const cols=Object.values(COR).concat(['#ffc53d','#ff4d8d']);
 const ps=Array.from({length:n},()=>({x:innerWidth/2+(Math.random()-.5)*200,y:innerHeight*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:cols[Math.random()*cols.length|0],a:Math.random()*6,s:Math.random()*.3-.15}));
 let f=0;cancelAnimationFrame(confetti.raf);
 const step=()=>{cx.clearRect(0,0,cv.width,cv.height);
  for(const p of ps){p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.s;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);cx.restore()}
  if(++f<150)confetti.raf=requestAnimationFrame(step);else cx.clearRect(0,0,cv.width,cv.height)};
 step();
}

/* ---------- login ---------- */
function entrar(q){QUEM=q;try{localStorage.setItem('fisio-quem',q)}catch(e){}load();home()}
const norm=t=>t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
$('#lform').addEventListener('submit',ev=>{
 ev.preventDefault();
 const u=norm($('#luser').value),d=$('#lpass').value,err=$('#lerr');
 if(!u.startsWith('mari')){err.textContent='Hmm, esse usuário não é a Marianne.';return}
 if(!d){err.textContent='Escolhe a data no calendário.';return}
 if(d!==SENHA){err.textContent='Essa não é a nossa data. Tenta de novo!';$('#lpass').value='';return}
 err.textContent='';entrar('mari');setTimeout(()=>{toast('Oi, meu amor! Bora estudar?');confetti(90)},250);
});

/* ---------- paisagem ---------- */
const tree=(x,y,k)=>`<g transform="translate(${x},${y}) scale(${k})"><ellipse cx="0" cy="17" rx="14" ry="4" fill="rgba(0,0,0,.15)"/><rect x="-3" y="0" width="6" height="17" rx="2" fill="#8d5a3b"/><circle cx="0" cy="-6" r="16" fill="var(--tree)"/><circle cx="-6" cy="-11" r="6" fill="#fff" opacity=".18"/></g>`;
const cloud=`<g fill="var(--cloud)"><ellipse cx="0" cy="0" rx="48" ry="16"/><circle cx="-16" cy="-10" r="18"/><circle cx="12" cy="-16" r="22"/></g>`;
function bgSVG(){
 const trees=[[60,340,1],[230,300,.8],[380,360,1.1],[560,300,.7],[700,375,1],[880,300,.8],[1010,360,.9],[1150,300,.7],[1320,350,1.1],[1250,250,.6],[150,250,.6],[640,230,.55],[960,230,.55]].map(t=>tree(...t)).join('');
 return `<g transform="translate(610,70)"><circle r="70" fill="var(--sun)" opacity=".22"/><circle r="44" fill="var(--sun)"/></g>
 <g class="cloud" opacity=".95"><g transform="translate(120,60)">${cloud}</g></g>
 <g class="cloud b" opacity=".85"><g transform="translate(420,40) scale(.7)">${cloud}</g></g>
 <g class="cloud" style="animation-duration:75s;animation-delay:-50s" opacity=".7"><g transform="translate(300,110) scale(.5)">${cloud}</g></g>
 <path d="M0 220 Q160 130 340 200 T700 180 T1060 170 T1400 190 V420 H0z" fill="var(--h1)"/>
 <path d="M0 285 Q200 215 440 265 T900 255 T1400 262 V420 H0z" fill="var(--h2)"/>
 <path d="M0 345 Q260 305 560 335 T1100 325 T1400 335 V420 H0z" fill="var(--h3)"/>
 <g class="trees">${trees}</g>
 <path d="M0 405 Q350 385 700 405 T1400 405 V420 H0z" fill="var(--bg)"/>`;
}
function roadSVG(pts){
 let d=`M${pts[0][0]-60},${pts[0][1]+40} L${pts[0][0]},${pts[0][1]}`;
 for(let i=1;i<pts.length;i++){const[a,b]=pts[i-1],[c,e]=pts[i],m=(a+c)/2;d+=` C${m},${b} ${m},${e} ${c},${e}`}
 return `<svg viewBox="0 0 1000 400" aria-hidden="true"><path d="${d}" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="40" stroke-linecap="round" transform="translate(0,7)"/>
 <path d="${d}" fill="none" stroke="var(--road)" stroke-width="36" stroke-linecap="round"/>
 <path d="${d}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 16" stroke-linecap="round" opacity=".9"/></svg>`;
}

/* ---------- início ---------- */
function home(){
 if(!QUEM)return showLogin();
 const tot=Object.values(S.stars).reduce((a,b)=>a+b,0),max=(P.length+1)*3;
 $('#htitle').innerHTML=MARI()?'Marianne <span>jogando e estudando</span>':'Fisiologia <span>jogando e estudando</span>';
 $('#hsub').textContent=MARI()?'Ciências Fisiológicas, semanas 11 a 17. Cada acerto vale +10 pontos para gastar na lojinha. Siga a estrada até a prova!':'Ciências Fisiológicas, semanas 11 a 17: músculos, coração, pressão, SRAA, respiração e digestão. Siga a estrada até a prova!';
 $('#logout').textContent=MARI()?'Sair (trocar de usuário)':'Sair';
 const star='<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="#ffc53d" stroke="#c98a00" stroke-width="1.5" stroke-linejoin="round"/></svg>';
 $('#stats').innerHTML=(MARI()?`<div class="stat">${icon('heart','#ff4d8d')}<div><b>${S.pts}</b><small>pontos</small></div></div>`:`<div class="stat">${icon('bolt','#7048e8')}<div><b>${S.xp}</b><small>XP total</small></div></div>`)+
 `<div class="stat">${star}<div><b>${tot}/${max}</b><small>estrelas</small></div></div><div class="stat">${icon('crown','#f59e0b')}<div><b>${S.best}</b><small>recorde Relâmpago</small></div></div>`;
 const st=[...P,BOSS];
 $('#bg').innerHTML=bgSVG();
 $('#scene').innerHTML=roadSVG(st.map(p=>[p.x*10,p.y*4+14]))+
 st.map((p,i)=>`<button class="st${p.id==='boss'?' boss':''}" style="left:${p.x}%;top:${p.y}%;--tc:${COR[p.id]}" data-go="${p.id}"><span class="tok">${icon(p.id)}<em>${p.id==='boss'?'FIM':i+1}</em></span><span class="lbl">${p.nome}<small>${p.sub}</small></span><span class="stars">${starStr(S.stars[p.id]||0)}</span></button>`).join('');
 $('#modes').innerHTML=`
 <button class="mode" style="--mc:#7048e8" data-go="boss"><span class="ic">${icon('boss')}</span><span class="tag">15 perguntas sorteadas</span><h3>Prova N2</h3><p>Todos os tópicos misturados, como na prova de verdade.${MARI()?' Passar aqui completa o jogo.':''}</p></button>
 <button class="mode" style="--mc:#f59e0b" data-mode="flash"><span class="ic">${icon('bolt')}</span><span class="tag">60 segundos</span><h3>Relâmpago C/E</h3><p>Certo ou errado contra o relógio. Errar custa 5 pontos!</p></button>
 <button class="mode" style="--mc:#00b894" data-mode="match"><span class="ic">${icon('pairs')}</span><span class="tag">${S.matched.length}/${MATCH.length} conjuntos completos</span><h3>Combine os pares</h3><p>Ligue proteínas, hormônios, volumes e estruturas.</p></button>
 <button class="mode" style="--mc:#e5383b" data-go="erros" ${S.erros.length?'':'disabled'}><span class="ic">${icon('book')}</span><span class="tag">${S.erros.length} questão(ões) guardada(s)</span><h3>Caderno de erros</h3><p>${S.erros.length?'Refaça o que errou até zerar o caderno.':'Vazio por enquanto. Seus erros aparecem aqui.'}</p></button>`;
 $('#tips').innerHTML=`
 <div class="tip" style="--tc:#3a86ff"><b>Trilha</b>Cada parada sorteia 10 perguntas do tema. 3 vidas e um coringa 50/50 por fase.</div>
 <div class="tip" style="--tc:#ff4d8d"><b>${MARI()?'Pontos':'Combo'}</b>${MARI()?'Cada resposta certa vale +10 pontos. Gaste na lojinha lá em cima.':'Acertos seguidos multiplicam o XP. Estrelas: 90% = 3, 70% = 2, 50% = 1.'}</div>
 <div class="tip" style="--tc:#00b894"><b>Explicação</b>Depois de cada resposta: o porquê, de onde veio e, às vezes, uma versão em palavras simples.</div>
 <div class="tip" style="--tc:#f59e0b"><b>Atalhos</b>Teclas 1 a 4 para responder, Enter para avançar, C e E no Relâmpago.</div>`;
 renderShop();
 show('home');
}

/* ---------- lojinha (só Marianne) ---------- */
const ITENS=[
 {id:'b1',nome:'1 beijinho',preco:10,cor:'#ff4d8d',desc:'Válido na hora que você quiser.',lib:()=>true,libtxt:''},
 {id:'b5',nome:'5 beijinhos',preco:50,cor:'#ff7a59',desc:'Cinco, contados um por um.',lib:()=>fasesFeitas()>=1,libtxt:'Desbloqueia na fase 2 (conclua a fase 1 com pelo menos 1 estrela).'},
 {id:'b7',nome:'7 beijos e muitos abraços',preco:70,cor:'#7048e8',desc:'Abraços sem limite de tempo.',lib:()=>fasesFeitas()>=2,libtxt:'Desbloqueia na fase 3 (conclua 2 fases).'}
];
function renderShop(){
 const el=$('#shopsec');
 if(!MARI()){el.innerHTML='';return}
 const comp=jogoCompleto();
 const cards=ITENS.map(it=>{
  const ok=it.lib(),pode=ok&&S.pts>=it.preco;
  return `<div class="prize" style="--pc:${it.cor}"><span class="price">${it.preco} pontos</span><h3>${it.nome}</h3><p>${it.desc}</p>${ok?'':`<span class="lock">🔒 ${it.libtxt}</span>`}<button class="buy" data-buy="${it.id}" ${pode?'':'disabled'}>${ok?(S.pts>=it.preco?'Comprar':'Faltam '+(it.preco-S.pts)+' pontos'):'Bloqueado'}</button></div>`}).join('');
 let cravos;
 if(S.cravos>=2)cravos=`<p><b>Já é seu!</b> O vale está lá embaixo.</p>`;
 else if(S.cravos===1&&!comp)cravos=`<p class="lock">Você pegou o botão uma vez. Agora complete o jogo (passe na Prova N2) para tentar comprar de novo.</p>`;
 else cravos=`<div class="arena${S.cravos===1?' hard':''}" id="arena"><button class="buy" id="cravo" style="--pc:#00b894">Comprar por 100 pontos</button><span class="msg" id="cmsg">${S.cravos===1?'Segunda chance: agora ele está mais esperto.':'Tenta pegar o botão...'}</span></div>`;
 const infinito=comp
  ?`<p>Você completou o jogo! Quando encontrar o Vinícius, diga o código secreto. Se não falar, não ganha.</p><div class="code">"${CODIGO}"</div>`
  :`<p>Complete o jogo e diga o código secreto que aparece no fim assim que encontrar o Vinícius.</p><span class="lock">🔒 O código aparece quando você passar na Prova N2.</span>`;
 el.innerHTML=`<h2 class="sec">Lojinha da Mari <span style="font-size:18px;color:var(--pink)">· você tem ${S.pts} pontos</span></h2>
 <div class="shop">${cards}
 <div class="prize" style="--pc:#00b894"><span class="price">100 pontos</span><h3>Sessão de espremer cravos (10 minutos)</h3>${cravos}</div>
 <div class="prize wide" style="--pc:#ff4d8d"><span class="price">Grátis, com o código</span><h3>Beijos infinitos pra sempre</h3>${infinito}</div>
 </div>
 ${S.vales.length?`<h2 class="sec" style="font-size:24px;margin-top:6px">Meus vales <span style="font-size:15px;color:var(--mut)">(mostre para o Vinícius)</span></h2><div class="vales">${S.vales.map(v=>`<div class="vale">${icon('heart','#ff4d8d').replace('<svg','<svg style="width:28px;height:28px;flex:none"')}<b>${esc(v.nome)}</b><small>${esc(v.quando)}</small></div>`).join('')}</div>`:''}
 <div style="height:30px"></div>`;
 setupCravo();
}
function addVale(nome){S.vales.unshift({nome,quando:new Date().toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})});save()}
function comprar(id){
 const it=ITENS.find(x=>x.id===id);if(!it||!it.lib()||S.pts<it.preco)return;
 S.pts-=it.preco;addVale(it.nome);confetti(90);toast('Comprado: '+it.nome+'!');home();
}

/* botão fujão */
let C=null;
function setupCravo(){
 const ar=$('#arena'),b=$('#cravo');if(!ar||!b){C=null;return}
 const hard=S.cravos===1;
 C={ar,b,hard,fugas:0,max:hard?25:10,raio:hard?150:95,ult:0};
}
function fugir(px,py){
 const ag=performance.now();if(ag-C.ult<(C.hard?160:260))return;C.ult=ag;
 const r=C.ar.getBoundingClientRect(),bw=C.b.offsetWidth,bh=C.b.offsetHeight;
 let best=null,bd=-1;
 for(let i=0;i<12;i++){
  const x=bw/2+8+Math.random()*(r.width-bw-16),y=bh/2+8+Math.random()*(r.height-bh-16);
  const d=Math.hypot(r.left+x-px,r.top+y-py);if(d>bd){bd=d;best=[x,y]}
 }
 C.b.style.left=best[0]+'px';C.b.style.top=best[1]+'px';C.fugas++;
 const falas=C.hard?['Ih, ficou mais rápido!','Quase!','Nem vem!','Tá esquentando...','Mais uma!']:['Opa!','Quase!','Tenta de novo!','Hehe'];
 $('#cmsg').textContent=C.fugas>=C.max?'Ele cansou... pega agora!':falas[Math.random()*falas.length|0];
}
document.addEventListener('pointermove',ev=>{
 if(!C||!document.body.contains(C.b)||C.fugas>=C.max||ev.pointerType==='touch')return;
 const r=C.b.getBoundingClientRect();
 const d=Math.hypot(r.left+r.width/2-ev.clientX,r.top+r.height/2-ev.clientY);
 if(d<C.raio)fugir(ev.clientX,ev.clientY);
});
function pegouCravo(){
 if(C.fugas<C.max){const r=C.b.getBoundingClientRect();fugir(r.left+r.width/2,r.top+r.height/2);return}
 if(S.cravos===0){
  S.cravos=1;save();
  modal('Pegou!','COMPLETE O JOGO PARA TENTAR COMPRAR NOVAMENTE');renderShop();return;
 }
 if(S.pts<100){toast('Pegou! Mas faltam '+(100-S.pts)+' pontos. Ele vai fugir de novo...');C.fugas=Math.max(0,C.max-6);return}
 S.pts-=100;S.cravos=2;addVale('Sessão de espremer cravos (10 min)');confetti(120);modal('Agora é seu!','Sessão de espremer cravos de 10 minutos garantida. O vale está na sua lista.');home();
}

/* ---------- quiz ---------- */
let G;
function startQuiz(id){
 let qs,nome;
 if(id==='boss'){qs=shuf(ALL).slice(0,15);nome='Prova N2'}
 else if(id==='erros'){qs=shuf(S.erros.map(k=>byId[k]));nome='Caderno de erros'}
 else{const p=P.find(x=>x.id===id);qs=shuf(ALL.filter(q=>q.id.startsWith(id+'-'))).slice(0,10);nome=p.nome+' · '+p.sub}
 if(!qs.length)return home();
 G={id,nome,qs,i:0,vidas:id==='erros'?Infinity:3,combo:0,maxc:0,ok:0,xp:0,pts:0,wrong:[],joker:true,done:false};
 $('#play').style.setProperty('--c',COR[id]);$('#end').style.setProperty('--c',COR[id]);
 $('#gname').textContent=nome;show('play');renderQ();
}
function hud(){
 $('#lives').textContent=G.vidas===Infinity?'∞ vidas':'♥'.repeat(Math.max(G.vidas,0))+'♡'.repeat(3-Math.max(G.vidas,0));
 const cb=$('#combo');cb.hidden=G.combo<2;if(G.combo>=2){cb.textContent='Combo x'+G.combo;cb.style.animation='none';cb.offsetHeight;cb.style.animation=''}
 const gx=$('#gxp');gx.className='pill'+(MARI()?' pts':'');gx.textContent=MARI()?S.pts+' pontos':G.xp+' XP';
 $('#gprog').style.width=(G.i/G.qs.length*100)+'%';
}
function renderQ(){
 const q=G.qs[G.i];G.done=false;
 G.opts=shuf(q.o.map((t,k)=>({t,ok:k===0})));
 if(G.id==='boss'||G.id==='erros')$('#play').style.setProperty('--c',q.cor);
 $('#qmeta').textContent=`Pergunta ${G.i+1} de ${G.qs.length}`+(G.id==='boss'||G.id==='erros'?' · '+q.fase:'');
 $('#qtext').textContent=q.q;
 $('#opts').innerHTML=G.opts.map((o,k)=>`<button class="opt" data-k="${k}"><span class="k">${'ABCD'[k]}</span><span></span></button>`).join('');
 document.querySelectorAll('#opts .opt span:last-child').forEach((s,k)=>s.textContent=G.opts[k].t);
 $('#fb').innerHTML='';
 $('#qrow').innerHTML=`<button class="btn joker" id="joker" ${G.joker?'':'disabled'}>Coringa 50/50</button><span class="hint">${G.joker?'Elimina duas alternativas erradas (1 por fase).':'Coringa já usado nesta fase.'}</span>`;
 hud();
}
function useJoker(){
 if(!G.joker||G.done)return;G.joker=false;
 shuf(G.opts.map((o,k)=>o.ok?-1:k).filter(k=>k>=0)).slice(0,2).forEach(k=>{const b=document.querySelector(`#opts .opt[data-k="${k}"]`);b.classList.add('gone');b.disabled=true});
 $('#joker').disabled=true;
}
const face=ok=>`<svg class="face" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="${ok?'#12a150':'#e5383b'}"/><circle cx="18" cy="21" r="3.5" fill="#fff"/><circle cx="34" cy="21" r="3.5" fill="#fff"/><path d="${ok?'M15 30q11 12 22 0':'M16 37q10-9 20 0'}" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`;
function answer(k){
 if(G.done)return;G.done=true;
 const q=G.qs[G.i],right=G.opts[k].ok;
 document.querySelectorAll('#opts .opt').forEach((b,j)=>{b.disabled=true;if(G.opts[j].ok)b.classList.add('ok');else if(j===k)b.classList.add('bad')});
 if(right){
  G.ok++;G.combo++;G.maxc=Math.max(G.maxc,G.combo);
  const gain=10+Math.min(G.combo-1,4)*5;G.xp+=gain;
  if(MARI()){S.pts+=10;S.ganhos+=10;G.pts+=10}
  if(G.combo>=3)toast(MARI()?`Combo x${G.combo}! +10 pontos`:`Combo x${G.combo}! +${gain} XP`);
  if(G.combo===5)confetti(60);
  if(G.id==='erros')S.erros=S.erros.filter(x=>x!==q.id);
 }else{
  G.combo=0;G.vidas--;G.wrong.push({q,mine:G.opts[k].t});
  if(!S.erros.includes(q.id))S.erros.push(q.id);
 }
 save();
 const frases=right?(MARI()?['Acertou, amor! +10','Mandou bem! +10','Isso aí! +10','Perfeita! +10']:['Acertou!','Mandou bem!','Isso aí!','Perfeito!']):['Quase!','Não foi dessa vez','Opa, cuidado!'];
 $('#fb').innerHTML=`<div class="fb ${right?'ok':'bad'}">${face(right)}<h3>${frases[Math.random()*frases.length|0]}<span class="ref"></span></h3>${right?'':'<p><b>Resposta certa:</b> <span class="ca"></span></p>'}<p class="ex"></p>${q.s?'<p class="kid"><b>Em palavras simples:</b> <span class="sm"></span></p>':''}</div>`;
 $('#fb .ref').textContent=q.r;$('#fb .ex').textContent=q.e;
 if(!right)$('#fb .ca').textContent=q.o[0];
 if(q.s)$('#fb .sm').textContent=q.s;
 const last=G.i===G.qs.length-1||G.vidas<=0;
 $('#qrow').innerHTML=`<button class="btn" id="next">${G.vidas<=0?'Ver resultado':last?'Finalizar fase':'Próxima →'}</button><span class="hint">ou aperte Enter</span>`;
 hud();$('#next').focus({preventScroll:true});
 $('#fb').scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'});
}
function next(){
 if(!G.done)return;
 if(G.vidas<=0||G.i===G.qs.length-1)return endQuiz();
 G.i++;renderQ();
}
const trophy=c=>`<svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="52" fill="${c}" opacity=".15"/><path d="M35 24h40v18c0 13-9 22-20 22s-20-9-20-22z" fill="#ffc53d" stroke="#c98a00" stroke-width="3"/><path d="M35 30H24c0 12 6 18 14 18M75 30h11c0 12-6 18-14 18" fill="none" stroke="#c98a00" stroke-width="4"/><rect x="50" y="63" width="10" height="13" fill="#c98a00"/><rect x="38" y="76" width="34" height="10" rx="3" fill="${c}"/><path d="M48 34l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#fff" opacity=".85" transform="translate(3,-2) scale(.95)"/></svg>`;
function endQuiz(){
 const n=G.qs.length,pct=Math.round(G.ok/n*100),dead=G.vidas<=0;
 const stars=dead?0:pct>=90?3:pct>=70?2:pct>=50?1:0;
 const antesCompleto=jogoCompleto(),antesFases=fasesFeitas();
 S.xp+=G.xp;
 if(G.id!=='erros')S.stars[G.id]=Math.max(S.stars[G.id]||0,stars);
 save();
 $('#ename').textContent=G.nome;
 $('#trophy').innerHTML=trophy(COR[G.id]);
 $('#estars').innerHTML=G.id==='erros'?'':starStr(stars);
 $('#ebig').textContent=G.ok+'/'+n;
 const msg=G.id==='erros'?(S.erros.length?`Ainda restam ${S.erros.length} no caderno. Mais uma rodada?`:'Caderno de erros zerado. Excelente!'):dead?'Acabaram as vidas. Leia as explicações abaixo e tente de novo: as perguntas mudam a cada rodada.':stars===3?'Mandou muito bem! Esse tema está dominado.':stars===2?'Muito bom! Revise os erros abaixo para chegar às 3 estrelas.':stars===1?'Passou! Releia as explicações e refaça para ganhar mais estrelas.':'Ainda não passou (precisa de 50%). Bora revisar e tentar de novo.';
 $('#emsg').textContent=`${msg} `+(MARI()?`Você ganhou ${G.pts} pontos nesta rodada e tem ${S.pts} no total.`:`Você ganhou ${G.xp} XP; maior combo: ${G.maxc}.`);
 let sec='';
 if(MARI()){
  if(G.id==='boss'&&jogoCompleto()){
   sec=`<div class="secret"><h3>${antesCompleto?'Você já completou o jogo!':'Você completou o jogo!'}</h3><p style="margin:0">Código secreto dos beijos infinitos. Diga isso para o Vinícius assim que encontrar com ele:</p><div class="code">"${CODIGO}"</div><p class="hint" style="margin:0">Se não falar, não ganha. ${S.cravos===1?'E o botão dos cravos voltou para a lojinha.':''}</p></div>`;
  }else if(G.id!=='boss'&&G.id!=='erros'&&fasesFeitas()>antesFases){
   const n=fasesFeitas();
   if(n===1)sec=`<div class="secret"><h3>Liberou na lojinha: 5 beijinhos</h3></div>`;
   else if(n===2)sec=`<div class="secret"><h3>Liberou na lojinha: 7 beijos e muitos abraços</h3></div>`;
  }
 }
 $('#esecret').innerHTML=sec;
 $('#erow').innerHTML=`<button class="btn" data-go="${G.id}">Jogar de novo</button><button class="btn alt" data-home>Voltar à trilha</button>`;
 fillReview(G.wrong.map(w=>[w.q.q,'Você marcou: '+w.mine,'Certa: '+w.q.o[0]+' ('+w.q.r+')',w.q.e]),'Para revisar');
 show('end');
 if(stars>=2||(G.id==='boss'&&stars>=1)||(G.id==='erros'&&!S.erros.length))setTimeout(()=>confetti(),250);
}
function fillReview(rows,title){
 $('#erev').innerHTML=rows.length?`<h2 class="sec" style="margin-top:10px">${title}</h2>`+rows.map(()=>'<div><b></b><span class="mine"></span><br><span class="ans"></span><p style="margin:6px 0 0"></p></div>').join(''):'';
 document.querySelectorAll('#erev > div').forEach((el,k)=>{const r=rows[k];el.querySelector('b').textContent=r[0];el.querySelector('.mine').textContent=r[1];el.querySelector('.ans').textContent=r[2];el.querySelector('p').textContent=r[3]});
}

/* ---------- relâmpago ---------- */
let F;
function setClock(){const r=$('#ring');r.style.strokeDashoffset=326.7*(1-F.t/60);$('#ftime').textContent=F.t;$('#clock').classList.toggle('low',F.t<=10);r.style.stroke=F.t<=10?'var(--bad)':'var(--c)'}
function startFlash(){
 F={q:shuf(CE),i:0,score:0,t:60,wrong:[],hits:0};
 show('flash');$('#flast').className='last';$('#flast').textContent='Responda o máximo que conseguir. Teclas C e E também funcionam.';
 drawFlash();setClock();
 timer=setInterval(()=>{F.t--;setClock();if(F.t<=0)endFlash()},1000);
}
function drawFlash(){
 if(F.i>=F.q.length)F.q=F.q.concat(shuf(CE));
 $('#ftext').textContent=F.q[F.i][0];$('#fscore').textContent=F.score+' pts';
}
function flashAns(v){
 if(!F||F.t<=0||$('#flash').hidden)return;
 const it=F.q[F.i],right=(v===1)===(it[1]===1);
 if(right){F.score+=10;F.hits++}else{F.score=Math.max(0,F.score-5);F.wrong.push(it)}
 const l=$('#flast');l.className='last '+(right?'ok':'bad');
 l.textContent=(right?'✓ Isso! ':'✗ Era '+(it[1]?'CERTO':'ERRADO')+'. ')+'"'+it[0]+'" → '+it[2];
 F.i++;drawFlash();
}
function endFlash(){
 clearInterval(timer);
 const rec=F.score>S.best;if(rec)S.best=F.score;S.xp+=F.score;save();
 $('#end').style.setProperty('--c','#f59e0b');
 $('#ename').textContent='Relâmpago C/E';$('#estars').innerHTML='';$('#trophy').innerHTML=trophy('#f59e0b');$('#esecret').innerHTML='';
 $('#ebig').textContent=F.score+' pts';
 $('#emsg').textContent=(rec?'Novo recorde! ':'Recorde: '+S.best+' pts. ')+`${F.hits} acertos e ${F.wrong.length} erros em 60 segundos.`;
 $('#erow').innerHTML=`<button class="btn" data-mode="flash">Jogar de novo</button><button class="btn alt" data-home>Voltar à trilha</button>`;
 const seen=new Set();const w=F.wrong.filter(x=>!seen.has(x[0])&&seen.add(x[0]));
 fillReview(w.map(x=>[x[0],'',' Gabarito: '+(x[1]?'CERTO':'ERRADO'),x[2]]),'Afirmações que você errou');
 show('end');
 if(rec&&F.score>0)setTimeout(()=>confetti(),250);
}

/* ---------- pares ---------- */
let M;
function startMatch(n){
 if(n==null){n=MATCH.findIndex(m=>!S.matched.includes(m.nome));if(n<0)n=0}
 const set=MATCH[n];
 M={n,set,sel:null,miss:0,left:set.pares.length};
 $('#sets').innerHTML=MATCH.map((m,k)=>`<button data-set="${k}" class="${k===n?'on':''} ${S.matched.includes(m.nome)?'done':''}">${m.nome}</button>`).join('');
 const L=shuf(set.pares.map((p,k)=>({t:p[0],k}))),R=shuf(set.pares.map((p,k)=>({t:p[1],k})));
 $('#mL').innerHTML=L.map(x=>`<button class="tile L" data-side="L" data-k="${x.k}"></button>`).join('');
 $('#mR').innerHTML=R.map(x=>`<button class="tile" data-side="R" data-k="${x.k}"></button>`).join('');
 document.querySelectorAll('#mL .tile').forEach((b,i)=>b.textContent=L[i].t);
 document.querySelectorAll('#mR .tile').forEach((b,i)=>b.textContent=R[i].t);
 $('#mdone').innerHTML='';$('#mmiss').textContent='0 erros';
 show('match');
}
function tile(b){
 if(b.disabled)return;
 if(b.dataset.side==='L'){document.querySelectorAll('#mL .tile').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');M.sel=b;return}
 if(!M.sel){toast('Escolha primeiro um item da esquerda');return}
 if(M.sel.dataset.k===b.dataset.k){
  [M.sel,b].forEach(x=>{x.classList.remove('sel');x.classList.add('ok');x.disabled=true});M.sel=null;M.left--;
  if(!M.left){
   if(!S.matched.includes(M.set.nome))S.matched.push(M.set.nome);
   const gain=Math.max(10,60-M.miss*10);S.xp+=gain;save();
   const nxt=MATCH.findIndex(m=>!S.matched.includes(m.nome));
   $('#mdone').innerHTML=`<div class="fb ok">${face(true)}<h3>Conjunto completo!</h3><p class="ex"></p></div><div class="row"><button class="btn" data-set="${nxt<0?(M.n+1)%MATCH.length:nxt}">Próximo conjunto →</button><button class="btn alt" data-set="${M.n}">Embaralhar de novo</button></div>`;
   $('#mdone .ex').textContent='Dica: '+M.set.dica;
   document.querySelector(`#sets [data-set="${M.n}"]`).classList.add('done');
   confetti(M.miss?70:140);
  }
 }else{
  M.miss++;$('#mmiss').textContent=M.miss+(M.miss===1?' erro':' erros');
  b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),400);
 }
}

/* ---------- leitura ---------- */
let RTAB=0;
function openRead(){show('read');drawRead()}
function drawRead(){
 $('#rtabs').innerHTML=LEIT.map((l,k)=>`<button data-rt="${k}" class="${k===RTAB?'on':''}">${l.titulo}</button>`).join('');
 const l=LEIT[RTAB];
 $('#rbody').innerHTML=`<h2 style="font-size:30px;margin-bottom:10px">${l.titulo}</h2>${l.html}`+(l.pdf?`<div class="row" style="margin-top:6px"><a class="btn" style="--c:#7048e8;text-decoration:none;color:#fff" href="${l.pdf}" target="_blank" rel="noopener">Abrir o PDF em tela cheia</a></div><div class="pdfwrap"><iframe src="${l.pdf}#view=FitH" title="${l.titulo}"></iframe></div>`:'');
}
$('#rback').addEventListener('click',()=>{if(QUEM)home();else showLogin()});

function showLogin(){$('#luser').value='';$('#lpass').value='';$('#lerr').textContent='';show('login')}

/* ---------- eventos ---------- */
document.addEventListener('click',ev=>{
 const t=ev.target.closest('button,[data-rt]');if(!t)return;
 if(t.id==='mclose'){$('#modal').hidden=true;return}
 if(t.id==='cravo'){ev.preventDefault();return pegouCravo()}
 if(t.dataset.buy)return comprar(t.dataset.buy);
 if(t.dataset.std!==undefined)return entrar('std');
 if(t.dataset.read!==undefined)return openRead();
 if(t.dataset.rt!==undefined){RTAB=+t.dataset.rt;return drawRead()}
 if(t.id==='logout'){QUEM=null;try{localStorage.removeItem('fisio-quem')}catch(e){}return showLogin()}
 if(t.dataset.home!==undefined)return home();
 if(t.dataset.go)return startQuiz(t.dataset.go);
 if(t.dataset.mode==='flash')return startFlash();
 if(t.dataset.mode==='match')return startMatch();
 if(t.dataset.set!==undefined)return startMatch(+t.dataset.set);
 if(t.classList.contains('opt'))return answer(+t.dataset.k);
 if(t.id==='joker')return useJoker();
 if(t.id==='next')return next();
 if(t.id==='fc')return flashAns(1);
 if(t.id==='fe')return flashAns(0);
 if(t.classList.contains('tile'))return tile(t);
 if(t.id==='reset'){
  if(t.dataset.arm){S=blank();save();home();toast('Progresso zerado')}
  else{t.dataset.arm='1';t.textContent='Clique de novo para confirmar';setTimeout(()=>{t.textContent='Zerar meu progresso';delete t.dataset.arm},3000)}
 }
});
document.addEventListener('keydown',ev=>{
 if(ev.ctrlKey||ev.metaKey||ev.altKey)return;
 if(!$('#modal').hidden&&(ev.key==='Escape'||ev.key==='Enter')){$('#modal').hidden=true;ev.preventDefault();return}
 if(!$('#play').hidden){
  const m={'1':0,'2':1,'3':2,'4':3,a:0,b:1,c:2,d:3}[ev.key.toLowerCase()];
  if(m!==undefined){const b=document.querySelector(`#opts .opt[data-k="${m}"]`);if(b&&!b.disabled)answer(m)}
  else if(ev.key==='Enter'&&G.done){ev.preventDefault();next()}
 }else if(!$('#flash').hidden){
  if(ev.key==='c'||ev.key==='C'||ev.key==='ArrowLeft')flashAns(1);
  if(ev.key==='e'||ev.key==='E'||ev.key==='ArrowRight')flashAns(0);
 }
});
if(QUEM){load();home()}else showLogin();
}
