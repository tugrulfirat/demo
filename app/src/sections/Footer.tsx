import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  CreditCard,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const usefulLinks = [
  { label: 'Imprint', href: '#' },
  { label: 'Conditions', href: '#' },
  { label: 'Data Protection', href: '#' },
  { label: 'Right of Withdrawal', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Contact', href: '#' },
];

const paymentMethods = [
  { name: 'Visa', icon: 'VISA' },
  { name: 'Mastercard', icon: 'MC' },
  { name: 'PayPal', icon: 'PP' },
  { name: 'Apple Pay', icon: 'AP' },
  { name: 'Google Pay', icon: 'GP' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1a1a1a] pt-20 pb-8 relative overflow-hidden"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent" />

      <div ref={contentRef} className="container-wide">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="text-3xl font-semibold tracking-wider mb-6 block"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-[#f0f0f0]">LUXE</span>
              <span className="text-[#c4a574]">STAND</span>
            </a>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Premium headphone stands crafted with precision and care. Elevate your
              audio experience with our luxury accessories.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                <MapPin className="w-4 h-4 text-[#c4a574] flex-shrink-0 mt-0.5" />
                <span>
                  Obere Tor 30
                  <br />
                  38448 Wolfsburg
                  <br />
                  Germany
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                <Mail className="w-4 h-4 text-[#c4a574] flex-shrink-0" />
                <span>hello@luxestand.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                <Phone className="w-4 h-4 text-[#c4a574] flex-shrink-0" />
                <span>+49 5361 123456</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-[#f0f0f0] text-sm uppercase tracking-[0.2em] mb-6">
              Useful Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#a0a0a0] text-sm hover:text-[#c4a574] transition-colors duration-300"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-[#f0f0f0] text-sm uppercase tracking-[0.2em] mb-6">
              Payment Methods
            </h4>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-14 h-9 bg-[#2a2a2a] rounded flex items-center justify-center text-xs font-semibold text-[#a0a0a0] border border-[#333333]"
                >
                  {method.icon}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#a0a0a0]">
              <CreditCard className="w-4 h-4 text-[#c4a574]" />
              <span>Secure SSL Checkout</span>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[#f0f0f0] text-sm uppercase tracking-[0.2em] mb-6">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#333333] flex items-center justify-center text-[#a0a0a0] hover:bg-[#c4a574] hover:text-[#1a1a1a] hover:border-[#c4a574] transition-all duration-300"
                  data-cursor-hover
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="text-[#f0f0f0] text-sm mb-3">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-[#2a2a2a] border border-[#333333] border-r-0 rounded-l px-4 py-2 text-sm text-[#f0f0f0] placeholder-[#666] focus:outline-none focus:border-[#c4a574]"
                />
                <button
                  className="px-4 py-2 bg-[#c4a574] text-[#1a1a1a] text-sm font-semibold rounded-r hover:bg-[#d4b584] transition-colors"
                  data-cursor-hover
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#333333] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666]">
            © {new Date().getFullYear()} LUXESTAND. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[#666] hover:text-[#c4a574] transition-colors"
              data-cursor-hover
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#666] hover:text-[#c4a574] transition-colors"
              data-cursor-hover
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-[#666] hover:text-[#c4a574] transition-colors"
              data-cursor-hover
            >
              Cookie Settings
            </a>
          </div>
        </div>

        {/* WooCommerce Integration Note */}
        <div className="mt-8 pt-8 border-t border-[#333333]/50">
          <p className="text-xs text-[#555] text-center">
            Powered by WooCommerce. This template preserves all WooCommerce PHP
            shortcodes and template hooks for seamless integration with your
            WordPress store.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;