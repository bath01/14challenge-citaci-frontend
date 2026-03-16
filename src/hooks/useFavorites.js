import { useState, useCallback } from "react"

/**
 * Gère la liste des citations favorites de l'utilisateur
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = useCallback((quote) => {
    setFavorites((prev) =>
      prev.find((f) => f.text === quote.text)
        ? prev.filter((f) => f.text !== quote.text)
        : [...prev, quote]
    )
  }, [])

  const isFavorite = useCallback(
    (quote) => favorites.some((f) => f.text === quote?.text),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite }
}
