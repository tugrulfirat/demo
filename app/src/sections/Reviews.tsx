import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: "The best headphone stand I've ever owned. The craftsmanship is exceptional, and it perfectly complements my high-end audio setup. Worth every penny.",
    author: 'Michael Chen',
    title: 'Audio Engineer',
    source: 'TECH CRUNCH',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    quote: "A masterpiece of design and functionality. The leather finish is stunning, and my headphones have never been better protected. Absolutely recommend.",
    author: 'Sarah Williams',
    title: 'Music Producer',
    source: 'TRUSTED REVIEWS',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 3,
    quote: "I've tried many stands over the years, but this one stands out. The attention to detail, the weight, the materials – everything screams premium quality.",
    author: 'James Morrison',
    title: 'Audiophile',
    source: 'HACKER NEWS',
    rating: 5,
    avatar: 'J',
  },
  {
    id: 4,
    quote: "Finally, a stand that matches the quality of my flagship headphones. The cable management is a game-changer for my desk setup.",
    author: 'Emily Zhang',
    title: 'Sound Designer',
    source: 'THE VERGE',
    rating: 5,
    avatar: 'E',
  },
];

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const carousel = carouselRef.current;

    if (!section || !header || !carousel) return;

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

      // Carousel reveal
      gsap.fromTo(
        carousel,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: carousel,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNext = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToShop = () => {
    const shopSection = document.querySelector('#quick-shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c4a574]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium mb-6">
            <Quote className="w-3 h-3" />
            Customer Love
          </span>
          
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#f0f0f0] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Audiophiles <span className="text-gradient-gold">Are Saying</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#c4a574] text-[#c4a574]" />
              ))}
            </div>
            <span className="text-[#f0f0f0] font-medium">4.9</span>
            <span className="text-[#a0a0a0]">from 2,847 reviews</span>
          </div>
          
          <div className="divider-gold mx-auto" />
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative max-w-4xl mx-auto">
          {/* Large quote mark */}
          <div className="absolute -top-8 left-0 md:left-8 text-[10rem] md:text-[14rem] leading-none text-[#c4a574]/5 font-serif select-none pointer-events-none" style={{ fontFamily: 'Playfair Display, serif' }}>
            "
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-600 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gradient-to-b from-[#252525] to-[#1f1f1f] rounded-2xl p-8 md:p-12 border border-[#333] text-center">
                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#c4a574] text-[#c4a574]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-xl md:text-2xl lg:text-3xl text-[#f0f0f0] leading-relaxed mb-8"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#c4a574]/20 flex items-center justify-center text-[#c4a574] text-xl font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-[#f0f0f0] font-medium">{testimonial.author}</div>
                        <div className="text-sm text-[#a0a0a0]">{testimonial.title}</div>
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[#c4a574]">
                        {testimonial.source}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={goToPrev}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-[#c4a574]/30 flex items-center justify-center text-[#c4a574] hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-50"
              data-cursor-hover
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-[#c4a574]' : 'w-2 bg-[#333] hover:bg-[#c4a574]/50'
                  }`}
                  data-cursor-hover
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
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToShop}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c4a574] text-[#1a1a1a] font-semibold text-sm uppercase tracking-wider hover:bg-[#d4b584] hover:shadow-[0_0_40px_rgba(196,165,116,0.4)] transition-all duration-300"
            data-cursor-hover
          >
            Join 10,000+ Happy Customers
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;