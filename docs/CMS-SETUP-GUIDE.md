# Decap CMS Setup Guide for Johnnie's Place

This guide will help you set up the Content Management System (CMS) so that non-technical users can edit the website, add blog posts, and manage content without touching code.

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a free, open-source content management system that adds an admin interface to your static website. It allows you to:

- Edit page content through forms
- Add and manage blog posts
- Upload images
- Publish updates instantly
- All without writing code

## Setup Process

### Step 1: Push Your Site to GitHub

Decap CMS works with GitHub to manage content. Here's how to set it up:

1. **Create a GitHub account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Create a new repository**:
   - Click the "+" icon → "New repository"
   - Name it: `johnnies-place-website`
   - Make it **Public**
   - Click "Create repository"

3. **Push your website to GitHub**:
   ```bash
   cd johnnies-place
   git init
   git add .
   git commit -m "Initial commit of Johnnie's Place website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/johnnies-place-website.git
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

Netlify will host your website for free and enable the CMS authentication.

1. **Create a Netlify account**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub (easiest option)

2. **Deploy your site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your `johnnies-place-website` repository
   - Click "Deploy site"

3. **Set up a custom domain** (optional but recommended):
   - Go to "Domain settings"
   - Add your domain (e.g., `johnniesplace.org`)
   - Follow the DNS instructions

### Step 3: Enable Netlify Identity

This allows users to log in to the CMS admin panel.

1. **Enable Identity**:
   - In your Netlify site dashboard
   - Go to "Identity" tab
   - Click "Enable Identity"

2. **Enable Git Gateway**:
   - In Identity settings
   - Scroll to "Services"
   - Click "Enable Git Gateway"

3. **Add users**:
   - Click "Identity" → "Invite users"
   - Add email addresses for Michael, yourself, or PR director
   - They'll receive an invitation email

### Step 4: Add Identity Widget to Your Site

Add these lines to the `<head>` section of **all your HTML files** (index.html, about.html, mission.html, blog.html, support.html, contact.html):

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

And add this script before the closing `</body>` tag:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

### Step 5: Commit and Push Changes

```bash
git add .
git commit -m "Add Netlify Identity widget"
git push
```

Netlify will automatically redeploy your site with the changes.

## Using the CMS

### Accessing the Admin Panel

1. Go to: `https://your-site-url.netlify.app/admin/`
2. Click "Login with Netlify Identity"
3. Enter your email and password

### What You Can Edit

#### Pages
- **Home Page**: Hero text, quotes, mission statement
- **About Page**: Story content, philosophy
- **Mission Page**: Mission statement text
- **Contact Info**: Address, phone, email

#### Blog Posts
- Click "Blog Posts" → "New Blog Post"
- Fill in:
  - Title
  - Date
  - Author
  - Excerpt (short summary)
  - Body (full content - supports formatting)
- Click "Publish"

#### News & Updates
- Similar to blog posts
- Organized by category (General, Fundraiser, Community, Announcement)

#### Team Members
- Add or edit leadership team
- Upload photos
- Add bios

### Publishing Changes

1. Make your edits in the admin panel
2. Click "Save"
3. Click "Publish"
4. Changes go live instantly (within 1-2 minutes)

## Tips for Content Editors

### Writing Blog Posts

- **Keep titles under 60 characters** for SEO
- **Write compelling excerpts** (1-2 sentences) - these show on the blog page
- **Use headings** to break up content (## for main sections)
- **Add images** by clicking the "+" icon in the editor

### Formatting Text

The editor supports Markdown:
- `**bold text**` → **bold text**
- `*italic text*` → *italic text*
- `## Heading` → Makes a heading
- `[link text](url)` → Creates a link

### Adding Images

1. Click the image icon in the editor
2. Upload from your computer
3. Add alt text (description for accessibility)
4. Click "Insert"

## Troubleshooting

### "Cannot access admin panel"
- Make sure you've been invited via Netlify Identity
- Check your email for the invitation
- Clear browser cache and try again

### "Changes not showing up"
- Wait 1-2 minutes for Netlify to rebuild
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Netlify dashboard for deploy status

### "Authentication error"
- Make sure Git Gateway is enabled in Netlify Identity settings
- Check that you're using the correct email address

## Next Steps: Email Newsletter Integration

Once you're comfortable with the CMS, you can integrate email newsletters:

### Recommended Services:
1. **Mailchimp** (free up to 500 contacts)
2. **ConvertKit** (great for nonprofits)
3. **Buttondown** (simple, clean)

### Setup:
1. Create an account with your chosen service
2. Add their signup form code to your `blog.html` page
3. Create email templates in their dashboard
4. Send newsletters when you publish blog posts

## Support

If you need help:
1. Check the [Decap CMS documentation](https://decapcms.org/docs/intro/)
2. Check the [Netlify documentation](https://docs.netlify.com)
3. Contact me (Wil) for assistance

## Quick Reference

**Admin URL**: `https://your-site.netlify.app/admin/`
**Site URL**: `https://your-site.netlify.app`
**GitHub Repo**: `https://github.com/YOUR-USERNAME/johnnies-place-website`

---

**Important Notes:**
- Always click "Publish" after saving - "Save" alone won't make changes live
- Blog posts are automatically sorted by date (newest first)
- All content is version controlled - you can undo changes if needed
- You can work on drafts and publish them later

Once set up, Michael, you, or anyone with access can manage the entire website through a simple, user-friendly interface without ever needing to touch code.
