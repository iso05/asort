(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56691,e=>{"use strict";var r=e.i(43476),a=e.i(22016),t=e.i(71645),n=e.i(93681);let s=[{name:"Crystal White Sugar",href:"/products"},{name:"Long Grain Rice",href:"/products"},{name:"Roasted Buckwheat",href:"/products"},{name:"Red Split Lentils",href:"/products"},{name:"Whole Chickpeas",href:"/products"},{name:"Sunflower Oil",href:"/products"}],i=[{name:"About Us",href:"/about"},{name:"Products",href:"/products"},{name:"News",href:"/news"},{name:"Partners",href:"/partners"},{name:"Contact",href:"/contact"}],o=[{icon:"✉",label:"info@asort.com"},{icon:"✉",label:"sales@asort.com"},{icon:"☎",label:"+998 90 123 45 67"},{icon:"⌖",label:"Tashkent, Uzbekistan"}],l=[{label:"LinkedIn",href:"#",abbr:"LI"},{label:"Instagram",href:"#",abbr:"IG"},{label:"Twitter",href:"#",abbr:"TW"}],d={footerBg:"linear-gradient(135deg, #0F1729 0%, #1a2a4e 100%)",topBandBg:"linear-gradient(135deg, #1a2a4e 0%, #0F1729 100%)",topBandBorder:"rgba(100,200,255,0.15)",borderThin:"rgba(100,200,255,0.12)",divider:"linear-gradient(90deg, transparent, rgba(100,200,255,0.20) 30%, rgba(100,200,255,0.20) 70%, transparent)",brandText:"#E8F1FF",brandSub:"rgba(100,200,255,0.32)",brandReg:"rgba(100,200,255,0.28)",brandDivider:"rgba(100,200,255,0.20)",accent:"#64C8FF",accentHov:"#85D8FF",linkColor:"rgba(168,210,255,0.48)",linkHov:"rgba(168,210,255,0.90)",bodyText:"rgba(168,210,255,0.55)",dimText:"rgba(168,210,255,0.35)",veryDim:"rgba(168,210,255,0.25)",iconColor:"rgba(100,200,255,0.50)",socialBorder:"rgba(100,200,255,0.18)",socialBg:"rgba(100,200,255,0.08)",socialText:"rgba(100,200,255,0.60)",inputBg:"rgba(100,200,255,0.06)",inputBorder:"rgba(100,200,255,0.18)",inputBorderErr:"rgba(255,80,80,0.5)",inputText:"#E8F1FF",inputPlaceholder:"rgba(168,210,255,0.35)",cardBg:"rgba(100,200,255,0.05)",cardBorder:"rgba(100,200,255,0.12)",hoursLabel:"rgba(100,200,255,0.40)",hoursText:"rgba(168,210,255,0.55)",badgeBg:"rgba(100,200,255,0.08)",badgeBorder:"rgba(100,200,255,0.15)",badgeText:"rgba(168,210,255,0.50)",statNum:"#64C8FF",statLabel:"rgba(100,200,255,0.35)",tagline:"rgba(168,210,255,0.28)",formPanelBg:"rgba(100,200,255,0.04)",formPanelBorder:"rgba(100,200,255,0.12)",successBg:"rgba(80,200,120,0.15)",successBorder:"rgba(80,200,120,0.35)",successText:"rgba(168,210,255,0.70)",errorText:"rgba(255,100,100,0.90)"},c={footerBg:"#FFFFFF",topBandBg:"linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)",topBandBorder:"rgba(100,150,200,0.15)",borderThin:"rgba(100,150,200,0.12)",divider:"linear-gradient(90deg, transparent, rgba(100,150,200,0.15) 30%, rgba(100,150,200,0.15) 70%, transparent)",brandText:"#1a1f3a",brandSub:"#6b7a9e",brandReg:"#8b96b5",brandDivider:"rgba(100,150,200,0.20)",accent:"#2c5aa0",accentHov:"#1a3a70",linkColor:"#4a5f8f",linkHov:"#1a1f3a",bodyText:"#3a4a6f",dimText:"#7a8aaf",veryDim:"#9ba5bf",iconColor:"#2c5aa0",socialBorder:"rgba(100,150,200,0.18)",socialBg:"rgba(100,150,200,0.06)",socialText:"#6b7a9e",inputBg:"#F5F7FB",inputBorder:"rgba(100,150,200,0.22)",inputBorderErr:"rgba(220,38,38,0.5)",inputText:"#1a1f3a",inputPlaceholder:"#8b96b5",cardBg:"rgba(100,150,200,0.05)",cardBorder:"rgba(100,150,200,0.12)",hoursLabel:"#8b96b5",hoursText:"#4a5f8f",badgeBg:"rgba(100,150,200,0.08)",badgeBorder:"rgba(100,150,200,0.14)",badgeText:"#4a5f8f",statNum:"#2c5aa0",statLabel:"#8b96b5",tagline:"#8b96b5",formPanelBg:"rgba(100,150,200,0.04)",formPanelBorder:"rgba(100,150,200,0.12)",successBg:"rgba(46,122,62,0.10)",successBorder:"rgba(46,122,62,0.25)",successText:"#3a6f3a",errorText:"rgba(220,38,38,0.9)"};function g(){let{theme:e}=(0,n.useTheme)(),g="dark"===e?d:c,[p,f]=(0,t.useState)(""),[b,m]=(0,t.useState)(!1),[x,h]=(0,t.useState)(!1),u=()=>{p.includes("@")?(m(!0),h(!1)):h(!0)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@300;400;500;600&display=swap');

        .ft-link {
          font-family: 'Barlow', sans-serif;
          font-size: 12px; font-weight: 400;
          color: ${g.linkColor};
          text-decoration: none;
          display: block; padding: 4px 0;
          transition: color 0.18s ease;
          line-height: 1.6;
        }
        .ft-link:hover { color: ${g.linkHov}; }

        .social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid ${g.socialBorder};
          background: ${g.socialBg};
          color: ${g.socialText};
          font-family: 'Barlow', sans-serif; font-size: 9px;
          font-weight: 600; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.18s ease;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: #C47830;
          background: rgba(196,120,48,0.12);
          color: #C47830;
          transform: translateY(-2px);
        }

        .nl-input {
          flex: 1; border: none; background: transparent;
          font-family: 'Barlow', sans-serif; font-size: 12px;
          color: ${g.inputText}; padding: 11px 0;
        }
        .nl-input::placeholder { color: ${g.inputPlaceholder}; }
        .nl-input:focus { outline: none; }

        .nl-btn {
          flex-shrink: 0;
          padding: 8px 16px; border-radius: 8px;
          background: #2c5aa0; border: none;
          color: #fff; font-family: 'Barlow', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: background 0.18s;
          white-space: nowrap;
        }
        .nl-btn:hover { background: #1a3a70; }

        @keyframes subIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .sub-in { animation: subIn 0.3s cubic-bezier(.22,.68,0,1.2) forwards; }

        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 48px;
        }
        @media (max-width: 960px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 36px 28px; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        .ft-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
      `}),(0,r.jsxs)("footer",{style:{background:g.footerBg,borderTop:`1px solid ${g.borderThin}`,transition:"background 0.3s ease"},children:[(0,r.jsxs)("div",{style:{background:g.topBandBg,borderBottom:`1px solid ${g.topBandBorder}`,padding:"16px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14},children:[(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,r.jsx)("span",{style:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,color:g.brandText,letterSpacing:"0.24em"},children:"ASORT"}),(0,r.jsx)("span",{style:{fontSize:8,color:g.brandReg},children:"®"})]}),(0,r.jsx)("div",{style:{display:"flex",gap:8},children:l.map(e=>(0,r.jsx)("a",{href:e.href,"aria-label":e.label,className:"social-btn",children:e.abbr},e.label))})]}),(0,r.jsx)("div",{style:{maxWidth:1280,margin:"0 auto",padding:"36px 40px 28px"},children:(0,r.jsxs)("div",{className:"ft-grid",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:11,color:g.bodyText,lineHeight:1.75,fontWeight:300,marginBottom:18,maxWidth:280},children:"Premium-grade food staples from Central Asia. Quality certified & trusted globally."}),(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.35em",textTransform:"uppercase",color:g.accent,marginBottom:10},children:"Updates"}),b?(0,r.jsxs)("div",{className:"sub-in",style:{display:"flex",alignItems:"center",gap:10},children:[(0,r.jsx)("div",{style:{width:24,height:24,borderRadius:"50%",background:g.successBg,border:`1px solid ${g.successBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12},children:"✓"}),(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:10,color:g.successText},children:"Subscribed!"})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,background:g.inputBg,border:`1px solid ${x?g.inputBorderErr:g.inputBorder}`,borderRadius:8,padding:"2px 6px 2px 12px",transition:"border-color 0.18s"},children:[(0,r.jsx)("input",{className:"nl-input",type:"email",placeholder:"your@email.com",value:p,onChange:e=>{f(e.target.value),h(!1)},onKeyDown:e=>"Enter"===e.key&&u()}),(0,r.jsx)("button",{className:"nl-btn",onClick:u,children:"Go"})]}),x&&(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:10,color:g.errorText,marginTop:4},children:"⚠ Valid email"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.35em",textTransform:"uppercase",color:g.accent,marginBottom:12},children:"Products"}),s.slice(0,4).map(e=>(0,r.jsx)(a.default,{href:e.href,className:"ft-link",children:e.name},e.name))]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.35em",textTransform:"uppercase",color:g.accent,marginBottom:12},children:"Links"}),i.slice(0,4).map(e=>(0,r.jsx)(a.default,{href:e.href,className:"ft-link",children:e.name},e.name))]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontFamily:"'Barlow',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.35em",textTransform:"uppercase",color:g.accent,marginBottom:12},children:"Contact"}),o.slice(0,3).map(({icon:e,label:a})=>(0,r.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:7,marginBottom:8},children:[(0,r.jsx)("span",{style:{fontSize:11,color:g.iconColor,marginTop:1,flexShrink:0},children:e}),(0,r.jsx)("span",{style:{fontFamily:"'Barlow',sans-serif",fontSize:11,color:g.hoursText,lineHeight:1.4},children:a})]},a))]})]})}),(0,r.jsx)("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 40px"},children:(0,r.jsx)("div",{style:{height:1,background:g.divider}})}),(0,r.jsx)("div",{style:{maxWidth:1280,margin:"0 auto",padding:"14px 40px"},children:(0,r.jsxs)("div",{className:"ft-bottom",children:[(0,r.jsxs)("span",{style:{fontFamily:"'Barlow',sans-serif",fontSize:9,color:g.dimText},children:["© ",new Date().getFullYear()," Asort. All rights reserved."]}),(0,r.jsx)("div",{style:{display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"},children:[{v:"8",l:"Products"},{v:"40+",l:"Countries"}].map(({v:e,l:a})=>(0,r.jsxs)("div",{style:{display:"flex",alignItems:"baseline",gap:4},children:[(0,r.jsx)("span",{style:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,color:g.statNum},children:e}),(0,r.jsx)("span",{style:{fontFamily:"'Barlow',sans-serif",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:g.statLabel},children:a})]},a))})]})})]})]})}e.s(["default",()=>g])}]);