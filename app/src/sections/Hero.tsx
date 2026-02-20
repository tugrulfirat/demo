import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Truck, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;

    if (!section || !headline || !image || !cta || !trust) return;

    const ctx = gsap.context(() => {
      // Master timeline for page load with power4.out
      const masterTl = gsap.timeline({ delay: 0.2 });

      // Headline reveal with split text effect
      const headlineWords = headline.querySelectorAll('.headline-word');
      masterTl.fromTo(
        headlineWords,
        { 
          y: 120, 
          opacity: 0,
          rotateX: -45
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: 'power4.out',
        }
      );

      // Subheadline fade in
      masterTl.fromTo(
        headline.querySelector('.subheadline'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Product image reveal with mask
      masterTl.fromTo(
        image.querySelector('.image-reveal-mask'),
        { scaleY: 1 },
        { 
          scaleY: 0, 
          duration: 1.2, 
          ease: 'power4.inOut',
          transformOrigin: 'top'
        },
        '-=1'
      );

      masterTl.fromTo(
        image.querySelector('img'),
        { scale: 1.2, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.4, 
          ease: 'power3.out' 
        },
        '-=1'
      );

      // CTA buttons stagger
      const ctaButtons = cta.querySelectorAll('.cta-btn');
      masterTl.fromTo(
        ctaButtons,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Price tag pop
      masterTl.fromTo(
        cta.querySelector('.price-tag'),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Trust badges
      masterTl.fromTo(
        trust.querySelectorAll('.trust-item'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Scroll-triggered exit (clean, no glitch)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.8,
          onLeaveBack: () => {
            // Reset elements when scrolling back up
            gsap.set([headline, image, cta, trust], { opacity: 1, y: 0 });
          }
        },
      });

      scrollTl.to(headline, {
        y: -60,
        opacity: 0,
        ease: 'power2.in',
      });

      scrollTl.to(
        image,
        {
          y: -40,
          opacity: 0,
          ease: 'power2.in',
        },
        '<0.1'
      );

      scrollTl.to(
        cta,
        {
          y: -30,
          opacity: 0,
          ease: 'power2.in',
        },
        '<0.1'
      );

      scrollTl.to(
        trust,
        {
          opacity: 0,
        },
        '<'
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
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a1a]"
    >
      {/* Background with subtle radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#c4a574]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Grid */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            {/* Headline */}
            <div ref={headlineRef} className="mb-8">
              <div className="overflow-hidden mb-2">
                <span className="headline-word inline-block text-xs md:text-sm uppercase tracking-[0.4em] text-[#c4a574] font-medium">
                  Premium Audio Accessories
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[0.95] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                <div className="overflow-hidden">
                  <span className="headline-word block text-[#f0f0f0]">YOUR</span>
                </div>
                <div className="overflow-hidden">
                  <span className="headline-word block text-[#f0f0f0]">HEADPHONE</span>
                </div>
                <div className="overflow-hidden">
                  <span className="headline-word block text-gradient-gold">DESERVES</span>
                </div>
                <div className="overflow-hidden">
                  <span className="headline-word block text-[#f0f0f0]">BETTER.</span>
                </div>
              </h1>
              
              <p className="subheadline mt-6 text-base md:text-lg text-[#a0a0a0] max-w-md leading-relaxed">
                Handcrafted stands from European leather and powder-coated steel. 
                Protect your investment with style.
              </p>
            </div>

            {/* CTA Section */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <button
                onClick={scrollToShop}
                className="cta-btn group relative px-8 py-4 bg-[#c4a574] text-[#1a1a1a] font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(196,165,116,0.4)]"
                data-cursor-hover
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop the Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-[#d4b584] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="cta-btn px-8 py-4 border border-[#c4a574]/50 text-[#c4a574] font-medium text-sm uppercase tracking-wider hover:bg-[#c4a574]/10 hover:border-[#c4a574] transition-all duration-300"
                data-cursor-hover
              >
                Discover More
              </button>
            </div>

            {/* Price & Quick Info */}
            <div className="flex items-center gap-6 mb-8">
              <div className="price-tag">
                <span className="text-xs text-[#a0a0a0] uppercase tracking-wider">From</span>
                <div className="text-3xl md:text-4xl font-semibold text-[#c4a574]">$199</div>
              </div>
              <div className="h-10 w-px bg-[#333]" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c4a574] text-[#c4a574]" />
                ))}
                <span className="ml-2 text-sm text-[#a0a0a0]">4.9 (2,847 reviews)</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div ref={trustRef} className="flex flex-wrap gap-4">
              <div className="trust-item flex items-center gap-2 px-4 py-2 bg-[#252525] rounded-full">
                <Truck className="w-4 h-4 text-[#c4a574]" />
                <span className="text-xs text-[#a0a0a0]">Free Shipping</span>
              </div>
              <div className="trust-item flex items-center gap-2 px-4 py-2 bg-[#252525] rounded-full">
                <Shield className="w-4 h-4 text-[#c4a574]" />
                <span className="text-xs text-[#a0a0a0]">5-Year Warranty</span>
              </div>
              <div className="trust-item flex items-center gap-2 px-4 py-2 bg-[#252525] rounded-full">
                <span className="text-xs text-[#c4a574] font-semibold">30-Day</span>
                <span className="text-xs text-[#a0a0a0]">Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div ref={imageRef} className="order-1 lg:order-2 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              {/* Image container with reveal mask */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Reveal mask for clean entry animation */}
                <div className="image-reveal-mask absolute inset-0 bg-[#1a1a1a] z-10 origin-top" />
                
                <img
                  src="/hero-stand.jpg"
                  alt="Premium Headphone Stand"
                  className="w-full h-full object-contain"
                />
                
                {/* Subtle product glow */}
                <div className="absolute inset-0 bg-gradient-radial from-[#c4a574]/8 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-0 bg-[#c4a574] text-[#1a1a1a] px-4 py-3 rounded-lg shadow-xl">
                <div className="text-xs uppercase tracking-wider font-medium">Best Seller</div>
                <div className="text-lg font-bold">Stand 2</div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 border border-[#c4a574]/20 rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 border border-[#c4a574]/10 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;