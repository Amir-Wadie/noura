# ميس نورا — Landing Page

Premium single-page WhatsApp-conversion landing page. Pure HTML5 / CSS3 /
vanilla JavaScript — no frameworks, no build step. Ready to upload
directly to GitHub Pages.

## File structure

```
index.html
css/
  style.css         design tokens + all component styles
  animations.css     scroll-reveal system, keyframes, reduced-motion
  responsive.css      breakpoints (laptop / tablet / mobile)
js/
  data.js            <-- EDIT THIS ONE FOR CONTENT (see below)
  whatsapp.js        wires every CTA to a real wa.me link
  counter.js         animated stat counters
  countdown.js        offer countdown
  slider.js          builds both sliders from data.js
  main.js            header scroll state, reveals, video playback, ripple
assets/
  logo/              logo.png + logo.webp
  icons/             favicons / touch icons
  images/            optional testimonial photos & video thumbnails
  videos/            hero video (+ shorts/ subfolder for student clips)
  fonts/             unused by default (fonts load from Google Fonts)
```

## 1. Preview it locally

Opening `index.html` directly by double-clicking works for a quick look,
but the video/photo fallback logic behaves best when served over
`http://`. Easiest option with Python installed:

```
cd noura-landing
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## 2. Put it on GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder to the repo, **keeping the folder
   structure exactly as it is** (don't flatten `css/`, `js/`, `assets/`).
3. Repo → **Settings → Pages** → set "Deploy from a branch" → branch
   `main`, folder `/ (root)` → Save.
4. GitHub gives you a `https://yourusername.github.io/repo-name/` URL
   within a minute or two.

## 3. The one file you'll actually edit: `js/data.js`

Everything you'll want to update day-to-day lives in this single file,
in plain English comments:

- **`SITE_CONFIG.whatsappNumber`** — put the real WhatsApp number here
  (international format, digits only, no `+`, e.g. `"201001234567"`).
  Every button on the site reads from this one value.
- **`SITE_CONFIG.messages`** — the pre-filled WhatsApp text for each CTA.
- **`SITE_CONFIG.countdownTarget`** — the offer deadline.
- **`heroVideo`** — one line, points at the hero video file.
- **`testimonials`** — an array. Add a `{ name, text, rating, avatar }`
  object anywhere in the array and a new review card appears — no HTML
  editing required.
- **`shortVideos`** — same idea for the vertical student-clip slider:
  add a `{ title, thumbnail, video }` object and a new card appears.

## 4. Adding videos

See `assets/videos/README.txt` and `assets/videos/shorts/README.txt` —
they list the exact filenames the page already expects. Short version:

- Hero video → `assets/videos/intro.mp4`
- Student clips → `assets/videos/shorts/student-1.mp4`, `student-2.mp4`, etc.

Drop files in with those names (or rename the paths in `js/data.js` to
match whatever you called them) and they work immediately — the video
frames already have graceful placeholders, so nothing looks broken
before the real files are added.

**Uploading straight from GitHub.com (no extra software):**
1. Open your repository on github.com.
2. Click into the `assets/videos` folder (or `assets/videos/shorts`).
3. Click **Add file → Upload files**.
4. Drag your `.mp4` file in, using the exact filename above, then
   **Commit changes**.
5. GitHub Pages updates automatically within a minute or two.

**Keep files web-sized.** A compressed 30–60 second clip is typically a
few MB; a raw, uncompressed phone recording can be 100+ MB and will be
slow for visitors (GitHub's web uploader also caps a single file at
25 MB). Free tools like [HandBrake](https://handbrake.fr) (desktop) or
any "compress video" web tool work well — a "Fast 1080p" preset for the
hero video and a standard vertical preset for the shorts is plenty.

## 5. Placeholder content to replace before launch

- `SITE_CONFIG.whatsappNumber` and the phone number in the footer are
  placeholders — search `js/data.js` and `index.html` for
  `201001234567` / `+20 100 123 4567`.
- The 6 testimonials and 5 short-video entries in `js/data.js` are
  sample placeholders written to show the layout — swap in real
  student reviews and clips.
- Footer social links (`#`) — add real Instagram/Facebook/TikTok/YouTube
  URLs in `index.html`'s `<footer>`.
