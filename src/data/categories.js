/**
 * Catégories disponibles pour filtrer les citations
 * "Toutes" sert de valeur par défaut (pas de filtre)
 */
export const ALL_CATEGORIES_LABEL = "Toutes"

export const categories = [
  ALL_CATEGORIES_LABEL,
  "Sagesse",
  "Proverbes CI",
  "Motivation",
  "Leadership",
]

/**
 * Mapping entre les labels affichés et les slugs de l'API
 * L'API utilise des slugs en minuscule (sagesse, proverbe-ci, motivation, leadership)
 */
const CATEGORY_TO_SLUG = {
  Sagesse: "sagesse",
  "Proverbes CI": "proverbe-ci",
  Motivation: "motivation",
  Leadership: "leadership",
}

const SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([label, slug]) => [slug, label])
)

/**
 * Convertit un label de catégorie vers le slug API
 */
export function categoryToSlug(label) {
  return CATEGORY_TO_SLUG[label] || label
}

/**
 * Convertit un slug API vers le label d'affichage
 */
export function slugToCategory(slug) {
  return SLUG_TO_CATEGORY[slug] || slug
}
