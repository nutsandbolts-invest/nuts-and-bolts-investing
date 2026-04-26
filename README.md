# Nuts & Bolts Investing Site

This project is a static starter website for Nuts & Bolts Investing.

## What is included

- Multi-page marketing site
- Homepage focused on email capture and beginner trust-building
- Supporting pages for About, Course, Resources, Mailing List, Contact, Privacy, and Terms
- Shared styles and a mobile menu
- Brand palette and layout direction based on the logo

## Files

- `index.html`
- `about.html`
- `course.html`
- `resources.html`
- `mailing-list.html`
- `contact.html`
- `privacy.html`
- `terms.html`
- `styles.css`
- `script.js`
- `Nuts_And_Bolts_LOGO.png`

## How to preview locally

Because this is a static site, you can open `index.html` directly in a browser.

If you want a simple local server from this folder, run:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

## What to customize next

### 1. Replace placeholder business details

Update:

- contact email in `contact.html`
- privacy text in `privacy.html`
- terms text in `terms.html`
- course offer copy in `course.html`

### 2. Connect the forms

The signup and contact forms are placeholders right now.

You can connect them with:

- ConvertKit
- MailerLite
- Beehiiv
- Formspree

## How to put this on GitHub

### 1. Create a repository on GitHub

Create a new repository, for example:

- `nuts-and-bolts-investing`

### 2. Initialize git in this folder

Run these commands in `/Users/deanmason/Documents/New project`:

```bash
git init
git add .
git commit -m "Initial Nuts & Bolts Investing site"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with the repository URL GitHub gives you.

## How to host it on GitHub Pages

This starter works well with GitHub Pages because it is plain HTML, CSS, and JavaScript.

### 1. Push the code to GitHub

Make sure the repository is live on GitHub first.

### 2. Open repository settings

In GitHub:

- go to `Settings`
- open `Pages`

### 3. Choose the publishing source

Set:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

### 4. Save and wait

GitHub Pages will publish the site and give you a URL.

It usually looks like:

- `https://yourusername.github.io/nuts-and-bolts-investing/`

## Better long-term hosting option

If you want a more professional setup later, use:

- GitHub for the code
- Vercel for hosting

That makes it easier to grow into a larger site or move to a framework later.

## Suggested next build steps

1. Refine the homepage copy with your voice.
2. Connect the mailing list form.
3. Add a real free lead magnet.
4. Replace placeholder legal pages.
5. Add a custom domain.
