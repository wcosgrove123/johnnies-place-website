# Quick Start Guide

Get the Johnnie's Place website up and running in minutes.

## Local Development (Right Now)

To view the site locally on your computer:

### Option 1: Direct Open
Just double-click any HTML file (start with `index.html`) to open in your browser.

### Option 2: Local Server (Better)
Run a local server for the best experience:

```bash
# Using Python (if installed)
cd johnnies-place
python -m http.server 8000
# Then visit: http://localhost:8000

# OR using Node.js (if installed)
npx serve
# Then visit: http://localhost:3000

# OR using VS Code
# Install "Live Server" extension
# Right-click index.html → "Open with Live Server"
```

## Making It Live (Deploy Online)

### Quick Deploy to Netlify (Recommended - FREE)

1. **Create GitHub account** → github.com
2. **Create a repository** → Name it `johnnies-place-website`
3. **Push your code**:
   ```bash
   cd johnnies-place
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/johnnies-place-website.git
   git push -u origin main
   ```
4. **Deploy on Netlify**:
   - Go to netlify.com
   - Sign up with GitHub
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Click "Deploy"
   - Done! Your site is live

5. **Add your domain**:
   - In Netlify: Domain settings → Add custom domain
   - Point your johnniesplace.org domain to Netlify

## Enabling Content Management (CMS)

To let non-coders edit the website:

**Read the full guide:** `CMS-SETUP-GUIDE.md`

**Short version:**
1. Deploy to Netlify (above)
2. Enable "Netlify Identity" in your site settings
3. Enable "Git Gateway"
4. Add the Identity widget to your HTML files (see `add-identity-widget.md`)
5. Invite users via email
6. Access admin at: `https://your-site.netlify.app/admin/`

## File Structure

```
johnnies-place/
├── index.html              # Home page
├── about.html              # About page
├── mission.html            # Mission page
├── blog.html               # Blog listing
├── support.html            # Support/donate page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # Interactive features
├── images/
│   ├── logo.png            # Logo
│   └── uploads/            # CMS uploaded images
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration
└── content/
    ├── blog/               # Blog posts (markdown)
    ├── news/               # News updates (markdown)
    └── team/               # Team member profiles
```

## Making Changes

### As a Developer (Code Changes)
1. Edit HTML/CSS/JS files
2. Commit and push to GitHub
3. Netlify auto-deploys

### As a Content Editor (No Code)
1. Go to `/admin/` on your live site
2. Login with your email
3. Edit content, add blog posts
4. Click "Publish"
5. Changes go live in 1-2 minutes

## Common Tasks

### Update Contact Info
- Via CMS: `/admin/` → Pages → Contact Information
- Via Code: Edit `content/contact.json`

### Add Blog Post
- Via CMS: `/admin/` → Blog Posts → New Blog Post
- Via Code: Create new markdown file in `content/blog/`

### Change Logo
- Replace `images/logo.png` with your new logo
- Keep filename the same, or update all HTML files

### Update Colors
- Edit CSS variables in `css/styles.css` (lines 6-30)
- Current brand colors already set

## Getting Help

- **CMS Setup**: See `CMS-SETUP-GUIDE.md`
- **Identity Widget**: See `add-identity-widget.md`
- **General Info**: See `README.md`

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Add custom domain
3. ✅ Set up CMS authentication
4. ✅ Invite content editors
5. ⬜ Integrate email newsletter (Mailchimp, ConvertKit)
6. ⬜ Set up donation processing (Stripe)
7. ⬜ Add Google Analytics (optional)

---

**Support**: Contact Wil for help with setup

**Important**: Once the CMS is set up, you can manage everything through the admin panel - no coding required!
