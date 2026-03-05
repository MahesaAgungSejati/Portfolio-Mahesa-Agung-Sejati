import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// TAMBAHKAN IMPORT ArrowLeft & ArrowRight
import { X, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

import Sertifikasi from "../assets/other/Sertifikasi1.jpg"
import Sertifikasi2 from "../assets/other/Sertifikasi2.jpg"
import TOEIC from "../assets/other/Sertifikat TOEIC.jpg"
import Olivia from "../assets/other/olivia.jpg"
import Gayatama from "../assets/other/gayatama.jpg"

import windmillImg from '../assets/windmill3.png';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 'cert-1',
    category: "Certification",
    title: "Programmer | BNSP",
    credential: "Credential ID: 62019 2514 5 00000450 2025",
    description: "Practicing structured programming, data structures, programming tool settings, clean code practices, library integration, documentation, and debugging.",
    date: "Valid May 2025 - May 2028",
    image: [Sertifikasi, Sertifikasi2]
  },
  {
    id: 'cert-2',
    category: "Certification",
    title: "TOEIC | International Test Center",
    credential: "Score: 640",
    description: "International standard English language proficiency certification for communication in the professional workplace.",
    date: "Valid Jun 2025 - Jun 2027",
    image: [TOEIC]
  },
  {
    id: 'aw-1',
    category: "Award",
    title: "1st Place Web Design International",
    credential: "The 4th Gayatama UNESA 2024",
    description: "Winning first place in an international web design competition held by Universitas Negeri Surabaya (UNESA).",
    date: "Dec 2024",
    image: [Gayatama]
  },
  {
    id: 'aw-2',
    category: "Award",
    title: "3rd Place Web Technologies",
    credential: "Olimpiade Vokasi Indonesia XI 2024",
    description: "Winning third place in a prestigious web technology competition among vocational students throughout Indonesia, organized by Forum Pendidikan Tinggi Vokasi Indonesia (FPTVI) in Makassar.",
    date: "Jul 2024",
    image: [Olivia]
  }
];

const CertificationAwards: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // PERBAIKAN STATE: Simpan objek achievement dan index gambar
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.ca-title-anim',
      { y: 100, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
    );

    gsap.fromTo('.ca-divider', 
      { scaleX: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, scaleX: 1, transformOrigin: 'left center', duration: 1.5, ease: 'expo.inOut' }
    );

    const certItems = gsap.utils.toArray('.ca-item');
    certItems.forEach((item: any) => {
      gsap.fromTo(item,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: "play none none reverse" },
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' 
        }
      );
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        pin: true,
        trigger: "#ca-pin-windmill",        
        start: "50% 50%",                
        endTrigger: "#ca-pin-windmill-wrap", 
        end: "bottom 50%",                
      },
    });

    tl.to("#ca-pin-windmill-img", { rotateZ: 900, ease: "none" });

  }, { scope: sectionRef });

  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.image-modal-overlay', { opacity: 0 }, { opacity: 1, duration: 0.5 });
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedAchievement]);

  const closeModal = () => {
    setSelectedAchievement(null);
    setCurrentImgIndex(0);
  };

  // Navigasi Slide
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAchievement) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedAchievement.image.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAchievement) {
      setCurrentImgIndex((prev) => (prev === 0 ? selectedAchievement.image.length - 1 : prev - 1));
    }
  };

  return (
    <section id="awards" ref={sectionRef} className="w-full bg-noir-900 text-noir-100 py-32 border-t border-noir-800">
      <div className="px-8 md:px-16">
        <div id="ca-pin-windmill-wrap" className="flex flex-col md:flex-row relative w-full items-start">
          
          <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col md:pr-16 z-10">
            <div className="overflow-hidden mb-16">
              <h2 className="ca-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
                Certification <br className="hidden md:block"/> <span className="text-outline">&</span> Awards
              </h2>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-noir-100"></div>
                <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">Achievements</h3>
              </div>
              <div className="ca-divider w-full h-[1px] bg-noir-800 mb-8"></div>

              {achievements.map((item) => (
                <div 
                  key={item.id} 
                  // PERBAIKAN: Klik akan menyimpan seluruh item achievement
                  onClick={() => {
                    setSelectedAchievement(item);
                    setCurrentImgIndex(0);
                  }}
                  className="ca-item group relative mb-8 pb-8 border-b border-noir-800 cursor-pointer flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center hover:bg-noir-800/20 p-4 transition-colors rounded-sm"
                >
                  <div className="w-full md:w-1/2">
                     <span className="inline-block px-3 py-1 border border-gray-700 rounded-full text-xs font-sans uppercase tracking-widest mb-3 text-gray-400 group-hover:text-white transition-colors">
                      {item.category} • {item.date}
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-200 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-gray-500 font-medium mt-2">{item.credential}</p>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-between gap-6">
                     <p className="font-sans text-sm text-gray-500 group-hover:text-gray-300 transition-colors flex-1 text-left leading-relaxed">
                        {item.description}
                     </p>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-gray-400 flex-shrink-0">
                      <ArrowUpRight size={28} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex w-full md:w-2/5 lg:w-1/3 relative justify-center pt-32">
            <div id="ca-pin-windmill" className="w-full flex items-center justify-center">
              <img 
                id="ca-pin-windmill-img"
                src={windmillImg} 
                alt="Windmill" 
                className="w-[170px] lg:w-[270px] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* --- LIGHTBOX MODAL DENGAN FITUR SLIDE --- */}
      {selectedAchievement && (
        <div className="image-modal-overlay fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 md:p-12" onClick={closeModal}>
          
          <button onClick={closeModal} className="absolute top-6 right-6 z-[140] w-12 h-12 flex items-center justify-center rounded-full bg-noir-800 text-white hover:bg-white hover:text-black transition-colors">
            <X size={24} />
          </button>

          <div className="relative w-full max-w-4xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Tombol Navigasi (Hanya muncul jika image > 1) */}
            {selectedAchievement.image.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-[-20px] md:left-[-80px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all z-[150]">
                  <ArrowLeft size={24} />
                </button>
                <button onClick={nextImg} className="absolute right-[-20px] md:right-[-80px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all z-[150]">
                  <ArrowRight size={24} />
                </button>
              </>
            )}

            <img 
              src={selectedAchievement.image[currentImgIndex]} 
              alt={selectedAchievement.title} 
              className="w-full max-h-[75vh] object-contain shadow-2xl border border-white/10 rounded-lg" 
            />

            <div className="mt-8 text-center">
              <h4 className="font-display text-xl md:text-2xl uppercase tracking-widest text-white leading-tight">
                {selectedAchievement.title}
              </h4>
              {/* Counter Lembar */}
              {selectedAchievement.image.length > 1 && (
                <p className="font-sans text-xs text-gray-400 mt-2 tracking-widest uppercase">
                   Page {currentImgIndex + 1} of {selectedAchievement.image.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationAwards;