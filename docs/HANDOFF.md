# Johnnie's Place - Handoff Document

## Project Status: 90% Complete

### What's Been Built:
✅ Complete multi-page website with proper brand colors
✅ CMS (Decap CMS) integrated and working at `/admin/`
✅ Deployed to Netlify: https://relaxed-babka-55b482.netlify.app
✅ GitHub repo: https://github.com/wcosgrove123/johnnies-place-website
✅ Netlify Identity & Git Gateway enabled
✅ Dropdown navigation structure designed

### What Still Needs Work:

#### 1. URGENT: Update All Existing Pages with New Navigation
**Problem**: Only new pages (events, news, stay-updated) have the dropdown navigation. Old pages (index, about, mission, blog, support, contact) still have old nav.

**Fix**: Replace the navigation in these files:
- index.html
- about.html
- mission.html
- blog.html
- support.html
- contact.html

**New Nav Structure** (copy from events.html lines 22-71):
```html
<ul class="nav-links">
  <li><a href="index.html">Home</a></li>
  <li class="nav-dropdown">
    <a href="about.html">About</a>
    <div class="dropdown-menu">
      <a href="about.html">Our Story</a>
      <a href="mission.html">Mission</a>
      <a href="team.html">Leadership Team</a>
    </div>
  </li>
  <li class="nav-dropdown">
    <a href="blog.html">Updates</a>
    <div class="dropdown-menu">
      <a href="stay-updated.html">Stay Updated</a>
      <a href="blog.html">Blog</a>
      <a href="news.html">News</a>
    </div>
  </li>
  <li><a href="events.html">Events</a></li>
  <li class="nav-dropdown">
    <a href="support.html">Support Us</a>
    <div class="dropdown-menu">
      <a href="support.html#donate">Donate</a>
      <a href="fundraisers.html">Fundraisers</a>
      <a href="get-involved.html">Get Involved</a>
    </div>
  </li>
  <li><a href="contact.html">Contact</a></li>
</ul>
```

#### 2. Create Missing Pages
Still need:
- **fundraisers.html** - Feature Sea to Shining Sea ride + future campaigns
- **get-involved.html** - Volunteer opportunities
- **team.html** - Leadership team (Michael, Mary Claire, Henry, Larry)

#### 3. Add Missing CSS
Add to `css/styles.css`:
```css
/* Event card styles */
.events-grid { display: grid; gap: 24px; }
.event-card {
  display: flex;
  gap: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
}
.event-date {
  text-align: center;
  min-width: 80px;
}
.event-month {
  color: var(--brand-primary);
  font-weight: 700;
  font-size: 0.9rem;
}
.event-day {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.calendar-placeholder {
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: 20px;
  padding: 80px 40px;
  text-align: center;
}
```

#### 4. Update CMS Config
Add to `admin/config.yml`:
```yaml
  - name: "events"
    label: "Events"
    folder: "content/events"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Location", name: "location", widget: "string"}
      - {label: "Description", name: "body", widget: "markdown"}

  - name: "fundraisers"
    label: "Fundraisers"
    folder: "content/fundraisers"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Goal", name: "goal", widget: "string"}
      - {label: "Current Amount", name: "current", widget: "string"}
      - {label: "Description", name: "body", widget: "markdown"}
```

#### 5. Calendar Integration (Future Task)
When ready to add Google Calendar:
1. Get embeddable calendar URL from Google Calendar settings
2. Replace placeholder in `events.html` (line ~75) with iframe embed
3. Alternative: Use Calendly, Eventbrite, or custom solution

### Key Information:

**Brand Colors:**
- Wood Brown: #CB6330 (primary)
- Golden Yellow: #FECE00 (CTAs/accents)
- Charcoal Black: #232323 (text)
- Cream: #F5F2E3 (backgrounds)

**CMS Access:**
- URL: https://relaxed-babka-55b482.netlify.app/admin/
- User: wil.cosgrove@gmail.com (already setup)

**Contact Info:**
- 318 East Elm Street, Conshohocken, PA 19428
- 610 960 8205
- Email: To be added

**Leadership Team:**
- Michael B. Dinda - Chairman & President
- Mary Claire Kasunic - Secretary/Treasury
- Henry L. Dinda - Vice President
- Larry Marchant - Director / Clinical Advisor

### Quick Deploy Process:
```bash
cd johnnies-place
git add .
git commit -m "Your message"
git push
# Netlify auto-deploys in 1-2 minutes
```

### File Structure:
```
johnnies-place/
├── index.html, about.html, mission.html, etc. (all pages)
├── css/styles.css (all styles)
├── js/main.js (interactive features)
├── images/ (logo, uploads)
├── admin/ (CMS config)
└── content/ (blog, news, team data - managed by CMS)
```

### Next Steps Priority:
1. Update existing pages with new navigation (MOST IMPORTANT)
2. Add event card CSS
3. Create fundraisers, get-involved, team pages
4. Test all dropdowns work
5. Add calendar integration
6. Set up custom domain (johnniesplace.org)
7. Integrate newsletter service (Mailchimp/ConvertKit)
8. Add Stripe for donations

### Known Issues:
- Navigation inconsistency (fix #1 above)
- Mobile dropdown menu might need JS update for nested menus
- Newsletter forms are placeholders (need backend integration)

### Resources:
- Decap CMS Docs: https://decapcms.org/docs/
- Netlify Docs: https://docs.netlify.com
- GitHub Repo: https://github.com/wcosgrove123/johnnies-place-website
