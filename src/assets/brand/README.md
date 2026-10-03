# Brand assets (temporary raster crops)

Generated from `src/assets/logo.jpeg` (a JPEG with an off-white `#FFFCF5` background) by a
colour-to-alpha pass, so the marks sit cleanly on `--paper`. **Use them on paper only**: on
dark backgrounds the pass exposes JPEG noise. Replace with a vector emblem when Gloria
provides one (LAUNCH_BLOCKERS.md).

- `logo-lockup-336.png`, `logo-lockup-504.png` — full logo for the 168px footer lockup (2×, 3×)
- Favicons and app icons live in `public/` (paper background, opaque), using a lion-head crop: the full logo is unreadable at 16–32px.
- The header badge uses the original `src/assets/logo.jpeg` directly (full logo in a 48px circle).

## Open Graph image

`public/og.jpg` (1200×630) is rendered from `scripts/og-image.html`. To regenerate (e.g. once
the vector emblem arrives):

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
  --screenshot=og.png "file://$PWD/scripts/og-image.html"
sips -s format jpeg -s formatOptions 85 og.png --out public/og.jpg && rm og.png
```
