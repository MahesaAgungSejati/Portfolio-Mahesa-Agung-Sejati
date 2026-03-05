import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GraduationCap, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const careerJourney = [
  // Tambahan data Freelance baru di urutan paling atas
  { role: "Full-Stack / Front-End Programmer", company: "Freelance", period: "2025 - Present" },
  { role: "Full-Stack Programmer (Intern)", company: "DISPARPORA Kab. Madiun",  period: "Sep 2024 - Jul 2025" },
  { role: "Full-Stack Programmer (Intern)", company: "Sebelas Maret University", period: "Jan 2025 - Mar 2025" },
  { role: "Full-Stack Programmer (Intern)", company: "Garapan.id",               period: "Feb 2024 - Jun 2024" },
];

const education = [
  { role: "Associate's Degree Informatics Engineering", company: "Sebelas Maret University", period: "2022 - 2025", gpa: "GPA: 3.82" },
];

// Dimensi Pesawat Kertas
const PLANE_W = 52;
const PLANE_H = 44;

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Refs untuk SVG
  const svgRef     = useRef<SVGSVGElement>(null);
  const trailRef   = useRef<SVGPathElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const planeGRef  = useRef<SVGGElement>(null);
  const stRef      = useRef<ScrollTrigger | null>(null);

  const build = () => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const svgEl   = svgRef.current;
    const trailEl = trailRef.current;
    const pathEl  = pathRef.current;
    const planeG  = planeGRef.current;
    
    if (!section || !wrapper || !svgEl || !trailEl || !pathEl || !planeG) return;

    stRef.current?.kill();

    const cards = gsap.utils.toArray<HTMLElement>('.exp-card-content', section);
    if (!cards.length) return;

    const wRect   = wrapper.getBoundingClientRect();
    const scrollY = window.scrollY;
    const wTop    = wRect.top + scrollY;
    const W       = wRect.width;
    const cx      = W * 0.5;

    // Kalkulasi posisi Y masing-masing card untuk membuat titik lentur (waypoints)
    const waypoints = cards.map(card => {
      const r = card.getBoundingClientRect();
      return { x: cx, y: (r.top + scrollY - wTop) + r.height / 2 };
    });

    const startY = Math.max(10, waypoints[0].y - 120);
    const endY   = waypoints[waypoints.length - 1].y + 100;

    svgEl.style.height = `${endY + 60}px`;

    // ── Membuat Jalur S-Curve ──────────────────────────────────────────────
    const SWING = W * 0.15; 
    const allPts = [{ x: cx, y: startY }, ...waypoints, { x: cx, y: endY }];
    let d = `M ${cx.toFixed(1)} ${startY.toFixed(1)}`;

    for (let i = 1; i < allPts.length; i++) {
      const prev = allPts[i - 1], cur = allPts[i];
      const side = i % 2 === 0 ? 1 : -1;
      const sw = SWING * side;
      const dy = cur.y - prev.y;
      const cp1x = prev.x + sw,        cp1y = prev.y + dy * 0.38;
      const cp2x = cur.x + sw * 0.45,  cp2y = cur.y  - dy * 0.12;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }

    pathEl.setAttribute('d', d);
    trailEl.setAttribute('d', d);

    const totalLen = pathEl.getTotalLength();

    // ── Helper: Mendapatkan posisi & sudut ─────────────────
    const getPosAngle = (p: number) => {
      const len = Math.min(Math.max(p * totalLen, 0), totalLen - 0.1);
      const pt  = pathEl.getPointAtLength(len);
      const pt2 = pathEl.getPointAtLength(Math.min(len + 2, totalLen));
      
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      return { x: pt.x, y: pt.y, angle };
    };

    gsap.set(trailEl, { strokeDasharray: totalLen, strokeDashoffset: totalLen, opacity: 0 });

    const p0 = getPosAngle(0);
    gsap.set(planeG, {
      opacity: 0, scale: 0,
      // PERBAIKAN 1: Pindahkan poros (transformOrigin) ke moncong pesawat (PLANE_W)
      transformOrigin: `${PLANE_W}px ${PLANE_H / 2}px`,
      // PERBAIKAN 2: Posisi X dikurangi lebar penuh pesawat agar moncong tepat di titik x
      x: p0.x - PLANE_W,
      y: p0.y - (PLANE_H / 2),
      rotation: p0.angle,
    });

    // ── ScrollTrigger Logic ─────────────────────────────
    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: 'top 30%',
      end:   'bottom 85%',
      scrub: 1.5, 
      onUpdate(self) {
        const raw = self.progress;

        const FSTART = 0.02, FEND = 0.90; 
        
        if (raw < FSTART) {
            gsap.set(planeG, { opacity: 0, scale: 0 });
            gsap.set(trailEl, { opacity: 0 });
            return;
        }

        // Sedang Terbang & Menggambar Garis
        if (raw <= FEND) {
          const t = (raw - FSTART) / (FEND - FSTART); 
          const { x, y, angle } = getPosAngle(t);

          gsap.set(planeG, {
            // PERBAIKAN 3: Kordinat disesuaikan dengan moncong pesawat
            x: x - PLANE_W,
            y: y - (PLANE_H / 2),
            rotation: angle,
            transformOrigin: `${PLANE_W}px ${PLANE_H / 2}px`,
            opacity: 1, 
            scale: 1,
          });

          gsap.set(trailEl, {
            strokeDashoffset: totalLen * (1 - t),
            opacity: Math.min(1, t * 10),
          });
          return;
        }

        // Fase Mendarat / Menghilang
        const landT = (raw - FEND) / (1 - FEND); 
        const { x, y, angle } = getPosAngle(1);
        
        const currentAngle = angle + ((90 - angle) * landT);

        gsap.set(planeG, {
          x: x - PLANE_W, 
          y: y - (PLANE_H / 2) + (landT * 40), 
          rotation: currentAngle,
          transformOrigin: `${PLANE_W}px ${PLANE_H / 2}px`,
          opacity: 1 - landT,   
          scale: 1 - landT * 1, 
        });
        
        gsap.set(trailEl, { strokeDashoffset: 0, opacity: Math.max(0, 0.4 - landT * 0.4) });
      },
    });

    // Card Entrance Animation
    cards.forEach(card => {
      const fromLeft = card.classList.contains('card-left-anim');
      gsap.fromTo(card,
        { x: fromLeft ? -40 : 40, opacity: 0, scale: 0.95 },
        { scrollTrigger: { trigger: card, start: 'top 85%' }, x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
      );
    });

    ScrollTrigger.refresh();
  };

  // PERBAIKAN 4: Tunggu font selesai dirender sebelum kalkulasi GSAP
  useEffect(() => {
    // Pastikan font sudah termuat agar kalkulasi tinggi kartu 100% akurat
    document.fonts.ready.then(() => {
      build();
      ScrollTrigger.refresh();
    });
    
    // Fallback jika fonts.ready gagal
    const t = setTimeout(build, 500);
    return () => { clearTimeout(t); stRef.current?.kill(); };
  }, []);

  useEffect(() => {
    const onResize = () => { stRef.current?.kill(); setTimeout(build, 100); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.exp-title-anim', { y: 80, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
    });
  }, { scope: sectionRef });

  type TLItem =
    | { type: 'label'; icon: React.ReactNode; label: string }
    | { type: 'card'; side: 'left' | 'right'; period: string; company: string; role: string; gpa?: string };

  const items: TLItem[] = [
    { type: 'label', icon: <GraduationCap size={14} className="text-gray-400" />, label: 'Education' },
    ...education.map((it, i): TLItem => ({ type: 'card', side: i % 2 === 0 ? 'right' : 'left', ...it })),
    { type: 'label', icon: <Briefcase size={14} className="text-gray-400" />, label: 'Career Journey' },
    ...careerJourney.map((it, i): TLItem => ({ type: 'card', side: i % 2 === 0 ? 'left' : 'right', ...it })),
  ];

  return (
    <section id="experience" ref={sectionRef}
      className="relative w-full bg-noir-900 text-noir-100 py-28 border-t border-noir-800">

      {/* Header */}
      <div className="mb-20 px-8 md:px-16">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-8 h-[1px] bg-noir-100" />
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400">Journey</p>
        </div>
        <div className="overflow-hidden">
          <h2 className="exp-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
            My Experience 
          </h2>
        </div>
      </div>

      {/* Timeline wrapper */}
      <div ref={wrapperRef} className="relative w-full max-w-6xl mx-auto px-6 md:px-16 overflow-hidden">

        {/* ── SVG TRAIL & PLANE ── */}
        <svg ref={svgRef}
          className="absolute inset-0 w-full pointer-events-none"
          preserveAspectRatio="none"
          style={{ height: '100%', overflow: 'visible', zIndex: 20 }}
          xmlns="http://www.w3.org/2000/svg">

          {/* Static Center Line */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 10" />

          {/* The Trail */}
          <path ref={trailRef} fill="none" stroke="url(#tG)" strokeWidth="2" strokeLinecap="round" />
          <path ref={pathRef} fill="none" stroke="none" />

          {/* THE PLANE - Moncong tepat berada di x=PLANE_W */}
          <g ref={planeGRef} style={{ filter: 'url(#glow)' }}>
            <polygon points={`0,0 ${PLANE_W},${PLANE_H/2} 12,${PLANE_H/2}`} fill="url(#pG1)" opacity="0.95" />
            <polygon points={`0,${PLANE_H} ${PLANE_W},${PLANE_H/2} 12,${PLANE_H/2}`} fill="url(#pG2)" opacity="0.85" />
            <polygon points={`0,${PLANE_H} 12,${PLANE_H/2} 0,${PLANE_H/2}`} fill="url(#pG3)" opacity="0.6" />
          </g>

          <defs>
            {/* GRADIENT JALUR (Violet -> Blue -> Cyan) */}
            <linearGradient id="tG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0"   stopColor="#A78BFA" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="1"   stopColor="#38BDF8" stopOpacity="0.7" />
            </linearGradient>
            
            {/* GRADIENT PESAWAT - Bagian Atas */}
            <linearGradient id="pG1" x1="0" y1="0" x2={PLANE_W} y2={PLANE_H/2} gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" /><stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
            
            {/* GRADIENT PESAWAT - Bagian Bawah */}
            <linearGradient id="pG2" x1="0" y1={PLANE_H} x2={PLANE_W} y2={PLANE_H/2} gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" /><stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
            
            {/* GRADIENT PESAWAT - Bagian Dalam/Ekor */}
            <linearGradient id="pG3" x1="0" y1={PLANE_H} x2="12" y2={PLANE_H/2} gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9" /><stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        {/* ── TIMELINE HTML CONTENT ── */}
        <div className="relative flex flex-col pt-10" style={{ zIndex: 30 }}>
          {items.map((item, i) => {
            if (item.type === 'label') return (
              <div key={i} className="flex justify-center my-10 relative z-40">
                <div className="border border-noir-800 bg-noir-900 px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest flex items-center gap-3 text-gray-300 shadow-xl">
                  {item.icon}{item.label}
                </div>
              </div>
            );

            const isLeft = item.side === 'left';
            
            return (
              <div key={i} className="flex w-full items-center justify-center mb-16 relative">
                
                {/* --- Kolom Kiri --- */}
                <div className={`w-1/2 flex justify-end pr-6 md:pr-12 ${!isLeft ? 'opacity-0 invisible' : ''}`}>
                  {isLeft && (
                    <div className="exp-card-content card-left-anim w-full max-w-[450px] group p-6 md:p-8 bg-noir-900 border border-noir-800 hover:border-noir-100 rounded-sm transition-all duration-500 shadow-lg relative">
                      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                        <span className="px-3 py-1 border border-gray-700 rounded-full text-[10px] font-sans uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                          {item.period}
                        </span>
                        {'gpa' in item && item.gpa && (
                          <span className="font-sans text-sm font-bold text-noir-100">{item.gpa}</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 text-gray-300 group-hover:text-white transition-colors leading-tight">
                        {item.company}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{item.role}</p>
                    </div>
                  )}
                </div>

                {/* --- Titik Tengah (Center Node) --- */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-noir-900 border-2 border-gray-500 z-40 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>

                {/* --- Garis Konektor (AMAN) --- */}
                {isLeft && (
                  <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-6 md:w-12 h-[1px] bg-gray-700 z-10"></div>
                )}
                {!isLeft && (
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-6 md:w-12 h-[1px] bg-gray-700 z-10"></div>
                )}

                {/* --- Kolom Kanan --- */}
                <div className={`w-1/2 flex justify-start pl-6 md:pl-12 ${isLeft ? 'opacity-0 invisible' : ''}`}>
                  {!isLeft && (
                    <div className="exp-card-content card-right-anim w-full max-w-[450px] group p-6 md:p-8 bg-noir-900 border border-noir-800 hover:border-noir-100 rounded-sm transition-all duration-500 shadow-lg relative">
                      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                        <span className="px-3 py-1 border border-gray-700 rounded-full text-[10px] font-sans uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                          {item.period}
                        </span>
                        {'gpa' in item && item.gpa && (
                          <span className="font-sans text-sm font-bold text-noir-100">{item.gpa}</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 text-gray-300 group-hover:text-white transition-colors leading-tight">
                        {item.company}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{item.role}</p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;