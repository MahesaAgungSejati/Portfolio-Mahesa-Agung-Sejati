import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import ikon dari Simple Icons (si) dan FontAwesome (fa) via react-icons
import { 
  SiPhp, SiJavascript, SiPython, SiReact, SiVuedotjs, SiNextdotjs, 
  SiTypescript, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, 
  SiFlask, SiCodeigniter, SiLaravel, SiFigma, SiMysql, SiPostgresql, SiCanva 
} from 'react-icons/si';
import { FaVideo, FaPenNib } from 'react-icons/fa'; // Fallback untuk CapCut & Lunacy jika tidak ada logo spesifik

// Kita bagi 2 baris agar animasinya berlawanan arah dan layoutnya penuh
const row1 = [
  { name: 'PHP', icon: <SiPhp size={32} /> },
  { name: 'JavaScript', icon: <SiJavascript size={32} /> },
  { name: 'Python', icon: <SiPython size={32} /> },
  { name: 'React.js', icon: <SiReact size={32} /> },
  { name: 'Vue', icon: <SiVuedotjs size={32} /> },
  { name: 'Next.js', icon: <SiNextdotjs size={32} /> },
  { name: 'TypeScript', icon: <SiTypescript size={32} /> },
  { name: 'Tailwind', icon: <SiTailwindcss size={32} /> },
  { name: 'Bootstrap', icon: <SiBootstrap size={32} /> },
  { name: 'Node.js', icon: <SiNodedotjs size={32} /> },
];

const row2 = [
  { name: 'Express.js', icon: <SiExpress size={32} /> },
  { name: 'Flask', icon: <SiFlask size={32} /> },
  { name: 'CodeIgniter 4', icon: <SiCodeigniter size={32} /> },
  { name: 'Laravel', icon: <SiLaravel size={32} /> },
  { name: 'Figma', icon: <SiFigma size={32} /> },
  { name: 'Lunacy', icon: <FaPenNib size={32} /> },
  { name: 'MySQL', icon: <SiMysql size={32} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={32} /> },
  { name: 'Canva', icon: <SiCanva size={32} /> },
  { name: 'CapCut', icon: <FaVideo size={32} /> },
];

const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animasi Baris 1 (Berjalan ke Kiri)
    gsap.to('.marquee-row-1', {
      xPercent: -50, // Geser ke kiri sejauh setengah dari total lebar (karena item diduplikat)
      ease: 'none',
      duration: 20, // Kecepatan (semakin besar semakin lambat)
      repeat: -1,   // Ulangi tanpa batas (infinite)
    });

    // Animasi Baris 2 (Berjalan ke Kanan)
    // Kita mulai dari posisi -50% dan geser ke 0% agar mulus
    gsap.fromTo('.marquee-row-2', 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: 'none',
        duration: 25, // Dibuat sedikit lebih lambat dari baris 1 untuk efek asimetris
        repeat: -1,
      }
    );
  }, { scope: sectionRef });

  // Komponen Helper untuk merender item Tech Stack
  const TechItem = ({ item }: { item: { name: string, icon: React.ReactNode } }) => (
    <div className="flex items-center justify-center gap-4 px-8 py-6 border border-noir-800 rounded-full bg-noir-900 min-w-max hover:bg-noir-100 hover:text-noir-900 hover:border-noir-100 transition-all duration-300 cursor-default group grayscale hover:grayscale-0">
      <span className="text-gray-500 group-hover:text-noir-900 transition-colors duration-300">
        {item.icon}
      </span>
      <span className="font-display font-bold text-xl uppercase tracking-widest text-gray-300 group-hover:text-noir-900">
        {item.name}
      </span>
    </div>
  );

  return (
    <section 
      id="techstack" 
      ref={sectionRef} 
      className="w-full bg-noir-900 py-32 overflow-hidden border-t border-noir-800 relative flex flex-col justify-center"
    >
      {/* Teks Background Super Besar Khas Noir */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0">
        <h2 className="font-display font-bold text-[15vw] leading-none uppercase tracking-tighter">
          SKILL
        </h2>
      </div>

      <div className="z-10 relative mb-16 px-8 md:px-16">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-noir-100"></div>
          <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">
            Tech Stack & Tools
          </h3>
        </div>
      </div>

      {/* Wrapper Marquee */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 w-full">
        
        {/* Baris 1: Berjalan ke Kiri */}
        <div className="flex w-max marquee-row-1 gap-6 md:gap-8 px-4">
          {/* Render 2 kali agar looping-nya seamless (tidak putus) */}
          {[...row1, ...row1].map((item, index) => (
            <TechItem key={`row1-${index}`} item={item} />
          ))}
        </div>

        {/* Baris 2: Berjalan ke Kanan */}
        <div className="flex w-max marquee-row-2 gap-6 md:gap-8 px-4">
          {/* Render 2 kali agar looping-nya seamless */}
          {[...row2, ...row2].map((item, index) => (
            <TechItem key={`row2-${index}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStack;