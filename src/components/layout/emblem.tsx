import emblem80 from '~/assets/brand/emblem-80.png'
import emblem120 from '~/assets/brand/emblem-120.png'

/** 40px lion-head mark. Decorative: the wordmark next to it carries the name. */
export function Emblem() {
  return (
    <img
      src={emblem80}
      srcSet={`${emblem80} 2x, ${emblem120} 3x`}
      width={40}
      height={40}
      alt=""
      className="size-10 shrink-0"
    />
  )
}
