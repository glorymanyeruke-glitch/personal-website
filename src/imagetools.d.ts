// Typed imports for vite-imagetools `?…&as=picture` URLs (responsive AVIF/WebP/JPEG).
declare module '*as=picture' {
  import type { Picture } from 'vite-imagetools'
  const picture: Picture
  export default picture
}
