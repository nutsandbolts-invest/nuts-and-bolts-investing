# Nuts & Bolts Investing Website Build Guide

This guide is based on the current brand brief for Nuts & Bolts Investing.

## 1. Start with the right version of the site

For this brand, the best first version is a simple marketing website, not a large complex platform.

The first version should do four jobs well:

- Explain what Nuts & Bolts Investing is
- Build trust with complete beginners
- Capture email leads
- Introduce and sell a beginner offer

That means the first site does not need a member dashboard, advanced course platform, or lots of custom features.

## 2. Recommended first sitemap

Start with these pages:

- Home
- About
- Beginner Course
- Free Resources
- Mailing List
- Contact
- Privacy Policy
- Terms

Optional next pages:

- Blog
- Recommended Tools
- FAQ

## 3. What each page should do

### Home

Purpose:
Introduce the brand, build trust quickly, and move people toward joining the email list or exploring the course.

Suggested sections:

- Clear headline for beginner investors
- Short explanation of who the site is for
- Primary call to action for the email list
- Secondary call to action for the beginner course
- "How it works" in 3 simple steps
- Trust-building section with your philosophy
- Free resources preview
- FAQ for beginner concerns

### About

Purpose:
Make the brand feel human, grounded, and trustworthy.

Suggested sections:

- Why you created Nuts & Bolts Investing
- Who it is for
- What you believe about beginner investing
- What the brand does not do

### Beginner Course

Purpose:
Sell the main educational product in a calm and practical way.

Suggested sections:

- Who the course is for
- What beginners will learn
- What outcome they can expect
- What is included
- Pricing or waitlist CTA
- FAQ

### Free Resources

Purpose:
Give value up front and support email growth.

Examples:

- Beginner investing checklist
- Starter glossary
- Simple first-investment roadmap

### Mailing List

Purpose:
Turn casual visitors into long-term subscribers.

Suggested angle:

- Clear promise
- Low-pressure signup
- Explain what they will receive and how often

## 4. Recommended messaging direction

The site should feel like a calm guide, not a trading brand.

Good messaging themes:

- Start simple
- Learn the basics with confidence
- Understand what matters first
- Build long-term habits, not short-term hype

Avoid:

- "Get rich quick"
- Flashy market language
- Overpromising outcomes
- Complicated financial jargon on the homepage

## 5. Recommended design direction

Use the brand brief as the design anchor.

Visual direction:

- Deep navy as the base background
- Mint or green as the main accent color
- Clean layouts with strong spacing
- Warm but minimal presentation
- Soft contrast and clear typography

Design rules:

- Keep sections easy to scan
- Use one main call to action per section
- Avoid crowded layouts
- Avoid stock-photo-heavy pages
- Prioritize clarity over decoration

## 6. Best beginner-friendly tech setup

For a first website, I recommend:

- GitHub for storing the code
- Next.js for building the website
- Vercel for hosting
- ConvertKit, MailerLite, or Beehiiv for email capture

Why this setup:

- GitHub keeps your project organized
- Next.js is flexible and professional
- Vercel is easy to deploy from GitHub
- Email platforms handle signup forms and automations better than GitHub Pages alone

If you want the absolute simplest possible setup, a plain static HTML/CSS site can also work. But Next.js gives you more room to grow.

## 7. Step-by-step build process

### Step 1: Define the first conversion goal

Choose the main goal for version one.

Recommended primary goal:

- Get visitors onto the email list

Recommended secondary goal:

- Introduce the beginner course or waitlist

### Step 2: Finalize the core content

Write rough copy for:

- Homepage headline
- Short brand promise
- Email signup offer
- Course summary
- About page story

Do not try to make it perfect before building. A solid draft is enough.

### Step 3: Build the site structure

Set up the project with:

- Homepage
- Shared header
- Shared footer
- Core page templates
- Mobile-friendly layout

### Step 4: Build the homepage first

This should be the first full page you complete.

Recommended homepage order:

1. Hero section
2. Brand promise
3. Beginner problem/solution section
4. Email signup section
5. Course preview
6. Free resources section
7. FAQ
8. Footer

### Step 5: Add email capture

Connect the site to an email platform.

Recommended beginner flow:

- Visitor enters email
- They receive a welcome email
- They get your free beginner resource
- They enter a simple nurture sequence

### Step 6: Add trust pages

Before launch, make sure these exist:

- About
- Contact
- Privacy Policy
- Terms

These matter for trust, email tools, and future affiliate work.

### Step 7: Test on mobile

Check:

- Headline readability
- Button sizes
- Form spacing
- Navigation clarity
- Overall page length and scanning

### Step 8: Launch a first version

Do not wait for perfection.

Launch once the site:

- Looks professional
- Explains the offer clearly
- Captures emails
- Works well on mobile

## 8. Step-by-step GitHub and hosting guide

### Option A: Best overall option for this brand

Use GitHub plus Vercel.

#### 1. Create a GitHub account

Go to GitHub and create an account if you do not already have one.

#### 2. Create a new repository

Create a repository named something like:

- nuts-and-bolts-investing

#### 3. Put the website code in that repository

From your project folder, you will eventually:

```bash
git init
git add .
git commit -m "Initial website build"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with the repository URL from GitHub.

#### 4. Create a Vercel account

Sign up at Vercel using your GitHub account.

#### 5. Import the GitHub repository into Vercel

In Vercel:

- Click "Add New Project"
- Import your GitHub repository
- Accept the default build settings if using Next.js
- Deploy

#### 6. Connect your custom domain later

Once deployed, you can connect a custom domain such as:

- `nutsandboltsinvesting.com`

Vercel gives you instructions for domain connection inside the dashboard.

### Option B: Simpler but more limited option

Use GitHub Pages.

GitHub Pages is good for a basic static site, but it is less flexible for forms, integrations, and future growth.

Use GitHub Pages if:

- You want a very simple site
- You do not need server features
- You are happy embedding forms from an email provider

## 9. Recommended content priorities for launch

Create these first:

- A strong homepage
- A simple About page
- A mailing list signup offer
- One free beginner resource
- A course page or waitlist page

This gives you a credible first business website without overbuilding.

## 10. Suggested first free lead magnet

Best fit for this brand:

- "Beginner Investing Starter Checklist"

Why it fits:

- Easy to understand
- Useful for complete beginners
- Natural email signup incentive
- Matches the calm, practical positioning

## 11. What I recommend we build next

The strongest next move is:

1. Create the website structure
2. Build the homepage
3. Add the email signup section
4. Prepare GitHub and deployment

## 12. Practical note on hosting choice

If your goal is a real business website that will grow over time, I recommend GitHub for code storage and Vercel for hosting rather than GitHub Pages alone.

That gives you a cleaner path for:

- Better deployment
- Easier updates
- Custom domain setup
- Future blog or course expansion
- Integrating email tools
