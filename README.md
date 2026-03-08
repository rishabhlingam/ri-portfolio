# Rishabh Lingam — Portfolio

A minimal, dark-themed personal portfolio built with Next.js, Tailwind CSS, and Sanity CMS.

> **Live site:** _https://ri-portfolio-sable.vercel.app_ <!-- Replace with your deployed URL -->

---

## Overview

This portfolio showcases my work as a software engineer and researcher. It features smooth scroll-based animations, a headless CMS for content management, and a working contact form.

### Sections

| Section | Description |
|---------|-------------|
| **About** | Introduction, tagline, and bio |
| **Skills** | Technical skills and proficiencies |
| **Experience** | Professional work history |
| **Publications** | Academic and research publications |
| **Education** | Degrees and coursework |
| **Projects** | Featured project showcase |
| **Contact** | Contact form powered by Resend |
| **Beyond Code** | Personal content — writings, photography, recipes, and rants |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **CMS:** Sanity.io
- **Email:** Resend
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity.io](https://sanity.io) project
- A [Resend](https://resend.com) API key

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_EMAIL=you@example.com
```

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/contact/       # Contact form API (rate-limited, input-validated)
├── beyond-code/       # Personal content hub
├── writings/          # Blog posts
├── photography/       # Photo gallery
├── recipes/           # Recipe collection
├── rants/             # Opinion pieces
├── layout.tsx         # Root layout (nav + footer)
├── page.tsx           # Home page (fetches all Sanity data)
└── globals.css        # Global styles + Tailwind imports

components/
├── layout/            # Navigation, Footer, PageHeader, Section
├── sections/          # Hero, Skills, Experience, Publications, Education, Projects, Contact
└── ui/                # Button, Dividers, reusable primitives

lib/
├── sanity/            # Sanity client, queries, image helper
└── types.ts           # Shared TypeScript types

sanity/
└── schemas/           # Content type definitions (profile, skill, project, etc.)
```

## Content Management

All site content is managed through [Sanity.io](https://sanity.io/manage). Update your profile, add projects, publish writings, and more from the Sanity dashboard — changes appear on the site automatically.

## Security

- **Rate limiting** on the contact API (3 requests/min per IP)
- **Input validation** with field length caps and email format checks
- **Security headers** (CSP, HSTS, X-Frame-Options, etc.) configured in `next.config.ts`
- **No exposed secrets** — all API keys are server-side only

## License

This project is for personal use. Feel free to use it as inspiration for your own portfolio.
