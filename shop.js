/* Dex Shop — логика магазина */
const DEF_SHOP=Object.assign({phone:'',whatsapp:'',email:'',address:'',hours:'',instagram:'',telegram:''},window.SHOP_DEFAULTS||{});
let SHOP={...DEF_SHOP};
let OVR={};      // цены из админ-панели {id:{price,old}}
let PH0={};      // главные фото {id:url}
let PHX={};      // фото по цветам {id:{c:url}}
const priceOf=p=>{const v=OVR[p.id]?.price;return (typeof v==='number'&&v>0)?v:p.price};
const oldOf=p=>{const o=OVR[p.id];if(o&&'old' in o)return (typeof o.old==='number'&&o.old>0)?o.old:0;return p.old||0};
const photoOf=(p,c)=>safeUrl((PHX[p.id]||{})[c]||(c==0?PH0[p.id]:'')||(PHX[p.id]||{})[0]||PH0[p.id]||'');
function vis(p,c=0){const u=photoOf(p,c);return u?`<img src="${esc(u)}" alt="${esc(p.name)}" loading="lazy">`:p.draw(p.colors[c]?.[1]||p.colors[0][1]);}
const memAdd=(p,m)=>p.mem?p.mem[m][1]:0;

/* =========================================================
   Render: catalog, gifts, contacts
   ========================================================= */
let filter='all';
const TABS=[['all','Все'],...CATS.filter(c=>c[0]!=='gifts').map(c=>[c[0],c[1]])];
function renderTabs(){document.getElementById('tabs').innerHTML=TABS.map(([k,n])=>`<button class="tab ${k===filter?'on':''}" data-tab="${k}">${n}</button>`).join('');}
function renderGrid(){
  const list=P.filter(p=>!p.hidden&&(filter==='all'||p.cat===filter));
  document.getElementById('grid').innerHTML=list.map((p,i)=>{const old=oldOf(p);return `
   <article class="card" data-open="${p.id}" style="animation-delay:${i*40}ms">
     <div class="img">${p.tag?`<span class="tag ${p.tag==='Флагман'?'dark':''}">${p.tag}</span>`:''}${vis(p,0)}</div>
     <div class="info"><div class="brand">${p.brand}</div><h3>${p.name}</h3><div class="short">${p.short}</div>
       <div class="row"><div class="price">${old?`<s>${som(old)}</s>`:''}${som(priceOf(p))}</div>
         <div class="buy"><button class="b1" data-open="${p.id}">Купить</button><button class="b2" data-add="${p.id}" aria-label="В корзину"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 1v12M1 7h12"/></svg></button></div></div></div>
   </article>`}).join('');
}
function renderGifts(){
  const g1=byId['gift-iphone'], g2=byId['gift-rog'];
  document.getElementById('giftVis1').innerHTML=vis(g1,0);
  document.getElementById('giftVis2').innerHTML=vis(g2,0);
  document.getElementById('gp1').innerHTML=som(priceOf(g1))+(oldOf(g1)?` <s>${som(oldOf(g1))}</s>`:'');
  document.getElementById('gp2').innerHTML=som(priceOf(g2))+(oldOf(g2)?` <s>${som(oldOf(g2))}</s>`:'');
}
const waNum=()=>String(SHOP.whatsapp||'').replace(/\D/g,'');
function applyShop(){
  const map={...SHOP,whatsappText:waNum()?('+'+waNum()):''};
  document.querySelectorAll('[data-shop]').forEach(el=>{el.textContent=map[el.dataset.shop]||''});
  const s=[];
  if(SHOP.instagram)s.push(`<a href="https://instagram.com/${encodeURIComponent(SHOP.instagram.replace(/^@/,''))}" target="_blank" rel="noopener" title="Instagram">IG</a>`);
  if(SHOP.telegram)s.push(`<a href="https://t.me/${encodeURIComponent(SHOP.telegram.replace(/^@/,''))}" target="_blank" rel="noopener" title="Telegram">TG</a>`);
  if(waNum())s.push(`<a href="https://wa.me/${waNum()}" target="_blank" rel="noopener" title="WhatsApp">WA</a>`);
  document.getElementById('socials').innerHTML=s.join('');
  document.getElementById('heroBuy').textContent='Купить за '+som(priceOf(byId.s24u));
  const hp=safeUrl(PH0.hero||'');
  document.getElementById('stage').classList.toggle('has-photo',!!hp);
  if(hp)document.getElementById('heroImgEl').src=hp;
}
function renderAll(){renderTabs();renderGrid();renderGifts();applyShop();renderCart();}
document.getElementById('cats').innerHTML=CATS.map(([k,n,s])=>`<button class="cat" data-cat="${k}"><span class="cico">${catIcon[k]}</span><span>${n}<small>${s}</small></span></button>`).join('');
function setFilter(f){filter=f;renderTabs();renderGrid();}

