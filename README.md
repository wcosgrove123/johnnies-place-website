# Johnnie's Place Website

A clean, professional website for Johnnie's Place - providing housing and community for adults with autism.

## 📁 Project Structure

```
johnnies-place/
├── index.html              # Home page (root)
├── pages/                  # All other website pages
│   ├── about.html
│   ├── mission.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── news.html
│   ├── stay-updated.html  # Newsletter subscription
│   ├── events.html
│   ├── support.html
│   ├── fundraisers.html
│   ├── fundraiser.html
│   ├── contact.html
│   └── unsubscribe.html
├── admin/                  # Admin dashboard
│   ├── index.html         # CMS access
│   └── subscribers.html   # Newsletter subscribers
├── css/                    # Styles
├── js/                     # JavaScript
├── images/                 # Images and media
├── content/                # CMS-managed content
├── netlify/                # Netlify Functions
│   └── functions/
│       ├── subscribe.js
│       ├── unsubscribe.js
│       └── get-subscribers.js
└── docs/                   # Documentation
    ├── README.md           # Full documentation
    ├── NEWSLETTER-SETUP.md
    ├── HANDOFF.md
    └── CMS-SETUP-GUIDE.md
```

## 🚀 Quick Start

See `docs/QUICK-START.md` for setup instructions.

## 📧 Newsletter System

Privacy-first newsletter subscription with:
- Supabase database (you own the data)
- Preference management
- Secure unsubscribe
- Admin dashboard

See `docs/NEWSLETTER-SETUP.md` for details.

## 🔗 Live Site

- **Production:** https://johnniesplace.netlify.app
- **Admin:** https://johnniesplace.netlify.app/admin/
- **Subscribers:** https://johnniesplace.netlify.app/admin/subscribers.html

## 📞 Contact

318 East Elm Street
Conshohocken, PA 19428
610 960 8205
