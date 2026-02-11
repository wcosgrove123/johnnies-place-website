# Johnnie's Place Website

A clean, professional, multi-page website for Johnnie's Place - a nonprofit providing safe residential housing and community support for adults with autism.

**Features:**
- Multi-page layout with blog functionality
- Integrated CMS for non-technical content editing
- Responsive design (mobile, tablet, desktop)
- Clean, professional, welcoming design
- Newsletter signup ready
- Form handling ready for backend integration

## Project Structure

```
johnnies-place/
├── index.html          # Home page
├── about.html          # Our story and leadership
├── mission.html        # Mission statement and services
├── support.html        # Ways to support and donate
├── contact.html        # Contact information
├── css/
│   └── styles.css      # All styles with brand colors
├── js/
│   └── main.js         # Interactive functionality
├── images/
│   └── logo.png        # Johnnie's Place logo
└── README.md           # This file
```

## Design

### Brand Colors

The website uses the official Johnnie's Place color scheme:

- **Wood Brown** (#CB6330) - Primary brand color
- **Golden Yellow** (#FECE00) - CTAs and highlights
- **Charcoal Black** (#232323) - Text
- **Cream** (#F5F2E3) - Light backgrounds

Accent colors from the flower boxes:
- **Pink** (#FF7EB0)
- **Purple** (#B987EA)
- **Blue** (#8AC7FD)

### Typography

- **Headings**: Lora (serif) - elegant and warm
- **Body**: DM Sans (sans-serif) - clean and readable

### Style

Clean, professional, modern, and welcoming. No emojis. Focus on meaningful content and real quotes from Michael Dinda.

## Pages

### Home (index.html)
- Hero section with Michael's quote
- Mission overview
- Feature cards for housing, community, and support
- Vision section about building a replicable model
- CTA section

### About (about.html)
- Origin story of Johnnie's Place
- Michael's philosophy
- Leadership team
- Legal structure information

### Mission (mission.html)
- Full mission statement
- Comprehensive list of services
- Future expansion plans

### Support (support.html)
- Ways to support (financial, volunteer, partnership)
- Sea to Shining Sea fundraiser highlight
- Donation form (to be integrated with payment processing)

### Contact (contact.html)
- Contact information cards
- Contact form
- Leadership team overview

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Animated card reveals on scroll
- Mobile menu
- Form handling (ready for backend integration)
- Clean, accessible HTML structure

## Quick Start

**For the fastest setup, see:** `QUICK-START.md`

**To enable content management (CMS), see:** `CMS-SETUP-GUIDE.md`

## Development

### Local Development

Simply open any HTML file in a browser to view. For best results, use a local server:

```bash
# Using Python
cd johnnies-place
python -m http.server 8000

# Or using Node.js
npx serve

# Or using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`

### No Build Process

Pure HTML/CSS/JS - no build tools required.

## Content Management System (CMS)

**Non-coders can edit the website!**

We've integrated Decap CMS, which provides a user-friendly admin panel at `/admin/` where authorized users can:
- Edit page content
- Add and manage blog posts
- Create news updates
- Manage team members
- Upload images
- All without touching code

**Setup Instructions**: See `CMS-SETUP-GUIDE.md` for complete setup (takes about 30 minutes)

**Quick Overview**:
1. Deploy to Netlify (free)
2. Enable Netlify Identity
3. Invite users via email
4. Users can login at `/admin/` and start editing

## Deployment

### Recommended Hosting

- **Netlify**: Drag and drop the folder
- **GitHub Pages**: Push to repo and enable Pages
- **Vercel**: Connect GitHub or upload files

### Integration Needed

1. **Payment Processing**:
   - Forms are ready for Stripe integration
   - Contact info: 610 960 8205 for manual donations

2. **Email**:
   - Update email address when available (currently "Email - to follow")
   - Integrate contact form with email service

3. **EIN**:
   - Add EIN number when finalized for tax receipts

## Contact Information

**Johnnie's Place**
318 East Elm Street
Conshohocken, PA 19428
610 960 8205

**Leadership:**
- Michael B. Dinda - Chairman & President
- Mary Claire Kasunic - Secretary/Treasury
- Henry L. Dinda - Vice President
- Larry Marchant - Director / Clinical Advisor

## Status

- Legal Name: Secured
- EIN: In process
- 501(c)(3) Status: Will be secured with assistance of Stanley Wielgus, CPA

---

Built with care for Johnnie's Place
