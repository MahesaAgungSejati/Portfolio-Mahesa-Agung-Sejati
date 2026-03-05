import React, { useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

// 1. TAMBAHKAN IMPORT LOGO DI SINI
import logo from '../assets/logo2.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Experience', link: '#experience' },
    { name: 'Projects', link: '#projects' },
    { name: 'Awards', link: '#awards' },
    { name: 'Organization', link: '#organization' },
    { name: 'Gallery', link: '#gallery' }
  ];

  useGSAP(() => {
    if (!navRef.current) return;

    // 1. Animasi Masuk Awal (Intro)
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // 2. Smart Scroll Navbar murni menggunakan GSAP (Tanpa React State)
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1); 

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Jangan jalankan jika menu mobile terbuka
        if (isOpen) return;

        // Logika Background
        if (self.progress > 0 && self.scroll() > 50) {
           gsap.to(navRef.current, {
               backgroundColor: 'rgba(10, 10, 10, 0.9)', 
               backdropFilter: 'blur(12px)',
               borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
               duration: 0.3
           });
        } else {
            gsap.to(navRef.current, {
                backgroundColor: 'transparent',
                backdropFilter: 'blur(0px)',
                borderBottom: '1px solid transparent',
                duration: 0.3
            });
        }

        // Logika Hide/Show
        if (self.direction === 1 && self.scroll() > 100) {
          showAnim.reverse(); 
        } else if (self.direction === -1) {
          showAnim.play(); 
        }
      }
    });
  }, [isOpen]);

  // 3. Animasi Mobile Menu (Full-Screen Overlay)
  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
      gsap.to(menuOverlayRef.current, { 
        y: '0%', 
        duration: 0.8, 
        ease: 'expo.inOut' 
      });
      gsap.fromTo('.mobile-nav-link', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      document.body.style.overflow = 'auto'; 
      gsap.to(menuOverlayRef.current, { 
        y: '-100%', 
        duration: 0.8, 
        ease: 'expo.inOut' 
      });
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR UTAMA */}
      <nav 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center mix-blend-difference"
      >
        {/* 2. LOGO DIUBAH MENJADI IMAGE TAG */}
        <a href="#" className="relative z-50 flex items-center">
          <img 
            src={logo} 
            alt="Mahesa Logo" 
            className="h-8 md:h-10 w-auto object-contain" 
          />
        </a>
        
        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-gray-400">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.link} 
                className="hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol Menu Mobile */}
        <button 
          onClick={() => setIsOpen(true)}
          className={`md:hidden text-white font-display uppercase text-sm tracking-widest relative z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          Menu
        </button>
      </nav>

      {/* OVERLAY MENU MOBILE (FULL SCREEN) */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center translate-y-[-100%]"
      >
        {/* Tombol Close */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-8 text-gray-400 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        {/* Daftar Link Menu */}
        <ul className="flex flex-col items-center gap-8 text-center w-full">
          {navItems.map((item, index) => (
            <li key={index} className="mobile-nav-link overflow-hidden">
              <a 
                href={item.link} 
                onClick={handleLinkClick}
                className="font-display font-bold text-4xl uppercase tracking-tighter text-gray-300 hover:text-white transition-all duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Info Tambahan di Bawah Menu */}
        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center text-center mobile-nav-link">
          <span className="font-sans text-xs uppercase tracking-widest text-gray-600 mb-2">Connect</span>
          <a href="mailto:mahesasejati95@gmail.com" className="font-sans text-sm text-gray-400 hover:text-white transition-colors">
            mahesasejati95@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;