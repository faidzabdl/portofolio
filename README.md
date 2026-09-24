# Faidz Abdul Mazid — Developer Workspace Portfolio

A personal portfolio built to feel like a developer workspace/dashboard rather
than a scrolling landing page: a sidebar switches between real routes
(Dashboard, About, Skills, Experience, Services, Portfolio, Contact), each
rendered as its own view.

## Tech stack

- React + Vite
- React Router (view/routing system)
- Framer Motion (page transitions)
- Lucide React (icons)
- Plain modern CSS with custom properties (no UI framework)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Editing content

All editable content lives in `src/data/`, separate from the UI components —
you shouldn't need to touch component code to update your info.

| To change...            | Edit this file             |
| ------------------------ | --------------------------- |
| Name, bio, university, status, social links | `src/data/profile.js` |
| Skills list               | `src/data/skills.js`  |
| Services / focus areas    | `src/data/services.js` |
| Portfolio projects        | `src/data/projects.js` |

### Adding a skill

Add an object to the array in `src/data/skills.js`:

```js
{ name: 'JavaScript', category: 'Programming Language', description: '...' }
```

### Adding a project

Add an object to the array in `src/data/projects.js`. As soon as the array
has at least one item, the Portfolio page automatically shows project cards
instead of the "Coming soon" empty state.

### Updating social links

Edit `socials` in `src/data/profile.js` (email, GitHub, LinkedIn, Instagram).

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com → **New Project** → import the repository.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist` (Vercel fills these in automatically).
4. Click **Deploy**.

For updates afterward, just push to your GitHub repo — Vercel redeploys
automatically.
