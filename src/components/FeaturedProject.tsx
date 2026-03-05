import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

// Pastikan Anda sudah mengimport gambar-gambar ini di atas jika menggunakan Vite/Webpack
import mejayan1 from '../assets/other/mejayan1.png';
import mejayan2 from '../assets/other/mejayan2.png';
import mejayan3 from '../assets/other/mejayan3.png';
import mejayan4 from '../assets/other/mejayan4.png';
import mejayan5 from '../assets/other/mejayan5.png';
import mejayan6 from '../assets/other/mejayan6.png';
import mejayan7 from '../assets/other/mejayan7.png';

import pecel1 from '../assets/other/pecel.png';
import pecel2 from '../assets/other/pecel2.png';
import pecel3 from '../assets/other/pecel3.png';
import pecel4 from '../assets/other/pecel4.png';
import pecel5 from '../assets/other/pecel5.png';
import pecel6 from '../assets/other/pecel6.png';
import pecel7 from '../assets/other/pecel7.png';
import pecel8 from '../assets/other/pecel8.png';
import pecel9 from '../assets/other/pecel9.png';
import pecel10 from '../assets/other/pecel10.png';

import gomadiun1 from '../assets/other/gomadiun.png';
import gomadiun2 from '../assets/other/gomadiun2.png';
import gomadiun3 from '../assets/other/gomadiun3.png';
import gomadiun4 from '../assets/other/gomadiun4.png';
import gomadiun5 from '../assets/other/gomadiun5.png';
import gomadiun6 from '../assets/other/gomadiun6.png';
import gomadiun7 from '../assets/other/gomadiun7.png';
import gomadiun8 from '../assets/other/gomadiun8.png';
import gomadiun14 from '../assets/other/gomadiun9.png';
import gomadiun15 from '../assets/other/gomadiun10.png';
import gomadiun9 from '../assets/other/admin_go.png';
import gomadiun10 from '../assets/other/admin_go2.png';
import gomadiun11 from '../assets/other/admin_go3.png';
import gomadiun12 from '../assets/other/admin_go4.png';
import gomadiun13 from '../assets/other/admin_go5.png';

import techintif1 from '../assets/other/techintif.png';
import techintif2 from '../assets/other/techintif2.png';
import techintif3 from '../assets/other/techintif3.png';

import adminTech1 from '../assets/other/admin_tech.png';
import adminTech2 from '../assets/other/admin_tech2.png';
import adminTech3 from '../assets/other/admin_tech3.png';
import adminTech4 from '../assets/other/admin_tech4.png';
import adminTech5 from '../assets/other/admin_tech5.png';

import sipbibu1 from '../assets/other/sipbibu.png';
import sipbibu2 from '../assets/other/sipbibu2.png';
import sipbibu3 from '../assets/other/sipbibu3.png';
import sipbibu4 from '../assets/other/sipbibu4.png';
import sipbibu5 from '../assets/other/sipbibu5.png';

import adminSbb1 from '../assets/other/admin_sbb.png';
import adminSbb2 from '../assets/other/admin_sbb2.png';
import adminSbb3 from '../assets/other/admin_sbb3.png';
import adminSbb4 from '../assets/other/admin_sbb4.png';

import aura1 from '../assets/other/aura.png';
import aura2 from '../assets/other/aura2.png';
import aura3 from '../assets/other/aura3.png';
import aura4 from '../assets/other/aura4.png';
import aura5 from '../assets/other/aura5.png';
import aura6 from '../assets/other/aura6.png';

import zenecox1 from '../assets/other/zenecox.png';
import zenecox2 from '../assets/other/zenecox2.png';
import zenecox3 from '../assets/other/zenecox3.png';
import zenecox4 from '../assets/other/zenecox4.png';
import zenecox5 from '../assets/other/zenecox5.png';
import zenecox6 from '../assets/other/zenecox6.png';
import zenecox7 from '../assets/other/zenecox7.png';
import zenecox8 from '../assets/other/zenecox8.png';
import zenecox9 from '../assets/other/zenecox9.png';

