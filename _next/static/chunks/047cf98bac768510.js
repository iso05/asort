(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(43476),i=e.i(71645),a=e.i(18566),r=e.i(99963),s=e.i(52239);let n=[{id:"blue",name:"SUGAR",subtitle:"CRYSTAL WHITE",weight:"1 KG / 5 KG",origin:"PREMIUM GRADE",color:"BLUE / WHITE",bg:"#3B7FBF",accent:"#2D6FBF",text:"#93C5FD",emoji:"🟦",description:"The finest refined sugar sourced from top-tier plantations. Crisp, pure, and perfect for every recipe. Our quality is unmatched — taste the difference.",packageBg:"linear-gradient(135deg, #1e4d8c 0%, #2d6fbf 50%, #1a3a5c 100%)"},{id:"green",name:"RICE",subtitle:"LONG GRAIN",weight:"2 KG / 10 KG",origin:"PREMIUM GRADE",color:"GREEN / IVORY",bg:"#3D7F3D",accent:"#2E7D2E",text:"#86EFAC",emoji:"🟩",description:"Long grain rice grown in lush, mineral-rich paddies. Every grain cooks to fluffy perfection. Aromatic, nourishing, and consistently exceptional.",packageBg:"linear-gradient(135deg, #22543d 0%, #2e7d2e 50%, #1a3d1a 100%)"},{id:"black",name:"BUCKWHEAT",subtitle:"ROASTED WHOLE",weight:"0.9 KG / 4 KG",origin:"PREMIUM GRADE",color:"BLACK / GOLD",bg:"#171717",accent:"#171717",text:"#D1D5DB",emoji:"⬛",description:"Roasted whole buckwheat with a rich, nutty depth. High in protein and packed with essential minerals. The cornerstone of a wholesome kitchen.",packageBg:"linear-gradient(135deg, #1f1f1f 0%, #171717 50%, #111111 100%)"},{id:"orange",name:"LENTILS",subtitle:"RED SPLIT",weight:"1 KG / 5 KG",origin:"PREMIUM GRADE",color:"ORANGE / RUST",bg:"#C27F3D",accent:"#C2410C",text:"#FED7AA",emoji:"🟧",description:"Vibrant red split lentils harvested from sun-drenched fields. Quick-cooking and loaded with plant protein. Bold flavor meets everyday convenience.",packageBg:"linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #7c2d12 100%)"}];function o(){let[e,o]=(0,i.useState)(0),[l,c]=(0,i.useState)(!1),d=(0,a.useRouter)(),{setHomeColor:h}=(0,r.useHomeColor)(),m=n[e];return(0,i.useEffect)(()=>{h({bg:m.bg,accent:m.accent,text:m.text})},[e,h]),(0,t.jsxs)("div",{className:"min-h-screen w-full overflow-hidden transition-colors duration-700 relative",style:{background:m.bg,fontFamily:"'Barlow Condensed', 'Oswald', sans-serif"},children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        .nav-link {
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Barlow', sans-serif;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: rgba(255,255,255,1); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: rgba(255,255,255,1); }
        .nav-link.active::after { width: 100%; }

        .thumb-btn { transition: transform .2s, outline .2s; border-radius: 10px; overflow: hidden; }
        .thumb-btn:hover { transform: scale(1.08); }
        .thumb-btn.active-thumb { outline: 2px solid rgba(255,255,255,0.8); transform: scale(1.1); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: slideDown 0.22s ease forwards; }
        .bg-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}),(0,t.jsx)("div",{className:"bg-glow",style:{width:600,height:600,background:m.accent,opacity:.18,top:-100,right:100,transition:"background 0.7s ease"}}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 pt-6 pb-10 h-[calc(100vh-100px)] gap-8  overflow-visible lg:overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex-1 max-w-xs",style:{animation:"fadeUp .45s ease forwards"},children:[(0,t.jsxs)("p",{className:"text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4",style:{fontFamily:"'Barlow', sans-serif"},children:["RELEASE DATE",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"text-white/50",children:"2025 · ASORT"})]}),(0,t.jsx)("h1",{className:"font-black uppercase text-white leading-none mb-1",style:{fontSize:"clamp(2.5rem,5vw,4rem)"},children:m.name}),(0,t.jsx)("p",{className:"font-bold uppercase tracking-widest mb-1",style:{color:m.text,fontSize:13},children:m.subtitle}),(0,t.jsx)("div",{className:"mt-4 space-y-1",style:{fontFamily:"'Barlow', sans-serif"},children:[["WEIGHT",m.weight],["GRADE",m.origin],["COLOR WAY",m.color]].map(([e,i])=>(0,t.jsxs)("p",{className:"text-white/40 text-[11px] tracking-wider uppercase",children:[(0,t.jsx)("span",{className:"text-white/25 mr-2",children:e}),i]},e))}),(0,t.jsxs)("div",{className:"mt-7",children:[(0,t.jsx)("p",{className:"text-white/30 text-[10px] tracking-[0.3em] uppercase mb-3",style:{fontFamily:"'Barlow', sans-serif"},children:"SIZE Range (KG)"}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:["0.5","1","2","5","10"].map(e=>(0,t.jsx)("button",{className:"w-10 h-10 rounded-lg text-[11px] font-bold tracking-wide text-white/60 hover:text-white transition-all duration-200 border border-white/15 hover:border-white/40",style:{background:"rgba(255,255,255,0.06)"},children:e},e))})]}),(0,t.jsxs)("div",{className:"mt-6",children:[(0,t.jsx)("p",{className:"text-white/30 text-[10px] tracking-[0.3em] uppercase mb-3",style:{fontFamily:"'Barlow', sans-serif"},children:"SELECT PRODUCT"}),(0,t.jsx)("div",{className:"flex gap-3",children:n.map((i,a)=>(0,t.jsx)("button",{className:`thumb-btn ${a===e?"active-thumb":""}`,onClick:()=>o(a),title:i.name,style:{width:60,height:60,padding:0,borderRadius:10,overflow:"hidden",border:a===e?`2px solid ${i.text}`:"2px solid rgba(255,255,255,0.2)",background:"transparent",transition:"transform 0.2s, border 0.2s",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.08)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:(0,t.jsx)("img",{src:`${s.default}/images/product-${a+1}.png`,alt:i.name,style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.target.style.display="none"}})},i.id))})]})]},`left-${e}`),(0,t.jsxs)("div",{className:"relative flex-1 flex flex-col items-center justify-center gap-8",style:{minHeight:380},children:[(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center select-none pointer-events-none",style:{overflow:"hidden"},children:(0,t.jsx)("span",{className:"font-black text-white uppercase",style:{fontSize:"clamp(120px, 18vw, 220px)",lineHeight:1,opacity:.08,letterSpacing:"-0.02em",transform:"translateY(10px)"},children:"ASORT"})}),(0,t.jsx)("img",{src:`/images/product-${e+1}.png`,alt:m.name,style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.target.style.display="none"}})]}),(0,t.jsxs)("div",{className:"flex-1 max-w-xs text-right hidden md:flex flex-col items-end gap-6",style:{animation:"fadeUp .6s ease forwards"},children:[(0,t.jsx)("p",{className:"text-white/40 text-xs leading-relaxed text-right",style:{fontFamily:"'Barlow', sans-serif",fontWeight:300},children:m.description}),(0,t.jsx)("button",{onClick:()=>d.push("/about"),className:"flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[11px] tracking-[0.3em] uppercase cursor-pointer",style:{fontFamily:"'Barlow', sans-serif"},children:(0,t.jsx)("span",{children:"► LEARN MORE"})}),(0,t.jsx)("div",{className:"flex gap-2 mt-4",children:[{icon:"←",dir:-1},{icon:"→",dir:1}].map(({icon:e,dir:i})=>(0,t.jsx)("button",{onClick:()=>o(e=>(e+i+n.length)%n.length),className:"w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all text-sm",children:e},e))})]},`right-${e}`)]})]})}e.s(["default",()=>o])}]);