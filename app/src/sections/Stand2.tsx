import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, ShoppingCart, Award, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Patented Design',
  'Real Leather from European Origin',
  'Powder-Coated Steel Construction',
  '2kg Weighted Base',
  'Sustainable Materials',
  'Cable Management System',
  'Handmade in Europe',
  '3M Rubber Feet',
];

const Stand2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // Content slides in from left
      gsap.fromTo(
        content.children,
        { x: -80, opacity: 0 },
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

      // Image slides in from right
      gsap.fromTo(
        image,
        { x: 80, opacity: 0 },
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

      // Feature items stagger
      const featureItems = content.querySelectorAll('.feature-item');
      gsap.fromTo(
        featureItems,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
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
      id="products"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="/stand-2.jpg"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]/80" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={contentRef}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium">
                <Award className="w-3 h-3" />
                Best Seller
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#252525] rounded-full text-[#a0a0a0] text-xs uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                Ships Today
              </span>
            </div>
            
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0f0f0] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              STAND <span className="text-gradient-gold">2</span>
            </h2>

            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-6 max-w-lg">
              The evolution of the classic stand. Sleeker, more stable, and designed 
              for the modern audiophile. The headphone stand with integrated cable management.
            </p>

            <p className="text-[#a0a0a0] leading-relaxed mb-8 max-w-lg">
              Our flagship model combines European leather with powder-coated steel 
              for a stand that's as beautiful as it is functional.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <button
                onClick={scrollToShop}
                className="group flex items-center gap-2 px-6 py-3 bg-[#c4a574] text-[#1a1a1a] font-semibold text-sm uppercase tracking-wider hover:bg-[#d4b584] hover:shadow-[0_0_30px_rgba(196,165,116,0.4)] transition-all duration-300"
                data-cursor-hover
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart — $249
              </button>
              
              <button
                onClick={() => document.querySelector('#brown')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 text-[#c4a574] font-medium hover:text-[#d4b584] transition-colors"
                data-cursor-hover
              >
                View Brown Edition
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#c4a574]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#c4a574]" />
                  </div>
                  <span className="text-sm text-[#a0a0a0]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto">
              <img
                src="/stand-2.jpg"
                alt="Stand 2 - Premium Headphone Stand"
                className="w-full h-full object-contain"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#c4a574]/30 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#c4a574]/20 rounded-2xl -z-10" />
              
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-[#c4a574]/10 via-transparent to-transparent blur-2xl pointer-events-none" />
            </div>

            {/* Price tag */}
            <div className="absolute bottom-8 right-0 bg-[#c4a574] text-[#1a1a1a] px-6 py-4 rounded-l-xl">
              <span className="text-xs uppercase tracking-wider font-medium">From</span>
              <div className="text-3xl font-bold">$249</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stand2;