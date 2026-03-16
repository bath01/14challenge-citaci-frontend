import { useState, useCallback, useRef } from "react"

/**
 * Gère la lecture vocale d'un texte via la Web Speech API
 * Utilise la synthèse vocale native du navigateur
 */
export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  /**
   * Lit le texte à voix haute ou arrête la lecture en cours
   */
  const toggleSpeech = useCallback((text) => {
    if (!text || !window.speechSynthesis) return

    // Si déjà en lecture, on stoppe
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "fr-FR"
    utterance.rate = 0.9
    utterance.pitch = 1

    // Cherche une voix française si disponible
    const voices = window.speechSynthesis.getVoices()
    const frenchVoice = voices.find((v) => v.lang.startsWith("fr"))
    if (frenchVoice) utterance.voice = frenchVoice

    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [speaking])

  /**
   * Stoppe toute lecture en cours
   */
  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  return { speaking, toggleSpeech, stopSpeech }
}
