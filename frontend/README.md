# Syncrova Frontend
https://syncrova-phi.vercel.app/

React client for the Syncrova real-time communication platform. Currently focused on marketing and authentication UI; backend API and Socket.io integration are not wired up yet.

**Overall progress: ~35%** — static pages, routing, and forms are in place; no authenticated app shell or real-time features yet.

---

## Progress at a glance

| Area | Status | Notes |
|------|--------|--------|
| Landing page | Done | Hero, features, CTA, footer, mobile nav |
| Login page | UI done | Form validation UI only; no API call |
| Signup page | UI done | Multi-field form; no API call |
| Client routing | Done | `/`, `/login`, `/signup` |
| Auth ↔ page links | Done | Login ↔ signup via React Router |
| Backend integration | Not started | No JWT, env config, or API client |
| App dashboard | Not started | Servers, channels, messaging UI |
| Real-time (Socket.io) | Not started | — |
| Protected routes | Not started | — |

---

## Implemented features

### Landing page (`/`)

* Responsive navbar with mobile menu
* Hero section and product preview image
* Key features section (messaging, channels, servers)
* CTA section and footer
* Links to `/login` from nav and primary CTAs

### Login page (`/login`)

* Split layout (hero panel + form)
* Email/password fields with show/hide password
* Remember me checkbox
* GitHub OAuth button (UI placeholder)
* Link to signup (`/signup`)

### Signup page (`/signup`)

* Registration form with controlled inputs
* Password visibility toggle
* Terms/privacy checkbox UI
* Link back to login (`/login`)

### Routing

* React Router v7 with catch-all redirect to home
* Case-sensitive import paths aligned with filenames (required for Linux/Vercel builds)

---

## Tech stack

* **React 19** + **Vite 7**
* **React Router DOM** — client-side routing
* **Tailwind CSS** — landing & login styling
* **Font Awesome** — landing page icons
* **Plus Jakarta Sans** — typography (login/signup)

---

## Project structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx
    ├── App.jsx              # Routes
    ├── index.css
    └── pages/
        ├── landingpage.jsx  # Home / marketing
        ├── Login.jsx        # Login UI
        └── signup.jsx       # Signup UI
```

---

## Installation

From the repo root:

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:5173` (default Vite port).

### Production build

```bash
npm run build
npm run preview
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Landing | Marketing homepage |
| `/login` | Login | Sign-in form (UI only) |
| `/signup` | Signup | Registration form (UI only) |
| `*` | — | Redirects to `/` |

---

## Deploying on Vercel

* Set **Root Directory** to `frontend`
* **Build command:** `npm run build`
* **Output directory:** `dist`

Import paths must match file casing exactly (e.g. `./pages/Login`, not `./pages/login`). Windows is case-insensitive; Vercel/Linux is not.

---

## Upcoming work

* Connect login/signup forms to backend auth API
* Store JWT (httpOnly cookie or secure client storage)
* Protected routes and auth context
* Main app layout: server list, channels, message thread
* Socket.io client for live messaging
* Environment variables (`VITE_API_URL`, etc.)
* Wire landing CTAs that still use placeholder buttons/links

---

## Related

See the [main README](../README.md) for backend features, Socket events, and full-stack roadmap.
