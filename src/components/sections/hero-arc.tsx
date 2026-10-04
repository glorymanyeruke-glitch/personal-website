/**
 * The gilt ring from the logo (§3.5), concentric with the circular portrait: its diameter is
 * 114% of the portrait's (a 7% ring of paper between photo and line). A complete circle
 * (client decision 2026-10-04; it previously had the logo's lower-left opening). Drawn
 * statically here; the draw-on animation arrives in Phase 4.
 *
 * Geometry: r=48 in a 100-unit box → the arc's diameter is 96% of the SVG, so the SVG is
 * 114 / 0.96 = 118.75% of the portrait's width.
 */
export function HeroArc() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-1/2 left-1/2 z-0 aspect-square w-[118.75%] -translate-1/2 overflow-visible"
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
        strokeWidth={0.34}
      />
    </svg>
  )
}
