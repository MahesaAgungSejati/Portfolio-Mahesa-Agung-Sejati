import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

// 1. TAMBAHKAN IMPORT LOGO DI SINI 
// (Sesuaikan ekstensinya apakah .png atau .jpg di komputer Anda)
import footerLogo from '../assets/footerlogo.png'; 

gsap.registerPlugin(ScrollTrigger);

const Connect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.connect-anim-item',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top 80%" 
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="w-full bg-noir-900 pt-32 pb-8 px-8 md:px-16 border-t border-noir-800 flex flex-col justify-between min-h-[70vh] relative z-20"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 mb-20">
        
        {/* --- KOLOM KIRI: TULISAN CONNECT & LOGO BESAR --- */}
        <div className="flex flex-col w-full lg:w-1/3 gap-12 lg:gap-16">
          <div className="connect-anim-item flex items-center gap-4">
            <div className="w-8 h-[1px] bg-noir-100"></div>
            <h3 className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-gray-400">Connect</h3>
          </div>
          
          {/* Logo Footer - Hanya muncul besar di mode Desktop agar Mobile tidak terlalu penuh */}
          <div className="connect-anim-item hidden md:flex justify-start items-center">
            <img 
              src={footerLogo} 
              alt="Mahesa Spotlight Logo" 
              className="w-48 md:w-64 lg:w-80 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-700 mix-blend-screen"
            />
          </div>
        </div>
        
        {/* --- KOLOM KANAN: LINK SOSIAL --- */}
        <div className="flex flex-col w-full lg:w-2/3">
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mahesasejati" target="_blank" rel="noopener noreferrer" className="connect-anim-item group flex items-center justify-between border-b border-noir-800 py-6 md:py-8 hover:border-noir-100 transition-colors">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-gray-500 group-hover:text-white transition-colors tracking-tighter">LinkedIn</span>
            <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 text-gray-600 group-hover:text-white transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12" />
          </a>
          
          {/* Email */}
          <a href="mailto:mahesasejati95@gmail.com" className="connect-anim-item group flex items-center justify-between border-b border-noir-800 py-6 md:py-8 hover:border-noir-100 transition-colors">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-gray-500 group-hover:text-white transition-colors tracking-tighter">Email</span>
            <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 text-gray-600 group-hover:text-white transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12" />
          </a>
          
          {/* WhatsApp */}
          <a href="https://wa.me/6281237756709" target="_blank" rel="noopener noreferrer" className="connect-anim-item group flex items-center justify-between border-b border-noir-800 py-6 md:py-8 hover:border-noir-100 transition-colors">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-gray-500 group-hover:text-white transition-colors tracking-tighter">WhatsApp</span>
            <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 text-gray-600 group-hover:text-white transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12" />
          </a>
        </div>
      </div>

      {/* --- COPYRIGHT --- */}
      <div className="connect-anim-item flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-noir-800 text-xs font-sans uppercase tracking-widest text-gray-500">
        <p>© 2026 MAHESA AGUNG SEJATI. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <span className="hover:text-white transition-colors cursor-default">REACT</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors cursor-default">VITE</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors cursor-default">TAILWIND</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors cursor-default">GSAP</span>
        </div>
      </div>
    </section>
  );
};

export default Connect;