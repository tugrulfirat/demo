import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Hero from './sections/Hero';
import QuickBuy from './sections/QuickBuy';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Reviews from './sections/Reviews';
import Stand2 from './sections/Stand2';
import Brown from './sections/Brown';
import ShopNow from './sections/ShopNow';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';
import CustomCursor from './components/CustomCursor';
import StickyCTA from './components/StickyCTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
      
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Clear all GSAP timelines
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div className="relative bg-[#1a1a1a] min-h-screen">
      <CustomCursor />
      <Navigation />
      <StickyCTA />
      <main>
        <Hero />
        <QuickBuy />
        <Features />
        <HowItWorks />
        <Reviews />
        <Stand2 />
        <Brown />
        <ShopNow />
      </main>
      <Footer />
    </div>
  );
}

export default App;