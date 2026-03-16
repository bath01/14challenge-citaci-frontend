import { useState, useCallback } from "react"

/**
 * Gère la copie dans le presse-papier avec feedback visuel temporaire
 */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(
    (text) => {
      navigator.clipboard?.writeText?.(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    },
    [resetDelay]
  )

  return { copied, copyToClipboard }
}
