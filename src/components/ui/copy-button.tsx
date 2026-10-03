import { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import { CheckIcon, CopyIcon } from './icons'

interface CopyButtonProps {
  /** id of the element holding the text; also used to select it as a fallback. */
  targetId: string
  text: string
  labels: { copy: string; copied: string; announceCopied: string; announceSelected: string }
}

/**
 * Copies the email address (§7.1). Shows "Copied" for 2s and announces it in a polite
 * live region. Without clipboard access (old browsers, some in-app webviews) it selects
 * the text so the visitor can copy it themselves. Label crossfade is added in Phase 4.
 */
export function CopyButton({ targetId, text, labels }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(
    () => () => {
      clearTimeout(timer.current)
    },
    [],
  )

  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setAnnouncement(labels.announceCopied)
      timer.current = setTimeout(() => {
        setCopied(false)
        setAnnouncement('')
      }, 2000)
    } catch {
      const target = document.getElementById(targetId)
      const selection = window.getSelection()
      if (target && selection) {
        const range = document.createRange()
        range.selectNodeContents(target)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setAnnouncement(labels.announceSelected)
    }
  }

  return (
    <>
      <Button
        variant="outlineDark"
        size="sm"
        onClick={() => void copy()}
        aria-describedby={targetId}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? labels.copied : labels.copy}
      </Button>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  )
}
