# Lumière Beauty - Design Specification Document

## Project Overview

**Project:** Lumière Beauty E-Commerce Platform
**Design System:** Premium Beauty & Skincare Design
**Pages:** 15 complete design mockups
**Approach:** Modern, luxury aesthetic with quiet elegance

---

## Design System

### Color Palette

| Color Name | Hex Code | Usage |
|-----------|----------|-------|
| **Primary** | #121417 | Main text, headers, primary UI elements |
| **Accent** | #b8945f | Highlights, buttons, important CTAs |
| **Secondary** | #e8e2da | Subtle backgrounds, borders |
| **Background** | #fbfaf8 | Page background (ivory) |
| **Background Alt** | #f4f1ed | Section backgrounds (soft stone) |
| **Text** | #121417 | Body text |
| **Text Light** | #5f666e | Secondary text, labels |
| **Border** | rgba(18,20,23,0.10) | Subtle dividers |
| **Success** | #4caf50 | Success messages, confirmations |
| **Error** | #f44336 | Error states, alerts |

**Color Philosophy:**
- Luxury & Premium Feel: Using muted golds and warm neutrals
- Trust & Elegance: Dark navy-black with soft backgrounds
- Accessibility: High contrast for readability
- Emotional Connection: Warm tones for approachability

---

## Typography

### Font Families

**Headings:** Playfair Display / Ibarra Real Nova / Georgia (serif)
- Elegant, editorial feel
- Conveys premium/luxury aesthetic
- Used for main titles and section headers

**Body:** Inter / Helvetica Neue / System Fonts (sans-serif)
- Clean, modern, highly legible
- Professional for product descriptions
- Excellent performance across devices

### Font Sizing Scale

| Size | Value | Usage |
|------|-------|-------|
| **XS** | 0.75rem (12px) | Small labels, captions |
| **SM** | 0.875rem (14px) | Secondary text, metadata |
| **Base** | 1rem (16px) | Body text, standard content |
| **LG** | 1.125rem (18px) | Larger body text |
| **XL** | 1.25rem (20px) | Subheadings |
| **2XL** | 1.5rem (24px) | Section titles |
| **3XL** | 2rem (32px) | Page titles |
| **4XL** | 2.5rem (40px) | Hero titles |
| **5XL** | 3rem (48px) | Major headings |

### Font Weights

- **400** - Regular (body text)
- **500** - Medium (labels, emphasis)
- **600** - Semibold (small headings)
- **700** - Bold (headings, CTAs)

### Line Heights

- **1.2** - Tight (headings)
- **1.5** - Normal (body text, balanced)
- **1.75** - Relaxed (long-form content)

---

## Spacing System

| Spacing | Value | Usage |
|---------|-------|-------|
| **XS** | 0.5rem (8px) | Small gaps, tight spacing |
| **SM** | 1rem (16px) | Component padding |
| **MD** | 1.5rem (24px) | Medium spacing |
| **LG** | 2rem (32px) | Section spacing |
| **XL** | 3rem (48px) | Large gaps |
| **2XL** | 4rem (64px) | Major section spacing |
| **3XL** | 6rem (96px) | Hero section spacing |

**Section Padding:**
- Desktop: 4rem vertical
- Mobile: 2.5rem vertical

---

## Page Inventory

### Core E-Commerce Pages (5 pages)

#### 1. **Homepage**
- Hero section with banner and CTA
- Featured products showcase
- Category highlights
- Newsletter signup
- Trust elements (testimonials, certifications)
- Mobile responsive design

**Key Components:**
- Navigation bar with logo and menu
- Hero banner with imagery
- Product grid (featured)
- Category cards
- Trust badges
- Footer with links and social

#### 2. **Shop/Products**
- Product grid with multiple columns
- Advanced filtering (category, price, rating)
- Sorting options (popularity, price, newest)
- Search functionality
- Pagination or infinite scroll
- Product quick view

**Key Components:**
- Filter sidebar
- Product cards with images
- Price and rating display
- "Add to Cart" buttons
- "Add to Wishlist" functionality
- Sort dropdown

#### 3. **Product Details**
- High-quality product images (gallery)
- Product title, price, rating
- Detailed description
- Ingredients/specifications list
- Size/variant selection
- Quantity selector
- "Add to Cart" and "Add to Wishlist" buttons
- Customer reviews section
- Related products

