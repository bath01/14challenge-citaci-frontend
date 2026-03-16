import { createContext, useContext, useState, useMemo } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  const theme = useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
      bg: darkMode ? "#0D0D0D" : "#FAFAF8",
      textPrimary: darkMode ? "#F5F5F3" : "#1A1A1A",
      textSecondary: darkMode ? "#A0A0A0" : "#6B6B6B",
      cardBg: darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.65)",
      cardBorder: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      glassBg: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)",
      glassBorder: darkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
      navBg: darkMode
        ? "rgba(13,13,13,0.85)"
        : "rgba(250,250,248,0.85)",
    }),
    [darkMode]
  )

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
