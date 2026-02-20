import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingCart, Crown, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Brown = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Image slides in from left
      gsap.fromTo(
        image,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content slides in from right
      gsap.fromTo(
        content.children,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Thumbnails stagger
      const thumbs = content.querySelectorAll('.thumb-item');
      gsap.fromTo(
        thumbs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 45%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const shopSection = document.querySelector('#quick-shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brown"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="/brown-stand.jpg"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]/80" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mr-auto">
              <img
                src="/brown-stand.jpg"
                alt="Brown Premium Headphone Stand"
                className="w-full h-full object-contain"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#c4a574]/30 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#c4a574]/20 rounded-2xl -z-10" />
              
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-[#c4a574]/10 via-transparent to-transparent blur-2xl pointer-events-none" />
            </div>

            {/* Price tag */}
            <div className="absolute bottom-8 left-0 bg-[#c4a574] text-[#1a1a1a] px-6 py-4 rounded-r-xl">
              <span className="text-xs uppercase tracking-wider font-medium">From</span>
              <div className="text-3xl font-bold">$299</div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-700/20 rounded-full text-amber-600 text-xs uppercase tracking-wider font-medium">
                <Crown className="w-3 h-3" />
                Premium Edition
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#252525] rounded-full text-[#a0a0a0] text-xs uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                Limited Stock
              </span>
            </div>
            
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0f0f0] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-gradient-gold">BROWN</span> LEATHER
            </h2>

            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-6 max-w-lg">
              The Brown offers an absolutely secure hold for your headphones. A warm, 
              classic aesthetic that adds a touch of vintage luxury to your setup.
            </p>

            <p className="text-[#a0a0a0] leading-relaxed mb-6 max-w-lg">
              The combination of powder-coated steel and Italian leather is timeless 
              and elegant. The headphone capsules lie gently on the real leather and 
              can optimally ventilate thanks to the recesses.
            </p>

            <div className="bg-[#252525] rounded-xl p-5 mb-8">
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                With 120mm depth, the support surface offers enough space for large 
                headphones such as those from Stax or Hifiman. At 1.8kg with 3M rubber 
                feet, this stand has a secure footing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <button
                onClick={scrollToShop}
                className="group flex items-center gap-2 px-6 py-3 bg-[#c4a574] text-[#1a1a1a] font-semibold text-sm uppercase tracking-wider hover:bg-[#d4b584] hover:shadow-[0_0_30px_rgba(196,165,116,0.4)] transition-all duration-300"
                data-cursor-hover
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart — $299
              </button>
              
              <button
                onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 text-[#c4a574] font-medium hover:text-[#d4b584] transition-colors"
                data-cursor-hover
              >
                View All Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Variant Thumbnails */}
            <div>
              <span className="text-xs text-[#a0a0a0] uppercase tracking-[0.2em] mb-4 block">
                Also Available In
              </span>
              <div className="flex gap-4">
                <div className="thumb-item relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#c4a574] cursor-pointer transition-transform hover:scale-105">
                  <img src="/shop-brown.jpg" alt="Brown Variant" className="w-full h-full object-cover" />
                </div>
                <div className="thumb-item relative w-20 h-20 rounded-xl overflow-hidden border border-[#333] cursor-pointer transition-all hover:border-[#c4a574]/50 hover:scale-105">
                  <img src="/shop-black.jpg" alt="Black Variant" className="w-full h-full object-cover" />
                </div>
                <div className="thumb-item relative w-20 h-20 rounded-xl overflow-hidden border border-[#333] cursor-pointer transition-all hover:border-[#c4a574]/50 hover:scale-105">
                  <img src="/shop-stand2.jpg" alt="Stand 2 Variant" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brown;