**Key Components:**
- Image gallery with zoom
- Product specifications table
- Review submission form
- Related products carousel
- Stock status indicator
- Shipping information

#### 4. **Shopping Cart**
- Cart items list with images
- Quantity adjusters
- Remove item option
- Order summary (subtotal, tax, shipping)
- Promo code input
- "Proceed to Checkout" button
- "Continue Shopping" link
- Empty cart state

**Key Components:**
- Item list with product details
- Quantity controls
- Price calculations
- Promo code field
- Order summary box
- Checkout CTA

#### 5. **Checkout**
- Multi-step checkout flow (progress indicator)
- Shipping address form
- Billing address option
- Shipping method selection
- Payment form (card details)
- Order review
- Place order button

**Key Components:**
- Progress steps indicator
- Address form fields
- Shipping options radio buttons
- Payment method selection
- Order summary (side panel)
- Security badges

---

### Category Pages (3 pages)

#### 6. **Skincare Category**
- Category header with description
- Filtered product grid (skincare items)
- Category-specific filters
- Brand filters
- Skin type filters

#### 7. **Makeup Category**
- Category header
- Product grid (makeup items)
- Color-based filtering
- Product type filters
- Shade availability indicators

#### 8. **Haircare Category**
- Category header
- Product grid (haircare items)
- Hair type filters
- Concern-based filters
- Product benefit tags

---

### User Experience Pages (2 pages)

#### 9. **My Account/Profile**
- User profile information
- Order history with status
- Saved addresses
- Wishlist access
- Account settings/preferences
- Logout option

**Key Components:**
- User profile card
- Orders table
- Address book
- Preferences/settings form
- Account security options

#### 10. **Order Confirmation**
- Order number and date
- Order items summary
- Order total
- Shipping address
- Estimated delivery date
- Print receipt option
- Continue shopping button

**Key Components:**
- Success message/icon
- Order details summary
- Customer information
- Tracking information
- Contact support link

---

### Information Pages (4 pages)

#### 11. **About Us**
- Company story/mission
- Brand values
- Team showcase
- Company achievements/stats
- Sustainability commitment

#### 12. **Contact Us**
- Contact form
- Contact information (phone, email, address)
- Business hours
- FAQ quick links
- Social media links
- Embedded map

#### 13. **Blog**
- Blog post listings
- Category filters
- Search functionality
- Featured posts
- Post metadata (author, date, reading time)
- Post previews with images

#### 14. **FAQ**
- Accordion-style questions and answers
- FAQ categories/sections
- Search functionality
- Contact support CTA
- Helpful voting

---

### Utility Pages (1 page)

#### 15. **Search Results**
- Search query display
- Results count
- Filtered search results
- "Did you mean" suggestions
- No results state with alternatives
- Filters and sorting

---

## Component Library

### Buttons

**Primary Button**
- Background: #b8945f
- Text: White
- Padding: 12px 24px
- Border radius: 4px
- Hover state: Darker shade
- Active state: Darker shade with shadow

**Secondary Button**
- Background: #f4f1ed
- Text: #121417
- Border: 1px solid #e8e2da
- Padding: 12px 24px
- Hover state: Slightly darker background

**Outline Button**
- Background: Transparent
- Border: 1px solid #121417
- Text: #121417
- Padding: 12px 24px
- Hover state: Light background

### Cards

