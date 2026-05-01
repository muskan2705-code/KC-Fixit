# KC Fixit Website

Static multi-page marketing website for KC Fixit, focused on construction chemical systems such as tile adhesives, grouts, waterproofing, plasters, block bonding, and polymer support.

## Overview

This project is a front-end website built with plain HTML, CSS, and JavaScript.

It includes:

- a home page with category-led hero panels
- product family pages and a shared product-detail page
- technical tools such as the tile adhesive selector and calculator
- lead capture forms for homepage, contact, dealer inquiry, and project inquiry
- Google Sheets and email notification integration through Google Apps Script
- a floating WhatsApp contact bubble

## Main Pages

- `index.html` - homepage
- `about.html` - company / brand story
- `products.html` - product family overview
- `product-detail.html` - shared product detail template driven by JavaScript data
- `applications.html` - application-led content
- `technical.html` - technical overview page
- `blogs.html` - blog listing page
- `catalogue.html` - brochure / catalogue page
- `contact.html` - contact page with enquiry form
- `dealer-inquiry.html` - dealer and distributor enquiry page
- `project-inquiry.html` - project enquiry page
- `tile-adhesive-selector.html` - selector tool
- `tile-adhesive-calculator.html` - adhesive calculator

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Apps Script for form submissions
- Google Sheets for lead storage

## Key Files

- `styles.css` - shared site styling
- `script.js` - shared interactions, form handling, product rendering, WhatsApp bubble
- `google-sheets-web-app.gs` - Google Apps Script backend for form capture and email notifications
- `GOOGLE_SHEETS_SETUP.md` - setup steps for the Google Apps Script integration
- `KC-Fixit-Catalogue.pdf` - catalogue asset

## Product Detail System

The product detail page is driven by JavaScript instead of separate HTML files per product.

Important data lives in `script.js`:

- `productDirectory` - product metadata such as title, family, image, summary, and use areas
- `productBrochureData` - brochure-driven specs, pack size, compliance, coverage, and working notes

This means most product copy changes should be made in `script.js`, not directly in `product-detail.html`.

## Lead Forms

The site includes live lead forms on:

- homepage enquiry section
- contact page
- dealer inquiry page
- project inquiry page

These forms submit to the Google Apps Script web app URL configured near the top of `script.js`.

The Apps Script:

- stores submissions in Google Sheets
- creates separate tabs for different form types
- sends notification emails to `Contact@kcfixit.com`

For full setup instructions, see `GOOGLE_SHEETS_SETUP.md`.

## Local Preview

This is a static website, so there is no build step.

You can preview it by opening `index.html` directly in a browser, or by serving the folder with a lightweight local server.

Example options:

```powershell
python -m http.server 8000
```

or

```powershell
npx serve .
```

Then open:

```text
http://localhost:8000
```

## Deployment

This site can be deployed to any static hosting platform, including:

- Netlify
- Vercel
- GitHub Pages
- shared hosting / cPanel
- Firebase Hosting

Deployment checklist:

1. Upload all HTML, CSS, JS, image, and PDF files.
2. Confirm `script.js` contains the correct deployed Google Apps Script URL.
3. Test all forms after deployment.
4. Test the WhatsApp button.
5. Verify internal navigation and product detail links.

## Editing Notes

- Shared navigation, forms, and most interactions are controlled in `script.js`.
- Shared visual changes should usually be made in `styles.css`.
- Footer content is duplicated across multiple HTML pages, so text changes there may need to be updated in many files.
- Product page content often comes from JavaScript data, not directly from the HTML template.

## Assets

Image files in the root folder are used directly by the static pages. Keep filenames stable unless you also update the matching references in the HTML or `script.js`.

## Contact and Lead Routing

- WhatsApp link is configured in `script.js`
- form email notifications are routed to `Contact@kcfixit.com`
- visible footer email is `contact@kcfixit.com`

## Maintenance Suggestions

- keep brochure copy and product-detail copy aligned
- test all inquiry forms after any Apps Script changes
- keep contact details consistent across footer, contact page, and Apps Script notification setup
- optimize new images before adding them to the project root
