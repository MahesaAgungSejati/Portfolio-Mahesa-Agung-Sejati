import React, { useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  SiPhp, SiJavascript, SiPython, SiReact, SiVuedotjs, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress,
  SiFlask, SiCodeigniter, SiLaravel, SiFigma, SiMysql, SiPostgresql,
  SiCanva, SiGit, SiNotion, SiPostman
} from 'react-icons/si';
import { FaVideo, FaPenNib } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

type Tech     = { name: string; icon: React.ReactNode };
type Category = { label: string; items: Tech[] };

const CATEGORIES: Category[] = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'PHP',        icon: <SiPhp /> },
      { name: 'Python',     icon: <SiPython /> },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React.js',  icon: <SiReact /> },
      { name: 'Next.js',   icon: <SiNextdotjs /> },
      { name: 'Vue.js',    icon: <SiVuedotjs /> },
      { name: 'Tailwind',  icon: <SiTailwindcss /> },
      { name: 'Bootstrap', icon: <SiBootstrap /> },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',     icon: <SiNodedotjs /> },
      { name: 'Express.js',  icon: <SiExpress /> },
      { name: 'Laravel',     icon: <SiLaravel /> },
      { name: 'CodeIgniter', icon: <SiCodeigniter /> },
      { name: 'Flask',       icon: <SiFlask /> },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'MySQL',      icon: <SiMysql /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma',  icon: <SiFigma /> },
      { name: 'Canva',  icon: <SiCanva /> },
      { name: 'Lunacy', icon: <FaPenNib /> },
      { name: 'CapCut', icon: <FaVideo /> },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git',     icon: <SiGit /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Notion',  icon: <SiNotion /> },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((a, c) => a + c.items.length, 0);

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
const TechStack: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const labelLineRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = { trigger: sectionRef.current, start: 'top 76%' };

    // Label row
    gsap.fromTo(
      [labelLineRef.current, labelTextRef.current],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: trigger }
    );

    // Title slides up inside overflow-hidden
    gsap.fromTo(titleRef.current,
      { yPercent: 110 },
      { yPercent: 0, duration: 1, ease: 'expo.out', scrollTrigger: trigger }
    );

    // Cards stagger in
    gsap.fromTo('.ts-cat',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.55, stagger: { each: 0.07 }, ease: 'power3.out',
        scrollTrigger: { trigger: '.ts-grid', start: 'top 84%' },
      }
    );

    // Chips scale in
    gsap.fromTo('.ts-chip',
      { opacity: 0, scale: 0.82 },
      {
        opacity: 1, scale: 1,
        duration: 0.32, stagger: { each: 0.018 }, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.ts-grid', start: 'top 82%' },
      }
    );

    // Counter roll-up
    const counterEl = sectionRef.current.querySelector<HTMLElement>('.ts-counter');
    if (counterEl) {
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: TOTAL, duration: 1.4, ease: 'power2.out', delay: 0.4,
        onUpdate: () => { counterEl.textContent = String(Math.round(proxy.val)); },
        scrollTrigger: trigger,
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative w-full bg-noir-900 text-noir-100 py-28 border-t border-noir-800 overflow-hidden"
    >
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Decorative bg word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-bold leading-none uppercase tracking-tighter
          text-noir-100 opacity-[0.025] whitespace-nowrap" style={{ fontSize: '18vw' }}>
          STACK
        </span>
      </div>

      <div className="relative z-10 w-full px-8 md:px-16">

        {/* ── Header ── */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-5">
            <div ref={labelLineRef} className="w-8 h-[1px] bg-noir-100" />
            <p ref={labelTextRef} className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400">
              Tech Stack &amp; Tools
            </p>
          </div>
          <div className="overflow-hidden pb-2">
            <h2 ref={titleRef}
              className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
              Skills <span className="text-outline">&amp;</span> Tools
            </h2>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="ts-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <div
              key={cat.label}
              className="ts-cat group border border-noir-800 bg-noir-900
                hover:border-white/20 hover:bg-noir-800 transition-all duration-300"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4
                border-b border-noir-800 group-hover:border-white/10 transition-colors duration-300">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400
                  group-hover:text-noir-100 transition-colors duration-300">
                  {cat.label}
                </span>
                <span className="font-display font-bold text-xs text-gray-700
                  group-hover:text-gray-400 transition-colors duration-300 tabular-nums">
                  {String(cat.items.length).padStart(2, '0')}
                </span>
              </div>

              {/* Chips */}
              <div className="p-5 flex flex-wrap gap-2">
                {cat.items.map(tech => (
                  <div
                    key={tech.name}
                    className="ts-chip group/chip flex items-center gap-2 px-3 py-2
                      border border-noir-800 bg-noir-900
                      hover:border-noir-100 hover:bg-noir-100
                      transition-all duration-200 cursor-default"
                  >
                    <span className="text-sm text-gray-500 group-hover/chip:text-noir-900
                      transition-colors duration-200 flex-shrink-0">
                      {tech.icon}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-gray-400
                      group-hover/chip:text-noir-900 transition-colors duration-200 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="mt-10 pt-7 border-t border-noir-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex w-1.5 h-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noir-100 opacity-40" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-noir-100" />
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-gray-500">
              Actively learning &amp; expanding
            </span>
          </div>
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-gray-500">
            <span className="ts-counter font-display font-bold text-noir-100 text-sm">0</span>
            <span>technologies total</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;