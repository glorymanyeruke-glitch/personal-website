import { useEffect, useRef } from 'react'

interface TurnstileApi {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string
      theme: 'dark'
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    },
  ) => string
  reset: (id: string) => void
  remove: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<void> | undefined

/** One script tag for the page, added only when the widget is needed (§9). */
function loadTurnstile(): Promise<void> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      scriptPromise = undefined
      reject(new Error('Turnstile failed to load'))
    }
    document.head.append(script)
  })
  return scriptPromise
}

interface TurnstileWidgetProps {
  siteKey: string
  /** Called with the token, or '' when it expires or errors. */
  onToken: (token: string) => void
  /** Increment to get a fresh challenge (after any failed attempt). */
  resetKey: number
  label: string
}

/** Loads the Turnstile script when the widget nears the viewport, then renders it. */
export function TurnstileWidget({ siteKey, onToken, resetKey, label }: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const onTokenRef = useRef(onToken)

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useEffect(() => {
    const el = container.current
    if (!el || !siteKey) return
    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        loadTurnstile()
          .then(() => {
            if (cancelled || !window.turnstile) return
            widgetId.current = window.turnstile.render(el, {
              sitekey: siteKey,
              theme: 'dark',
              callback: (token) => {
                onTokenRef.current(token)
              },
              'expired-callback': () => {
                onTokenRef.current('')
              },
              'error-callback': () => {
                onTokenRef.current('')
              },
            })
          })
          .catch(() => {
            onTokenRef.current('')
          })
      },
      { rootMargin: '600px' },
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = undefined
    }
  }, [siteKey])

  useEffect(() => {
    if (resetKey > 0 && widgetId.current) window.turnstile?.reset(widgetId.current)
  }, [resetKey])

  return <div ref={container} role="group" aria-label={label} className="mt-2 mb-6 min-h-[65px]" />
}
