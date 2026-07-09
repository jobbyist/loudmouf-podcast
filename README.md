# The Big Mood Series — Website

A cannabis culture podcast by **LOUDMOUF™**. This is a plain HTML / CSS /
JavaScript site — **no build step, no framework, no Node install.**
Push it to GitHub, flip one setting, and it's live. Anyone on the team
can add a new episode by editing one file.

---

## 1. What's in here

```
index.html              → the whole site (one page, anchor-linked sections)
404.html                → branded not-found page
css/style.css           → all styling / design tokens
js/main.js              → renders episodes & hosts, powers the audio player
data/episodes.js        → EDIT THIS to add/update episodes
data/hosts.js           → EDIT THIS to add/update hosts
assets/                 → logo, favicon
audio/                  → drop episode MP3s here
images/hosts/           → optional host photos
images/covers/          → optional per-episode cover art
.nojekyll                → tells GitHub Pages to serve the folders as-is
```

There is genuinely nothing to compile. Opening `index.html` in a
browser works locally; pushing the folder to GitHub Pages works in
production. Same files, both places.

---

## 2. Deploy it (5 minutes)

1. Create a new repository on GitHub (e.g. `loudmouf-big-mood-series`)
   and push this whole folder to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a
   branch`, branch `main`, folder `/ (root)`.
4. Save. GitHub gives you a URL like
   `https://<your-username>.github.io/loudmouf-big-mood-series/` —
   that's your live site, usually within a minute or two.

That's it. No Actions, no secrets, no environment variables required.

### Using a real domain (e.g. `bigmood.loudmouf.co.za`)

The site currently points its SEO tags at `https://bigmood.loudmouf.co.za/`
as a placeholder — swap that for whatever subdomain you actually use
(find/replace in `index.html`, `404.html`).

To point a subdomain at GitHub Pages:
1. In your DNS provider, add a `CNAME` record: `bigmood` → `<your-username>.github.io`.
2. In the repo, add a file named `CNAME` (no extension) at the root
   containing just the domain, e.g. `bigmood.loudmouf.co.za`.
3. Back in **Settings → Pages**, enter that same domain under "Custom
   domain" and enable **Enforce HTTPS** once it verifies (can take up
   to 24h for DNS, usually much faster).

If you'd rather this live *inside* the existing loudmouf.co.za site
(e.g. `loudmouf.co.za/bigmoodseries/`) instead of a subdomain, that
depends on what platform the main site runs on — if it's not GitHub
Pages, ask whoever manages that hosting to reverse-proxy or embed this
folder at that path, since GitHub Pages itself can only serve its own
domain or a subdomain you point at it.

---

## 3. Add a new episode (no coding required)

1. Drop the finished MP3 into `/audio`, named `episode-11.mp3` (next
   number in sequence).
2. Open `data/episodes.js` in any text editor (or directly on GitHub —
   click the file, click the pencil icon).
3. Copy one of the existing episode blocks, paste it into the array,
   and update the fields (`title`, `subtitle`, `synopsis`, `guest`,
   `duration`, `date`, `audio`).
4. Commit the change. The site updates automatically within a couple
   minutes of GitHub Pages rebuilding.

Every field is documented with comments at the top of that file. If a
field is left blank (e.g. no guest, no release date yet), the site
just omits that piece rather than showing "undefined" or an empty tag.

## 4. Add or update a host

Same idea — edit `data/hosts.js`. Leave `photo: ""` to show an
auto-generated gradient initials badge instead of a photo.

---

## 5. Before you consider this launch-ready

- [ ] Replace the placeholder platform links (`href="#"`) on the five
      "Where To Listen" cards in `index.html` and in the footer with
      your real Spotify / Apple Podcasts / YouTube / Google Podcasts /
      Substack URLs. Search for `data-platform` to find every instance.
- [ ] Replace `YOUR_FORM_ID` in the newsletter form (footer) with a
      real Formspree endpoint, or swap it for whatever you're already
      using on the other Jobbyist/Gravitas properties.
- [ ] Swap the placeholder social links (Instagram / TikTok / X) in
      the footer for real profile URLs.
- [ ] Update the canonical/OG URLs in `index.html` and `404.html` once
      you've confirmed the real domain (see §2).
- [ ] Fill in real `duration` and `date` values per episode once each
      one is finalized — they currently show "duration tba".
- [ ] Optional: add host photos and per-episode cover art (see the
      README files inside `images/hosts/` and `images/covers/`).

Everything else — copy, layout, episode titles, host bios, brand
attributes — is already filled in from the LOUDMOUF brand deck and
ready to ship.

---

## 6. Design notes

- **Palette & type** are pulled directly from the LOUDMOUF wordmark:
  the five-stop yellow→orange→pink→purple→blue gradient, a heavy
  condensed display face (Anton) for headlines, Inter for body copy,
  and JetBrains Mono for episode numbers, durations and timestamps —
  a nod to audio-engineering readouts.
- **The equalizer/waveform motif** (hero background, "now playing"
  indicator, section dividers) echoes the vertical bar shapes already
  built into the LOUDMOUF wordmark itself, and ties the visual system
  back to the fact that this is, literally, audio.
- Every audio player is custom-built (not the default browser
  `<audio>` widget) so only one episode plays at a time, and it's
  fully keyboard-accessible (arrow keys seek once a player is
  focused).
- Respects `prefers-reduced-motion` throughout, and all interactive
  elements have visible keyboard focus states.
- `PodcastSeries` JSON-LD structured data is included in `index.html`
  for search engine rich results — update the episode list there if
  you want per-episode rich results too (optional).

---

© Gravitas Industries (Pty) Ltd t/a LOUDMOUF™ · Reg. No. 2024/596436/07
