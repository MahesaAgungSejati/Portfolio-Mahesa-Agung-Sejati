import React, { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import gambar tangan metal
import metalHand from '../assets/hand4.png'; 

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────
// SVG DECORATIONS (Dari Footer 2 - Warna-warni & Unik)
// ─────────────────────────────────────────────────────────────────

const SpiralIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 50 m0-36 a36 36 0 1 1-0.1 0" stroke="url(#spiralG)" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 50 m0-24 a24 24 0 1 1-0.1 0" stroke="url(#spiralG)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    <path d="M50 50 m0-14 a14 14 0 1 1-0.1 0" stroke="url(#spiralG)" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="50" cy="50" r="4" fill="#f0abfc" />
    <defs>
      <linearGradient id="spiralG" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e879f9" /><stop offset="1" stopColor="#818cf8" />
      </linearGradient>
    </defs>
  </svg>
);

const CrossIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="4" width="16" height="72" rx="8" fill="url(#crossG)" />
    <rect x="4" y="32" width="72" height="16" rx="8" fill="url(#crossG)" />
    <defs>
      <linearGradient id="crossG" x1="4" y1="4" x2="76" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fb923c" /><stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
  </svg>
);

const DiamondIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16" width="48" height="48" rx="4" fill="url(#diaG)" transform="rotate(45 40 40)" />
    <rect x="22" y="22" width="36" height="36" rx="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" transform="rotate(45 40 40)" />
    <defs>
      <linearGradient id="diaG" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ade80" /><stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
  </svg>
);

const WaveIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30 C30 8, 50 8, 70 30 C90 52, 110 52, 130 30 C150 8, 160 8, 160 20"
      stroke="url(#waveG)" strokeWidth="8" strokeLinecap="round" fill="none" />
    <defs>
      <linearGradient id="waveG" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f472b6" /><stop offset="1" stopColor="#fb923c" />
      </linearGradient>
    </defs>
  </svg>
);


