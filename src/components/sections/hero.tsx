import portrait from '~/assets/portrait.jpg?w=480;768;900&aspect=4:5&position=bottom&format=avif;webp;jpg&as=picture'
import { contact, hero, person } from '~/content/site'
import { ButtonLink } from '../ui/button'
import { WhatsAppIcon } from '../ui/icons'
import { Picture } from '../ui/picture'
import { HeroArc } from './hero-arc'
import { HeroFormLink } from './hero-form-link'

export { portrait as heroPortrait }
export const heroPortraitSizes = '(min-width: 1024px) 26vw, (min-width: 768px) 52vw, 64vw'

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
          {/* Indented so the arc (≈21% wider than the portrait each side) clears the gutter. */}
          <div className="relative ml-[18%] w-[64%] md:ml-[24%] md:w-[52%] lg:ml-[15%] lg:w-[70%]">
            <HeroArc />
            <Picture
              picture={portrait}
              alt={hero.portraitAlt}
              sizes={heroPortraitSizes}
              loading="eager"
              className="relative z-10 aspect-[4/5] h-auto w-full rounded-portrait bg-gilt/10 object-cover shadow-portrait"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
