/* Dex Shop — товары и рисунки. Цены в сомах (KGS). */
let UID=0;
const shade=(hex,amt)=>{let c=hex.replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');let n=parseInt(c,16);let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)};
const lens=(x,y,r,ring)=>`<g><circle cx="${x}" cy="${y}" r="${r+2.4}" fill="${ring}"/><circle cx="${x}" cy="${y}" r="${r}" fill="#0b0c0f"/><circle cx="${x}" cy="${y}" r="${r*.62}" fill="#1b2230"/><circle cx="${x}" cy="${y}" r="${r*.34}" fill="#07080b"/><circle cx="${x-r*.28}" cy="${y-r*.3}" r="${r*.16}" fill="#9fb7ff" opacity=".7"/></g>`;

function svgPhone(color,style){
  const id='p'+(UID++), x=55,y=18,w=90,h=190, f=shade(color,30), d=shade(color,-28);
  let cam='';
  if(style==='samsung'){
    cam=lens(x+20,y+24,9.5,f)+lens(x+20,y+50,9.5,f)+lens(x+20,y+76,9.5,f)+
        `<circle cx="${x+43}" cy="${y+27}" r="7.5" fill="${f}"/><circle cx="${x+43}" cy="${y+27}" r="5.8" fill="#0b0c0f"/><rect x="${x+40.5}" y="${y+24.5}" width="5" height="5" fill="#1d2433"/>`+
        `<circle cx="${x+43}" cy="${y+47}" r="3.2" fill="#f3ead2"/><circle cx="${x+43}" cy="${y+57}" r="2.4" fill="#16181d"/>`;
  }else{ // iPhone 17 Pro plateau
    cam=`<rect x="${x+3}" y="${y+5}" width="${w-6}" height="58" rx="15" fill="${d}" opacity=".55"/><rect x="${x+3}" y="${y+5}" width="${w-6}" height="58" rx="15" fill="url(#${id}pl)"/>`+
        `<rect x="${x+8}" y="${y+10}" width="50" height="48" rx="13" fill="${shade(color,-45)}" opacity=".55"/>`+
        lens(x+21,y+22,8.5,f)+lens(x+21,y+46,8.5,f)+lens(x+43,y+34,8.5,f)+
        `<circle cx="${x+72}" cy="${y+22}" r="4" fill="#f3ead2"/><circle cx="${x+72}" cy="${y+46}" r="4" fill="#0c0d10"/><circle cx="${x+66}" cy="${y+56}" r="1.5" fill="#222"/>`;
  }
  return `<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(color,22)}"/><stop offset=".55" stop-color="${color}"/><stop offset="1" stop-color="${d}"/></linearGradient>
  <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="${id}pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient>
  <filter id="${id}f" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-opacity=".25"/></filter></defs>
  <g filter="url(#${id}f)"><rect x="${x-1.5}" y="${y-1.5}" width="${w+3}" height="${h+3}" rx="${style==='samsung'?11:19}" fill="${f}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${style==='samsung'?10:18}" fill="url(#${id}g)"/></g>
  <path d="M${x+10} ${y} L${x+40} ${y} L${x+10} ${y+h} L${x-20} ${y+h}Z" fill="url(#${id}s)" opacity=".7" clip-path="inset(0)"/>
  ${cam}</svg>`;
}
function svgLaptop(color,screen1,screen2,rgb){
  const id='l'+(UID++);
  return `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}sc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${screen1}"/><stop offset="1" stop-color="${screen2}"/></linearGradient>
  <radialGradient id="${id}gl" cx=".3" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(color,30)}"/><stop offset="1" stop-color="${shade(color,-25)}"/></linearGradient>
  <filter id="${id}f"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-opacity=".22"/></filter></defs>
  <g filter="url(#${id}f)">
  <rect x="38" y="30" width="164" height="110" rx="8" fill="${shade(color,-50)}"/>
  <rect x="42" y="34" width="156" height="100" rx="4" fill="url(#${id}sc)"/>
  <path d="M42 110 C80 80 120 120 198 70 L198 134 L42 134Z" fill="#fff" opacity=".08"/>
  <path d="M42 120 C90 100 140 140 198 100 L198 134 L42 134Z" fill="#000" opacity=".12"/>
  <rect x="42" y="34" width="156" height="100" rx="4" fill="url(#${id}gl)"/>
  <path d="M20 142 L220 142 L212 154 Q210 157 205 157 L35 157 Q30 157 28 154Z" fill="url(#${id}b)"/>
  <rect x="20" y="140" width="200" height="4" rx="2" fill="${shade(color,40)}"/>
  <rect x="104" y="141" width="32" height="3" rx="1.5" fill="${shade(color,-30)}"/>
  ${rgb?`<rect x="34" y="154" width="172" height="2.5" rx="1.2" fill="url(#${id}rgb)"/><defs><linearGradient id="${id}rgb"><stop offset="0" stop-color="#ff2d55"/><stop offset=".35" stop-color="#bf5af2"/><stop offset=".7" stop-color="#0a84ff"/><stop offset="1" stop-color="#ff2d55"/></linearGradient></defs>`:''}
  </g></svg>`;
}
function svgTablet(color,s1,s2){
  const id='t'+(UID++);
  return `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}sc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient>
  <filter id="${id}f"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-opacity=".25"/></filter></defs>
  <g filter="url(#${id}f)" transform="rotate(-6 120 100)"><rect x="28" y="38" width="184" height="128" rx="12" fill="${color}"/>
  <rect x="34" y="44" width="172" height="116" rx="7" fill="url(#${id}sc)"/>
  <circle cx="60" cy="72" r="22" fill="#fff" opacity=".12"/><circle cx="170" cy="138" r="40" fill="#000" opacity=".12"/>
  <path d="M34 130 Q100 90 206 120 L206 160 L34 160Z" fill="#fff" opacity=".1"/>
  <rect x="80" y="36" width="34" height="2.2" rx="1" fill="${shade(color,-30)}"/></g>
  <g transform="rotate(-6 120 100)"><rect x="40" y="172" width="150" height="5" rx="2.5" fill="${shade(color,-15)}" opacity=".9"/></g></svg>`;
}
function svgBuds(color,type){
  const id='a'+(UID++);
  if(type==='max'){
    return `<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(color,25)}"/><stop offset="1" stop-color="${shade(color,-30)}"/></linearGradient>
    <filter id="${id}f"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-opacity=".25"/></filter></defs>
    <g filter="url(#${id}f)">
    <path d="M62 120 Q60 30 120 28 Q180 30 178 120" fill="none" stroke="${shade(color,-10)}" stroke-width="12" stroke-linecap="round"/>
    <path d="M66 112 Q66 44 120 42 Q174 44 174 112" fill="none" stroke="#e9e9e6" stroke-width="8" stroke-dasharray="2 3" opacity=".6"/>
    <rect x="58" y="108" width="12" height="26" rx="5" fill="#cfcfcb"/><rect x="170" y="108" width="12" height="26" rx="5" fill="#cfcfcb"/>
    <rect x="34" y="126" width="54" height="74" rx="22" fill="url(#${id}c)"/><rect x="152" y="126" width="54" height="74" rx="22" fill="url(#${id}c)"/>
    <rect x="80" y="134" width="12" height="58" rx="6" fill="${shade(color,-50)}" opacity=".6"/><rect x="148" y="134" width="12" height="58" rx="6" fill="${shade(color,-50)}" opacity=".6"/>
    <rect x="190" y="138" width="8" height="12" rx="3" fill="${shade(color,-20)}"/></g></svg>`;
  }
  const lid = type==='pro';
  return `<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcdcd8"/></linearGradient>
  <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4d4d0"/></linearGradient>
  <filter id="${id}f"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-opacity=".22"/></filter></defs>
  <g filter="url(#${id}f)">
  <rect x="60" y="88" width="${lid?110:100}" height="${lid?92:96}" rx="${lid?26:34}" fill="url(#${id}c)"/>
  <path d="M60 ${lid?118:120} H${lid?170:160}" stroke="#c9c9c4" stroke-width="1.4"/>
  <circle cx="${lid?115:110}" cy="146" r="2.4" fill="#7ddc7a"/>
  <g transform="translate(148 40) rotate(18)"><ellipse cx="16" cy="22" rx="16" ry="18" fill="url(#${id}b)"/>${lid?'<ellipse cx="6" cy="18" rx="8" ry="7" fill="#3a3a3a" opacity=".85"/>':'<ellipse cx="8" cy="18" rx="6" ry="6" fill="#bdbdb8"/>'}<rect x="22" y="26" width="11" height="${lid?46:56}" rx="5.5" fill="url(#${id}b)"/><rect x="25" y="${lid?66:76}" width="5" height="4" rx="2" fill="#a9a9a4"/></g>
  <g transform="translate(176 66) rotate(-14)"><ellipse cx="16" cy="22" rx="16" ry="18" fill="url(#${id}b)"/>${lid?'<ellipse cx="26" cy="18" rx="8" ry="7" fill="#3a3a3a" opacity=".85"/>':'<ellipse cx="24" cy="18" rx="6" ry="6" fill="#bdbdb8"/>'}<rect x="0" y="26" width="11" height="${lid?46:56}" rx="5.5" fill="url(#${id}b)"/></g>
  </g></svg>`;
}
function svgCharger(kind,color='#f4f4f2'){
  const id='c'+(UID++);
  const brick=(x,y,w,h,ports)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#${id}w)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="#d8d8d4"/>`+
    Array.from({length:ports},(_,i)=>`<rect x="${x+w/2-10}" y="${y+h/2-(ports-1)*9+i*18-4}" width="20" height="8" rx="4" fill="#2a2a2a"/>`).join('');
  const defs=`<defs><linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${color==='#f4f4f2'?'#ffffff':shade(color,20)}"/><stop offset="1" stop-color="${color==='#f4f4f2'?'#dcdcd7':shade(color,-25)}"/></linearGradient><filter id="${id}f"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-opacity=".22"/></filter></defs>`;
  const plugC=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><rect x="${x-9}" y="${y-22}" width="18" height="30" rx="5" fill="${color==='#f4f4f2'?'#f3f3f1':color}" stroke="#d0d0cb"/><rect x="${x-5.5}" y="${y-36}" width="11" height="15" rx="3" fill="#bdbdb8"/><rect x="${x-3.5}" y="${y-33}" width="7" height="4" rx="1.5" fill="#555"/></g>`;
  const plugL=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><rect x="${x-9}" y="${y-22}" width="18" height="30" rx="5" fill="#f3f3f1" stroke="#d0d0cb"/><rect x="${x-4}" y="${y-38}" width="8" height="17" rx="2.5" fill="#c9c9c4"/><rect x="${x-2}" y="${y-34}" width="4" height="10" rx="1" fill="#e9c97a" opacity=".8"/></g>`;
  if(kind==='brick35') return `<svg viewBox="0 0 240 220">${defs}<g filter="url(#${id}f)">${brick(70,50,100,110,2)}<rect x="108" y="160" width="6" height="22" rx="2" fill="#c9c9c4"/><rect x="126" y="160" width="6" height="22" rx="2" fill="#c9c9c4"/></g></svg>`;
  if(kind==='brick45') return `<svg viewBox="0 0 240 220">${defs}<g filter="url(#${id}f)">${brick(48,58,92,92,1)}<path d="M94 150 C94 200 190 205 186 130" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>${plugC(186,118,0)}</g></svg>`;
  if(kind==='lightning') return `<svg viewBox="0 0 240 220">${defs}<g filter="url(#${id}f)"><path d="M70 150 C20 120 40 60 100 70 C170 80 200 40 176 110 C160 160 90 190 70 150" fill="none" stroke="#f1f1ee" stroke-width="6" stroke-linecap="round"/><path d="M70 150 C20 120 40 60 100 70 C170 80 200 40 176 110 C160 160 90 190 70 150" fill="none" stroke="#d6d6d2" stroke-width="1"/>${plugC(78,166,40)}${plugL(170,94,-30)}</g></svg>`;
  return `<svg viewBox="0 0 240 220">${defs}<g filter="url(#${id}f)"><path d="M60 160 C10 110 70 50 120 90 C170 130 230 80 180 60" fill="none" stroke="#efefec" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 0"/><path d="M60 160 C10 110 70 50 120 90 C170 130 230 80 180 60" fill="none" stroke="#c8c8c3" stroke-width="7" stroke-dasharray="2 3" opacity=".5"/>${plugC(66,172,30)}${plugC(176,52,-60)}</g></svg>`;
}
/* gift visuals */
function svgGiftIphone(){
  const id='gi'+(UID++);
  return `<svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}wr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a302a"/><stop offset="1" stop-color="#17120f"/></linearGradient>
  <linearGradient id="${id}rb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9c7a45"/><stop offset=".5" stop-color="#e6c88f"/><stop offset="1" stop-color="#9c7a45"/></linearGradient>
  <linearGradient id="${id}bx" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fafafa"/><stop offset="1" stop-color="#dcdcd8"/></linearGradient>
  <pattern id="${id}pt" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M11 4l1.6 4.4L17 10l-4.4 1.6L11 16l-1.6-4.4L5 10l4.4-1.6z" fill="#c9a96e" opacity=".22"/></pattern>
  <filter id="${id}f"><feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000" flood-opacity=".55"/></filter></defs>
  <ellipse cx="200" cy="312" rx="170" ry="14" fill="#000" opacity=".45"/>
  <!-- wrapped gift box -->
  <g filter="url(#${id}f)">
   <rect x="24" y="150" width="190" height="160" rx="6" fill="url(#${id}wr)"/><rect x="24" y="150" width="190" height="160" rx="6" fill="url(#${id}pt)"/>
   <rect x="16" y="128" width="206" height="36" rx="5" fill="#2e2621"/><rect x="16" y="128" width="206" height="36" rx="5" fill="url(#${id}pt)"/>
   <rect x="104" y="128" width="30" height="182" fill="url(#${id}rb)"/>
   <rect x="16" y="140" width="206" height="12" fill="url(#${id}rb)" opacity=".95"/>
   <path d="M119 128 C80 70 40 100 70 122 C84 132 110 130 119 128Z" fill="url(#${id}rb)"/>
   <path d="M119 128 C158 70 198 100 168 122 C154 132 128 130 119 128Z" fill="url(#${id}rb)"/>
   <path d="M119 128 C96 104 76 108 80 118" fill="none" stroke="#7a5d30" stroke-width="2" opacity=".5"/>
   <path d="M119 128 C142 104 162 108 158 118" fill="none" stroke="#7a5d30" stroke-width="2" opacity=".5"/>
   <path d="M112 132 L96 176 L108 170 L114 182Z M126 132 L142 176 L130 170 L124 182Z" fill="#b8955a"/>
   <circle cx="119" cy="128" r="11" fill="#d8b778"/>
   <rect x="40" y="250" width="54" height="26" rx="3" fill="#f2ead8" transform="rotate(-8 67 263)"/><text x="67" y="268" font-family="Manrope" font-size="9" font-weight="800" text-anchor="middle" fill="#3a302a" transform="rotate(-8 67 263)">DEX SHOP</text>
  </g>
  <!-- iPhone box -->
  <g filter="url(#${id}f)"><rect x="232" y="196" width="128" height="112" rx="10" fill="url(#${id}bx)"/><rect x="232" y="196" width="128" height="16" rx="8" fill="#ececea"/>
   <text x="296" y="270" font-family="Manrope" font-size="12" font-weight="700" text-anchor="middle" fill="#9a9a96" letter-spacing="2">iPhone</text></g>
  <!-- phone standing -->
  <g transform="translate(232 6) scale(1.02)">${svgPhone('#e0713a','iphone').replace('<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">','<g transform="rotate(8 100 115)">').replace('</svg>','</g>')}</g>
  </svg>`;
}
function svgGiftRog(){
  const id='gr'+(UID++);
  return `<svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="${id}sc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a0b2e"/><stop offset=".55" stop-color="#7a0f3a"/><stop offset="1" stop-color="#ff2d55"/></linearGradient>
  <linearGradient id="${id}lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a2e"/><stop offset="1" stop-color="#121214"/></linearGradient>
  <linearGradient id="${id}base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset="1" stop-color="#151518"/></linearGradient>
  <linearGradient id="${id}rgb"><stop offset="0" stop-color="#ff2d55"/><stop offset=".33" stop-color="#bf5af2"/><stop offset=".66" stop-color="#0a84ff"/><stop offset="1" stop-color="#ff2d55"/></linearGradient>
  <linearGradient id="${id}kb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff2d55"/><stop offset=".5" stop-color="#bf5af2"/><stop offset="1" stop-color="#0a84ff"/></linearGradient>
  <filter id="${id}f"><feDropShadow dx="0" dy="18" stdDeviation="14" flood-opacity=".35"/></filter>
  <filter id="${id}glow"><feGaussianBlur stdDeviation="6"/></filter></defs>
  <ellipse cx="200" cy="306" rx="180" ry="16" fill="#000" opacity=".18"/>
  <rect x="44" y="282" width="312" height="10" rx="5" fill="url(#${id}rgb)" filter="url(#${id}glow)" opacity=".8"/>
  <g filter="url(#${id}f)">
   <path d="M70 40 L330 40 Q340 40 340 50 L344 226 L56 226 L60 50 Q60 40 70 40Z" fill="url(#${id}lid)"/>
   <rect x="72" y="50" width="256" height="166" rx="4" fill="url(#${id}sc)"/>
   <path d="M72 180 L140 120 L190 160 L250 90 L328 150 L328 216 L72 216Z" fill="#000" opacity=".28"/>
   <path d="M72 200 L130 160 L200 190 L270 140 L328 180 L328 216 L72 216Z" fill="#000" opacity=".3"/>
   <circle cx="250" cy="96" r="26" fill="#ffb3c4" opacity=".55"/>
   <path d="M72 50 L170 50 L100 216 L72 216Z" fill="#fff" opacity=".05"/>
   <path d="M30 228 L370 228 L384 262 Q386 270 376 272 L24 272 Q14 270 16 262Z" fill="url(#${id}base)"/>
   <path d="M44 236 L356 236 L364 254 L36 254Z" fill="#0d0d10"/>
   <path d="M44 236 L356 236 L364 254 L36 254Z" fill="url(#${id}kb)" opacity=".35"/>
   ${Array.from({length:16},(_,i)=>`<rect x="${50+i*19}" y="239" width="15" height="5" rx="1" fill="#26262c"/>`).join('')}
   ${Array.from({length:16},(_,i)=>`<rect x="${46+i*19.5}" y="246" width="15" height="5" rx="1" fill="#26262c"/>`).join('')}
   <rect x="160" y="256" width="80" height="12" rx="3" fill="#1d1d22"/>
   <rect x="20" y="268" width="360" height="3" rx="1.5" fill="url(#${id}rgb)"/>
  </g></svg>`;
}

/* category icons */
const catIcon={
  laptops:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="10" width="28" height="19" rx="2"/><path d="M4 33h36l-2 3H6z"/></svg>',
  phones:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="13" y="5" width="18" height="34" rx="3.5"/><circle cx="18" cy="11" r="2"/><circle cx="18" cy="16" r="2"/></svg>',
  tablets:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="7" width="30" height="30" rx="3"/><path d="M19 33h6"/></svg>',
  audio:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 10a5 5 0 0 1 5 5v2a3 3 0 0 1-3 3v14h-3V20a4 4 0 0 1-3-4v-1a5 5 0 0 1 4-5zM32 10a5 5 0 0 0-5 5v2a3 3 0 0 0 3 3v14h3V20a4 4 0 0 0 3-4v-1a5 5 0 0 0-4-5z"/></svg>',
  chargers:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="12" y="12" width="20" height="20" rx="5"/><path d="M18 12V6M26 12V6M22 32v4c0 3 4 3 4 6"/><path d="m23 17-3 5h4l-3 5"/></svg>',
  gifts:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="17" width="28" height="20" rx="1.5"/><path d="M6 12h32v5H6zM22 12v25M22 12c-3-7-10-6-9-2s9 2 9 2 8 2 9-2-6-5-9 2"/></svg>'
};

/* =========================================================
   Product data
   ========================================================= */
const ICO={
  shield:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2" opacity=".18"><path d="M55 10 20 24v26c0 22 15 38 35 48 20-10 35-26 35-48V24z"/></svg>',
  bolt:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="#f5c451" stroke-width="2.4"><rect x="18" y="34" width="66" height="40" rx="9" opacity=".7"/><rect x="86" y="46" width="6" height="16" rx="2" opacity=".7"/><path d="m56 40-12 16h12l-8 16" stroke-width="3"/></svg>',
  cam:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2" opacity=".25"><circle cx="55" cy="55" r="30"/><circle cx="55" cy="55" r="18"/><circle cx="55" cy="55" r="7"/></svg>',
  chip:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2" opacity=".25"><rect x="30" y="30" width="50" height="50" rx="6"/><rect x="42" y="42" width="26" height="26" rx="3"/><path d="M42 30v-10M55 30v-10M68 30v-10M42 90v-10M55 90v-10M68 90v-10M30 42H20M30 55H20M30 68H20M90 42H80M90 55H80M90 68H80"/></svg>',
  wave:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2.2" opacity=".3"><path d="M15 55h8M30 40v30M40 30v50M50 45v20M60 25v60M70 38v34M80 48v14M90 55h6"/></svg>',
  pen:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2" opacity=".25"><path d="M20 90 72 38l8 8-52 52H20z"/><path d="m72 38 8-8 8 8-8 8"/></svg>',
  gift:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="#d8b778" stroke-width="2"><rect x="22" y="46" width="66" height="44" rx="2"/><path d="M18 34h74v12H18zM55 34v56M55 34c-8-16-24-14-22-5s22 5 22 5 20 4 22-5-14-11-22 5"/></svg>',
  game:'<svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="#ff2d55" stroke-width="2.2" opacity=".85"><path d="M30 40h50c10 0 16 12 18 26s-8 18-14 10l-8-10H34l-8 10c-6 8-16 4-14-10s8-26 18-26z"/><path d="M36 54v12M30 60h12"/><circle cx="72" cy="56" r="3"/><circle cx="80" cy="64" r="3"/></svg>'
};

const CATS=[['laptops','Ноутбуки','MacBook, ROG, Galaxy Book'],['phones','Телефоны','Samsung и iPhone'],['tablets','Планшеты','iPad Pro, Galaxy Tab'],['audio','Наушники','AirPods'],['chargers','Зарядки','Type-C и Lightning'],['gifts','Подарки','Готовые наборы']];

/* =========================================================
   Product data — prices in KGS (сом)
   ========================================================= */
const P=[
 {id:'s24u',cat:'phones',brand:'Samsung',name:'Galaxy S24 Ultra',short:'6,8″ QHD+ 120 Гц · 200 МП · S Pen',price:79900,old:92900,tag:'Хит',
  draw:c=>svgPhone(c,'samsung'),colors:[['Серый титан','#8f8e8a'],['Чёрный титан','#3b3b3d'],['Фиолетовый титан','#5d566a'],['Жёлтый титан','#d6cca4']],
  mem:[['256 ГБ',0],['512 ГБ',13000],['1 ТБ',35000]],tl:'Титан, S Pen и Galaxy AI в одном корпусе.',
  specs:[['Экран','6,8″ Dynamic AMOLED 2X, QHD+, 120 Гц'],['Процессор','Snapdragon 8 Gen 3 for Galaxy'],['Оперативная память','12 ГБ'],['Камеры','200 + 50 + 12 + 10 МП'],['Зум','Оптический 3× и 5×, цифровой до 100×'],['Батарея','5000 мА·ч, зарядка 45 Вт'],['Корпус','Титан, Corning Gorilla Armor'],['Защита','IP68']],
  quals:[['Встроенный S Pen','Пишите, рисуйте и управляйте телефоном — перо всегда в корпусе.','pen',1],['Galaxy AI','Перевод звонков, «Обвести для поиска», умная обработка фото.','chip',0],['Камера 200 МП','Детальные снимки днём и ночью, видео 8K.','cam',1]],
  mini:['Прочный титан','Рамка из титана и стекло Gorilla Armor с антибликовым покрытием.','7 лет','обновлений Android']},
 {id:'s25u',cat:'phones',brand:'Samsung',name:'Galaxy S25 Ultra',short:'6,9″ 120 Гц · Snapdragon 8 Elite · 200 МП',price:104900,tag:'Новинка',
  draw:c=>svgPhone(c,'samsung'),colors:[['Titanium Silverblue','#9ba8b6'],['Titanium Black','#2f3034'],['Titanium Gray','#8e8d89'],['Titanium Whitesilver','#dedfdc']],
  mem:[['256 ГБ',0],['512 ГБ',13000],['1 ТБ',35000]],tl:'Самый мощный Galaxy с искусственным интеллектом.',
  specs:[['Экран','6,9″ Dynamic AMOLED 2X, QHD+, 120 Гц'],['Процессор','Snapdragon 8 Elite for Galaxy'],['Оперативная память','12 ГБ'],['Камеры','200 + 50 + 50 + 10 МП'],['Зум','Оптический 3× и 5×, до 100×'],['Батарея','5000 мА·ч, 45 Вт'],['Корпус','Титан, Gorilla Armor 2'],['Защита','IP68']],
  quals:[['Snapdragon 8 Elite','Максимальная производительность в играх и задачах ИИ.','chip',1],['Ультраширокая 50 МП','Чёткие пейзажи и макро без потерь.','cam',0],['S Pen','Точное перо для заметок и рисования.','pen',1]],
  mini:['Galaxy AI','Ассистент, который понимает контекст и помогает в каждом приложении.','8,2 мм','тонкий титановый корпус']},
 {id:'ip17pm',cat:'phones',brand:'Apple',name:'iPhone 17 Pro Max',short:'6,9″ ProMotion · A19 Pro · 48 МП ×3',price:129900,tag:'Хит',
  draw:c=>svgPhone(c,'iphone'),colors:[['Космический оранжевый','#e0713a'],['Глубокий синий','#2f3b55'],['Серебристый','#e2e2df']],
  mem:[['256 ГБ',0],['512 ГБ',17000],['1 ТБ',39000],['2 ТБ',74000]],tl:'Самый мощный iPhone. Создан для всего, что вы любите.',
  specs:[['Экран','6,9″ Super Retina XDR, ProMotion 120 Гц'],['Процессор','Apple A19 Pro'],['Камеры','48 + 48 + 48 МП Fusion'],['Зум','Оптическое качество до 8×'],['Фронтальная','18 МП Center Stage'],['Батарея','До 37 ч просмотра видео'],['Корпус','Алюминиевый unibody, Ceramic Shield 2'],['Защита','IP68']],
  quals:[['Дизайн, который ощущается','Цельный алюминиевый корпус с испарительной камерой охлаждения.','shield',1],['Pro‑камера','Три камеры 48 МП и зум оптического качества до 8×.','cam',0],['Весь день на заряде','Самая долгая автономность в истории iPhone.','bolt',1]],
  mini:['Создан, чтобы его любили','A19 Pro, Apple Intelligence и новая система камер.','100%','приватность — данные остаются у вас']},
 {id:'ip17p',cat:'phones',brand:'Apple',name:'iPhone 17 Pro',short:'6,3″ ProMotion · A19 Pro · 48 МП ×3',price:112900,
  draw:c=>svgPhone(c,'iphone'),colors:[['Космический оранжевый','#e0713a'],['Глубокий синий','#2f3b55'],['Серебристый','#e2e2df']],
  mem:[['256 ГБ',0],['512 ГБ',17000],['1 ТБ',39000]],tl:'Вся мощь Pro в компактном корпусе.',
  specs:[['Экран','6,3″ Super Retina XDR, ProMotion 120 Гц'],['Процессор','Apple A19 Pro'],['Камеры','48 + 48 + 48 МП Fusion'],['Зум','Оптическое качество до 8×'],['Фронтальная','18 МП Center Stage'],['Батарея','До 31 ч просмотра видео'],['Корпус','Алюминиевый unibody'],['Защита','IP68']],
  quals:[['Компактный Pro','Удобно в руке и в кармане.','shield',1],['Pro‑камера','Три камеры 48 МП.','cam',0],['A19 Pro','Быстрее в играх и Apple Intelligence.','chip',1]],
  mini:['Удобный размер','6,3 дюйма — все возможности Pro.','48 МП','на каждой камере']},

 {id:'mbp14',cat:'laptops',brand:'Apple',name:'MacBook Pro 14″ M5',short:'Liquid Retina XDR · M5 · 16 ГБ · 512 ГБ',price:159900,tag:'Новинка',
  draw:c=>svgLaptop(c,'#3b1d6e','#d06ab5'),colors:[['Космический чёрный','#2c2c2e'],['Серебристый','#d6d7d9']],
  mem:[['16 ГБ / 512 ГБ',0],['24 ГБ / 1 ТБ',44000]],tl:'Профессиональная мощность с чипом M5.',
  specs:[['Экран','14,2″ Liquid Retina XDR, 120 Гц'],['Процессор','Apple M5: 10‑ядерный CPU'],['Графика','10‑ядерный GPU'],['Память','16 ГБ единой памяти'],['Накопитель','SSD 512 ГБ'],['Автономность','До 24 ч'],['Вес','1,55 кг'],['Порты','3× Thunderbolt 4, HDMI, SD, MagSafe 3']],
  quals:[['Чип M5','Новая графика и нейроускорители для задач ИИ.','chip',1],['Экран XDR','Яркость до 1600 нит в HDR.','cam',0],['24 часа','Работа весь день и ещё вечер.','bolt',1]],
  mini:['Создан для профи','Монтаж, код, дизайн — без компромиссов.','24 ч','автономной работы']},
 {id:'rog18',cat:'laptops',brand:'ASUS',name:'ROG Strix SCAR 18 (2025)',short:'18″ Mini LED 240 Гц · RTX 5090 · Core Ultra 9',price:349900,tag:'Флагман',
  draw:c=>svgLaptop(c,'#1a0b2e','#ff2d55',true),colors:[['Off Black','#1c1c1f']],
  mem:[['32 ГБ / 2 ТБ',0],['64 ГБ / 4 ТБ',61000]],tl:'Лучший в мире игровой ноутбук.',
  specs:[['Экран','18″ ROG Nebula HDR Mini LED, 2,5K, 240 Гц'],['Процессор','Intel Core Ultra 9 275HX'],['Видеокарта','NVIDIA GeForce RTX 5090 Laptop, 24 ГБ'],['Память','32 ГБ DDR5'],['Накопитель','SSD 2 ТБ PCIe 4.0'],['Батарея','90 Вт·ч'],['Охлаждение','Жидкий металл, 3 вентилятора'],['Подсветка','RGB по периметру, AniMe Vision']],
  quals:[['RTX 5090','Трассировка лучей и DLSS 4 на максимальных настройках.','game',1],['Mini LED 240 Гц','Плавная картинка и глубокий контраст.','cam',0],['Холодный и тихий','Жидкий металл и три вентилятора.','wave',1]],
  mini:['Создан для победы','Мощь настольного ПК в ноутбуке.','240 Гц','частота обновления']},
 {id:'gb5',cat:'laptops',brand:'Samsung',name:'Galaxy Book5 Pro 16″',short:'3K AMOLED 120 Гц · Core Ultra 7 · до 25 ч',price:139900,
  draw:c=>svgLaptop(c,'#0d2a4a','#5cc4e8'),colors:[['Серый','#6f7175'],['Серебристый','#cfd0d2']],
  mem:[['16 ГБ / 512 ГБ',0],['32 ГБ / 1 ТБ',30000]],tl:'Тонкий, лёгкий и с ИИ на борту.',
  specs:[['Экран','16″ Dynamic AMOLED 2X, 3K, 120 Гц, сенсорный'],['Процессор','Intel Core Ultra 7 256V'],['Графика','Intel Arc 140V'],['Память','16 ГБ LPDDR5X'],['Накопитель','SSD 512 ГБ'],['Автономность','До 25 ч'],['Вес','1,56 кг'],['Связь','Wi‑Fi 7, Bluetooth 5.4']],
  quals:[['AMOLED 3K','Сочные цвета и антибликовое покрытие.','cam',1],['Copilot+ PC','Функции ИИ прямо на устройстве.','chip',0],['До 25 часов','Без зарядки на весь день.','bolt',1]],
  mini:['Экосистема Galaxy','Работает вместе с телефоном и планшетом.','1,56 кг','при диагонали 16″']},

 {id:'ipadpro',cat:'tablets',brand:'Apple',name:'iPad Pro 13″ M5',short:'Ultra Retina XDR OLED · M5 · 5,1 мм',price:134900,tag:'Новинка',
  draw:c=>svgTablet(c,'#2a1b5e','#f08bb0'),colors:[['Космический чёрный','#2b2b2d'],['Серебристый','#d8d9db']],
  mem:[['256 ГБ',0],['512 ГБ',22000],['1 ТБ',52000]],tl:'Невероятно тонкий. Невероятно мощный.',
  specs:[['Экран','13″ Ultra Retina XDR (tandem OLED), 120 Гц'],['Процессор','Apple M5'],['Накопитель','256 ГБ'],['Камера','12 МП, LiDAR'],['Толщина','5,1 мм'],['Перо','Поддержка Apple Pencil Pro'],['Связь','Wi‑Fi 7'],['Разъём','USB‑C Thunderbolt']],
  quals:[['Tandem OLED','Идеальный чёрный и яркость до 1600 нит.','cam',1],['Чип M5','Мощность уровня ноутбука.','chip',0],['Pencil Pro','Рисуйте и пишите как на бумаге.','pen',1]],
  mini:['Тоньше карандаша','Всего 5,1 мм при экране 13 дюймов.','M5','производительность Pro']},
 {id:'tabs11u',cat:'tablets',brand:'Samsung',name:'Galaxy Tab S11 Ultra',short:'14,6″ AMOLED 120 Гц · S Pen в комплекте',price:99900,
  draw:c=>svgTablet(c,'#10324a','#7fd3c8'),colors:[['Серый','#5f6165'],['Серебристый','#cfd0d2']],
  mem:[['256 ГБ',0],['512 ГБ',13000]],tl:'Огромный экран для работы и творчества.',
  specs:[['Экран','14,6″ Dynamic AMOLED 2X, 120 Гц'],['Процессор','MediaTek Dimensity 9400+'],['Оперативная память','12 ГБ'],['Накопитель','256 ГБ'],['Батарея','11 600 мА·ч, 45 Вт'],['Толщина','5,1 мм'],['Перо','S Pen в комплекте'],['Защита','IP68']],
  quals:[['14,6 дюйма','Экран как у ноутбука.','cam',1],['S Pen в комплекте','Перо уже в коробке.','pen',0],['IP68','Не боится воды и пыли.','shield',1]],
  mini:['Galaxy AI','Заметки, перевод и поиск с ИИ.','11 600','мА·ч батарея']},

 {id:'app3',cat:'audio',brand:'Apple',name:'AirPods Pro 3',short:'Шумоподавление · пульсометр · USB‑C',price:23900,tag:'Хит',
  draw:()=>svgBuds('#fff','pro'),colors:[['Белый','#f4f4f2']],mem:null,tl:'Лучшее шумоподавление в истории AirPods.',
  specs:[['Шумоподавление','Активное, адаптивное'],['Датчики','Пульсометр для тренировок'],['Автономность','До 8 ч с ANC'],['Защита','IP57'],['Звук','Пространственное аудио'],['Функции','Живой перевод'],['Зарядка','USB‑C, MagSafe'],['Чип','Apple H2']],
  quals:[['Тишина вокруг','Шумоподавление стало вдвое эффективнее.','wave',1],['Пульс на тренировке','Встроенный датчик сердечного ритма.','chip',0],['До 8 часов','Музыка весь день.','bolt',1]],
  mini:['Идеальная посадка','Новая форма и пять размеров амбушюр.','IP57','защита от пота и воды']},
 {id:'ap4',cat:'audio',brand:'Apple',name:'AirPods 4 с шумоподавлением',short:'ANC · пространственное аудио · USB‑C',price:15900,
  draw:()=>svgBuds('#fff','4'),colors:[['Белый','#f4f4f2']],mem:null,tl:'Открытая посадка и активное шумоподавление.',
  specs:[['Шумоподавление','Активное'],['Посадка','Открытая, вкладыши'],['Автономность','До 5 ч, до 30 ч с кейсом'],['Защита','IP54'],['Звук','Пространственное аудио'],['Чип','Apple H2'],['Зарядка','USB‑C, беспроводная'],['Управление','Сенсор силы нажатия']],
  quals:[['ANC в открытом дизайне','Комфорт и тишина одновременно.','wave',1],['Чистые звонки','Изоляция голоса.','chip',0],['30 часов','С зарядным кейсом.','bolt',1]],
  mini:['Лёгкие и удобные','Самый компактный кейс AirPods.','30 ч','с кейсом']},
 {id:'apmax',cat:'audio',brand:'Apple',name:'AirPods Max (USB‑C)',short:'Полноразмерные · ANC · 20 ч',price:48900,
  draw:c=>svgBuds(c,'max'),colors:[['Тёмная ночь','#3a3d44'],['Сияющая звезда','#e6e1d7'],['Синий','#5d7fa8'],['Фиолетовый','#a59ac3'],['Оранжевый','#e59a6a']],mem:null,tl:'Звук высокой точности и полное погружение.',
  specs:[['Тип','Полноразмерные'],['Шумоподавление','Активное'],['Автономность','До 20 ч'],['Звук','Адаптивный эквалайзер'],['Пространственное аудио','С отслеживанием головы'],['Разъём','USB‑C'],['Чип','Apple H1 ×2'],['Материалы','Алюминий, сетчатое оголовье']],
  quals:[['Hi‑Fi звук','Динамические драйверы 40 мм.','wave',1],['Премиальные материалы','Алюминий и дышащая сетка.','shield',0],['20 часов','Целый перелёт с музыкой.','bolt',1]],
  mini:['Полное погружение','Пространственное аудио с отслеживанием головы.','20 ч','автономной работы']},

 {id:'ch35',cat:'chargers',brand:'Apple',name:'Адаптер USB‑C 35 Вт, 2 порта',short:'2× USB‑C · складная вилка',price:4900,
  draw:()=>svgCharger('brick35'),colors:[['Белый','#f4f4f2']],mem:null,tl:'Заряжайте два устройства одновременно.',
  specs:[['Мощность','35 Вт'],['Порты','2× USB‑C'],['Стандарт','USB Power Delivery'],['Вилка','Складная'],['Совместимость','iPhone, iPad, MacBook Air'],['Оригинал','Apple']],
  quals:[['Два порта','iPhone и AirPods сразу.','bolt',1],['Компактный','Помещается в карман.','shield',0],['Быстрая зарядка','iPhone до 50% за ~30 мин.','bolt',1]],
  mini:['Оригинал Apple','Официальная гарантия 1 год.','35 Вт','суммарная мощность']},
 {id:'cl1',cat:'chargers',brand:'Apple',name:'Кабель USB‑C – Lightning, 1 м',short:'Быстрая зарядка · оригинал',price:1990,
  draw:()=>svgCharger('lightning'),colors:[['Белый','#f4f4f2']],mem:null,tl:'Для iPhone, AirPods и аксессуаров с Lightning.',
  specs:[['Разъёмы','USB‑C / Lightning'],['Длина','1 м'],['Быстрая зарядка','С адаптером от 18 Вт'],['Передача данных','USB 2.0'],['Совместимость','iPhone 5 – iPhone 14'],['Оригинал','Apple']],
  quals:[['Быстрая зарядка','До 50% за 30 минут.','bolt',1],['Надёжный','Сертифицированный оригинал.','shield',0],['Синхронизация','Передача данных с Mac.','chip',1]],
  mini:['Оригинал Apple','Безопасно для батареи.','1 м','длина кабеля']},
 {id:'ch45',cat:'chargers',brand:'Samsung',name:'Зарядка Super Fast 45 Вт',short:'USB‑C · PPS · кабель в комплекте',price:2990,
  draw:()=>svgCharger('brick45','#2b2b2d'),colors:[['Чёрный','#2b2b2d']],mem:null,tl:'Сверхбыстрая зарядка для Galaxy.',
  specs:[['Мощность','45 Вт'],['Порт','USB‑C'],['Стандарт','USB PD 3.0 PPS'],['В комплекте','Кабель USB‑C – USB‑C 1,8 м'],['Совместимость','Galaxy S, Tab, Book'],['Оригинал','Samsung']],
  quals:[['Super Fast 2.0','Galaxy S24 Ultra до 65% за 30 мин.','bolt',1],['Кабель 5 А','Уже в комплекте.','chip',0],['Защита','От перегрева и перенапряжения.','shield',1]],
  mini:['Оригинал Samsung','Официальная гарантия.','45 Вт','максимальная мощность']},
 {id:'cc2',cat:'chargers',brand:'Apple',name:'Кабель USB‑C 240 Вт, 2 м',short:'Плетёный · Type‑C – Type‑C',price:2990,
  draw:()=>svgCharger('cc'),colors:[['Белый','#f4f4f2']],mem:null,tl:'Один кабель для iPhone 17, iPad и MacBook.',
  specs:[['Разъёмы','USB‑C / USB‑C'],['Длина','2 м'],['Мощность','До 240 Вт'],['Оплётка','Тканевая'],['Совместимость','iPhone 15–17, iPad, Mac'],['Оригинал','Apple']],
  quals:[['240 Вт','Хватит даже для MacBook Pro.','bolt',1],['Плетёная оплётка','Не путается и служит дольше.','shield',0],['Универсальный','Подходит ко всем USB‑C.','chip',1]],
  mini:['Оригинал Apple','Прочная оплётка.','2 м','длина кабеля']},

 {id:'gift-iphone',cat:'gifts',brand:'Подарочный набор',name:'iPhone 17 Pro Max — подарочный набор',short:'iPhone, чехол MagSafe, зарядка 35 Вт, упаковка',price:134900,old:142790,tag:'Подарок',hidden:true,
  draw:()=>svgGiftIphone(),colors:[['Космический оранжевый','#e0713a']],mem:[['256 ГБ',0],['512 ГБ',17000]],tl:'Готовый подарок в премиальной обёртке.',
  specs:[['Модель','iPhone 17 Pro Max'],['Цвет','Космический оранжевый'],['Экран','6,9″ ProMotion 120 Гц'],['Процессор','Apple A19 Pro'],['Камеры','48 + 48 + 48 МП'],['Чехол','Силиконовый с MagSafe'],['Зарядка','Адаптер USB‑C 35 Вт'],['Упаковка','Подарочная обёртка, лента, открытка']],
  quals:[['Красиво с первого взгляда','Обёртка ручной работы с золотой лентой.','gift',1],['Всё в комплекте','Телефон, чехол и зарядка — сразу к использованию.','shield',0],['Открытка','Ваше поздравление от руки.','pen',1]],
  mini:['Готов к вручению','Упаковываем вручную в день заказа.','−7 890','сом выгода набора']},
 {id:'gift-rog',cat:'gifts',brand:'Подарочный набор',name:'ROG Strix SCAR 18 (2025) — подарочный набор',short:'Ноутбук, мышь, рюкзак ROG, упаковка',price:359900,old:381800,tag:'Подарок',hidden:true,
  draw:()=>svgGiftRog(),colors:[['Off Black','#1c1c1f']],mem:[['32 ГБ / 2 ТБ',0],['64 ГБ / 4 ТБ',61000]],tl:'Лучший в мире ноутбуков — в подарочном наборе.',
  specs:[['Модель','ASUS ROG Strix SCAR 18 (2025)'],['Процессор','Intel Core Ultra 9 275HX'],['Видеокарта','RTX 5090 Laptop, 24 ГБ'],['Экран','18″ Mini LED 2,5K 240 Гц'],['Память','32 ГБ DDR5 / SSD 2 ТБ'],['Мышь','Игровая беспроводная ROG'],['Рюкзак','ROG для ноутбуков 18″'],['Упаковка','Подарочная Dex Shop']],
  quals:[['Лучший в мире ноутбуков','Флагманская мощь для игр и стриминга.','game',1],['Всё для игры','Мышь и рюкзак в комплекте.','shield',0],['Подарочная упаковка','Бесплатно в каждом наборе.','gift',1]],
  mini:['Готов к победе','Распакуй — и сразу в игру.','−21 900','сом выгода набора']}
];
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
const som=n=>Math.round(n).toLocaleString('ru-RU').replace(/[,  ]/g,' ')+' сом';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>(typeof u==='string'&&/^(https?:|\/|blob:|data:image\/)/.test(u))?u:'';
