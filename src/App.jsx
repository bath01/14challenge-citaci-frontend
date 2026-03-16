import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { useQuotes } from "@/hooks/useQuotes"
import { useFavorites } from "@/hooks/useFavorites"
import { useClipboard } from "@/hooks/useClipboard"
import { useShare } from "@/hooks/useShare"
import { CI_ORANGE } from "@/data/constants"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import GradientOrbs from "@/components/layout/GradientOrbs"

import HomePage from "@/pages/HomePage"
import ExplorePage from "@/pages/ExplorePage"
import FavoritesPage from "@/pages/FavoritesPage"
import AboutPage from "@/pages/AboutPage"

export default function App() {
  const [page, setPage] = useState("home")
  const theme = useTheme()

  const {
    currentQuote,
    selectedCategory,
    fadeState,
    history,
    generateNewQuote,
    changeCategory,
    totalQuotes,
  } = useQuotes()

  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { copied, copyToClipboard } = useClipboard()
  const { shared, shareOnTwitter } = useShare()

  /**
   * Copie la citation courante dans le presse-papier
   */
  const handleCopy = () => {
    if (!currentQuote) return
    copyToClipboard(`"${currentQuote.text}" — ${currentQuote.author}`)
  }

  /**
   * Partage la citation courante sur Twitter
   */
  const handleShare = () => shareOnTwitter(currentQuote)

  return (
    <div
      className="relative overflow-hidden min-h-screen"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        background: theme.bg,
        color: theme.textPrimary,
      }}
    >
      <GradientOrbs />
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        favoritesCount={favorites.length}
      />
      {/* Spacer pour compenser la navbar fixée */}
      <div className="h-14 sm:h-16" />

      {page === "home" && (
        <HomePage
          currentQuote={currentQuote}
          selectedCategory={selectedCategory}
          fadeState={fadeState}
          history={history}
          totalQuotes={totalQuotes}
          favoritesCount={favorites.length}
          onNewQuote={generateNewQuote}
          onCategoryChange={changeCategory}
          onCopy={handleCopy}
          onShare={handleShare}
          onToggleFavorite={() => currentQuote && toggleFavorite(currentQuote)}
          copied={copied}
          shared={shared}
          isFavorite={isFavorite(currentQuote)}
        />
      )}
      {page === "explore" && (
        <ExplorePage
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      {page === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onNavigate={setPage}
        />
      )}
      {page === "about" && <AboutPage />}

      <Footer />
    </div>
  )
}
