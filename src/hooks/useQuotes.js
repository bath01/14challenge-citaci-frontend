import { useState, useCallback, useEffect } from "react"
import { ALL_CATEGORIES_LABEL } from "@/data/categories"
import { FADE_DURATION, MAX_HISTORY } from "@/data/constants"
import { getRandomQuote as fetchRandomQuote, getStats } from "@/services/quoteService"

/**
 * Gère la logique de sélection, filtrage et animation des citations
 * Utilise l'API si disponible, sinon fallback sur les données locales
 */
export function useQuotes() {
  const [currentQuote, setCurrentQuote] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES_LABEL)
  const [fadeState, setFadeState] = useState("in")
  const [history, setHistory] = useState([])
  const [totalQuotes, setTotalQuotes] = useState(0)
  const [loading, setLoading] = useState(false)

  /**
   * Récupère une citation aléatoire depuis le service
   */
  const fetchNewQuote = useCallback(
    async (category = selectedCategory) => {
      try {
        return await fetchRandomQuote(category)
      } catch (error) {
        console.error("Erreur lors du chargement de la citation :", error)
        return null
      }
    },
    [selectedCategory]
  )

  // Initialisation : première citation + stats
  useEffect(() => {
    async function init() {
      setLoading(true)
      const [quote, stats] = await Promise.all([
        fetchNewQuote(),
        getStats().catch(() => ({ totalCitations: 0 })),
      ])
      if (quote) {
        setCurrentQuote(quote)
        setHistory([quote])
      }
      setTotalQuotes(stats.totalCitations)
      setLoading(false)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Affiche une nouvelle citation avec animation de transition
   */
  const generateNewQuote = useCallback(() => {
    setFadeState("out")
    setTimeout(async () => {
      const newQuote = await fetchNewQuote()
      if (newQuote) {
        setCurrentQuote(newQuote)
        setHistory((prev) => [newQuote, ...prev].slice(0, MAX_HISTORY))
      }
      setFadeState("in")
    }, FADE_DURATION)
  }, [fetchNewQuote])

  /**
   * Change la catégorie et génère une citation correspondante
   */
  const changeCategory = useCallback(
    (category) => {
      setSelectedCategory(category)
      if (currentQuote) {
        setFadeState("out")
        setTimeout(async () => {
          const newQuote = await fetchNewQuote(category)
          if (newQuote) {
            setCurrentQuote(newQuote)
          }
          setFadeState("in")
        }, FADE_DURATION)
      }
    },
    [currentQuote, fetchNewQuote]
  )

  return {
    currentQuote,
    selectedCategory,
    fadeState,
    history,
    generateNewQuote,
    changeCategory,
    totalQuotes,
    loading,
  }
}
