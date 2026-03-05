import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Monitor } from 'lucide-react';

const DesktopNotice: React.FC = () => {
  const noticeRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState(false);

  useGSAP(() => {
    // Animasi Masuk: Muncul dari bawah dengan delay 2.5 detik agar tidak menabrak animasi hero
    gsap.fromTo(noticeRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
    );
  }, []);

  const handleClose = () => {
    // Animasi Keluar: Turun sedikit dan memudar sebelum dihapus dari layar
    gsap.to(noticeRef.current, {
      y: 20, 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.in',
      onComplete: () => setIsClosed(true)
    });
  };

  // Jika sudah di-close, jangan render apapun
  if (isClosed) return null;

  return (
    <div 
      ref={noticeRef}
      // PERHATIKAN: class md:hidden akan menyembunyikan ini secara otomatis jika diakses lewat laptop/desktop
      className="fixed bottom-6 right-6 left-6 md:left-auto z-[200] md:hidden flex items-start gap-4 p-5 bg-black/80 backdrop-blur-lg border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-sm"
    >
      {/* Ikon Monitor */}
      <div className="mt-0.5 text-gray-400 bg-white/5 p-2 rounded-full border border-white/5">
        <Monitor size={18} />
      </div>

      {/* Teks */}
      <div className="flex-1">
        <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-1.5">
          Desktop Recommended
        </h4>
        <p className="font-sans text-xs text-gray-400 leading-relaxed pr-2">
         Open on desktop for <span className="text-gray-200">a better viewing experience</span> and maximum animation.
        </p>
      </div>

      {/* Tombol Close */}
      <button 
        onClick={handleClose}
        className="text-gray-500 hover:text-white hover:rotate-90 transition-all duration-300 p-1"
        aria-label="Close notice"
      >
        <X size={16} />
      </button>
      
      {/* Garis aksen bawah khas Noir */}
      <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
    </div>
  );
};

export default DesktopNotice;