import logo from '~/assets/logo.jpeg?w=48;96;144&format=avif;webp;jpg&as=picture'
import { Picture } from '../ui/picture'

/**
 * Header mark: the whole Golden Chimera logo in a 48px circle with a hairline border
 * (client decision, 2026-10-03). The logo's own off-white background fills the circle.
 * Decorative: the wordmark beside it carries the name, so alt is empty.
 */
export function LogoBadge() {
  return (
    <Picture
      picture={logo}
      alt=""
      sizes="48px"
      loading="eager"
      className="size-12 shrink-0 rounded-full border border-rule bg-[#fffcf5] object-cover"
    />
  )
}
