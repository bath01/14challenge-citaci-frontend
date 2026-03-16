import { useState, useCallback } from "react"

/**
 * Gère le partage avec feedback visuel temporaire
 */
export function useShare(resetDelay = 2000) {
  const [shared, setShared] = useState(false)

  const shareOnTwitter = useCallback(
    (quote) => {
      if (!quote) return
      const text = encodeURIComponent(
        `"${quote.text}" — ${quote.author} #CitaCI`
      )
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
      setShared(true)
      setTimeout(() => setShared(false), resetDelay)
    },
    [resetDelay]
  )

  return { shared, shareOnTwitter }
}
