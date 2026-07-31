This folder holds the HERO video only.

Expected file:  intro.mp4
Configured in:  js/data.js  ->  const heroVideo = "assets/videos/intro.mp4";

To use a different filename, just edit that one line in js/data.js —
nothing else in the project needs to change.

Short/vertical student videos go in the "shorts" subfolder, not here.
See assets/videos/shorts/README.txt.

Tips for the file itself:
- Format: .mp4 (H.264 video / AAC audio) plays everywhere without conversion.
- Landscape / 16:9.
- Keep it web-sized. A 30-60 second clip compressed for the web is
  usually a few MB to a few dozen MB — not hundreds. Large files make
  the page slow to load. HandBrake (free, handbrake.fr) with its
  "Fast 1080p30" or "Web" preset is an easy way to compress before
  uploading.
