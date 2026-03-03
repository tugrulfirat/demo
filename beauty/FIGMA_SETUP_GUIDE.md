
# Figma Organization Guide
# Follow these steps to populate your Figma file with the mockups

## Option 1: Using Figma UI (Recommended for Free Tier)

### Step 1: Create Pages
In your Figma file, create these pages:
- Design System
- Core Pages
- Category Pages
- User Pages
- Information Pages

### Step 2: Add Screenshots to Design System Page
1. Go to Design System page
2. Click Import → Select Files
3. Upload: screenshots/index.png, shop.png, product.png, cart.png, checkout.png
4. Create frames and organize

### Step 3: Organize by Category

**Core Pages:**
- index.png (Homepage)
- shop.png (Shop/Products)
- product.png (Product Details)
- cart.png (Shopping Cart)
- checkout.png (Checkout)

**Category Pages:**
- skincare.png (Skincare)
- makeup.png (Makeup)
- haircare.png (Haircare)

**User Pages:**
- account.png (My Account)
- order-confirmation.png (Order Confirmation)

**Information Pages:**
- about.png (About Us)
- contact.png (Contact)
- blog.png (Blog)
- faq.png (FAQ)
- search.png (Search)

### Step 4: Add Design System Documentation
1. Create a "Design System" page
2. Add text blocks for:
   - Color palette (with hex codes)
   - Typography specs
   - Spacing scale
   - Component library

### Step 5: Share with Team
- File → Share
- Copy link to share with clients/team

## Option 2: Using Figma API (Advanced)

Run the API script to automate file population:

```python
python3 populate_figma.py
```

This will require:
1. A Figma file ID
2. API token (already configured)
3. Screenshots folder populated

## Quick Checklist

- [ ] Created Figma file
- [ ] Created pages for each category
- [ ] Imported all 15 screenshots
- [ ] Organized screenshots into pages
- [ ] Added color palette documentation
- [ ] Added typography specifications
- [ ] Added component annotations
- [ ] Shared file with team/clients

## Tips

- Use Figma's "Create component" for reusable UI elements
- Add comments to screenshots explaining sections
- Use guides for alignment
- Create a master components page
- Use shared libraries for team collaboration