/* =========================================================
   Product modal
   ========================================================= */
const overlay=document.getElementById('overlay'), mview=document.getElementById('mview'), order=document.getElementById('order');
let cur=null, sel={c:0,m:0};
const arr='<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9 9 3M4 3h5v5"/></svg>';
const curPrice=()=>priceOf(cur)+memAdd(cur,sel.m);
function openOverlay(){overlay.classList.add('open');overlay.scrollTop=0;document.body.style.overflow='hidden';}
function openProduct(id){
  cur=byId[id]; if(!cur)return; sel={c:0,m:0};
  if(DEX.loadProductPhotos)DEX.loadProductPhotos(id).catch(()=>{});
  order.classList.remove('show'); mview.style.display='';
  renderModal(); openOverlay();
}
function priceBlock(){const old=oldOf(cur);return `<small>${old&&sel.m===0?'<s>'+som(old)+'</s>':'Цена'}</small>${som(curPrice())}`}
function renderModal(){
  const p=cur, catName=(CATS.find(c=>c[0]===p.cat)||[])[1]||'';
  mview.innerHTML=`
  <div class="mtop">
    <div class="mcol left">
      <div class="mini"><b>${p.mini[0]}</b><br><span style="color:var(--mute)">${p.mini[1]}</span><span class="arr">${arr}</span></div>
      <div class="mini dark"><div class="mthumb">${vis(p,0)}</div><span style="font-size:12px;opacity:.75;position:relative">${p.brand} · ${catName}</span><span class="arr" style="border-color:#555">${arr}</span></div>
      <div class="mini big"><b class="n">${p.mini[2]}</b><span style="color:var(--mute)">${p.mini[3]}</span></div>
    </div>
    <div class="mcenter">
      <div class="mcat">${p.brand} · ${catName}</div>
      <h2>${p.name}</h2>
      <div class="tl">${p.tl}</div>
      <div class="mvis" id="mvis">${vis(p,sel.c)}</div>
    </div>
    <div class="mcol opts">
      <div class="opt-l" style="margin-top:6px">Цвет</div>
      <div class="swatches">${p.colors.map((c,i)=>`<button class="sw ${i===sel.c?'on':''}" style="background:${c[1]}" data-sw="${i}" aria-label="${c[0]}"></button>`).join('')}</div>
      <div class="sw-name" id="swName">${p.colors[sel.c][0]}</div>
      ${p.mem?`<div class="opt-l">Конфигурация</div><div class="pills">${p.mem.map((m,i)=>`<button class="pill ${i===sel.m?'on':''}" data-mem="${i}">${m[0]}</button>`).join('')}</div>`:''}
      <div class="mprice" id="mprice">${priceBlock()}</div>
      <div style="font-size:12px;color:var(--mute);margin-top:4px" id="minst">или от ${som(Math.ceil(curPrice()/12))}/мес. в рассрочку</div>
      <div class="mbtns">
        <button class="btn" data-act="order">Заказать</button>
        <button class="btn ghost" data-act="add">В корзину</button>
      </div>
    </div>
  </div>
  <div class="msec">
    <h3>Характеристики.<br><span>Модель ${p.name}</span></h3>
    <div class="specs">${p.specs.map(s=>`<div class="spec"><small>${s[0]}</small><b>${s[1]}</b></div>`).join('')}</div>
  </div>
  <div class="msec">
    <h3>Качество.<br>В каждой <span>детали.</span></h3>
    <div class="quals">${p.quals.map(q=>`<div class="qual ${q[3]?'dark':''}"><h4>${q[0]}</h4><p>${q[1]}</p><div class="qi">${ICO[q[2]]}</div><div class="q-arr">${arr}</div></div>`).join('')}</div>
  </div>
  <div class="mstrip">
    <div><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2 4 5v5c0 5 3 8 7 10 4-2 7-5 7-10V5z"/></svg>Официальная гарантия 1 год</div>
    <div><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 6h13v10H1zM14 9h4l3 3v4h-7"/><circle cx="5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/></svg>Бесплатно по Бишкеку</div>
    <div><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11a8 8 0 0 1 14-5l2 2M19 11a8 8 0 0 1-14 5l-2-2M19 3v5h-5M3 19v-5h5"/></svg>Возврат 14 дней</div>
    <div><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="10" width="14" height="10" rx="2"/><path d="M7 10V7a4 4 0 0 1 8 0v3"/></svg>Оплата при получении</div>
  </div>
  <div class="mbar"><div class="p" id="mbarP">${som(curPrice())}<small>${p.colors[sel.c][0]}${p.mem?' · '+p.mem[sel.m][0]:''}</small></div>
    <button class="b2" data-act="add" aria-label="В корзину"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3.5 6.5h11l-1 9.5h-9z"/><path d="M6.5 8V5.5a2.5 2.5 0 0 1 5 0V8"/></svg></button>
    <button class="btn" data-act="order">Заказать</button></div>`;
}
function updateModalPrice(){
  document.getElementById('mprice').innerHTML=priceBlock();
  document.getElementById('minst').textContent=`или от ${som(Math.ceil(curPrice()/12))}/мес. в рассрочку`;
  document.getElementById('mbarP').innerHTML=`${som(curPrice())}<small>${cur.colors[sel.c][0]}${cur.mem?' · '+cur.mem[sel.m][0]:''}</small>`;
}
function closeModal(){overlay.classList.remove('open');document.body.style.overflow='';}
document.getElementById('mclose').onclick=closeModal;
overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeSide();}});
mview.addEventListener('click',e=>{
  const sw=e.target.closest('[data-sw]'), mem=e.target.closest('[data-mem]'), act=e.target.closest('[data-act]');
  if(sw){sel.c=+sw.dataset.sw;mview.querySelectorAll('.sw').forEach((b,i)=>b.classList.toggle('on',i===sel.c));
    document.getElementById('swName').textContent=cur.colors[sel.c][0];document.getElementById('mvis').innerHTML=vis(cur,sel.c);updateModalPrice();}
  if(mem){sel.m=+mem.dataset.mem;mview.querySelectorAll('.pill').forEach((b,i)=>b.classList.toggle('on',i===sel.m));updateModalPrice();}
  if(act&&act.dataset.act==='add')addToCart(cur.id,sel.c,sel.m);
  if(act&&act.dataset.act==='order')showOrder([{id:cur.id,c:sel.c,m:sel.m,q:1}]);
});

