import { CI_ORANGE } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"
import SectionTitle from "@/components/ui/SectionTitle"

/**
 * Page des favoris : affiche les citations sauvegardées par l'utilisateur
 */
export default function FavoritesPage({ favorites, onToggleFavorite, onNavigate }) {
  const { textPrimary, textSecondary, cardBg, cardBorder, glassBg, glassBorder } =
    useTheme()

  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="pt-8 sm:pt-12 pb-8">
        <SectionTitle
          title="Mes favoris"
          subtitle={`${favorites.length} citation${favorites.length > 1 ? "s" : ""} sauvegardée${favorites.length > 1 ? "s" : ""}`}
        />

        {favorites.length === 0 ? (
          <div
            className="text-center py-12 sm:py-20 px-4 rounded-2xl"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
            }}
          >
            <div className="text-4xl sm:text-5xl mb-4">☆</div>
            <p
              className="text-base sm:text-lg m-0 mb-2"
              style={{
                color: textPrimary,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Aucun favori
            </p>
            <p
              className="text-xs sm:text-sm"
              style={{
                color: textSecondary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Cliquez sur l&apos;étoile pour sauvegarder vos citations préférées
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="mt-6 px-6 py-2.5 rounded-xl border-none text-white text-sm font-medium cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${CI_ORANGE}, #FFa040)`,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Découvrir des citations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5">
            {favorites.map((quote, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 sm:p-5 backdrop-blur-[12px]"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderLeft: `3px solid ${CI_ORANGE}`,
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
                    style={{ color: CI_ORANGE }}
                  >
                    ★
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
