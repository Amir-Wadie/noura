This folder holds the vertical "shorts style" student videos shown in
the second slider on the Reviews section.

Expected files (matching js/data.js):
  student-1.mp4
  student-2.mp4
  student-3.mp4
  student-4.mp4
  student-5.mp4

To add a 6th video, add a new object to the `shortVideos` array in
js/data.js — the slider builds itself from that array automatically.
You are not limited to 5, and you can rename the files as long as the
`video` path in data.js matches.

Tips for the files themselves:
- Format: .mp4, vertical / 9:16 (phone-recorded video is already this shape).
- Keep each clip short (15-60s) and compressed for the web — a few MB
  each is normal, avoid uploading raw phone-camera files with no
  compression (those can be 100+ MB and will load slowly for visitors).
