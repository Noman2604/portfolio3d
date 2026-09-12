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
  layout.tsx        fonts (Space Grotesk + IBM Plex Mono) + metadata
  page.tsx           loads the 3D experience client-side only
  globals.css        color theme
components/
  Experience.tsx      canvas + all overlays, the entry point
  scene/
    Room.tsx           floor/walls/lighting
    Stations.tsx       the physical objects (desk, pedestals, terminal stack, lantern)
    Player.tsx         first-person movement + look + proximity detection
  ui/
    Overlay.tsx        start / paused screen
    HUD.tsx            crosshair + interact prompt
    InfoPanel.tsx       the modal shown when you press E
  InteractionListener.tsx   listens for the E key
data/content.ts        all copy — edit this file to update the portfolio
lib/
  store.ts             shared state (zustand) between the canvas and the UI
  constants.ts          room size, spawn point, movement speed
hooks/useKeyboardControls.ts   WASD key tracking
```

## Customizing further

- **Room size / spawn point / speed** — `lib/constants.ts`
- **Colors** — the amber (`#e8a33d`) / teal (`#4fd1c5`) / navy (`#0b0f1a`) palette is used
  throughout `components/scene/*` and `components/ui/*`; search-and-replace to re-theme.
- **Add a station** — add an entry to `stations` in `data/content.ts`, add a matching
  case in `components/ui/InfoPanel.tsx`, and add a piece of set-dressing + `<Label>` +
  `<GlowRing>` in `components/scene/Stations.tsx`.
- **Real 3D models** — swap any `<mesh>` in `Stations.tsx` for a `useGLTF()`-loaded model
  from `@react-three/drei` if you want more detailed geometry than the current primitives.

## Deploying

This is a normal Next.js app — deploys to Vercel the same way your current portfolio does:

```bash
npx vercel
```
