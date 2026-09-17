# mehradandalibi.dev

Personal portfolio of Mehrad Andalibi. Next.js 16 (App Router), Tailwind CSS 4, GSAP + ScrollTrigger.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## How the site is put together

| Path | What it does |
|---|---|
| `app/globals.css` | Design tokens (colours, shadows, fonts, easing). The site is light-only by design. |
| `app/layout.tsx` | Self-hosted fonts, page metadata, social share image (`public/og.jpg`). |
| `lib/gsap.ts` | Registers GSAP plugins once. |
| `components/motion/` | `SplitWords` (word-by-word headlines), `ScrollHighlight` (words light up on scroll) and `useReveal` (`data-reveal`, `data-reveal-zoom`, `data-pop`, `data-split`). |
| `components/ui/IconBadge.tsx` | App-icon style tiles around Lucide icons. |
| `components/HeroSection.tsx` | The scroll-driven film intro. |
| `components/projects/` | Fleet Orchestrator message-flow diagram and the animated project illustrations. |
| `public/film/` | Intro and closing films (MP4 + WebM) and their poster frames. |

## The film intro

`public/film/intro.mp4` (9.7 s) is scrubbed by scroll while the hero is pinned (`h-[460svh]`).
`timeFor()` in `HeroSection.tsx` maps scroll progress to video time and crosses the two dissolves quickly.

- The film is encoded with a keyframe every 6 frames so seeking stays smooth. Re-encode new footage the same way:
  `ffmpeg -i in.mp4 -vf scale=1280:720 -c:v libx264 -crf 25 -g 6 -keyint_min 6 -bf 0 -an -movflags +faststart intro.mp4`
- If the video fails to load, the three poster frames crossfade instead.
- With reduced motion, the hero is a single still frame with no pinning, and all scroll animations are off.

## Content

Project, skill and education data live in arrays at the top of each section component.
The film's laptop screen, the message-flow diagram and the project illustrations are illustrative, and are labelled that way on the page.

Fonts: Schibsted Grotesk, Source Serif 4 and JetBrains Mono (SIL Open Font License), in `app/fonts/`.
