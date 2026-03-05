import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ArrowUpRight } from 'lucide-react';

import Hima from "../assets/other/hima.jpg"
import Inotek from "../assets/other/inotek.jpg"
import Sinergi from "../assets/other/sinergi.png"
import Lecture from "../assets/other/pekan.jpg"
import Workshop from "../assets/other/pameran.jpg"

gsap.registerPlugin(ScrollTrigger);

const organizations = [
  {
    id: 'org-1',
    role: "Vice Chairman",
    name: "HIMA Teknik Informatika",
    period: "Jan 2023 - Jan 2024",
    description: "Leading the Informatics Engineering Student Association, organizing major campus events and student advocacy.",
    image: [Hima]
  },
  {
    id: 'org-2',
    role: "Coordinator",
    name: "SMART INOTEK NATIONAL 2023",
    period: "Jun 2023 - Jul 2023",
    description: "Student Coordinator for National Innovation Competition. Managed participants and technical execution.",
    image: [Inotek]
  },
  {
    id: 'org-3',
    role: "Sponsorship",
    name: "Sinergi Advokesma National Webinar",
    period: "Jan 2023 - Jan 2024",
    description: "Sponsorship Division Coordinator. Successfully secured funding partners for the national webinar event.",
    image: [Sinergi]
  },
  {
    id: 'org-4',
    role: "Sponsorship",
    name: "Public Lecture",
    period: "Aug 2023 - Sep 2023",
    description: "Students as Agents of Change. Managed external relations and sponsorship agreements.",
    image: [Lecture]
  },
  {
    id: 'org-5',
    role: "Event Planner",
    name: "IT Workshop",
    period: "Sep 2023",
    description: "Sponsorship Division Coordinator. Successfully secured funding partners for the national webinar event.",
    image: [Workshop]
  }
];

const Organization: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

  useGSAP(() => {
    // Animasi Header
    gsap.fromTo('.org-title-anim',
      { y: 100, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'
      }
    );

    // Animasi Baris Individual (Muncul satu per satu saat di-scroll)
    const orgRows = gsap.utils.toArray('.org-row');
    
    orgRows.forEach((row: any) => {
      gsap.fromTo(row,
        { rotationX: -90, opacity: 0, transformOrigin: 'top' },
        {
          scrollTrigger: { 
            trigger: row, 
            start: 'top 85%', // Trigger saat masing-masing baris mencapai 85% layar
            toggleActions: "play none none reverse" // Opsional: Animasi ulang saat scroll bolak-balik
          },
          rotationX: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out' 
        }
      );
    });

  }, { scope: sectionRef });

  // Animasi Lightbox (Sama dengan section Certification agar konsisten)
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.org-modal-overlay',
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(10px)', duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo('.org-modal-content',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  const closeModal = () => {
    gsap.to('.org-modal-content', { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
    gsap.to('.org-modal-overlay', { 
      opacity: 0, backdropFilter: 'blur(0px)', duration: 0.4, ease: 'power2.in', delay: 0.1,
      onComplete: () => setSelectedImage(null) 
    });
  };

  return (
    <section id="organization" ref={sectionRef} className="w-full bg-noir-900 text-noir-100 py-32 border-t border-noir-800">
      
      {/* Header Section */}
      <div className="px-8 md:px-16 mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-noir-100"></div>
          <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">Leadership</h3>
        </div>
        <div className="overflow-hidden">
          <h2 className="org-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
            Organizational <span className="text-outline">Experience</span>
          </h2>
        </div>
      </div>

      {/* Archival Table List */}
      <div className="w-full flex flex-col border-t border-noir-800">
        {organizations.map((org, index) => (
          <div 
            key={org.id}
            onClick={() => setSelectedImage({ src: org.image[0], title: org.name })}
            className="org-row group w-full border-b border-noir-800 bg-noir-900 cursor-pointer transition-all duration-500 hover:bg-noir-100 hover:text-noir-900 flex flex-col md:flex-row"
          >
            {/* Kolom Kiri: Nomor & Tahun (Mobile: Di atas, Desktop: Di Kiri) */}
            <div className="w-full md:w-[20%] p-6 md:p-8 flex md:flex-col justify-between md:justify-start md:border-r border-noir-800 group-hover:border-noir-900 transition-colors">
              <span className="font-sans text-sm text-gray-500 group-hover:text-gray-900 font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* PERBAIKAN: Menambahkan class w-fit di sini agar border menyesuaikan lebar teks */}
              <span className="font-sans text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-800 md:mt-auto border border-gray-700 group-hover:border-gray-800 rounded-full px-3 py-1 w-fit">
                {org.period}
              </span>
            </div>

            {/* Kolom Tengah: Posisi & Nama Organisasi */}
            <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-center md:border-r border-noir-800 group-hover:border-noir-900 transition-colors">
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                {org.role}
              </h3>
              <p className="font-sans text-lg md:text-xl font-medium text-gray-300 group-hover:text-gray-900">
                {org.name}
              </p>
            </div>

            {/* Kolom Kanan: Deskripsi & Ikon Panah */}
            <div className="w-full md:w-[35%] p-6 md:p-8 flex items-center justify-between gap-6 relative overflow-hidden">
              <p className="font-sans text-sm text-gray-500 group-hover:text-gray-700 leading-relaxed z-10">
                {org.description}
              </p>
              
              {/* Ikon panah membesar saat hover */}
              <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full border border-gray-700 group-hover:border-noir-900 flex items-center justify-center transform group-hover:rotate-45 transition-all duration-500 group-hover:bg-noir-900 group-hover:text-noir-100">
                <ArrowUpRight size={20} />
              </div>

              {/* Efek Garis Bergerak di Background saat Hover */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-500"></div>
            </div>

          </div>
        ))}
      </div>

      {/* --- LIGHTBOX MODAL UNTUK GAMBAR SERTIFIKAT --- */}
      {selectedImage && (
        <div className="org-modal-overlay fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 md:p-12">
          
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 z-[130] w-12 h-12 flex items-center justify-center rounded-full bg-noir-800 text-white hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <div className="org-modal-content relative w-full max-w-4xl flex flex-col items-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="w-full max-h-[80vh] object-contain shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h4 className="font-display text-2xl uppercase tracking-widest text-white">
                {selectedImage.title}
              </h4>
              <p className="font-sans text-sm text-gray-500 uppercase tracking-widest mt-2">
                Click X or outside to close
              </p>
            </div>
          </div>
          
          <div className="absolute inset-0 z-[-1]" onClick={closeModal}></div>
        </div>
      )}

    </section>
  );
};

export default Organization;