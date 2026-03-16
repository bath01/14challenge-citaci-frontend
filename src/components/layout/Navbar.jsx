import { useState } from "react"
import { CI_ORANGE } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"
import FlagBar from "@/components/ui/FlagBar"

const NAV_ITEMS = [
  { key: "home", label: "Accueil" },
  { key: "explore", label: "Explorer" },
  { key: "favorites", label: "Favoris" },
  { key: "about", label: "À propos" },
]

/**
 * Barre de navigation principale avec logo, liens, toggle dark mode
 * Menu hamburger sur mobile
 */
export default function Navbar({ currentPage, onNavigate, favoritesCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { darkMode, toggleDarkMode, textPrimary, textSecondary, cardBorder, navBg } =
    useTheme()

  const handleNavigate = (page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] px-4 sm:px-8 lg:px-12"
      style={{
        background: navBg,
        borderBottom: `1px solid ${cardBorder}`,
      }}
    >
      <div className="flex items-center justify-between h-14 sm:h-16 max-w-[1200px] mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigate("home")}
        >
          <FlagBar />
          <span
            className="text-lg sm:text-xl font-bold tracking-tight"
            style={{
              color: textPrimary,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            CitaCI
          </span>
        </div>

        {/* Bouton hamburger (mobile) */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-9 h-9 gap-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-0.5 rounded-full transition-all duration-300"
            style={{
              background: textPrimary,
              transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 rounded-full transition-all duration-300"
            style={{
              background: textPrimary,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 rounded-full transition-all duration-300"
            style={{
              background: textPrimary,
              transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>

        {/* Liens de navigation (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key
            const displayLabel =
              item.key === "favorites"
                ? `${item.label} (${favoritesCount})`
                : item.label

            return (
              <span
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className="cursor-pointer transition-all duration-300 text-sm pb-1"
                style={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? CI_ORANGE : textSecondary,
                  borderBottom: isActive
                    ? `2px solid ${CI_ORANGE}`
                    : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {displayLabel}
              </span>
            )
          })}

          {/* Toggle dark mode */}
          <div
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer text-base transition-all duration-300"
            style={{
              background: darkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            {darkMode ? "☀" : "☾"}
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-1 pb-4"
          style={{ borderTop: `1px solid ${cardBorder}` }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key
            const displayLabel =
              item.key === "favorites"
                ? `${item.label} (${favoritesCount})`
                : item.label

            return (
              <span
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className="cursor-pointer py-3 px-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? CI_ORANGE : textSecondary,
                  background: isActive ? `${CI_ORANGE}10` : "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {displayLabel}
              </span>
            )
          })}

          {/* Toggle dark mode mobile */}
          <div
            onClick={toggleDarkMode}
            className="flex items-center gap-2 py-3 px-2 cursor-pointer text-sm"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span className="text-base">{darkMode ? "☀" : "☾"}</span>
            {darkMode ? "Mode clair" : "Mode sombre"}
          </div>
        </div>
      )}
    </nav>
  )
}
