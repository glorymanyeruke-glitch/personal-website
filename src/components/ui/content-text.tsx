import { clsx } from 'clsx'
import { ui } from '~/content/site'
import { isPlaceholder, type Copy } from '~/content/placeholder'

/**
 * Renders a content value. Placeholders show as a visible dashed tag so missing
 * facts can't ship unnoticed (LAUNCH_BLOCKERS.md).
 */
export function ContentText({ value, onDark = false }: { value: Copy; onDark?: boolean }) {
  if (!isPlaceholder(value)) return <>{value}</>
  return (
    <span
      title={value.note}
      className={clsx(
        'inline-block rounded-[2px] px-1.5 py-0.5 align-baseline font-mono text-sm font-medium text-ink outline-1 -outline-offset-1 outline-dashed',
        onDark ? 'bg-paper outline-gilt-light' : 'bg-gilt/14 outline-bronze',
      )}
    >
      [{ui.placeholderPrefix}: {value.note}]
    </span>
  )
}
