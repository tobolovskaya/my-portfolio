# Portfolio · Yevheniia Tobolovska

Personal site: IT operations & security, front-end & mobile development, UX/UI.

## Stack

- React 19 + Vite
- Self-hosted fonts via Fontsource: Schibsted Grotesk, with Onest for Cyrillic
- Three languages: Norwegian (default), Ukrainian, English. `?lang=nb|uk|en` or the switcher
- Plain CSS, no UI framework, no animation library
- Deployed on Vercel

## Security & privacy

The site is static and loads nothing from third parties: no analytics, no trackers, no external fonts or CDNs.
`vercel.json` sets strict response headers:

| Header | Purpose |
|---|---|
| `Content-Security-Policy` | Only same-origin scripts, styles, fonts and images; no framing, no plugins |
| `Strict-Transport-Security` | HTTPS only |
| `X-Content-Type-Options: nosniff` | Blocks MIME-type sniffing |
| `Referrer-Policy` | Sends only the origin to other sites |
| `Permissions-Policy` | Camera, microphone, location and payment APIs disabled |
| `Cross-Origin-Opener-Policy` | Isolates the browsing context |

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Content

All texts and project data live in `src/data.js`, per language.
