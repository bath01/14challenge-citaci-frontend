import fetchApi from "./api"
import { quotes as localQuotes } from "@/data/quotes"
import {
  ALL_CATEGORIES_LABEL,
  categoryToSlug,
  slugToCategory,
} from "@/data/categories"

/**
 * Indique si l'app utilise l'API ou les données locales
 */
const USE_API = Boolean(import.meta.env.VITE_API_URL)

/**
 * Normalise une citation API vers le format interne de l'app
 * Convertit authorDescription → role et le slug catégorie → label
 */
function normalizeQuote(apiQuote) {
  return {
    id: apiQuote.id,
    text: apiQuote.text,
    author: apiQuote.author,
    role: apiQuote.authorDescription || apiQuote.role || "",
    category: slugToCategory(apiQuote.category),
  }
}

/**
 * Retourne les citations locales filtrées (fallback)
 */
function getLocalQuotes(category = ALL_CATEGORIES_LABEL) {
  return category === ALL_CATEGORIES_LABEL
    ? localQuotes
    : localQuotes.filter((q) => q.category === category)
}

/**
 * Retourne une citation locale aléatoire (fallback)
 */
function getLocalRandomQuote(category = ALL_CATEGORIES_LABEL) {
  const pool = getLocalQuotes(category)
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Récupère toutes les citations, avec filtre optionnel par catégorie
 * Fallback automatique sur les données locales si l'API échoue
 */
export async function getQuotes(category = ALL_CATEGORIES_LABEL) {
  if (!USE_API) return getLocalQuotes(category)

  try {
    const params =
      category !== ALL_CATEGORIES_LABEL
        ? `?category=${categoryToSlug(category)}`
        : ""
    const response = await fetchApi(`/citations${params}`)
    return response.data.map(normalizeQuote)
  } catch (error) {
    console.warn("API indisponible, fallback local :", error.message)
    return getLocalQuotes(category)
  }
}

/**
 * Récupère une citation aléatoire, avec filtre optionnel par catégorie
 * Fallback automatique sur les données locales si l'API échoue
 */
export async function getRandomQuote(category = ALL_CATEGORIES_LABEL) {
  if (!USE_API) return getLocalRandomQuote(category)

  try {
    const params =
      category !== ALL_CATEGORIES_LABEL
        ? `?category=${categoryToSlug(category)}`
        : ""
    const response = await fetchApi(`/citations/random${params}`)
    return normalizeQuote(response.data)
  } catch (error) {
    console.warn("API indisponible, fallback local :", error.message)
    return getLocalRandomQuote(category)
  }
}

/**
 * Récupère les statistiques globales depuis l'API
 * Fallback automatique sur un comptage local si l'API échoue
 */
export async function getStats() {
  if (!USE_API) {
    return { totalCitations: localQuotes.length, totalCategories: 4 }
  }

  try {
    const response = await fetchApi("/stats")
    return response.data
  } catch (error) {
    console.warn("API stats indisponible, fallback local :", error.message)
    return { totalCitations: localQuotes.length, totalCategories: 4 }
  }
}
