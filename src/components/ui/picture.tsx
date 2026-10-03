import type { Picture as PictureData } from 'vite-imagetools'

interface PictureProps {
  picture: PictureData
  alt: string
  sizes: string
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

/** Renders a vite-imagetools picture: AVIF → WebP → JPEG/PNG fallback, explicit size (no CLS). */
export function Picture({
  picture,
  alt,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority,
}: PictureProps) {
  return (
    <picture>
      {Object.entries(picture.sources).map(([format, srcset]) => (
        <source key={format} type={`image/${format}`} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  )
}
