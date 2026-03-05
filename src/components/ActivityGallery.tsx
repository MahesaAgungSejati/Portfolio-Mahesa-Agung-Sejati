import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ArrowRight, ArrowLeft, Maximize2, Camera } from 'lucide-react';

// Import gambar (sesuaikan path dengan struktur folder kamu)
import asdos1 from '../assets/gallery/asdos1.jpg';
import asdos2 from '../assets/gallery/asdos2.jpg';

import Organisasi1 from '../assets/gallery/foto-hima2.jpg';
import Organisasi2 from '../assets/gallery/foto-hima4.jpg';
import Organisasi3 from '../assets/gallery/pameran6.jpg';
import Organisasi4 from '../assets/gallery/pameran3.jpg';
import Organisasi5 from '../assets/gallery/pameran5.jpg';
import Organisasi6 from '../assets/gallery/pameran8.jpg';
import Organisasi7 from '../assets/gallery/pekan.jpg';
import Organisasi8 from '../assets/gallery/pekan2.jpg';
import Organisasi9 from '../assets/gallery/pekan3.jpg';
import Organisasi10 from '../assets/gallery/ramcer.jpg';
import Organisasi11 from '../assets/gallery/inotek2.jpg';

import fotoOlivia1 from '../assets/gallery/foto-olivia5.jpg';
import fotoOlivia3 from '../assets/gallery/olivia3.jpg';
import fotoOlivia4 from '../assets/gallery/olivia6.jpg';

import Magang1 from '../assets/gallery/magang.jpg';
import Magang2 from '../assets/gallery/magang3.jpg';
import Magang3 from '../assets/gallery/magang5.jpg';
import Magang4 from '../assets/gallery/magang6.png';

import gayatama2 from '../assets/gallery/gayatama5.png';
import gayatama3 from '../assets/gallery/gayatama3.jpg';

import Sosialisasi1 from '../assets/gallery/sosialisasi.jpg'
import Sosialisasi2 from '../assets/gallery/sosialisasi2.jpg'
import Sosialisasi3 from '../assets/gallery/sosialisasi3.jpg'
import Sosialisasi4 from '../assets/gallery/sosialisasi4.jpg'
import Sosialisasi5 from '../assets/gallery/sosialisasi5.jpg'
import Sosialisasi6 from '../assets/gallery/sosialisasi6.jpg'
import Sosialisasi7 from '../assets/gallery/sosialisasi9.jpg'


gsap.registerPlugin(ScrollTrigger);

// Data 9 Aktivitas dengan Layout Bento Grid Kustom
const activities = [
  {
    id: 'gal-1',
    title: "Olimpiade Vokasi Indonesia 2024 (OLIVIA)",
    category: "Competition",
    images: [fotoOlivia1, fotoOlivia3, fotoOlivia4],
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
  },
  {
    id: 'gal-2',
    title: "Gayatama UNESA International Web Design",
    category: "Competition",
    images: [gayatama3, gayatama2],
    // Melebar (2 Kolom)
    colSpan: "col-span-1 md:col-span-1 lg:col-span-2" 
  },
  {
    id: 'gal-3',
    title: "Internship Program",
    category: "Internship",
    images: [Magang2, Magang1, Magang3, Magang4],
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: 'gal-4',
    title: "Lecturer Assistant Activities",
    category: "Teaching",
    images: [asdos1, asdos2],
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: 'gal-5',
    title: "Organizational Activities",
    category: "Organization",
    images: [Organisasi1, Organisasi2, Organisasi3, Organisasi4, Organisasi5, Organisasi6, Organisasi7, Organisasi8, Organisasi9, Organisasi10, Organisasi11],
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
  },
  {
    id: 'gal-6',
    title: "campus outreach activities",
    category: "Public Speaking",
    images: [Sosialisasi1, Sosialisasi2, Sosialisasi3, Sosialisasi4, Sosialisasi5, Sosialisasi6, Sosialisasi7],
    // Melebar (2 Kolom)
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2"
  },
];

const ActivityGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedGallery, setSelectedGallery] = useState<typeof activities[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useGSAP(() => {
    // Animasi Judul
    gsap.fromTo('.gal-title-anim',
      { y: 100, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'
      }
    );

    // Animasi Grid Kartu Muncul secara Individual saat di-scroll
    const galleryCards = gsap.utils.toArray('.gal-card');
    
    galleryCards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: { 
            trigger: card, 
            start: 'top 85%', // Trigger saat masing-masing kartu mencapai 85% layar
            toggleActions: "play none none reverse" // Opsional: Animasi ulang saat scroll bolak-balik
          },
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'power3.out' 
        }
      );
    });

  }, { scope: sectionRef });

  // Mengatur interaksi Modal Lightbox
  useEffect(() => {
    if (selectedGallery) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.gallery-modal',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.7, ease: 'expo.inOut' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedGallery]);

  const closeGallery = () => {
    gsap.to('.gallery-modal', {
      y: '100%', opacity: 0, duration: 0.6, ease: 'expo.inOut',
      onComplete: () => {
        setSelectedGallery(null);
        setCurrentImageIndex(0);
      }
    });
  };

  const nextImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.images.length);
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedGallery.images.length - 1 : prev - 1));
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="w-full bg-noir-900 text-noir-100 py-32 relative border-t border-noir-800">
      
      {/* Header Section */}
      <div className="px-8 md:px-16 mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-noir-100"></div>
          <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">Documentation</h3>
        </div>
        <div className="overflow-hidden">
          <h2 className="gal-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
            Activity <span className="text-outline">Gallery</span>
          </h2>
        </div>
      </div>

      {/* Bento Grid Layout (3 Kolom di Desktop) */}
      <div className="px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[350px]">
          
          {activities.map((activity) => (
            <div 
              key={activity.id}
              onClick={() => setSelectedGallery(activity)}
              className={`gal-card group relative overflow-hidden cursor-pointer border border-noir-800 bg-noir-800 ${activity.colSpan}`}
            >
              {/* Cover Image Background (Noir Grayscale Effect) */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                style={{ backgroundImage: `url(${activity.images[0]})` }}
              ></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Konten Text Kartu */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-sans uppercase tracking-widest text-white transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Camera size={14} /> {activity.images.length} Photos
                  </span>
                  
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-back-out">
                    <Maximize2 size={18} />
                  </div>
                </div>

                {/* Judul & Kategori (Muncul perlahan saat hover) */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                    {activity.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                    {activity.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* --- MODAL SLIDER GALLERY --- */}
      {selectedGallery && (
        <div className="gallery-modal fixed inset-0 z-[150] bg-noir-900/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen w-full">
          
          {/* Header Modal */}
          <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[160] border-b border-white/10">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-gray-400 block mb-1">Gallery View</span>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tighter text-white">
                {selectedGallery.title}
              </h3>
            </div>
            <button 
              onClick={closeGallery}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Area Utama Gambar */}
          <div className="relative w-full max-w-6xl h-[65vh] md:h-[70vh] flex items-center justify-center mt-16 p-4">
            <img 
              src={selectedGallery.images[currentImageIndex]} 
              alt={`${selectedGallery.title} - ${currentImageIndex + 1}`} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
            />
            
            {selectedGallery.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-4 md:left-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"
                >
                  <ArrowLeft size={24} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-4 md:right-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation di Bawah */}
          <div className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-4 w-full px-4">
            <div className="font-sans text-sm tracking-widest text-white/50">
              {currentImageIndex + 1} / {selectedGallery.images.length}
            </div>
            
            {selectedGallery.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto max-w-full md:max-w-[70vw] pb-2 hide-scrollbar justify-center">
                {selectedGallery.images.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-12 md:w-20 md:h-14 flex-shrink-0 cursor-pointer border-2 transition-all ${currentImageIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </section>
  );
};

export default ActivityGallery;