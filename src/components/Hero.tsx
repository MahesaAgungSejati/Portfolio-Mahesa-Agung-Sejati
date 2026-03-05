import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Download } from 'lucide-react';

import WormIcon from "../assets/gallery/worm.png";
import CircleIcon from '../assets/windmill3.png';

// ─────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────

// ── CIRCLE: PNG asset — replaces orange pinwheel above letter E ──
const CirclePNG = ({ className }: { className?: string }) => (
  <img src= {CircleIcon} alt="" className={className}
    style={{ objectFit: 'contain', display: 'block', width: '80%', height: '80%' }} />
);

const PinwheelPurple = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="16" fill="url(#ppuA)" />
    <circle cx="40" cy="20" r="16" fill="url(#ppuB)" />
    <circle cx="20" cy="40" r="16" fill="url(#ppuC)" />
    <circle cx="40" cy="40" r="16" fill="url(#ppuD)" />
    <defs>
      <radialGradient id="ppuA"><stop stopColor="#A78BFA" /><stop offset="1" stopColor="#7C3AED" /></radialGradient>
      <radialGradient id="ppuB"><stop stopColor="#C4B5FD" /><stop offset="1" stopColor="#8B5CF6" /></radialGradient>
      <radialGradient id="ppuC"><stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" /></radialGradient>
      <radialGradient id="ppuD"><stop stopColor="#DDD6FE" /><stop offset="1" stopColor="#A78BFA" /></radialGradient>
    </defs>
  </svg>
);

const AsteriskOrange = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    {[0, 30, 60, 90, 120, 150].map((a, i) => (
      <line key={i} x1="25" y1="4" x2="25" y2="46"
        stroke="url(#astO)" strokeWidth="6" strokeLinecap="round"
        transform={`rotate(${a},25,25)`} />
    ))}
    <defs>
      <linearGradient id="astO" x1="25" y1="4" x2="25" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF8A4C" /><stop offset="1" stopColor="#F472B6" />
      </linearGradient>
    </defs>
  </svg>
);

const AsteriskGreen = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    {[0, 30, 60, 90, 120, 150].map((a, i) => (
      <line key={i} x1="25" y1="4" x2="25" y2="46"
        stroke="url(#astGr)" strokeWidth="6" strokeLinecap="round"
        transform={`rotate(${a},25,25)`} />
    ))}
    <defs>
      <linearGradient id="astGr" x1="25" y1="4" x2="25" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ADE80" /><stop offset="1" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>
);

// ── WORM: PNG asset ──
const Worm = ({ className }: { className?: string }) => (
  <img src={WormIcon} alt="" className={className}
    style={{ objectFit: 'contain', display: 'block', width: '100%', height: '100%' }} />
);

const Spiral = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    {[0, 45, 90, 135].map((a, i) => (
      <ellipse key={i} cx="25" cy="25" rx="18" ry="7"
        fill="url(#flwG)" opacity="0.9"
        transform={`rotate(${a},25,25)`} />
    ))}
    <circle cx="25" cy="25" r="5" fill="url(#flwG)" />
    <defs>
      <radialGradient id="flwG" cx="50%" cy="50%" r="50%">
        <stop stopColor="#A78BFA" /><stop offset="1" stopColor="#6D28D9" />
      </radialGradient>
    </defs>
  </svg>
);

const DiamondSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,4 56,30 30,56 4,30" fill="url(#diaG)" />
    <defs>
      <linearGradient id="diaG" x1="4" y1="4" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" /><stop offset="1" stopColor="#818CF8" />
      </linearGradient>
    </defs>
  </svg>
);

const CrossSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <line x1="25" y1="4" x2="25" y2="46" stroke="url(#crG)" strokeWidth="7" strokeLinecap="round" />
    <line x1="4" y1="25" x2="46" y2="25" stroke="url(#crG)" strokeWidth="7" strokeLinecap="round" />
    <defs>
      <linearGradient id="crG" x1="4" y1="4" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" /><stop offset="1" stopColor="#F97316" />
      </linearGradient>
    </defs>
  </svg>
);

const CircleDotSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="26" stroke="url(#cdG)" strokeWidth="5" fill="none" />
    <circle cx="30" cy="30" r="8" fill="url(#cdG)" />
    <defs>
      <linearGradient id="cdG" x1="4" y1="4" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" /><stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

const TriangleSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 56" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,4 56,52 4,52" fill="url(#triG)" />
    <defs>
      <linearGradient id="triG" x1="4" y1="4" x2="56" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" /><stop offset="1" stopColor="#E879F9" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// ICON DEFINITIONS
// ─────────────────────────────────────────────────────────────────

type IconDef = {
  id: string;
  word: 1 | 2;
  charIdx: number;
  permanent?: boolean;
  enterVars: gsap.TweenVars;
  exitVars: gsap.TweenVars;
  top?: string; left?: string; bottom?: string; right?: string;
  width: string; height: string;
  zIndex?: number;
};

const ICONS: IconDef[] = [
  // ── WORD 1 "Create" ──
  {
    id: 'purple-pinwheel', word: 1, charIdx: 0,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: 'back.out(3)' },
    exitVars:  { scale: 0, opacity: 0, rotation: 200, duration: 0.4, ease: 'expo.in' },
    top: '5%', left: '0%',
    width: 'clamp(60px,10vw,160px)', height: 'clamp(60px,10vw,160px)', zIndex: 30,
  },
  {
    id: 'asterisk-orange', word: 1, charIdx: 1,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' },
    exitVars:  { scale: 0, opacity: 0, rotation: -270, duration: 0.35, ease: 'power3.in' },
    top: '15%', left: 'clamp(65px,10.5vw,170px)',
    width: 'clamp(45px,7vw,112px)', height: 'clamp(45px,7vw,112px)', zIndex: 30,
  },
  {
    id: 'diamond', word: 1, charIdx: 3,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' },
    exitVars:  { scaleY: 0, scaleX: 0, opacity: 0, duration: 0.3, ease: 'back.in(3)' },
    top: '10%', left: 'clamp(195px,31.5vw,503px)',
    width: 'clamp(40px,6.5vw,104px)', height: 'clamp(40px,6.5vw,104px)', zIndex: 30,
  },
  {
    id: 'cross', word: 1, charIdx: 4,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.5)' },
    exitVars:  { scale: 0, opacity: 0, rotation: 180, duration: 0.35, ease: 'back.in(2)' },
    top: '12%', left: 'clamp(260px,42vw,672px)',
    width: 'clamp(38px,6vw,96px)', height: 'clamp(38px,6vw,96px)', zIndex: 30,
  },
  // Permanent: circle PNG — overlaps above/on letter E of "Create"
  {
    id: 'orange-pinwheel', word: 1, charIdx: 2, permanent: true,
    enterVars: { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
    exitVars:  {},
    top: '-50%', left: 'clamp(200px,30vw,480px)',
    width: 'clamp(80px,10vw,192px)', height: 'clamp(80px,12vw,192px)', zIndex: 20,
  },

  // ── WORD 2 "Anything" ──
  {
    id: 'circle-dot', word: 2, charIdx: 0,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1,0.45)' },
    exitVars:  { scale: 0, opacity: 0, rotation: -180, duration: 0.4, ease: 'expo.in' },
    top: '8%', left: '0%',
    width: 'clamp(55px,9vw,144px)', height: 'clamp(55px,9vw,144px)', zIndex: 30,
  },
  {
    id: 'triangle', word: 2, charIdx: 2,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(3)' },
    exitVars:  { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power3.in' },
    top: '15%', left: 'clamp(128px,20.5vw,328px)',
    width: 'clamp(42px,6.5vw,104px)', height: 'clamp(38px,6vw,96px)', zIndex: 30,
  },
  {
    id: 'asterisk-green', word: 2, charIdx: 5,
    enterVars: { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(3)' },
    exitVars:  { scale: 0, opacity: 0, rotation: 360, duration: 0.4, ease: 'expo.in' },
    top: '10%', left: 'clamp(320px,51vw,816px)',
    width: 'clamp(38px,6vw,96px)', height: 'clamp(38px,6vw,96px)', zIndex: 30,
  },
  // Permanent: worm PNG — sits below/inside word2
{
    id: 'worm', word: 2, charIdx: 3, permanent: true,
    enterVars: { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.5)' },
    exitVars:  {},
    bottom: '-22%', left: 'clamp(175px,28vw,448px)',
    width: 'clamp(38px,5.5vw,88px)', height: 'clamp(52px,7.5vw,120px)', zIndex: 20,
  },
  // Permanent: spiral/flower — RIGHT of word2, BIGGER
  {
    id: 'spiral', word: 2, charIdx: 7, permanent: true,
    enterVars: { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.5)' },
    exitVars:  {},
    top: '5%', left: 'clamp(430px,68vw,1080px)',
    width: 'clamp(52px,7.5vw,120px)', height: 'clamp(52px,7.5vw,120px)', zIndex: 20,
  },
];

const ICON_COMPONENTS: Record<string, React.FC<{ className?: string }>> = {
  'purple-pinwheel': PinwheelPurple,
  'asterisk-orange': AsteriskOrange,
  'diamond':         DiamondSVG,
  'cross':           CrossSVG,
  'orange-pinwheel': CirclePNG,
  'circle-dot':      CircleDotSVG,
  'triangle':        TriangleSVG,
  'asterisk-green':  AsteriskGreen,
  'worm':            Worm,
  'spiral':          Spiral,
};

const WORD1 = 'Create';
const WORD2 = 'Anything';

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const w1chars = gsap.utils.toArray<HTMLElement>('.w1-char');
    const w2chars = gsap.utils.toArray<HTMLElement>('.w2-char');
    const subEls  = gsap.utils.toArray<HTMLElement>('.hero-sub-intro');

    const iconEls: Record<string, HTMLElement | null> = {};
    ICONS.forEach(ic => {
      iconEls[ic.id] = container.current!.querySelector<HTMLElement>(`.icon-${ic.id}`);
    });

    // ── Initial state ──
    gsap.set([...w1chars, ...w2chars], { opacity: 0, yPercent: 115 });
    Object.entries(iconEls).forEach(([id, el]) => {
      if (!el) return;
      gsap.set(el, { scale: 0, opacity: 0, rotation: id.includes('pinwheel') ? -90 : id.includes('asterisk') ? 45 : id === 'cross' ? -45 : 0 });
    });
    gsap.set(subEls, { opacity: 0, y: 28 });

    const tl = gsap.timeline();

    // ── Brief black ──
    tl.to({}, { duration: 0.2 });

    // ══ WORD 1 SEQUENCE ══
    const w1MorphIcons    = ICONS.filter(ic => ic.word === 1 && !ic.permanent).sort((a,b) => a.charIdx - b.charIdx);
    const w1IconSlots     = new Set(w1MorphIcons.map(ic => ic.charIdx));
    const w1NonIconChars  = w1chars.filter((_, i) => !w1IconSlots.has(i));

    tl.to(iconEls['purple-pinwheel'], { ...ICONS[0].enterVars });
    tl.to(iconEls['asterisk-orange'], { ...ICONS[1].enterVars }, '+=0.08');
    tl.to(iconEls['diamond'],         { ...ICONS[2].enterVars }, '+=0.08');
    tl.to(iconEls['cross'],           { ...ICONS[3].enterVars }, '+=0.08');

    tl.to(w1NonIconChars, {
      opacity: 1, yPercent: 0,
      duration: 0.7,
      stagger: { each: 0.09, ease: 'power1.inOut' },
      ease: 'expo.out',
    }, '-=0.15');

    tl.to({}, { duration: 0.15 });

    // cross → 't'
    tl.to(iconEls['cross'],    { ...ICONS[3].exitVars });
    tl.to(w1chars[4], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');
    // diamond → 'a'
    tl.to(iconEls['diamond'],  { ...ICONS[2].exitVars }, '-=0.08');
    tl.to(w1chars[3], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');
    // asterisk → 'r'
    tl.to(iconEls['asterisk-orange'], { ...ICONS[1].exitVars }, '-=0.08');
    tl.to(w1chars[1], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');
    // purple pinwheel → 'C'
    tl.to(iconEls['purple-pinwheel'], { ...ICONS[0].exitVars }, '-=0.05');
    tl.to(w1chars[0], { opacity: 1, yPercent: 0, duration: 0.45, ease: 'back.out(1.5)' }, '<+0.06');

    tl.to(iconEls['orange-pinwheel'], { ...ICONS[4].enterVars }, '-=0.1');

    // ══ WORD 2 SEQUENCE ══
    const w2MorphIcons   = ICONS.filter(ic => ic.word === 2 && !ic.permanent).sort((a,b) => a.charIdx - b.charIdx);
    const w2IconSlots    = new Set(w2MorphIcons.map(ic => ic.charIdx));
    const w2NonIconChars = w2chars.filter((_, i) => !w2IconSlots.has(i));

    tl.to(iconEls['circle-dot'],     { ...ICONS[5].enterVars }, '-=0.25');
    tl.to(iconEls['triangle'],       { ...ICONS[6].enterVars }, '+=0.07');
    tl.to(iconEls['asterisk-green'], { ...ICONS[7].enterVars }, '+=0.07');

    tl.to(w2NonIconChars, {
      opacity: 1, yPercent: 0,
      duration: 0.65,
      stagger: { each: 0.07, ease: 'power1.inOut' },
      ease: 'expo.out',
    }, '-=0.2');

    tl.to({}, { duration: 0.12 });

    // circle-dot → 'A'
    tl.to(iconEls['circle-dot'], { ...ICONS[5].exitVars });
    tl.to(w2chars[0], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');
    // triangle → 'y'
    tl.to(iconEls['triangle'],   { ...ICONS[6].exitVars }, '-=0.08');
    tl.to(w2chars[2], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');
    // asterisk-green → 'i'
    tl.to(iconEls['asterisk-green'], { ...ICONS[7].exitVars }, '-=0.08');
    tl.to(w2chars[5], { opacity: 1, yPercent: 0, duration: 0.4, ease: 'expo.out' }, '<+0.06');

    // Permanent decorations
    tl.to(iconEls['worm'],   { ...ICONS[8].enterVars }, '-=0.15');
    tl.to(iconEls['spiral'], { ...ICONS[9].enterVars }, '-=0.1');

    // ══ SUB ELEMENTS ══
    tl.to(subEls, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
    }, '-=0.2');

    // ── Idle animations ──
    const circleEl = iconEls['orange-pinwheel'];
    if (circleEl) {
      const ORBIT_R  = 20;    // horizontal radius px
      const ORBIT_MS = 5500;  // one full orbit duration ms
      const SPIN_MS  = 7000;  // one full self-rotation ms
      let startTs: number | null = null;
      
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const t = ts - startTs;
        const angle = (t / ORBIT_MS) * Math.PI * 2;
        const x = Math.cos(angle) * ORBIT_R;
        const y = Math.sin(angle) * ORBIT_R * 0.45;
        const rot = (t / SPIN_MS) * 360;
        gsap.set(circleEl, { x, y, rotation: rot });
        
        // PERBAIKAN: Hanya memanggil requestAnimationFrame, tanpa ditampung di variabel
        requestAnimationFrame(tick);
      };
      
      // PERBAIKAN: Hanya memanggil requestAnimationFrame, tanpa ditampung di variabel
      setTimeout(() => { requestAnimationFrame(tick); }, 1200);
    }
    
    gsap.to(iconEls['asterisk-green'], {
      rotation: '+=360', duration: 7, repeat: -1, ease: 'none', delay: 4,
    });
    
    gsap.to(iconEls['worm'], {
      rotation: 10, transformOrigin: '50% 0%',
      duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
    });
    
    gsap.to(iconEls['spiral'], {
      rotation: 360, duration: 10, repeat: -1, ease: 'none', delay: 2,
    });

  }, { scope: container });

  const posStyle = (ic: IconDef): React.CSSProperties => ({
    position: 'absolute',
    top: ic.top, left: ic.left,
    bottom: ic.bottom, right: ic.right,
    width: ic.width, height: ic.height,
    zIndex: ic.zIndex ?? 20,
    pointerEvents: 'none',
  });

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex flex-col justify-between px-8 md:px-16 pt-20 md:pt-24 pb-10 bg-noir-900 overflow-hidden"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* ── TOP: Subtitle ── */}
      <div className="hero-sub-intro flex items-center gap-4 z-10">
        <div className="w-8 h-[1px] bg-white/30" />
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
         Welcome to My Portfolio
        </p>
      </div>

      {/* ── MIDDLE: Headline ── */}
      <div className="relative w-full select-none z-10 flex-1 flex flex-col justify-center">

        {/* LINE 1 — solid white */}
        <div className="relative overflow-visible leading-none">
          <h1 className="invisible font-display font-bold uppercase tracking-tighter whitespace-nowrap"
            style={{ fontSize: 'clamp(80px,17vw,260px)', lineHeight: 0.88 }}>
            {WORD1}
          </h1>
          {ICONS.filter(ic => ic.word === 1).map(ic => {
            const Comp = ICON_COMPONENTS[ic.id];
            return (
              <div key={ic.id} className={`icon-${ic.id}`} style={posStyle(ic)}>
                <Comp className="w-full h-full" />
              </div>
            );
          })}
          <h1 aria-label={WORD1}
            className="absolute top-0 left-0 font-display font-bold uppercase tracking-tighter text-white whitespace-nowrap"
            style={{ fontSize: 'clamp(80px,17vw,260px)', lineHeight: 1 }}>
            {WORD1.split('').map((char, i) => (
              <span key={i} className="w1-char inline-block" style={{ willChange: 'transform, opacity' }}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* LINE 2 — outline white */}
        <div className="relative overflow-visible leading-none mt-1">
          <h1 className="invisible font-display font-bold uppercase tracking-tighter whitespace-nowrap"
            style={{ fontSize: 'clamp(80px,16vw,250px)', lineHeight: 0.75 }}>
            {WORD2}
          </h1>
          {ICONS.filter(ic => ic.word === 2).map(ic => {
            const Comp = ICON_COMPONENTS[ic.id];
            return (
              <div key={ic.id} className={`icon-${ic.id}`} style={posStyle(ic)}>
                <Comp className="w-full h-full" />
              </div>
            );
          })}
          <h1 aria-label={WORD2}
            className="absolute top-0 left-0 font-display font-bold uppercase tracking-tighter whitespace-nowrap"
            style={{
              fontSize: 'clamp(80px,17vw,260px)', lineHeight: 0.88,
              WebkitTextStroke: '1.5px rgba(255,255,255,0.5)',
              color: 'transparent',
            }}>
            {WORD2.split('').map((char, i) => (
              <span key={i} className="w2-char inline-block" style={{ willChange: 'transform, opacity' }}>
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* ── BOTTOM ROW: Scroll left · Actions right ── */}
      <div className="relative z-10 w-full flex items-end justify-between">

        {/* Scroll Indicator — bottom left */}
        <div className="hero-sub-intro hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
            <ArrowDownRight size={15} className="text-white/40" />
          </div>
          <span className="uppercase text-[10px] tracking-widest text-white/30">Scroll Down for More</span>
        </div>

        {/* Actions — bottom right */}
        <div className="hero-sub-intro flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1KaHUaz12IY4fvQwvqidUPDL-pJzrUDGp/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/20 hover:border-white hover:bg-white transition-all duration-300"
              title="Download CV"
            >
              <Download className="w-4 h-4 text-white/60 group-hover:text-black group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>
            <a href="#contact"
              className="group flex items-center gap-2 px-7 py-3 md:px-8 md:py-3.5 rounded-full bg-white text-black font-sans font-semibold uppercase tracking-widest text-xs md:text-sm hover:bg-white/90 hover:scale-[1.03] transition-all duration-300"
            >
              Hire Me
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
          <p className="font-sans text-white/40 max-w-xs text-sm text-right leading-relaxed">
            Take a look around! I invite you to scroll down and discover my recent projects, professional journey, and the work I'm most proud of.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;