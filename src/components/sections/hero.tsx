// Square crop so the portrait can be a true circle; centred, her face sits at the middle.
import portrait from '~/assets/portrait.jpg?w=480;768;900&aspect=1:1&format=avif;webp;jpg&as=picture'
import { contact, hero, person } from '~/content/site'
import { ButtonLink } from '../ui/button'
import { WhatsAppIcon } from '../ui/icons'
import { Picture } from '../ui/picture'
import { HeroArc } from './hero-arc'
import { HeroFormLink } from './hero-form-link'

export { portrait as heroPortrait }
export const heroPortraitSizes = '(min-width: 1024px) 30vw, (min-width: 768px) 56vw, 70vw'

/**
 * The one bold moment (§3.5). The tagline is display text, not the h1 — the h1 says who
 * this is (Phase 0 decision). Mobile: portrait follows the headline (§3.4).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="pt-10 pb-18 lg:pt-18 lg:pb-28">
      <div className="mx-auto grid max-w-content grid-cols-4 gap-x-4 px-5 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-x-6">
        <div className="col-span-full lg:col-span-7">
          <p className="font-display text-[clamp(2.441rem,5.5vw,4.768rem)] leading-[1.02] font-normal tracking-[-0.015em] text-ink italic">
            {person.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <h1
            id="hero-name"
            className="mt-8 font-display text-xl font-medium text-bronze lg:mt-10 lg:text-2xl"
          >
            {person.name}
          </h1>
          <p className="mt-1.5 text-base text-muted">{person.role}</p>
          <p className="mt-5 max-w-[34rem]">{hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <ButtonLink href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {hero.whatsappCta}
            </ButtonLink>
            <HeroFormLink />
          </div>
        </div>

        <figure className="col-span-full mt-14 lg:col-span-5 lg:mt-0">
          {/* Indented so the arc (≈9% wider than the portrait each side) clears the gutter. */}
          <div className="relative ml-[15%] w-[70%] md:ml-[22%] md:w-[56%] lg:ml-[11%] lg:w-[78%]">
            <HeroArc />
            <Picture
              picture={portrait}
              alt={hero.portraitAlt}
              sizes={heroPortraitSizes}
              loading="eager"
              className="relative z-10 aspect-square h-auto w-full rounded-full bg-gilt/10 object-cover shadow-portrait"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
