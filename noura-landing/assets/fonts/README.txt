Not used right now — the site currently loads "Cairo" and "Fraunces"
from Google Fonts via a <link> tag in index.html's <head>, which is
fast and needs no files here.

This folder is reserved in case you ever want to self-host the fonts
instead (e.g. to drop the Google Fonts dependency). If so: download
the .woff2 files, place them here, add @font-face rules to the top of
css/style.css, and remove the Google Fonts <link> tags from index.html.