/* =========================================================
   Order → WhatsApp
   ========================================================= */
let orderItems=[], orderText='';
const itemLabel=it=>{const p=byId[it.id];return `${p.name}${p.mem?', '+p.mem[it.m][0]:''}, ${p.colors[it.c][0]}`};
const itemPrice=it=>{const p=byId[it.id];return (priceOf(p)+memAdd(p,it.m))*it.q};
function showOrder(items){
  orderItems=items;
  const total=items.reduce((s,it)=>s+itemPrice(it),0);
  document.getElementById('orderSum').innerHTML=items.map(it=>`${esc(itemLabel(it))} × ${it.q}`).join('<br>')+`<br><b style="color:var(--ink);font-size:18px">Итого: ${som(total)}</b>`;
  mview.style.display='none'; order.classList.add('show');
  document.getElementById('orderFormWrap').style.display=''; document.getElementById('done').classList.remove('show');
  document.getElementById('orderBack').style.display=cur?'':'none';
  openOverlay();
}
document.getElementById('orderBack').onclick=()=>{order.classList.remove('show');mview.style.display='';};
document.getElementById('orderForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const f=e.target, v=k=>f.elements[k].value.trim(), btn=f.querySelector('[type=submit]');
  const num='DX-'+Math.floor(100000+Math.random()*899999);
  const total=orderItems.reduce((s,it)=>s+itemPrice(it),0);
  const order={num,total,
    items:orderItems.map(it=>{const p=byId[it.id];return {id:it.id,name:p.name,variant:`${p.mem?p.mem[it.m][0]+', ':''}${p.colors[it.c][0]}`,qty:it.q,sum:itemPrice(it)}}),
    name:v('name').slice(0,90),phone:v('phone').slice(0,30),city:v('city'),delivery:v('delivery'),addr:v('addr').slice(0,300),pay:v('pay'),wrap:v('wrap'),note:v('note').slice(0,500)};
  orderText=[`🛍 Заказ ${num} — Dex Shop`,'',
    ...order.items.map((it,i)=>`${i+1}. ${it.name}, ${it.variant} × ${it.qty} — ${som(it.sum)}`),
    '',`Итого: ${som(total)}`,'',
    `Имя: ${order.name}`,`Телефон: ${order.phone}`,`Город: ${order.city}`,`Получение: ${order.delivery}`,
    order.addr?`Адрес: ${order.addr}`:'',`Оплата: ${order.pay}`,order.wrap,order.note?`Комментарий: ${order.note}`:''
  ].filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n');
  btn.disabled=true; btn.textContent='Отправляю…';
  let saved=false;
  if(DEX.saveOrder){try{await Promise.race([DEX.saveOrder(order),new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),12000))]);saved=true;}catch(err){console.warn('order',err);}}
  btn.disabled=false; btn.textContent='Оформить заказ';
  document.getElementById('otext').textContent=orderText;
  const wl=document.getElementById('waLink');
  wl.href=`https://wa.me/${waNum()}?text=${encodeURIComponent(orderText)}`;
  const first=order.name.split(' ')[0];
  if(saved){
    document.getElementById('doneTitle').textContent=`Заказ ${num} принят!`;
    document.getElementById('doneLead').textContent=`Спасибо, ${first}! Менеджер свяжется с вами по номеру ${order.phone} в течение 15 минут. Для быстрого ответа можете продублировать заказ в WhatsApp.`;
    wl.classList.add('ghost-wa');
  }else{
    document.getElementById('doneTitle').textContent=`Спасибо, ${first}!`;
    document.getElementById('doneLead').textContent='Отправьте заказ магазину в WhatsApp одним нажатием — менеджер подтвердит его в течение 15 минут.';
    wl.classList.remove('ghost-wa');
  }
  document.getElementById('orderFormWrap').style.display='none';
  document.getElementById('done').classList.add('show');
  overlay.scrollTop=0;
  if(orderItems.fromCart){cart=[];renderCart();}
  f.reset();
});
document.getElementById('copyOrder').onclick=async()=>{try{await navigator.clipboard.writeText(orderText);toast('Текст заказа скопирован');}catch(_){toast('Не удалось скопировать — выделите текст вручную');}};
document.getElementById('doneClose').onclick=closeModal;

