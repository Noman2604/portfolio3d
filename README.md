# Noman Patel — 3D Portfolio

An interactive first-person 3D portfolio built with **Next.js 15, TypeScript, Tailwind CSS**
and **React Three Fiber**. Walk around a small room; each object is a section of the
portfolio (About, Skills, two Projects, Contact).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Click "Click to enter" to lock the mouse, then:

- **WASD / arrows** — move
- **Mouse** — look around
- **Shift** — run
- **E** — open the section you're standing near (its glow ring turns teal)
- **Esc** — release the cursor / close a panel

## Edit the content

Everything you'll actually want to change lives in **`data/content.ts`**:

- `about` — your name, title, bio
- `projects.apticore` / `projects.uccops` — project name, description, stack, highlights
- `skills.categories` — your skill groups
- `contact` — email, LinkedIn, portfolio link

The 3D layout doesn't need to change when you edit copy — it just reads from this file.

## Where things live

```
app/
  layout.tsx        fonts + metadata
  page.tsx          client-side dynamic loader for Experience
  globals.css       styles & color theme
components/
  Experience.tsx    canvas, scroll listener + all overlays (main entry point)
  scene/
    Scene.tsx       3D WebGL background scene (Three.js / React Three Fiber)
  ui/
    Navbar.tsx      floating top navigation
    DotNavigation.tsx right-hand rail dots
    Sections.tsx    scrollable native content sections
    Terminal.tsx    interactive cyberpunk terminal CLI modal
    Icons.tsx       SVG icon primitives
data/content.ts     portfolio data and project details
lib/
  scrollStore.ts    scroll progress & active section store (zustand)
```

## Deploying

This is a normal Next.js app — deploys to Vercel the same way your current portfolio does:

```bash
npx vercel
```
