(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,60078,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let a=[{symbol:"◈",title:"Uncompromising Quality",body:"Every batch is tested across 12 quality checkpoints before it ever leaves our facility. We reject what others accept."},{symbol:"◉",title:"Farm-Direct Sourcing",body:"We work directly with partner farms — no middlemen. Full traceability from the field to your shelf."},{symbol:"◬",title:"Sustainable Practice",body:"80% recyclable packaging, water-conscious processing, and fair-wage farm partnerships. Good business, done right."},{symbol:"◍",title:"Global, Local Heart",body:"Operating in 40+ countries while staying true to the communities that grow our ingredients."}],s=[{year:"2015",title:"The Idea",body:"Founded in a small warehouse with one product: premium long-grain rice. The vision was simple — bring transparency to bulk food."},{year:"2017",title:"First Export",body:"Asort crosses borders for the first time, shipping to three Central Asian markets. Quality speaks without translation."},{year:"2019",title:"Full Range Launch",body:"Sugar, buckwheat, and red split lentils join the family. The Asort colour-coded packaging system is born."},{year:"2021",title:"ISO Certification",body:"Awarded international food safety certification across all product lines. A promise turned into a paper trail."},{year:"2023",title:"40 Countries",body:"Asort reaches distribution partners in over forty countries. From corner stores to national retail chains."},{year:"2025",title:"What's Next",body:"Expanding into superfoods and specialty grains. The journey from farm to table keeps getting shorter."}],i=[{name:"Alibek Dzhaksybekov",role:"Founder & CEO",initial:"A"},{name:"Zarina Muratova",role:"Head of Quality",initial:"Z"},{name:"Timur Seitkali",role:"Supply Chain",initial:"T"},{name:"Asel Nurlanovna",role:"Brand Director",initial:"A"}],n="#13100A",o="#1C1710",l="rgba(255,220,140,0.09)",d="#E8A838",c="rgba(232,168,56,0.12)",m="rgba(255,240,200,0.85)",p="rgba(255,220,150,0.20)",h="rgba(255,200,100,0.10)",g="rgba(255,200,100,0.22)";function x({children:e,delay:a=0}){let{ref:s,visible:i}=function(){let e=(0,r.useRef)(null),[t,a]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let r=new IntersectionObserver(([e])=>{e.isIntersecting&&(a(!0),r.disconnect())},{threshold:.12});return r.observe(t),()=>r.disconnect()},[]),{ref:e,visible:t}}();return(0,t.jsx)("div",{ref:s,style:{opacity:+!!i,transform:i?"translateY(0)":"translateY(28px)",transition:`opacity 0.65s ease ${a}ms, transform 0.65s ease ${a}ms`},children:e})}function y(){return(0,t.jsxs)("div",{style:{background:n,color:m,fontFamily:"'Barlow Condensed', 'Oswald', sans-serif",overflowX:"hidden"},children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .label {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: ${d};
          display: block;
        }

        .big-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.92;
          color: ${m};
        }

        .body-text {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          color: rgba(255,220,150,0.38);
          line-height: 1.85;
        }

        .rule { height: 1px; background: ${l}; }

        .value-card {
          padding: 28px 24px;
          border-radius: 18px;
          border: 1px solid ${h};
          background: ${o};
          transition: background 0.25s, transform 0.25s, border-color 0.25s;
          height: 100%;
        }
        .value-card:hover {
          background: #241F14;
          border-color: ${g};
          transform: translateY(-4px);
        }

        .tl-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: ${d};
          border: 2px solid ${n};
          outline: 1px solid ${d};
          flex-shrink: 0;
        }

        .stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: ${m};
          line-height: 1;
        }

        .team-card {
          border-radius: 20px;
          border: 1px solid ${h};
          background: ${o};
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
        }
        .team-card:hover {
          transform: translateY(-6px);
          border-color: ${g};
        }

        @keyframes heroFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-anim        { animation: heroFade 0.7s ease forwards; }
        .hero-anim-delay  { animation: heroFade 0.7s ease 0.15s both; }
        .hero-anim-delay2 { animation: heroFade 0.7s ease 0.3s both; }

        /* Subtle warm grain texture */
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .tl-row { grid-template-columns: 20px 70px 1fr !important; gap: 0 14px !important; }
        }
      `}),(0,t.jsx)("div",{className:"grain"}),(0,t.jsxs)("section",{style:{minHeight:"92vh",display:"flex",alignItems:"flex-end",padding:"110px 40px 80px",maxWidth:1280,margin:"0 auto",position:"relative"},children:[(0,t.jsx)("div",{style:{position:"absolute",top:"30%",right:-100,width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle, ${c} 0%, transparent 70%)`,pointerEvents:"none",filter:"blur(40px)"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:"50%",right:-40,transform:"translateY(-50%)",fontFamily:"'Barlow Condensed', sans-serif",fontWeight:900,fontSize:"clamp(180px, 28vw, 360px)",color:"rgba(232,168,56,0.04)",lineHeight:1,pointerEvents:"none",userSelect:"none",letterSpacing:"-0.05em"},children:"2025"}),(0,t.jsxs)("div",{style:{maxWidth:760,position:"relative",zIndex:2},children:[(0,t.jsx)("span",{className:"label hero-anim",style:{marginBottom:20},children:"About Asort"}),(0,t.jsxs)("h1",{className:"big-heading hero-anim-delay",style:{fontSize:"clamp(3.5rem, 9vw, 8rem)",marginBottom:28},children:["We feed",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"#F5C96A",fontStyle:"italic"},children:"the world"}),(0,t.jsx)("br",{}),"with intent."]}),(0,t.jsx)("p",{className:"body-text hero-anim-delay2",style:{fontSize:15,maxWidth:480,lineHeight:2},children:"Asort is a premium food distribution company built on a single belief — that everyday staples deserve the same rigour as fine ingredients. We source, test, and deliver with obsessive care."}),(0,t.jsxs)("div",{className:"hero-anim-delay2",style:{marginTop:48,display:"flex",alignItems:"center",gap:12},children:[(0,t.jsx)("div",{style:{width:32,height:1,background:p}}),(0,t.jsx)("span",{style:{fontFamily:"'Barlow', sans-serif",fontSize:10,letterSpacing:"0.35em",textTransform:"uppercase",color:p},children:"Scroll to explore"})]})]})]}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsx)("section",{style:{padding:"72px 40px",maxWidth:1280,margin:"0 auto"},children:(0,t.jsx)(x,{children:(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:"1px",background:h,borderRadius:20,overflow:"hidden",border:`1px solid ${h}`},children:[{v:"12+",l:"Years active"},{v:"40+",l:"Countries"},{v:"4",l:"Core products"},{v:"98%",l:"Satisfaction"},{v:"500T",l:"Monthly capacity"}].map(({v:e,l:r})=>(0,t.jsxs)("div",{style:{padding:"36px 28px",background:n,textAlign:"center"},children:[(0,t.jsx)("p",{className:"stat-num",children:e}),(0,t.jsx)("p",{style:{fontFamily:"'Barlow', sans-serif",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:p,marginTop:7},children:r})]},r))})})}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsx)("section",{style:{padding:"100px 40px",maxWidth:1280,margin:"0 auto"},children:(0,t.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"},className:"story-grid",children:[(0,t.jsxs)(x,{children:[(0,t.jsx)("span",{className:"label",style:{marginBottom:16},children:"Our Story"}),(0,t.jsxs)("h2",{className:"big-heading",style:{fontSize:"clamp(2.5rem, 5vw, 4.5rem)",marginBottom:0},children:["Started with",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:d},children:"one product."}),(0,t.jsx)("br",{}),"Built on trust."]})]}),(0,t.jsxs)(x,{delay:150,children:[(0,t.jsx)("p",{className:"body-text",style:{fontSize:14,marginBottom:20},children:"Asort began in 2015 as a response to a simple frustration — bulk food products with no traceability, no consistency, and no accountability. We started with one grade of long-grain rice and refused to compromise on any detail."}),(0,t.jsx)("p",{className:"body-text",style:{fontSize:14,marginBottom:20},children:"A decade later we supply retail chains, restaurants, and households across four continents. The products changed. The obsession didn't."}),(0,t.jsx)("p",{className:"body-text",style:{fontSize:14},children:"Every package that leaves an Asort facility has passed our 12-point lab analysis. Not because we have to. Because our customers deserve to know exactly what they're buying."})]})]})}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsxs)("section",{style:{padding:"100px 40px",maxWidth:1280,margin:"0 auto"},children:[(0,t.jsxs)(x,{children:[(0,t.jsx)("span",{className:"label",style:{marginBottom:14},children:"What We Stand For"}),(0,t.jsxs)("h2",{className:"big-heading",style:{fontSize:"clamp(2.5rem, 5vw, 4.5rem)",marginBottom:56},children:["Four values.",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:p},children:"Zero exceptions."})]})]}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:16},children:a.map((e,r)=>(0,t.jsx)(x,{delay:80*r,children:(0,t.jsxs)("div",{className:"value-card",children:[(0,t.jsx)("div",{style:{fontSize:22,color:d,fontWeight:900,marginBottom:16},children:e.symbol}),(0,t.jsx)("h3",{style:{fontFamily:"'Barlow', sans-serif",fontWeight:600,fontSize:13,letterSpacing:"0.05em",textTransform:"uppercase",color:m,marginBottom:10},children:e.title}),(0,t.jsx)("p",{className:"body-text",style:{fontSize:12.5,lineHeight:1.75},children:e.body})]})},e.title))})]}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsxs)("section",{style:{padding:"100px 40px",maxWidth:1280,margin:"0 auto"},children:[(0,t.jsxs)(x,{children:[(0,t.jsx)("span",{className:"label",style:{marginBottom:14},children:"Milestones"}),(0,t.jsxs)("h2",{className:"big-heading",style:{fontSize:"clamp(2.5rem, 5vw, 4.5rem)",marginBottom:64},children:["A decade of",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:d},children:"doing it right."})]})]}),(0,t.jsxs)("div",{style:{position:"relative"},children:[(0,t.jsx)("div",{style:{position:"absolute",left:4,top:6,bottom:6,width:1,background:l}}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:s.map((e,r)=>(0,t.jsx)(x,{delay:70*r,children:(0,t.jsxs)("div",{className:"tl-row",style:{display:"grid",gridTemplateColumns:"20px 120px 1fr",gap:"0 32px",alignItems:"flex-start",paddingBottom:44},children:[(0,t.jsx)("div",{style:{paddingTop:4},children:(0,t.jsx)("div",{className:"tl-dot"})}),(0,t.jsx)("p",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontWeight:800,fontSize:28,color:r===s.length-1?d:p,lineHeight:1},children:e.year}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{style:{fontFamily:"'Barlow', sans-serif",fontWeight:600,fontSize:14,letterSpacing:"0.05em",textTransform:"uppercase",color:m,marginBottom:6},children:e.title}),(0,t.jsx)("p",{className:"body-text",style:{fontSize:13,lineHeight:1.75},children:e.body})]})]})},e.year))})]})]}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsxs)("section",{style:{padding:"100px 40px",maxWidth:1280,margin:"0 auto"},children:[(0,t.jsxs)(x,{children:[(0,t.jsx)("span",{className:"label",style:{marginBottom:14},children:"The People"}),(0,t.jsxs)("h2",{className:"big-heading",style:{fontSize:"clamp(2.5rem, 5vw, 4.5rem)",marginBottom:56},children:["Built by humans",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:p},children:"who care deeply."})]})]}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16},children:i.map((e,r)=>(0,t.jsx)(x,{delay:80*r,children:(0,t.jsxs)("div",{className:"team-card",children:[(0,t.jsx)("div",{style:{height:160,background:"linear-gradient(135deg, rgba(232,168,56,0.10) 0%, rgba(232,168,56,0.02) 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:`1px solid ${h}`},children:(0,t.jsx)("div",{style:{width:64,height:64,borderRadius:"50%",background:"rgba(232,168,56,0.12)",border:"1px solid rgba(232,168,56,0.30)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed', sans-serif",fontWeight:900,fontSize:28,color:d},children:e.initial})}),(0,t.jsxs)("div",{style:{padding:"20px 20px 24px"},children:[(0,t.jsx)("p",{style:{fontFamily:"'Barlow', sans-serif",fontWeight:600,fontSize:13,color:m,marginBottom:4},children:e.name}),(0,t.jsx)("p",{style:{fontFamily:"'Barlow', sans-serif",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:p},children:e.role})]})]})},e.name))})]}),(0,t.jsx)("div",{className:"rule"}),(0,t.jsxs)("section",{style:{padding:"100px 40px",maxWidth:1280,margin:"0 auto",textAlign:"center",position:"relative"},children:[(0,t.jsx)("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse 60% 70% at 50% 50%, ${c}, transparent)`}}),(0,t.jsxs)(x,{children:[(0,t.jsx)("span",{className:"label",style:{marginBottom:16},children:"Ready to work together?"}),(0,t.jsxs)("h2",{className:"big-heading",style:{fontSize:"clamp(3rem, 7vw, 6rem)",marginBottom:36},children:["Let's start",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:d},children:"a conversation."})]}),(0,t.jsx)("a",{href:"/contact",style:{display:"inline-flex",alignItems:"center",gap:10,padding:"15px 38px",borderRadius:14,background:d,color:n,fontFamily:"'Barlow', sans-serif",fontWeight:700,fontSize:12,letterSpacing:"0.18em",textTransform:"uppercase",textDecoration:"none",transition:"transform 0.2s, box-shadow 0.2s",boxShadow:"0 8px 32px rgba(232,168,56,0.25)"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.04)",e.currentTarget.style.boxShadow="0 12px 40px rgba(232,168,56,0.38)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 8px 32px rgba(232,168,56,0.25)"},children:"Contact Us →"})]})]}),(0,t.jsxs)("footer",{style:{borderTop:`1px solid ${l}`,padding:"28px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12},children:[(0,t.jsx)("span",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontWeight:900,fontSize:16,letterSpacing:"0.22em",color:m},children:"ASORT ®"}),(0,t.jsx)("span",{style:{fontFamily:"'Barlow', sans-serif",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:p},children:"© 2025 Asort · Premium Food Products"})]})]})}e.s(["default",()=>y])}]);