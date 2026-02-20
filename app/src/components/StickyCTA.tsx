import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ShoppingCart, X } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Show after scrolling past hero
      if (scrollY > heroHeight * 0.8 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollY < heroHeight * 0.5) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  useEffect(() => {
    if (ctaRef.current) {
      if (isVisible) {
        gsap.fromTo(
          ctaRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      } else {
        gsap.to(ctaRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const scrollToShop = () => {
    const shopSection = document.querySelector('#quick-shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
  };

  if (isDismissed) return null;

  return (
    <div
      ref={ctaRef}
      className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#c4a574]/30 transform -translate-y-full"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:block">
              <span className="text-xs text-[#c4a574] uppercase tracking-wider">Limited Time</span>
              <div className="text-sm text-[#f0f0f0] font-medium">Free Shipping on All Orders</div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#252525]">
                <img src="/shop-stand2.jpg" alt="Stand 2" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm text-[#f0f0f0] font-medium">STAND 2</div>
                <div className="text-xs text-[#c4a574]">$249</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToShop}
              className="flex items-center gap-2 px-4 md:px-6 py-2 bg-[#c4a574] text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider hover:bg-[#d4b584] transition-colors"
              data-cursor-hover
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Shop Now</span>
            </button>
            
            <button
              onClick={handleDismiss}
              className="p-2 text-[#666] hover:text-[#f0f0f0] transition-colors"
              data-cursor-hover
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;