import { useEffect } from 'react';
import Lenis from 'lenis'; // Pastikan import dari 'lenis' atau '@studio-freight/lenis'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Komponen
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import FeaturedProject from './components/FeaturedProject';
import CertificationAwards from './components/CertificationAwards';
import Organization from './components/Organization';
import ActivityGallery from './components/ActivityGallery';
import Footer from './components/Footer';
import Connect from './components/Connect';
import DesktopNotice from './components/DesktopNotice';

// Registrasi Plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  
  // Setup Lenis Scroll (Versi Terbaru Bebas Error TS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sinkronisasi Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-noir-900 min-h-screen selection:bg-noir-100 selection:text-noir-900">
      <Navbar />
      <Hero />
      <Intro />
      <Experience />
      <TechStack />
      <FeaturedProject />
      <CertificationAwards />
      <Organization />
      <ActivityGallery />
      <Footer />
      <Connect />
      <DesktopNotice />
    </main>
  );
}

export default App;