import mychanic1 from '../assets/other/mychanic.png';
import mychanic2 from '../assets/other/mychanic2.png';
import mychanic3 from '../assets/other/mychanic3.png';
import mychanic4 from '../assets/other/mychanic4.png';
import mychanic5 from '../assets/other/mychanic5.png';
import mychanic6 from '../assets/other/mychanic6.png';

import sentimen1 from '../assets/other/sentimen.png';
import sentimen2 from '../assets/other/senti2.png';

gsap.registerPlugin(ScrollTrigger);

// Data Proyek Portfolio
const projects = [
  {
    id: 1,
    title: "Digital Profile of Mejayan",
    category: "Official E-Government Web Platform",
    type: "Freelance",
    link: "https://desamejayan.com/",
    description: "The official web portal for Mejayan Village, serving as a digital bridge between the local administration and its community. It features a comprehensive village profile, a responsive news feed, and a dedicated public reporting system. Crucially, the platform is directly integrated with 'PECELANDAK' a digital administrative service to streamline bureaucracy and accelerate document processing for residents.",
    jobdesc: "Spearheaded the UI/UX design process to create a visually engaging and highly accessible interface. Executed API integrations to dynamically fetch and display population statistics, latest news updates, and the community reporting system. Additionally, implemented technical SEO optimizations to maximize the platform's visibility and ensure it is easily discoverable by the public.",
    tech: ["React + Vite", "TypeScript", "Tailwind CSS"],
    images: [mejayan1, mejayan2, mejayan3, mejayan4, mejayan5, mejayan6, mejayan7] 
  },
  {
    id: 2,
    title: "PECELANDAK",
    category: "Core Public Administration System",
    type: "Freelance",
    link: "https://pecelandak.desamejayan.com/",
    description: "This website is directly connected to the Digital Profile of Mejayan. Standing for 'Pelayanan Cepat Langsung Digital Akuntabel', this core engine digitizes the entire administrative bureaucracy for Mejayan Village. It serves as a centralized hub for processing various citizen document requests, managing population statistics, and handling public reports and news, ensuring a fast, transparent, and accountable workflow.",
    jobdesc: "Architected the complex logic for document request workflows and data management. Designed intuitive UI layouts for both citizen and admin dashboards. Engineered a highly secure authentication system implementing token-based login, OTP validation, and strict role-based middleware. I also successfully handled the end-to-end production server deployment.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Laravel 12"],
    images: [pecel2, pecel1, pecel3, pecel4, pecel8, pecel5, pecel9, pecel7, pecel6, pecel10
    ]
  },
  {
    id: 3,
    title: "GoMadiun",
    category: "Smart Tourism Web Platform",
    type: "Internship",
    link: "https://gomadiun.tifpsdku.com/",
    description: "An integrated smart tourism platform for Madiun Regency that showcases local attractions, tour packages, and supporting businesses. The system features an automated booking and digital payment gateway via Midtrans. To enhance the tourist experience, it utilizes the Simple Additive Weighting (SAW) algorithm for intelligent budget-based tour recommendations, and the Holiday Climate Index (HCI) for accurate weather comfort predictions.",
    jobdesc: "Fine-tuned and implemented the SAW algorithm to generate personalized tour recommendations based on user budgets. Developed the HCI weather prediction logic using the OpenWeatherMap, and visualized the real-time climate data interactively on OpenStreetMap using GeoJSON. Furthermore, I integrated the Midtrans payment system, designed a secure and scalable admin dashboard, and managed the production server deployment.",
    tech: ["Node.js", "Express.js", "React", "Tailwind CSS", "Midtrans", "GeoJSON", "GIS", "OpenWeather"],
    images: [gomadiun1, gomadiun2, gomadiun3, gomadiun4, gomadiun5, gomadiun7, gomadiun14, gomadiun6, gomadiun8, gomadiun15, gomadiun9, gomadiun10 , gomadiun11 , gomadiun12, gomadiun13
    ]
  },
  {
    id: 4, // Sesuaikan urutan ID ini
    title: "Techintif",
    category: "Software House & IT Consulting",
    type: "Internship", // Atau bisa diganti "University Project"
    link: "https://techintif.tifpsdku.com/",
    description: "A multifaceted digital hub designed to showcase innovative products developed by Informatics Engineering students, ranging from web and Android applications to interactive games and VR experiences. Operating as a dual-purpose platform, Techintif also functions as a professional IT agency providing software development services, tech consultations, and industry news updates.",
    jobdesc: "Directed the UI/UX design process and translated it into a highly responsive Front-End interface. Engineered the backend infrastructure using CodeIgniter 4, where I developed robust RESTful APIs and built a secure, comprehensive administrative logic to ensure seamless data synchronization between the user-facing platform and the admin control panel.",
    tech: ["React", "CodeIgniter 4", "Tailwind CSS"], // Sesuaikan jika ada React/Vue
    images: [techintif1, techintif2, techintif3, adminTech5, adminTech1, adminTech2, adminTech3, adminTech4
    ]
  },
{
    id: 5, // Sesuaikan urutan ID ini dengan urutan project Anda
    title: "SIPBIBU",
    category: "Maternal Healthcare Platform",
    type: "Internship", 
    link: "https://sipbibu.tifpsdku.com/",
    description: "A dedicated maternal healthcare platform designed for the early detection and prevention of baby blues syndrome. It leverages scientifically validated Antepartum and Postpartum questionnaires developed by an academic expert from Universitas Indonesia. Beyond diagnostics, the platform features a Twitter-like interactive community forum for mothers, guided audio-visual meditation sessions, and an online professional consultation service.",
    jobdesc: "Led the end-to-end UI/UX design and Front-End implementation for both the user and admin interfaces. Engineered the complex clinical logic for processing questionnaire data, defining scoring scales, and generating automated diagnostic results. Furthermore, I built the underlying logic for the interactive community forum and executed robust API integrations connecting the backend with the frontend ecosystem.",
    tech: ["React", "CodeIgniter 4"],
    images: [sipbibu1, sipbibu2, sipbibu3, sipbibu4, sipbibu5, adminSbb1, adminSbb2, adminSbb3, adminSbb4
    ]
  },
{
    id: 6, // Silakan sesuaikan urutan ID ini
    title: "AURA - Beauty in Imperfection",
    category: "Luxury Beauty Landing Page",
    type: "Personal Project", 
    link: "https://aura-skincare-website.vercel.app/",
    description: "A visually striking and luxurious landing page dedicated to showcasing premium beauty products. Designed around the philosophy of 'Beauty in Imperfection,' this platform delivers a high-end digital storefront experience that captivates users through elegant typography, seamless animations, and immersive product displays.",
    jobdesc: "Solely responsible for the end-to-end creative process, from conceptualizing the modern UI/UX design to translating it into a pixel-perfect, fully responsive Front-End architecture. I integrated smooth micro-interactions and optimized the visual layout to ensure a flawless, premium browsing experience across all device screens.",
    tech: ["React + Vite", "TypeScript", "Tailwind CSS"], // Tambahkan Framer Motion/GSAP jika Anda menggunakannya
    images: [ aura1, aura2, aura6, aura3, aura4, aura5
    ]
  },
{
    id: 7, // Silakan sesuaikan urutan ID ini
    title: "Zenecox - Agency Profile",
    category: "Digital Agency Landing Page",
    type: "Personal Project", 
    link: "https://zenecox-agency-profile-company.vercel.app/",
    description: "A vibrant and modern landing page crafted for Zenecox, a forward-thinking digital agency specializing in digital business transformation, marketing, and social media management. The platform embraces a contemporary, bold 'Gen Z' aesthetic, utilizing striking typography and dynamic layouts tailored to capture the attention of the modern digital landscape.",
    jobdesc: "Led the complete end-to-end UI/UX design process, conceptualizing a trendy and bold visual identity. Translated the design into a fully responsive, pixel-perfect Front-End architecture, ensuring seamless layout adaptations across all screen sizes and implementing fluid interactions to elevate the overall user experience.",
    tech: ["React + Vite", "TypeScript", "Tailwind CSS"],
    images: [zenecox1, zenecox2, zenecox3, zenecox4, zenecox5, zenecox6, zenecox7, zenecox8, zenecox9
    ]
  },
  {
    id: 8, // Silakan sesuaikan urutan ID ini
    title: "Mychanic",
    category: "Automotive Workshop Landing Page",
    type: "Personal Project", // Bisa Anda ganti menjadi "Personal Project" jika ini adalah eksplorasi
    link: "https://mychanic-website.vercel.app/",
    description: "A modern and intuitive landing page designed to bridge the gap between vehicle owners and trusted automotive workshops. The platform serves as a reliable digital directory, featuring a streamlined search experience and highlighting verified mechanics to ensure users find top-tier automotive services with ease.",
    jobdesc: "Spearheaded the entire UI/UX design process, crafting a clean, modern, and trustworthy visual identity. Translated the high-fidelity designs into a fully responsive and pixel-perfect Front-End architecture, guaranteeing a seamless and engaging user experience across all device screens.",
    tech: ["React + Vite", "TypeScript", "Tailwind CSS"],
    images: [mychanic1, mychanic2, mychanic3, mychanic4, mychanic5, mychanic6
    ]
  },
 {
    id: 9, // Silakan sesuaikan urutan ID ini
    title: "Instagram Sentiment Analysis",
    category: "Data Analytics Dashboard",
    type: "Data Science Project", // Tag yang menunjukkan ranah analitik
    link: "https://analisis-sentimen-instagram-keluhan.vercel.app/",
    description: "An advanced data analytics dashboard developed to visualize sentiment trends derived from Instagram user complaints. Leveraging the IndoBERT Natural Language Processing (NLP) model, the platform provides highly accurate, context-aware classification and insightful visualizations of public opinions regarding Instagram's 2025 feature updates.",
    jobdesc: "Engineered the data pipeline and fine-tuned the pre-trained IndoBERT model to scrape, process, and accurately categorize public complaints in Indonesian. Transformed raw unstructured text into structured sentiment metrics, and designed the interactive dashboard to present complex data insights clearly and effectively.",
    tech: ["Python", "Flask", "IndoBERT", "NLP", "Pandas"],
    images: [
      sentimen1,
      sentimen2
    ]
  }
];

const FeaturedProject: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.project-title-anim',
      { y: 100, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'
      }
    );

    const projectItems = gsap.utils.toArray('.project-item');
    projectItems.forEach((item: any) => {
      gsap.fromTo(item,
        { y: 80, opacity: 0, skewY: 5 }, 
        {
          scrollTrigger: { 
            trigger: item,       
            start: 'top 85%',    
            toggleActions: "play none none reverse" 
          },
          y: 0, 
          opacity: 1, 
          skewY: 0, 
          duration: 1, 
          ease: 'power3.out' 
        }
      );
    });
  }, { scope: sectionRef });

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'; 
      gsap.fromTo('.project-modal',
        { y: '100%' },
        { y: '0%', duration: 0.8, ease: 'expo.inOut' }
      );
      gsap.fromTo('.modal-content > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      document.body.style.overflow = 'auto'; 
    }
  }, [selectedProject]);

  const closeProject = () => {
    gsap.to('.project-modal', {
      y: '100%', duration: 0.8, ease: 'expo.inOut',
      onComplete: () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      }
    });
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="w-full bg-noir-900 text-noir-100 py-32 relative">
      <div className="px-8 md:px-16">
        
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-noir-100"></div>
            <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400">Portfolio</h3>
          </div>
          <div className="overflow-hidden">
            <h2 className="project-title-anim font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
              Project <span className="text-outline">Experience</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col border-t border-noir-800 relative z-10">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-item group relative border-b border-noir-900 py-10 md:py-16 cursor-pointer overflow-hidden flex flex-col md:flex-row md:items-center justify-between transition-colors hover:bg-noir-800/50"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col z-10 pointer-events-none pl-4 md:pl-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-sm text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                  <div className="w-4 h-px bg-gray-700"></div>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-400">{project.category}</span>
                  <span className="ml-2 px-2 py-0.5 text-[10px] uppercase tracking-widest border border-gray-700 rounded-full text-gray-500 group-hover:border-white/50 group-hover:text-white transition-colors">
                    {project.type}
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter group-hover:text-transparent group-hover:text-outline transition-all duration-500">
                  {project.title}
                </h2>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-gray-700 mr-8 group-hover:bg-noir-100 group-hover:text-noir-900 transition-all duration-500 z-10">
                <ArrowRight size={24} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div 
                className={`absolute inset-0 right-0 w-full md:w-1/2 ml-auto h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-30 mix-blend-luminosity`}
                style={{ backgroundImage: `url(${project.images[0]})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal fixed inset-0 z-[100] bg-noir-900 flex flex-col md:flex-row h-screen w-full">
          
          <button 
            onClick={closeProject}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-noir-800 text-white hover:bg-white hover:text-black transition-colors shadow-2xl"
          >
            <X size={24} />
          </button>

          <div className="w-full md:w-[60%] h-[40vh] md:h-full relative group bg-black flex-shrink-0">
          <img 
              src={selectedProject.images[currentImageIndex]} 
              alt={selectedProject.title} 
              className="w-full h-full object-contain opacity-80 transition-all duration-500"
            />
            
            <div className="absolute bottom-6 right-6 flex gap-4">
              <button onClick={prevImage} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                <ArrowLeft size={20} />
              </button>
              <button onClick={nextImage} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-8 font-sans text-xs md:text-sm tracking-widest bg-black/50 px-4 py-1 backdrop-blur-md">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>
          </div>

          {/* Sisi Kanan: Detail & Jobdesc (Diperbaiki area Scroll-nya) */}
          {/* PERBAIKAN: Menambahkan data-lenis-prevent="true" agar scroll mouse wheel berfungsi! */}
          <div 
            className="w-full md:w-[40%] h-[60vh] md:h-full overflow-y-auto bg-noir-900 p-8 md:p-16 flex flex-col justify-start pb-24 modal-content hide-scrollbar"
            data-lenis-prevent="true"
          >
            
            <div className="mb-10 mt-4 md:mt-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">
                  {selectedProject.category}
                </span>
                <span className="px-2 py-0.5 text-[9px] md:text-[10px] uppercase tracking-widest border border-gray-700 text-gray-400 rounded-full">
                  {selectedProject.type}
                </span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-none mb-3">
                {selectedProject.title}
              </h2>
              {/* --- TOMBOL LIVE DEMO --- */}
              {/* Akan muncul secara dinamis jika Anda menambahkan parameter 'link' di data projects */}
              {(selectedProject as any).link && (
                <a 
                  href={(selectedProject as any).link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors font-sans text-xs md:text-sm font-bold uppercase tracking-widest w-fit"
                >
                  Live Demo <ExternalLink size={16} />
                </a>
              )}
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 mb-4 border-b border-noir-800 pb-3">About Project</h4>
                <p className="font-sans text-gray-300 leading-relaxed text-sm md:text-base">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 mb-4 border-b border-noir-800 pb-3">My Role & Jobdesk</h4>
                <p className="font-sans text-gray-300 leading-relaxed text-sm md:text-base">
                  {selectedProject.jobdesc}
                </p>
              </div>

              <div>
                <h4 className="font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 mb-5 border-b border-noir-800 pb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-4 py-1.5 text-[10px] md:text-xs font-sans uppercase tracking-wider border border-white/10 bg-white/5 rounded-full text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};

export default FeaturedProject;