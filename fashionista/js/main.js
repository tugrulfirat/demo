// Mobile Menu Toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Carousel Dots
const carouselDots = document.querySelectorAll('.carousel-dot');
const productCards = document.querySelectorAll('.product-card');

carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        carouselDots.forEach(d => d.classList.remove('active'));
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Scroll to corresponding product (mobile)
        if (window.innerWidth < 768) {
            productCards[index]?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center'
            });
        }
    });
});

// Wishlist Toggle
const wishlistButtons = document.querySelectorAll('.product-wishlist');
let wishlistCount = 0;

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const svg = button.querySelector('svg');
        const path = svg.querySelector('path');
        
        // Toggle filled state
        if (path.getAttribute('fill') === 'currentColor') {
            path.setAttribute('fill', 'none');
            wishlistCount--;
        } else {
            path.setAttribute('fill', 'currentColor');
            wishlistCount++;
        }
        
        // Update wishlist badge
        updateWishlistBadge();
        
        // Add animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
});

function updateWishlistBadge() {
    const badges = document.querySelectorAll('.nav-badge');
    badges[0].textContent = wishlistCount;
}

// Smooth scroll for hero scroll indicator
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const featured = document.querySelector('.featured');
        featured.scrollIntoView({ behavior: 'smooth' });
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const button = newsletterForm.querySelector('.newsletter-button');
        
        // Simple validation
        if (input.value && input.value.includes('@')) {
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = '#88C9A0';
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.style.backgroundColor = '';
                input.value = '';
            }, 3000);
        }
    });
}

// Lazy loading images with fade-in effect
const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Only apply fade if image hasn't loaded yet
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 400ms ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    // If image is already loaded (cached), don't hide it
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        imageObserver.observe(img);
    }
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Quick View functionality (placeholder)
const quickViewButtons = document.querySelectorAll('.product-quickview');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // This would open a modal in a full implementation
        console.log('Quick view clicked');
        alert('Quick view modal would open here');
    });
});

// Add to cart animation (for future implementation)
function addToCart(productId) {
    const cartBadge = document.querySelectorAll('.nav-badge')[1];
    const currentCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = currentCount + 1;
    
    // Bounce animation
    cartBadge.style.animation = 'none';
    setTimeout(() => {
        cartBadge.style.animation = 'bounce 0.5s ease';
    }, 10);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Prevent body scroll when mobile menu is open
mobileMenu.addEventListener('touchmove', (e) => {
    if (mobileMenu.classList.contains('active')) {
        e.stopPropagation();
    }
}, { passive: false });

console.log('Fashionista - Luxury Fashion Website Loaded');