// ─────────────────────────────────────────────────────────────────
// FOOTER COMPONENT
// ─────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const horizontalContainerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track || !horizontalContainerRef.current) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    // 1. ANIMASI UTAMA HORIZONTAL (Rel Kereta)
    const horizontalTween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`, 
        pin: true,
        scrub: 1, 
        invalidateOnRefresh: true,
      }
    });

    // 2. ANIMASI INTRO ("LET'S WORK TOGETHER")
    // Dibuat murni menggunakan yPercent tanpa manipulasi opacity
    gsap.fromTo('.hero-text-anim', 
      { yPercent: 120, rotation: 5 },
      {
        yPercent: 0, rotation: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: horizontalContainerRef.current,
          start: "top top",
        }
      }
    );

    // 3. ANIMASI SANGAT AKTIF UNTUK ELEMEN DI DALAM TRACK
    
    // Teks meluncur naik saat masuk layar (Mask Reveal murni, tanpa opacity)
    gsap.utils.toArray('.slide-text').forEach((text: any) => {
      gsap.fromTo(text,
        { yPercent: 120 }, // Hanya disembunyikan di bawah mask, tidak ditransparankan
        {
          yPercent: 0, 
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: text.parentElement, 
            containerAnimation: horizontalTween, 
            start: "left 85%", 
            end: "left 40%",   
            scrub: 1,          
          }
        }
      );
    });

    // Kapsul (Pill) melompat dan memutar (Ini butuh opacity karena tidak ada mask)
    gsap.utils.toArray('.pop-pill').forEach((pill: any) => {
      const rot = parseFloat(pill.dataset.rot || '0');
      gsap.fromTo(pill,
        { scale: 0, rotation: -45, opacity: 0 },
        {
          scale: 1, rotation: rot, opacity: 1,
          ease: "elastic.out(1.2, 0.5)",
          scrollTrigger: {
            trigger: pill,
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 50%",
            scrub: 1,
          }
        }
      );
    });

    // Ikon SVG Kustom berputar saat masuk layar
    gsap.utils.toArray('.deco-icon').forEach((icon: any) => {
      gsap.fromTo(icon,
        { rotation: -200, scale: 0.2, opacity: 0 },
        {
          rotation: 0, scale: 1, opacity: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: icon.closest('.h-block'),
            containerAnimation: horizontalTween,
            start: "left 90%",
            end: "left 50%", 
            scrub: 1,
          }
        }
      );
    });

    // Animasi Nganggur (Idle)
    gsap.to('.idle-spin-slow', { rotation: 360, duration: 18, repeat: -1, ease: 'none' });
    gsap.to('.idle-spin-mid',  { rotation: -360, duration: 10, repeat: -1, ease: 'none' });
    gsap.to('.metal-hand-anim', {
      rotation: 15, y: -20, yoyo: true, repeat: -1, ease: "sine.inOut", duration: 1.5
    });

  }, { scope: horizontalContainerRef });

  return (
    <footer 
      ref={horizontalContainerRef} 
      className="h-screen w-full bg-noir-900 text-white relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <div 
        ref={trackRef} 
        className="flex h-screen items-center w-max flex-nowrap relative z-10"
        style={{ paddingLeft: '6vw', paddingRight: '12vw', gap: '8vw' }}
      >
        
        {/* --- BLOK 1: LET'S WORK TOGETHER --- */}
        <div className="h-block flex items-center gap-8 md:gap-12 flex-shrink-0">
          <div className="overflow-hidden leading-none pb-4">
            <h2 className="hero-text-anim font-display font-bold text-[20vw] md:text-[18vw] uppercase text-white whitespace-nowrap">
              LET'S WORK
            </h2>
          </div>
          
          <div className="relative w-[30vw] md:w-[25vw] min-w-[200px] h-[30vh] flex items-center justify-center">
            <img 
              src={metalHand} 
              alt="Metal Hand" 
              className="metal-hand-anim w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] grayscale"
            />
          </div>

          <div className="overflow-hidden leading-none pb-4">
            <h2 className="hero-text-anim font-display font-bold text-[20vw] md:text-[18vw] uppercase whitespace-nowrap"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
              TOGETHER
            </h2>
          </div>
        </div>

        {/* --- BLOK 2: TEKS PANJANG 1 --- */}
        <div className="h-block flex items-center gap-6 md:gap-12 pl-12 md:pl-24 border-l border-white/[0.1] h-[60vh] flex-shrink-0">
          
          <div className="relative flex flex-col justify-center gap-10">
            <SpiralIcon className="deco-icon idle-spin-slow flex-shrink-0 w-[12vw] md:w-[8vw] mb-4" />
            <div className="overflow-hidden leading-none pb-2 pt-4">
              <h2 className="slide-text font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter text-white whitespace-nowrap">
                Interested in
              </h2>
            </div>
          </div>
          
          {/* Green Pill */}
          <div data-rot="-6" 
               className="pop-pill flex-shrink-0 bg-[#4ade80] text-[#0a0a0a] px-8 py-4 rounded-full font-display font-bold text-[4vw] md:text-[3.5vw] uppercase tracking-tighter shadow-[0_10px_30px_rgba(74,222,128,0.2)]">
            Full-Stack
          </div>
          
          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}>
              development
            </h2>
          </div>
        </div>

        {/* --- BLOK 3: TEKS PANJANG 2 + IKON --- */}
        <div className="h-block flex items-center gap-8 md:gap-12 flex-shrink-0">
          <CrossIcon className="deco-icon idle-spin-mid flex-shrink-0 w-[15vw] md:w-[10vw] -mt-16" />
          
          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter text-gray-500 whitespace-nowrap">
              or
            </h2>
          </div>
          
          {/* Purple Pill */}
          <div data-rot="4" 
               className="pop-pill flex-shrink-0 bg-[#a855f7] text-white px-8 py-4 rounded-[3rem] font-display font-bold text-[4vw] md:text-[3.5vw] uppercase tracking-tighter shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            Data
          </div>

          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter text-white whitespace-nowrap">
              Analysis?
            </h2>
          </div>
        </div>

        {/* --- BLOK 4: TEKS PANJANG 3 --- */}
        <div className="h-block flex items-center gap-8 md:gap-12 flex-shrink-0">
          <div className="flex flex-col gap-6">
            <WaveIcon className="deco-icon flex-shrink-0 w-[20vw] md:w-[15vw] -mt-8" />
            <div className="overflow-hidden leading-none pb-2 pt-4">
              <h2 className="slide-text font-display font-bold text-[14vw] md:text-[12vw] tracking-tighter text-white whitespace-nowrap">
                Don't hesitate
              </h2>
            </div>
          </div>
          
          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[14vw] md:text-[12vw] tracking-tighter whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}>
              to say hi!
            </h2>
          </div>
        </div>

        {/* --- BLOK 5: TEKS PANJANG 4 (END) --- */}
        <div className="h-block flex items-center gap-8 md:gap-16 pr-[15vw] flex-shrink-0">
          <DiamondIcon className="deco-icon flex-shrink-0 w-[12vw] md:w-[8vw] mt-24" />
          
          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[10vw] md:text-[8vw] tracking-tighter text-gray-500 whitespace-nowrap">
              I'm always open to
            </h2>
          </div>
          
          {/* Orange Pill */}
          <div data-rot="-3" 
               className="pop-pill flex-shrink-0 bg-[#f97316] text-[#0a0a0a] px-8 py-4 rounded-sm font-display font-bold text-[3vw] md:text-[2.5vw] uppercase tracking-widest shadow-xl">
            New Projects
          </div>
          
          <div className="overflow-hidden leading-none pb-2 pt-4">
            <h2 className="slide-text font-display font-bold text-[10vw] md:text-[8vw] tracking-tighter text-gray-600 whitespace-nowrap">
              or opportunities.
            </h2>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;