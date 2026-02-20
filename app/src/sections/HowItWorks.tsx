import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, Wrench, Heart, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: Gem,
    title: 'Premium Materials',
    subtitle: 'Sourced Globally',
    description:
      'We source only the finest materials from around the world. From Italian leather to Japanese steel, every component is selected for exceptional quality and durability. Our wood comes from sustainably managed forests.',
    image: '/stand-2.jpg',
    stats: [
      { value: '100%', label: 'Sustainable' },
      { value: '12+', label: 'Countries' },
    ],
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Handmade Quality',
    subtitle: 'Crafted by Masters',
    description:
      'Each stand is meticulously handcrafted by skilled artisans with decades of experience. The process involves over 50 individual steps, from precision cutting to hand-finishing.',
    image: '/brown-stand.jpg',
    stats: [
      { value: '50+', label: 'Steps' },
      { value: '8hrs', label: 'Per Stand' },
    ],
  },
  {
    id: 3,
    icon: Heart,
    title: 'Ergonomic Design',
    subtitle: 'Engineered for Care',
    description:
      'Our stands are designed with your headphones in mind. The curved cradle distributes weight evenly, preventing pressure points that can damage ear pads and extend their life.',
    image: '/hero-stand.jpg',
    stats: [
      { value: '0%', label: 'Pressure Points' },
      { value: '10yr', label: 'Pad Life' },
    ],
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;

    if (!section || !header || !content) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        header.children,
        { y: 50, opacity: 0 },
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

      // Content reveal
      gsap.fromTo(
        content,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate tab change
  const changeTab = (index: number) => {
    if (isAnimating || index === activeTab) return;
    
    setIsAnimating(true);
    
    const content = contentRef.current;
    if (content) {
      gsap.to(content.querySelector('.tab-content-wrapper'), {
        opacity: 0,
        x: index > activeTab ? -30 : 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(
            content.querySelector('.tab-content-wrapper'),
            { opacity: 0, x: index > activeTab ? 30 : -30 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.4, 
              ease: 'power3.out',
              onComplete: () => setIsAnimating(false)
            }
          );
        },
      });
    }
  };

  const goToNext = () => {
    changeTab((activeTab + 1) % steps.length);
  };

  const goToPrev = () => {
    changeTab((activeTab - 1 + steps.length) % steps.length);
  };

  const currentStep = steps[activeTab];

  const scrollToShop = () => {
    const shopSection = document.querySelector('#quick-shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c4a574]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            The Process
          </span>
          
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#f0f0f0] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How We Create <span className="text-gradient-gold">Excellence</span>
          </h2>
          
          <p className="text-[#a0a0a0] max-w-xl mx-auto">
            From raw materials to finished product, every step is executed with precision.
          </p>
          
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-2 md:gap-4 mb-10 md:mb-14">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => changeTab(index)}
              disabled={isAnimating}
              className={`relative flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 ${
                activeTab === index
                  ? 'bg-[#c4a574] text-[#1a1a1a]'
                  : 'bg-[#252525] text-[#a0a0a0] hover:bg-[#333] hover:text-[#f0f0f0]'
              }`}
              data-cursor-hover
            >
              <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                activeTab === index ? 'bg-[#1a1a1a] text-[#c4a574]' : 'bg-[#333] text-[#a0a0a0]'
              }`}>
                {step.id}
              </span>
              <span className="hidden md:block text-sm font-medium uppercase tracking-wider">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div ref={contentRef}>
          <div className="tab-content-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/5] max-w-lg mx-auto rounded-2xl overflow-hidden">
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-6 md:gap-10">
                    {currentStep.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-2xl md:text-3xl font-bold text-[#c4a574]">{stat.value}</div>
                        <div className="text-xs uppercase tracking-wider text-[#a0a0a0]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative frame */}
                <div className="absolute -inset-3 border border-[#c4a574]/20 rounded-2xl -z-10" />
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#c4a574]/10 flex items-center justify-center">
                    <currentStep.icon className="w-6 h-6 text-[#c4a574]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#c4a574] uppercase tracking-[0.2em]">{currentStep.subtitle}</span>
                    <h3 className="text-2xl md:text-3xl font-medium text-[#f0f0f0]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#a0a0a0] leading-relaxed text-lg mb-8">
                  {currentStep.description}
                </p>

                {/* Navigation & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={goToPrev}
                      disabled={isAnimating}
                      className="w-12 h-12 rounded-full border border-[#c4a574]/30 flex items-center justify-center text-[#c4a574] hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-50"
                      data-cursor-hover
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex gap-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            index === activeTab ? 'w-8 bg-[#c4a574]' : 'w-1.5 bg-[#333]'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={goToNext}
                      disabled={isAnimating}
                      className="w-12 h-12 rounded-full border border-[#c4a574]/30 flex items-center justify-center text-[#c4a574] hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-50"
                      data-cursor-hover
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <span className="text-sm text-[#666]">{activeTab + 1} / {steps.length}</span>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-8 border-t border-[#333]">
                  <button
                    onClick={scrollToShop}
                    className="group inline-flex items-center gap-3 text-[#c4a574] font-medium hover:text-[#d4b584] transition-colors"
                    data-cursor-hover
                  >
                    See the Results — Shop Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;