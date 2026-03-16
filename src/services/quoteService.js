import fetchApi from "./api"
import { quotes as localQuotes } from "@/data/quotes"
import { ALL_CATEGORIES_LABEL } from "@/data/categories"

/**
 * Indique si l'app utilise l'API ou les données locales
 * Passer à true quand le backend sera prêt
 */
const USE_API = Boolean(import.meta.env.VITE_API_URL)

/**
 * Récupère toutes les citations, avec filtre optionnel par catégorie
 */
export async function getQuotes(category = ALL_CATEGORIES_LABEL) {
  if (!USE_API) {
    const filtered =
      category === ALL_CATEGORIES_LABEL
        ? localQuotes
        : localQuotes.filter((q) => q.category === category)
    return filtered
  }

  const params = category !== ALL_CATEGORIES_LABEL ? `?category=${category}` : ""
  return fetchApi(`/quotes${params}`)
}

/**
 * Récupère une citation aléatoire, avec filtre optionnel par catégorie
 */
export async function getRandomQuote(category = ALL_CATEGORIES_LABEL) {
  if (!USE_API) {
    const pool =
      category === ALL_CATEGORIES_LABEL
        ? localQuotes
        : localQuotes.filter((q) => q.category === category)
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const params = category !== ALL_CATEGORIES_LABEL ? `?category=${category}` : ""
  return fetchApi(`/quotes/random${params}`)
}

/**
 * Récupère les catégories disponibles depuis l'API
 */
export async function getCategories() {
  if (!USE_API) {
    const { categories } = await import("@/data/categories")
    return categories
  }

  return fetchApi("/categories")
}
