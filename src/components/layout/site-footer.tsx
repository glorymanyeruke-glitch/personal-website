import { Link } from '@tanstack/react-router'
import lockup from '~/assets/brand/logo-lockup-504.png?w=336;504&format=avif;webp;png&as=picture'
import { footer } from '~/content/site'
import { Picture } from '../ui/picture'

/** Footer: the full logo lockup is the one centred element on the site (§3.3). */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-content px-5 pt-14 pb-10 text-center text-sm text-muted md:px-8">
      <Picture
        picture={lockup}
        alt={footer.logoAlt}
        sizes="168px"
        className="mx-auto mb-5 h-auto w-42"
      />
      <p>{footer.copyright}</p>
      <p className="mt-1">
        <Link to={footer.privacy.href} className="text-bronze">
          {footer.privacy.label}
        </Link>
      </p>
    </footer>
  )
}
