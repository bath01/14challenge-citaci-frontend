import { useState, useEffect } from "react"
import { ALL_CATEGORIES_LABEL } from "@/data/categories"
import { CI_ORANGE } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"
import { getQuotes } from "@/services/quoteService"
import SectionTitle from "@/components/ui/SectionTitle"
import CategoryPills from "@/components/ui/CategoryPills"

/**
 * Page d'exploration : toutes les citations filtrables par catégorie
 */
export default function ExplorePage({ onToggleFavorite, isFavorite }) {
  const [explorerCategory, setExplorerCategory] = useState(ALL_CATEGORIES_LABEL)
  const [allQuotes, setAllQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const { textPrimary, textSecondary, cardBg, cardBorder } = useTheme()

  // Charge toutes les citations au montage
  useEffect(() => {
    async function loadQuotes() {
      setLoading(true)
      try {
        const quotes = await getQuotes()
        setAllQuotes(quotes)
      } catch (error) {
        console.error("Erreur lors du chargement des citations :", error)
      }
      setLoading(false)
    }
    loadQuotes()
  }, [])

  const filteredQuotes =
    explorerCategory === ALL_CATEGORIES_LABEL
      ? allQuotes
      : allQuotes.filter((q) => q.category === explorerCategory)

  /**
   * Retourne le nombre de citations pour une catégorie donnée
   */
  const getCountForCategory = (category) =>
    category === ALL_CATEGORIES_LABEL
      ? allQuotes.length
      : allQuotes.filter((q) => q.category === category).length

  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="pt-8 sm:pt-12 pb-8">
        <SectionTitle
          title="Explorer"
          subtitle="Parcourez toutes les citations par catégorie"
        />

        <div className="mb-6 sm:mb-8">
          <CategoryPills
            selected={explorerCategory}
            onSelect={setExplorerCategory}
            countFn={getCountForCategory}
          />
        </div>

        {loading ? (
          <div
            className="text-center py-12"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Chargement des citations...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5">
            {filteredQuotes.map((quote, i) => (
              <div
                key={quote.id || i}
                className="animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="rounded-2xl p-4 sm:p-5 transition-transform duration-300 cursor-pointer hover:-translate-y-1 backdrop-blur-[12px]"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <p
                    className="text-sm sm:text-[15px] leading-[1.7] italic mb-4"
                    style={{
                      color: textPrimary,
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    &laquo; {quote.text} &raquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-[13px] font-semibold m-0"
                        style={{
                          color: textPrimary,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {quote.author}
                      </p>
                      <p
                        className="text-[11px] m-0 mt-0.5"
                        style={{
                          color: textSecondary,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {quote.role}
                      </p>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(quote)}
                      className="bg-transparent border-none cursor-pointer text-xl transition-all duration-300"
                      style={{
                        color: isFavorite(quote) ? CI_ORANGE : textSecondary,
                      }}
                    >
                      {isFavorite(quote) ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
