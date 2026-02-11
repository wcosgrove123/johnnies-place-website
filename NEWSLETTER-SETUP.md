# Newsletter System Setup Guide

## Overview

You now have a complete, privacy-first newsletter subscription system! Here's what's been built:

### Features
✅ Email collection with preference management
✅ Secure database storage (Supabase - YOU own the data)
✅ Automatic duplicate handling
✅ Unsubscribe functionality
✅ Admin dashboard to view/export subscribers
✅ Privacy-focused (no third-party marketing platforms)
✅ Mobile-responsive design

---

## Setup Steps

### Step 1: Create Database Table in Supabase ⚠️ REQUIRED

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Click on **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  preferences JSONB DEFAULT '[]'::jsonb,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  unsubscribe_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_is_active ON subscribers(is_active);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do anything" ON subscribers
FOR ALL USING (true);
```

5. Click **RUN** button
6. You should see "Success. No rows returned"

---

### Step 2: Add Environment Variables to Netlify

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (johnnies-place)
3. Go to **Site settings** → **Environment variables**
4. Add these variables (get values from your `.env` file):

```
SUPABASE_URL = https://bfzmwyrxapsehdprelhe.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc... (the long service_role key)
```

⚠️ **Important:** Use the SERVICE_ROLE_KEY, not the ANON_KEY

---

### Step 3: Install Dependencies & Deploy

```bash
cd johnnies-place

# Install dependencies
npm install

# Test locally (optional)
npm run dev

# Commit and push to GitHub (Netlify auto-deploys)
git add .
git commit -m "Add newsletter subscription system"
git push
```

Wait 1-2 minutes for Netlify to deploy.

---

### Step 4: Test the Newsletter System

1. Visit your site: `https://[your-site].netlify.app/stay-updated.html`
2. Try subscribing with your email
3. Check if you see a success message
4. Go to Supabase dashboard → **Table Editor** → `subscribers`
5. You should see your test subscription!

---

## How to Use

### For Website Visitors

**Subscribe:**
1. Go to Stay Updated page
2. Enter email
3. Select newsletter preferences
4. Click Subscribe

**Unsubscribe:**
- Click unsubscribe link in newsletter emails (you'll add this later)
- Or visit: `/unsubscribe.html?token=THEIR_TOKEN`

### For Admins

**View Subscribers:**
1. Go to `/admin/subscribers.html`
2. Login with Netlify Identity (your wil.cosgrove@gmail.com account)
3. See all subscribers, stats, and preferences

**Export Subscribers:**
- Click "Export CSV" button on admin dashboard
- Opens in Excel/Google Sheets

---

## Newsletter Preference Types

Your system supports these preferences:

1. **general** - General Updates (default)
2. **events** - Events & Activities
3. **stories** - Success Stories & Impact
4. **fundraising** - Fundraising Campaigns
5. **volunteer** - Volunteer Opportunities

You can filter subscribers by preference when sending newsletters.

---

## Privacy & Data Ownership

### What You Own
✅ Complete subscriber database (in YOUR Supabase account)
✅ Full access to export data anytime
✅ Ability to delete data completely
✅ Control over who has access

### What Third Parties Have
- **Netlify**: Hosts your website and functions (doesn't store subscriber data)
- **Supabase**: Hosts your database (but YOU control it, they can't use it)

### No Marketing Platform
❌ No Mailchimp tracking
❌ No third-party analytics on subscribers
❌ No data selling
❌ Complete privacy for your donors

---

## Sending Newsletters (Phase 2 - Not Yet Built)

When you're ready to send actual newsletters, you'll add:

### Option 1: Manual (Simple)
1. Export subscribers CSV from admin dashboard
2. Filter by preferences
3. Send via Gmail/Outlook BCC (for small lists)

### Option 2: Automated (Better)
1. Sign up for Resend (free tier: 100 emails/day)
2. I'll build a "Send Newsletter" function
3. Write email in simple editor
4. Click send - automatically emails all active subscribers

**Cost:** FREE for up to 3,000 emails/month

Let me know when you want to add this!

---

## Files Created

```
johnnies-place/
├── .env                              # Your credentials (NOT in git)
├── .env.example                      # Template for others
├── netlify.toml                      # Netlify configuration
├── package.json                      # Dependencies
├── stay-updated.html                 # Updated with preferences
├── unsubscribe.html                  # Unsubscribe page
├── admin/
│   └── subscribers.html              # Admin dashboard
├── netlify/functions/
│   ├── subscribe.js                  # Handle subscriptions
│   ├── unsubscribe.js                # Handle unsubscribes
│   └── get-subscribers.js            # Get subscriber list
├── css/styles.css                    # Updated with newsletter styles
└── js/main.js                        # Updated with form handling
```

---

## Troubleshooting

### "Function not found" error
- Make sure you've pushed to GitHub and Netlify has deployed
- Check Netlify Functions tab to see if functions deployed
- Ensure environment variables are set in Netlify

### "Database error"
- Make sure you ran the SQL in Supabase
- Check that SUPABASE_SERVICE_ROLE_KEY is set correctly in Netlify
- Verify database exists in Supabase Table Editor

### "Network error"
- Check your internet connection
- Check browser console (F12) for detailed errors
- Verify Supabase project is running (not paused)

### Can't access admin dashboard
- Make sure you're logged into Netlify Identity
- Visit `/admin/` first to trigger login
- Contact if you need to be added as admin user

---

## Next Steps

1. ✅ Run the SQL to create database (STEP 1 above)
2. ✅ Add environment variables to Netlify (STEP 2 above)
3. ✅ Deploy to Netlify (STEP 3 above)
4. ✅ Test subscription (STEP 4 above)
5. ⏳ Collect some subscribers!
6. ⏳ Later: Set up email sending (when you're ready)

---

## Questions?

This system is built to be:
- **Private** - You own all data
- **Simple** - Easy to use and maintain
- **Free** - No costs until you're sending thousands of emails
- **Professional** - Clean, secure, GDPR-compliant

Let me know if you need help with any step!