/* =========================================================
   Cart & side menus
   ========================================================= */
let cart=[];
const badge=document.getElementById('badge'), drawer=document.getElementById('drawer'), dim=document.getElementById('dim'), mmenu=document.getElementById('mmenu');
function addToCart(id,c=0,m=0){
  const ex=cart.find(it=>it.id===id&&it.c===c&&it.m===m);
  ex?ex.q++:cart.push({id,c,m,q:1});
  renderCart(); toast(`${byId[id].name} — в корзине`);
  badge.classList.add('pop'); setTimeout(()=>badge.classList.remove('pop'),300);
}
function renderCart(){
  badge.textContent=cart.reduce((s,i)=>s+i.q,0);
  document.getElementById('ditems').innerHTML=cart.length?cart.map((it,i)=>{const p=byId[it.id];return `<div class="ditem"><div class="th">${vis(p,it.c)}</div><div><b>${p.name}</b><small>${p.mem?p.mem[it.m][0]+' · ':''}${p.colors[it.c][0]}</small><div class="qty"><button data-q="${i}" data-d="-1">−</button><span>${it.q}</span><button data-q="${i}" data-d="1">+</button></div></div><b>${som(itemPrice(it))}</b></div>`}).join(''):'<div class="empty">Корзина пока пуста</div>';
  document.getElementById('dtotal').textContent=som(cart.reduce((s,it)=>s+itemPrice(it),0));
}
function openCart(){drawer.classList.add('open');dim.classList.add('open');}
function closeSide(){drawer.classList.remove('open');mmenu.classList.remove('open');dim.classList.remove('open');}
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('dclose').onclick=closeSide; dim.onclick=closeSide;
document.getElementById('burger').onclick=()=>{mmenu.classList.add('open');dim.classList.add('open');};
document.getElementById('mmclose').onclick=closeSide;
mmenu.addEventListener('click',e=>{if(e.target.closest('a'))closeSide();});
document.getElementById('ditems').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;const it=cart[+b.dataset.q];it.q+=+b.dataset.d;if(it.q<=0)cart.splice(+b.dataset.q,1);renderCart();});
document.getElementById('checkout').onclick=()=>{if(!cart.length){toast('Добавьте товары в корзину');return;}closeSide();cur=null;const items=cart.map(x=>({...x}));items.fromCart=true;showOrder(items);};

