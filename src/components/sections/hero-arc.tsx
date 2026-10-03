/**
 * The gilt arc from the logo (§3.5): a circle centred on the portrait — not her head, to
 * avoid a halo — with a radius between half the portrait's height and half its diagonal,
 * so the corners break through it. Open at the lower-left like the logo (a 0.15-turn gap
 * centred at 135°). Drawn statically here; the draw-on animation arrives in Phase 4.
 */
export function HeroArc() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-1/2 left-1/2 z-0 aspect-square w-[148.4%] -translate-1/2 overflow-visible"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        pathLength={1}
        transform="rotate(162 50 50)"
        fill="none"
        className="stroke-gilt"
        // ≈1.25px at desktop size, ≈1px on mobile (scales with the SVG).
        strokeWidth={0.28}
        strokeDasharray="0.85 1"
      />
    </svg>
  )
}
