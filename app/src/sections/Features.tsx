import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Hand, Headphones, Cable, Shield, Globe, ArrowRight, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = {
  left: [
    {
      icon: Leaf,
      title: 'Premium Materials',
      description: 'Sustainably sourced hardwoods and aerospace-grade aluminum.',
    },
    {
      icon: Hand,
      title: 'Handmade Quality',
      description: 'Meticulously assembled by master craftsmen in Europe.',
    },
    {
      icon: Headphones,
      title: 'Ergonomic Design',
      description: 'Engineered to preserve your headphone pads and headband.',
    },
  ],
  right: [
    {
      icon: Cable,
      title: 'Cable Management',
      description: 'Integrated routing keeps your desk clean and organized.',
    },
    {
      icon: Shield,
      title: 'Stable Base',
      description: 'Weighted foundation prevents tipping with heavy headphones.',
    },
    {
      icon: Globe,
      title: 'Universal Fit',
      description: 'Compatible with all sizes from compact to studio grade.',
    },
  ],
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const leftFeaturesRef = useRef<HTMLDivElement>(null);
  const rightFeaturesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const image = imageRef.current;
    const leftFeatures = leftFeaturesRef.current;
    const rightFeatures = rightFeaturesRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !image || !leftFeatures || !rightFeatures || !cta) return;

    const ctx = gsap.context(() => {
      // Header reveal with power4.out
      gsap.fromTo(
        header.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal with scale
      gsap.fromTo(
        image,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
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

      // Left features stagger with slide from left
      const leftItems = leftFeatures.querySelectorAll('.feature-item');
      gsap.fromTo(
        leftItems,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right features stagger with slide from right
      const rightItems = rightFeatures.querySelectorAll('.feature-item');
      gsap.fromTo(
        rightItems,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA reveal
      gsap.fromTo(
        cta,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
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
      id="features"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c4a574]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium mb-6">
            <Award className="w-3 h-3" />
            Award-Winning Design
          </span>
          
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#f0f0f0] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Crafted With <span className="text-gradient-gold">Purpose</span>
          </h2>
          
          <p className="text-[#a0a0a0] max-w-xl mx-auto">
            Every detail is considered. Every material is chosen for quality and longevity.
          </p>
          
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Features */}
          <div ref={leftFeaturesRef} className="space-y-8">
            {features.left.map((feature, index) => (
              <div
                key={index}
                className="feature-item flex items-start gap-4 text-right flex-row-reverse lg:flex-row lg:text-right group"
              >
                <div className="feature-icon flex-shrink-0 w-12 h-12 rounded-xl bg-[#252525] border border-[#333] flex items-center justify-center transition-all duration-300 group-hover:border-[#c4a574] group-hover:bg-[#c4a574]/10">
                  <feature.icon className="w-5 h-5 text-[#c4a574]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#f0f0f0] mb-1 group-hover:text-[#c4a574] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/feature-profile.jpg"
                alt="Headphone on Stand - Side Profile"
                className="w-full h-full object-contain"
              />
              {/* Decorative rings */}
              <div className="absolute inset-0 border border-[#c4a574]/20 rounded-full scale-110 pointer-events-none" />
              <div className="absolute inset-0 border border-[#c4a574]/10 rounded-full scale-125 pointer-events-none" />
            </div>
          </div>

          {/* Right Features */}
          <div ref={rightFeaturesRef} className="space-y-8">
            {features.right.map((feature, index) => (
              <div
                key={index}
                className="feature-item flex items-start gap-4 group"
              >
                <div className="feature-icon flex-shrink-0 w-12 h-12 rounded-xl bg-[#252525] border border-[#333] flex items-center justify-center transition-all duration-300 group-hover:border-[#c4a574] group-hover:bg-[#c4a574]/10">
                  <feature.icon className="w-5 h-5 text-[#c4a574]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#f0f0f0] mb-1 group-hover:text-[#c4a574] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <button
            onClick={scrollToShop}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#c4a574] text-[#c4a574] font-semibold text-sm uppercase tracking-wider hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300"
            data-cursor-hover
          >
            Explore the Collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;