let tt; function toast(t){const el=document.getElementById('toast');document.getElementById('toastText').textContent=t;el.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('show'),2200);}

document.addEventListener('click',e=>{
  if(document.body.classList.contains('admin-mode'))return;
  const add=e.target.closest('[data-add]'); if(add){e.stopPropagation();addToCart(add.dataset.add);return;}
  const op=e.target.closest('[data-open]'); if(op&&!e.target.closest('.modal')){openProduct(op.dataset.open);return;}
  const tab=e.target.closest('[data-tab]'); if(tab){setFilter(tab.dataset.tab);return;}
  const go=e.target.closest('[data-goto]'); if(go){document.getElementById(go.dataset.goto).scrollIntoView();return;}
  const cat=e.target.closest('[data-cat]'); if(cat){const k=cat.dataset.cat; if(k==='gifts'){document.getElementById('gifts').scrollIntoView();}else{setFilter(k);document.getElementById('catalog').scrollIntoView();} return;}
  const fl=e.target.closest('[data-filter]'); if(fl){setFilter(fl.dataset.filter);}
});
document.getElementById('subForm').addEventListener('submit',e=>{e.preventDefault();const n=e.target.querySelector('input').value.trim();const a=document.createElement('a');document.getElementById('subMsg').innerHTML=`Спасибо! <a href="https://wa.me/${waNum()}?text=${encodeURIComponent('Хочу получать новости и скидки Dex Shop. Мой номер: '+n)}" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;display:inline">Подтвердите подписку в WhatsApp</a>`;e.target.reset();});

/* =========================================================
   3D phone — follows the mouse / finger horizontally
   ========================================================= */
(function(){
  const phone=document.getElementById('phone'), img=document.getElementById('heroImg'), back=document.getElementById('phoneBack'), sh=document.getElementById('pshadow'), stage=document.getElementById('stage');
  const N=14; for(let i=0;i<N;i++){const l=document.createElement('div');l.className='layer';l.style.transform=`translateZ(${(i-(N-1)/2)*1.7}px)`;phone.insertBefore(l,phone.firstChild);}
  let target=-14, curA=-14, lastMove=0;
  const set=x=>{target=((x/window.innerWidth)-.5)*2;lastMove=performance.now();};
  window.addEventListener('mousemove',e=>set(e.clientX));
  stage.addEventListener('touchstart',e=>set(e.touches[0].clientX),{passive:true});
  stage.addEventListener('touchmove',e=>set(e.touches[0].clientX),{passive:true});
  target=-.35;
  function tick(now){
    const photo=stage.classList.contains('has-photo'), MAX=photo?24:38;
    let t=target*MAX; if(now-lastMove>4000)t=Math.sin(now/1600)*(photo?14:22);
    curA+=(t-curA)*0.07;
    (photo?img:phone).style.transform=`rotateY(${curA.toFixed(2)}deg)`;
    back.style.setProperty('--shine',(-curA*2.4)+'%');
    sh.style.width=(180-Math.abs(curA)*1.1)+'px';
    sh.style.marginLeft=(curA*0.9)+'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();


/* =========================================================
   Связь с базой (Firebase подключается в index.html)
   ========================================================= */
const DEX={
  loadProductPhotos:null, saveOrder:null,
  setShop(d){SHOP={...DEF_SHOP,...d};applyShop();},
  setOverrides(d){OVR=d||{};renderGrid();renderGifts();applyShop();renderCart();},
  setMainPhotos(m){PH0=m||{};renderGrid();renderGifts();applyShop();renderCart();},
  mergePhotos(pid,m){PHX[pid]={...(PHX[pid]||{}),...m};if(cur&&cur.id===pid&&overlay.classList.contains('open')){const el=document.getElementById('mvis');if(el)el.innerHTML=vis(cur,sel.c);}}
};
window.DEX=DEX;
renderAll();