**Product Card**
- White background
- Border: Subtle (1px #eee)
- Border radius: 8px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Padding: 16px
- Hover effect: Slight lift with increased shadow

**Feature Card**
- White background
- Border radius: 8px
- Icon at top
- Title and description
- CTA button
- Shadows for depth

### Forms

**Input Fields**
- Background: #fbfaf8
- Border: 1px solid #e8e2da
- Padding: 12px 16px
- Border radius: 4px
- Focus state: Border color #b8945f

**Labels**
- Font size: 14px
- Color: #5f666e
- Font weight: 500
- Margin bottom: 8px

**Form Validation**
- Error: #f44336
- Success: #4caf50
- Helper text in smaller font

### Navigation

**Main Navigation**
- Fixed/sticky header
- Logo on left
- Menu items centered or right-aligned
- Mobile hamburger menu
- Background: White with subtle shadow
- Active states with underline or background

### Footer

- Background: #121417 (dark)
- Text: White
- Column layout with categories
- Company info section
- Newsletter signup
- Social media links
- Copyright information

---

## Interactions & Animation

### Transitions
- Hover states: 0.3s ease
- Smooth scroll: enabled
- Page transitions: Fade-in effect

### Micro-interactions
- Button press: Scale 0.98 on click
- Hover effects: Subtle shadow increase
- Loading states: Spinner animation
- Toast notifications: Slide in/out

### Mobile Interactions
- Touch-friendly tap targets (min 44x44px)
- Swipe gestures for image galleries
- Collapsible sections for mobile
- Full-width mobile menus

---

## Responsive Design

### Breakpoints
- **Mobile:** 320px - 480px
- **Tablet:** 480px - 1024px
- **Desktop:** 1024px+

### Mobile Optimization
- Single column layouts
- Simplified navigation (hamburger menu)
- Full-width images and cards
- Larger touch targets
- Optimized image sizes

### Tablet Optimization
- 2-column product grids
- Hybrid navigation (some items visible)
- Optimized spacing
- Readable font sizes

---

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio)
- Color not sole indicator of status
- Alternative indicators for colorblind users

### Typography
- Readable font sizes (minimum 16px on mobile)
- Sufficient line height (1.5+)
- Limited text width (60-80 characters)

### Navigation
- Keyboard navigation support
- Skip to main content link
- Proper heading hierarchy (H1, H2, H3...)
- Form labels properly associated with inputs

### Images
- Descriptive alt text for all images
- SVG icons with aria-labels
- Proper image sizing to avoid layout shift

---

## Performance Considerations

### Image Optimization
- WebP format with fallbacks
- Responsive images (srcset)
- Lazy loading for below-fold images
- Optimized file sizes (<200KB per image)

### CSS/JavaScript
- Minified and bundled
- Critical CSS inlined
- Deferred JavaScript loading
- CSS-in-JS minimized

### Caching Strategy
- Browser caching headers
- Service worker for offline support
- CDN for static assets

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest 1 version

---

## Design Tokens Summary

```json
{
  "colors": {
    "primary": "#121417",
    "accent": "#b8945f",
    "secondary": "#e8e2da",
    "success": "#4caf50",
    "error": "#f44336"
  },
  "typography": {
    "headings": "Playfair Display, serif",
    "body": "Inter, -apple-system, sans-serif"
  },
  "spacing": {
    "xs": "0.5rem",
    "sm": "1rem",
    "md": "1.5rem",
    "lg": "2rem",
    "xl": "3rem"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px"
  }
}
```

---

## Next Steps for Implementation

1. **Export Mockups to Figma**
   - Import screenshots as frames
   - Create component library
   - Build interactive prototypes

2. **Development Handoff**
   - Create detailed component specs
   - Prepare CSS variables and utilities
   - Document responsive behavior

3. **Quality Assurance**
   - Cross-browser testing
   - Responsive design verification
   - Accessibility audit
   - Performance optimization

4. **Client Presentation**
   - Share design mockup presentation
   - Discuss design system approach
   - Gather feedback and iterations
   - Plan development timeline

---

## Design Rationale

### Why This Aesthetic?

**Luxury & Premium:**
- Muted gold (#b8945f) suggests high-end skincare
- Clean whites and warm neutrals create premium feel
- Ample whitespace conveys confidence and quality

**Trust & Approachability:**
- Dark navy-black (#121417) creates authority
- Warm accent colors prevent coldness
- Professional typography conveys expertise
- Clear, organized layouts build confidence

**Beauty & Elegance:**
- Serif headlines for editorial sophistication
- Sans-serif body for modern clarity
- Consistent spacing creates visual harmony
- Subtle shadows add depth without clutter

---

## File Structure

```
beauty/
├── screenshots/
│   ├── index.png
│   ├── shop.png
│   ├── product.png
│   ├── cart.png
│   ├── checkout.png
│   ├── account.png
│   ├── about.png
│   ├── blog.png
│   ├── contact.png
│   ├── faq.png
│   ├── haircare.png
│   ├── makeup.png
│   ├── order-confirmation.png
│   ├── search.png
│   └── skincare.png
├── design_mockup_presentation.html
├── design_spec.json
├── DESIGN_SPECIFICATION.md (this file)
└── [source HTML files]
```

---

**Document Version:** 1.0
**Last Updated:** 2026-02-27
**Status:** Ready for Client Presentation

