import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import profileImg from '../assets/mahesa5.jpg';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────
// TEXT CONFIG — words in *…* settle as green accent
// ─────────────────────────────────────────────────────────────────
const RAW_TEXT =
  "Informatics Engineering graduate specializing in *Full-Stack Development* and *Data Analysis*. I build scalable web applications and intuitive user experiences that deliver measurable business impact.";

// Struktur Token baru: memisahkan berdasarkan kata, lalu huruf.
type CharToken = { char: string; highlight: boolean };
type WordToken = { chars: CharToken[]; isSpace: boolean };

function parseToWords(raw: string): WordToken[] {
  const wordsAndSpaces: WordToken[] = [];
  
  // 1. Split berdasarkan teks yang di-highlight (*...*) dan teks biasa
  const segments = raw.split(/(\*[^*]+\*)/);
  
  segments.forEach(segment => {
    if (!segment) return;
    
    const isHL = segment.startsWith('*') && segment.endsWith('*');
    const text = isHL ? segment.slice(1, -1) : segment;
    
    // 2. Split segment menjadi kata dan spasi
    // Regex ini memisahkan kata-kata, tapi menyimpan spasi sebagai item terpisah
    const parts = text.split(/(\s+)/);
    
    parts.forEach(part => {
      if (!part) return;
      
      if (part.trim() === '') {
        // Jika part ini hanya spasi
        wordsAndSpaces.push({ chars: [], isSpace: true });
      } else {
        // Jika part ini adalah kata
        const chars = part.split('').map(ch => ({ char: ch, highlight: isHL }));
        wordsAndSpaces.push({ chars, isSpace: false });
      }
    });
  });
  
  return wordsAndSpaces;
}

const WORDS = parseToWords(RAW_TEXT);

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // ── Phase 1: Header + photo + identity entrance ───────────────
    const entryTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    entryTL
      .fromTo('.i-header-anim',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.i-title-anim',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: 'expo.out' },
        '-=0.3'
      )
      .fromTo('.i-label',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .to('.i-img-cover',
        { yPercent: -101, duration: 1.1, ease: 'expo.inOut' },
        '-=0.4'
      )
      .fromTo(imgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.1, ease: 'expo.inOut' },
        '<'
      )
      .fromTo('.i-name',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.i-tag',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
        '-=0.45'
      )
      .fromTo('.i-stat',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.3'
      );

    // ── Phase 2: Per-character text reveal (exact video mechanic) ──
    const charEls = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>('.i-char')
    );

    gsap.set(charEls, { yPercent: 120, opacity: 0 });

    ScrollTrigger.create({
      trigger: '.i-text-block',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        charEls.forEach((el, i) => {
          const isHL = el.getAttribute('data-hl') === '1';
          const delay = i * 0.022;

          gsap.to(el, {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            delay,
            onStart: () => {
              // Flash green as char rises
              gsap.set(el, { color: '#4ade80' });
              // Settle to final color after brief flash
              gsap.to(el, {
                color: isHL ? '#86efac' : 'rgba(255,255,255,0.85)',
                duration: 0.35,
                delay: 0.18,
                ease: 'power1.inOut',
              });
            },
          });
        });
      },
    });

    // ── Phase 3: Parallax on photo ────────────────────────────────
    gsap.to(imgRef.current, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-noir-900 text-white border-t border-white/[0.06] overflow-hidden"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <div className="mb-14 px-8 md:px-16 pt-16">
          <div className="i-header-anim flex items-center gap-4 mb-5">
            <div className="w-8 h-[1px] bg-noir-100" />
            <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">
              About Me
            </h3>
          </div>
          <div className="overflow-hidden">
            <h2 className="i-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
              Introduction{' '}
            </h2>
          </div>
        </div>

        <div className="w-full h-px bg-white/[0.06] mb-0" />

        <div className="flex flex-col lg:flex-row min-h-[70vh]">

          {/* ════ LEFT: Photo + meta ════ */}
          <div className="w-full lg:w-[36%] xl:w-[40%] flex flex-col px-8 md:px-16 pt-12 pb-16 lg:border-r border-white/[0.06]">

            <div className="relative w-full max-w-[290px] aspect-[3/4] overflow-hidden rounded-[2px] shadow-2xl bg-white/[0.03] mb-8">
              <img
                ref={imgRef}
                src={profileImg}
                alt="Mahesa Agung Sejati"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="i-img-cover absolute inset-0 bg-noir-900 z-10 pointer-events-none" />
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/30 z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/30 z-20" />
            </div>

            <div className="i-name mb-5">
              <h3 className="font-display font-bold uppercase tracking-tight text-[1.9rem] md:text-[2.1rem] text-white leading-[0.93] mb-2">
                Mahesa Agung Sejati
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {['22 y.o.', 'Indonesia', 'Open to work'].map(t => (
                <span key={t} className="i-tag font-sans text-[10px] uppercase tracking-widest text-white/40 border border-white/[0.12] px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/[0.07] flex items-start gap-8">
              <div className="i-stat flex flex-col">
                <span className="font-display font-bold text-[2.4rem] text-white leading-none">03+</span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-white/30 mt-2 leading-loose">
                  Years of<br />Experience
                </span>
              </div>
              <div className="i-stat w-px self-stretch bg-white/[0.07]" />
              <div className="i-stat flex flex-col">
                <span className="font-display font-bold text-[2.4rem] text-white leading-none">10+</span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-white/30 mt-2 leading-loose">
                  Projects<br />Completed
                </span>
              </div>
            </div>
          </div>

          {/* ════ RIGHT: Big scramble text ════ */}
          <div className="w-full lg:w-[64%] xl:w-[74%] flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-0">

            <div
              className="i-text-block"
              style={{ fontSize: 'clamp(26px, 2.85vw, 48px)', lineHeight: 1.22 }}
              aria-label={RAW_TEXT.replace(/\*/g, '')}
            >
              <p className="font-display font-bold tracking-[-0.01em] flex flex-wrap">
                {/* PERBAIKAN: Render per KATA, lalu per HURUF.
                  Setiap kata dibungkus <span class="inline-flex"> agar tidak patah di tengah jalan 
                */}
                {WORDS.map((word, wIdx) => {
                  if (word.isSpace) {
                    return <span key={`space-${wIdx}`} style={{ display: 'inline-block', width: '0.26em' }} />;
                  }
                  
                  return (
                    <span key={`word-${wIdx}`} className="inline-flex overflow-hidden pb-1">
                      {word.chars.map((token, cIdx) => (
                        <span
                          key={`char-${wIdx}-${cIdx}`}
                          className="i-char"
                          data-hl={token.highlight ? '1' : '0'}
                          style={{
                            display: 'inline-block',
                            color: 'rgba(255,255,255,0)',
                            willChange: 'transform, color, opacity',
                          }}
                        >
                          {token.char}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Bottom meta bar */}
            <div className="mt-14 pt-7 border-t border-white/[0.07] flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-6 h-px bg-white/20" />
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/25">
                  Full-Stack Programmer | Front-End Programmer | Data Analyst
                </span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-emerald-400/70">
                  Available
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;