import { useState, useCallback, useEffect } from "react"
import { quotes } from "@/data/quotes"
import { ALL_CATEGORIES_LABEL } from "@/data/categories"
import { FADE_DURATION, MAX_HISTORY } from "@/data/constants"

/**
 * Gère la logique de sélection, filtrage et animation des citations
 */
export function useQuotes() {
  const [currentQuote, setCurrentQuote] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES_LABEL)
  const [fadeState, setFadeState] = useState("in")
  const [history, setHistory] = useState([])

  const getRandomQuote = useCallback(
    (category = selectedCategory) => {
      const pool =
        category === ALL_CATEGORIES_LABEL
          ? quotes
          : quotes.filter((q) => q.category === category)
      const available = pool.filter((q) => q.text !== currentQuote?.text)
      const list = available.length > 0 ? available : pool
      return list[Math.floor(Math.random() * list.length)]
    },
    [selectedCategory, currentQuote]
  )

  // Initialisation au premier rendu
  useEffect(() => {
    const firstQuote = getRandomQuote()
    setCurrentQuote(firstQuote)
    setHistory([firstQuote])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Affiche une nouvelle citation avec animation de transition
   */
  const generateNewQuote = useCallback(() => {
    setFadeState("out")
    setTimeout(() => {
      const newQuote = getRandomQuote()
      setCurrentQuote(newQuote)
      setHistory((prev) => [newQuote, ...prev].slice(0, MAX_HISTORY))
      setFadeState("in")
    }, FADE_DURATION)
  }, [getRandomQuote])

  /**
   * Change la catégorie et génère une citation correspondante
   */
  const changeCategory = useCallback(
    (category) => {
      setSelectedCategory(category)
      if (currentQuote) {
        setFadeState("out")
        setTimeout(() => {
          const newQuote = getRandomQuote(category)
          setCurrentQuote(newQuote)
          setFadeState("in")
        }, FADE_DURATION)
      }
    },
    [currentQuote, getRandomQuote]
  )

  /**
   * Retourne les citations filtrées par catégorie
   */
  const getFilteredQuotes = useCallback(
    (category) =>
      category === ALL_CATEGORIES_LABEL
        ? quotes
        : quotes.filter((q) => q.category === category),
    []
  )

  return {
    currentQuote,
    selectedCategory,
    fadeState,
    history,
    generateNewQuote,
    changeCategory,
    getFilteredQuotes,
    totalQuotes: quotes.length,
  }
}
