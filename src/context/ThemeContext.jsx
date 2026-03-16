import { createContext, useContext, useState, useMemo, useEffect } from "react"

const ThemeContext = createContext(null)

/**
 * Détermine la période de la journée selon l'heure actuelle
 * Retourne : "morning" | "afternoon" | "evening" | "night"
 */
function getTimePeriod() {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return "morning"
  if (hour >= 12 && hour < 17) return "afternoon"
  if (hour >= 17 && hour < 21) return "evening"
  return "night"
}

/**
 * Palette d'accent dynamique selon le moment de la journée
 * Apporte une ambiance qui évolue au fil de la journée
 */
const TIME_PALETTES = {
  morning: {
    accent: "#FFA726",
    accentSecondary: "#FFD54F",
    gradientFrom: "rgba(255, 167, 38, 0.08)",
    gradientTo: "rgba(255, 213, 79, 0.04)",
    label: "Matin",
    emoji: "☀️",
  },
  afternoon: {
    accent: "#FF8C00",
    accentSecondary: "#009E49",
    gradientFrom: "rgba(255, 140, 0, 0.08)",
    gradientTo: "rgba(0, 158, 73, 0.04)",
    label: "Après-midi",
    emoji: "🌤️",
  },
  evening: {
    accent: "#FF7043",
    accentSecondary: "#CE93D8",
    gradientFrom: "rgba(255, 112, 67, 0.08)",
    gradientTo: "rgba(206, 147, 216, 0.04)",
    label: "Soirée",
    emoji: "🌅",
  },
  night: {
    accent: "#7C4DFF",
    accentSecondary: "#448AFF",
    gradientFrom: "rgba(124, 77, 255, 0.08)",
    gradientTo: "rgba(68, 138, 255, 0.04)",
    label: "Nuit",
    emoji: "🌙",
  },
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [timePeriod, setTimePeriod] = useState(getTimePeriod)

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  // Met à jour la période toutes les minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePeriod(getTimePeriod())
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  const theme = useMemo(() => {
    const palette = TIME_PALETTES[timePeriod]
    return {
      darkMode,
      toggleDarkMode,
      timePeriod,
      timePalette: palette,
      bg: darkMode ? "#0D0D0D" : "#FAFAF8",
      textPrimary: darkMode ? "#F5F5F3" : "#1A1A1A",
      textSecondary: darkMode ? "#A0A0A0" : "#6B6B6B",
      cardBg: darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.65)",
      cardBorder: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      glassBg: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)",
      glassBorder: darkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.6)",
      navBg: darkMode ? "rgba(13,13,13,0.85)" : "rgba(250,250,248,0.85)",
    }
  }, [darkMode, timePeriod])

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider")
  }
  return context
}
