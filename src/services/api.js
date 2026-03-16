/**
 * Configuration de base pour les appels API
 * En dev, les requêtes passent par le proxy Vite pour éviter les erreurs CORS
 */
const API_BASE_URL = "https://api.citaci.chalenge14.com/api"

/**
 * Effectue un appel HTTP et retourne le JSON
 * Gère les erreurs de manière centralisée
 */
async function fetchApi(endpoint, options = {}) {
  const { headers: customHeaders, body, ...restOptions } = options

  // N'ajoute Content-Type que s'il y a un body (POST/PUT)
  // Évite le preflight CORS inutile sur les requêtes GET
  const headers = {
    ...customHeaders,
  }
  if (body) {
    headers["Content-Type"] = "application/json"
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    body,
    ...restOptions,
  })

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export default fetchApi
