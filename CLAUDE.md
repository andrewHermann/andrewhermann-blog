# CLAUDE.md — Project Intelligence for andrewhermann-blog

## Workflow Rules

- **Never deploy to production without an explicit instruction to do so.**
- The standard sequence is: make changes → commit → push → wait for instruction to deploy.
- "Push to git" and "deploy" are two separate steps. Do not combine them unless explicitly asked.
- When asked to deploy, use the exact commands in the Deploy section below.

---

## Repository

- **GitHub:** `git@github.com:andrewHermann/andrewhermann-blog.git`
- **Main branch:** `main` — this is what gets deployed to production
- **Local path:** `/Users/andrewhermann/andrewhermann-blog`
- Never force-push to `main`. Never amend published commits.

---

## Local Dev Setup

Start the full dev environment (frontend + backend) with:
```bash
npm run dev
```
This command:
1. Copies `blog.db` from the production server via SCP
2. Starts the Express backend on port `3001`
3. Starts the React frontend via Craco on port `3000`

The React dev server proxies API requests to `http://localhost:3001` (set in `package.json`).

Other useful commands:
```bash
npm run build          # Production build (no sourcemaps)
npm run lint           # ESLint on src/
npm run lint:css       # Stylelint on src/**/*.css
npm run check:all      # lint + lint:css + build
npm run seo:sitemap    # Regenerate sitemap
```

---

## Tech Stack

- **Frontend:** React 19, React Router v6, pure CSS custom properties — no Tailwind, no component library
- **Build system:** Craco (Create React App override)
- **Backend:** Express 5, SQLite3 (`blog.db`), express-session with SQLiteStore
- **Fonts:** Inter (body), Newsreader (headings) — both loaded via Google Fonts in `public/index.html`
- **CSS tokens:** All design values live in `src/styles/base.css` as CSS custom properties

---

## Architecture

- **Frontend** (`src/`) — React SPA served as static files in production
- **Backend** (`backend/server.js`) — Express API for admin/blog functionality, runs separately
- **Database** — SQLite (`blog.db`) for blog posts and sessions; `.db` files are gitignored
- **PM2** manages both processes in production: `frontend` (id 0), `backend-api` (id 1)

---

## Security Measures in Place

- **`.env` is gitignored** — never commit it. It contains `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SERVER_IP`
- **`SESSION_SECRET`** — required env var; server refuses to start if missing
- **Rate limiting** — login endpoint: 10 attempts per 15 min; admin endpoints: 100 req per 15 min
- **CORS** — whitelist only: `localhost:3000`, `localhost:5000`, `ADMIN_SERVER_IP:5000`, `andrew.cloudhopper.ch`
- **Admin access** — restricted to LAN IP defined in `ADMIN_SERVER_IP`
- **Sessions** — persisted in SQLite (`backend/sessions.db`), also gitignored
- **`trust proxy`** — set so `req.secure` reflects HTTPS correctly behind Cloudflare/nginx
- **Never expose**, log, or suggest changes to auth logic, session config, rate limits, or CORS without explicit instruction
- **Database files** (`*.db`, `*.sqlite`, `*.sqlite3`) are gitignored — never commit them

---

## Production Infrastructure

- **Server:** `andrew@192.168.178.44` (home server, 2005 IBM IntelliStation Z Pro)
- **Domain:** `andrew.cloudhopper.ch` (Cloudflare CDN + SSL)
- **App path:** `/var/www/andrew/andrewhermann`
- **Process manager:** PM2 — `frontend` (id 0), `backend-api` (id 1)
- **Reverse proxy:** nginx in front of both processes

### Deploy commands (run in sequence, only when instructed):
```bash
ssh andrew@192.168.178.44 "cd /var/www/andrew/andrewhermann && git pull && npm run build 2>&1"
ssh andrew@192.168.178.44 "pm2 restart frontend"
```
There is no CI/CD pipeline. Deploys are always triggered manually.

---

## CSS Architecture Rules

- **Section spacing** is handled by `gap: var(--space-2xl)` on `.content-main` — never use `margin-bottom` on `.section-card` for inter-section spacing
- **Multi-card layouts** use inline flexbox on the container (`style={{display: 'flex', gap: '...', flexWrap: 'wrap'}}`), with explicit `flex: '1 1 400px'` on each card — do **not** use `.card-grid`, `.card-grid-compact`, or `.card-grid-wide` CSS classes in JSX (they exist in base.css but have cascade issues)
- **Never** use the `.portfolio-cards` wrapper — it's a redundant flex column that fights `.content-main`
- Font tokens: `var(--font-heading)` for all headings, `var(--font-body)` for body text — never hardcode `Inter` or `Newsreader` directly in component CSS

---

## Messaging & Tone

**Target audience:** Recruiters, institutional leaders, and peers.

**Andrew is positioned as a leader, not a technician.** Every piece of copy must reflect this.

- Frame work around: governance, stakeholder alignment, institutional outcomes, strategic decisions
- Avoid: "deployed", "built", "configured", "implemented" as the primary verb
- Prefer: "led", "initiated", "brokered", "designed", "established"
- Do not add buzzwords, superlatives, or marketing language — the tone is direct, confident, and precise
- Do not invent metrics or claims that are not already stated elsewhere on the site
