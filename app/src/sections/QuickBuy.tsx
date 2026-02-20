import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Check, Star, Zap, Clock, Package, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'STAND 2',
    tagline: 'The Flagship',
    price: 249,
    originalPrice: 299,
    image: '/shop-stand2.jpg',
    badge: 'Best Seller',
    badgeColor: 'bg-[#c4a574]',
    features: ['Cable Management', '2kg Weighted Base', 'European Leather'],
    inStock: true,
    rating: 4.9,
    reviews: 1247,
  },
  {
    id: 2,
    name: 'CLASSIC BLACK',
    tagline: 'Timeless Design',
    price: 199,
    originalPrice: null,
    image: '/shop-black.jpg',
    badge: 'Most Popular',
    badgeColor: 'bg-[#666]',
    features: ['Matte Finish', 'Universal Fit', 'Rubber Feet'],
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 3,
    name: 'BROWN LEATHER',
    tagline: 'Premium Edition',
    price: 299,
    originalPrice: 349,
    image: '/shop-brown.jpg',
    badge: 'Limited',
    badgeColor: 'bg-amber-700',
    features: ['Italian Leather', 'Hand-Stitched', 'Patina Finish'],
    inStock: true,
    rating: 5.0,
    reviews: 456,
  },
];

const QuickBuy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger reveal
      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (productId: number) => {
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
    
    // Dispatch WooCommerce event if available
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      (window as any).jQuery('body').trigger('wc_fragment_refresh');
    }
  };

  return (
    <section
      id="quick-shop"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/20 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium mb-6">
            <Zap className="w-3 h-3" />
            Shop Now — Ships Within 24 Hours
          </span>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#f0f0f0] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Choose Your <span className="text-gradient-gold">Perfect Stand</span>
          </h2>
          
          <p className="text-[#a0a0a0] max-w-xl mx-auto">
            Each stand is handcrafted in Europe with premium materials. 
            Free shipping on orders over $150.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="product-card group relative bg-gradient-to-b from-[#252525] to-[#1f1f1f] rounded-2xl overflow-hidden border border-[#333] hover:border-[#c4a574]/50 transition-all duration-500"
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 ${product.badgeColor} text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-full`}>
                {product.badge}
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover overlay with quick actions */}
                <div className="absolute inset-0 bg-[#1a1a1a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      addedToCart === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-[#c4a574] text-[#1a1a1a] hover:bg-[#d4b584] hover:shadow-[0_0_30px_rgba(196,165,116,0.4)]'
                    }`}
                    data-cursor-hover
                  >
                    {addedToCart === product.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <span className="text-xs text-[#a0a0a0]">
                    Free shipping included
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#c4a574] text-[#c4a574]' : 'text-[#444]'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#a0a0a0]">{product.rating}</span>
                  <span className="text-xs text-[#666]">({product.reviews})</span>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <span className="text-xs text-[#c4a574] uppercase tracking-wider">{product.tagline}</span>
                  <h3 className="text-xl font-medium text-[#f0f0f0] group-hover:text-[#c4a574] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {product.name}
                  </h3>
                </div>

                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#a0a0a0]">
                      <Check className="w-3 h-3 text-[#c4a574]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#c4a574]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#666] line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      addedToCart === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-[#c4a574] text-[#1a1a1a] hover:bg-[#d4b584] hover:shadow-[0_0_20px_rgba(196,165,116,0.4)]'
                    }`}
                    data-cursor-hover
                  >
                    {addedToCart === product.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Row */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <Package className="w-4 h-4 text-[#c4a574]" />
            <span>Free Express Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <Clock className="w-4 h-4 text-[#c4a574]" />
            <span>Ships in 24 Hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <Shield className="w-4 h-4 text-[#c4a574]" />
            <span>5-Year Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickBuy;