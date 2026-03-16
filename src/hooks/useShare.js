import { useState, useCallback } from "react"

/**
 * Gère le partage avec la Web Share API native (WhatsApp, Telegram, SMS...)
 * Fallback vers Twitter si la Web Share API n'est pas disponible
 */
export function useShare(resetDelay = 2000) {
  const [shared, setShared] = useState(false)

  /**
   * Vérifie si la Web Share API est disponible sur l'appareil
   */
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share

  /**
   * Partage via la Web Share API native ou fallback Twitter
   */
  const shareQuote = useCallback(
    async (quote) => {
      if (!quote) return

      const shareText = `"${quote.text}" — ${quote.author} #CitaCI`

      if (canNativeShare) {
        try {
          await navigator.share({
            title: "CitaCI — Citation africaine",
            text: shareText,
            url: window.location.href,
          })
          setShared(true)
          setTimeout(() => setShared(false), resetDelay)
        } catch (error) {
          // L'utilisateur a annulé le partage, pas d'erreur à afficher
          if (error.name !== "AbortError") {
            console.error("Erreur de partage :", error)
          }
        }
      } else {
        // Fallback vers Twitter
        const text = encodeURIComponent(shareText)
        window.open(
          `https://twitter.com/intent/tweet?text=${text}`,
          "_blank"
        )
        setShared(true)
        setTimeout(() => setShared(false), resetDelay)
      }
    },
    [canNativeShare, resetDelay]
  )

  return { shared, shareQuote, canNativeShare }
}
