import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Eye, Check, Star, Truck, Shield, Clock, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'STAND 2',
    subtitle: 'The Flagship',
    price: 249,
    originalPrice: 299,
    image: '/shop-stand2.jpg',
    badge: 'Best Seller',
    badgeColor: 'bg-[#c4a574]',
    rating: 4.9,
    reviews: 1247,
  },
  {
    id: 2,
    name: "CLASSIC BLACK",
    subtitle: 'Timeless Design',
    price: 199,
    originalPrice: null,
    image: '/shop-black.jpg',
    badge: 'Most Popular',
    badgeColor: 'bg-[#666]',
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 3,
    name: 'BROWN LEATHER',
    subtitle: 'Premium Edition',
    price: 299,
    originalPrice: 349,
    image: '/shop-brown.jpg',
    badge: 'Limited Stock',
    badgeColor: 'bg-amber-700',
    rating: 5.0,
    reviews: 456,
  },
];

const trustBadges = [
  { icon: Truck, text: 'Free Express Shipping' },
  { icon: Clock, text: 'Ships in 24 Hours' },
  { icon: Shield, text: '5-Year Warranty' },
];

const ShopNow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

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

      // Product cards stagger
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 70%',
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
  };

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#c4a574]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#c4a574]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c4a574]/10 rounded-full text-[#c4a574] text-xs uppercase tracking-wider font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Complete Your Setup
          </span>
          
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#f0f0f0] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Shop the <span className="text-gradient-gold">Collection</span>
          </h2>
          
          <p className="text-[#a0a0a0] max-w-xl mx-auto mb-6">
            Every stand is handcrafted in Europe with premium materials. 
            Free shipping on all orders.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                <badge.icon className="w-4 h-4 text-[#c4a574]" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
          
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-gradient-to-b from-[#252525] to-[#1f1f1f] rounded-2xl overflow-hidden border border-[#333] hover:border-[#c4a574]/50 transition-all duration-500"
              data-cursor-hover
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 ${product.badgeColor} text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-full`}>
                {product.badge}
              </div>

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#1a1a1a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      addedToCart === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-[#c4a574] text-[#1a1a1a] hover:bg-[#d4b584]'
                    }`}
                    data-cursor-hover
                  >
                    {addedToCart === product.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Quick Add
                      </>
                    )}
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#c4a574] text-[#c4a574] font-semibold text-sm uppercase tracking-wider hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300"
                    data-cursor-hover
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>

              {/* Product Info */}
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
                <div className="mb-4">
                  <span className="text-xs text-[#c4a574] uppercase tracking-wider">{product.subtitle}</span>
                  <h3 
                    className="text-xl font-medium text-[#f0f0f0] group-hover:text-[#c4a574] transition-colors" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {product.name}
                  </h3>
                </div>

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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-[#252525] rounded-2xl border border-[#333]">
            <div className="text-center sm:text-left">
              <div className="text-[#f0f0f0] font-medium mb-1">Need help choosing?</div>
              <div className="text-sm text-[#a0a0a0]">Our team is here to assist you.</div>
            </div>
            <button
              className="px-6 py-3 bg-transparent border border-[#c4a574] text-[#c4a574] font-semibold text-sm uppercase tracking-wider hover:bg-[#c4a574] hover:text-[#1a1a1a] transition-all duration-300 whitespace-nowrap"
              data-cursor-hover
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* WooCommerce Note */}
        <div className="mt-12 p-6 bg-[#252525]/50 rounded-xl border border-[#333] text-center">
          <p className="text-sm text-[#a0a0a0]">
            <span className="text-[#c4a574]">WooCommerce Integration:</span> This section connects to your WordPress store. 
            Product data, cart functionality, and checkout are powered by your backend.
          </p>
          <code className="mt-3 inline-block px-4 py-2 bg-[#1a1a1a] rounded text-xs text-[#666] font-mono">
            [products limit="3" columns="3" category="headphone-stands"]
          </code>
        </div>
      </div>
    </section>
  );
};

export default ShopNow;