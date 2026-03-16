/**
 * Configuration de base pour les appels API
 * À compléter avec l'URL du backend quand elle sera disponible
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

/**
 * Effectue un appel HTTP et retourne le JSON
 * Gère les erreurs de manière centralisée
 */
async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export default fetchApi
