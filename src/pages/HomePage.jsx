import { useRef } from "react"
import { CI_ORANGE, CI_GREEN } from "@/data/constants"
import { categories } from "@/data/categories"
import { useTheme } from "@/context/ThemeContext"
import CategoryPills from "@/components/ui/CategoryPills"
import SectionTitle from "@/components/ui/SectionTitle"
import QuoteCard from "@/components/quote/QuoteCard"
import QuoteActions from "@/components/quote/QuoteActions"

/**
 * Page d'accueil : hero, citation principale, stats, historique récent
 */
export default function HomePage({
  currentQuote,
  selectedCategory,
  fadeState,
  history,
  totalQuotes,
  favoritesCount,
  onNewQuote,
  onCategoryChange,
  onCopy,
  onShare,
  onToggleFavorite,
  onSpeak,
  onExportImage,
  copied,
  shared,
  isFavorite,
  speaking,
  exporting,
  exported,
}) {
  const { textPrimary, textSecondary, glassBg, glassBorder, timePalette } =
    useTheme()

  // Ref vers la carte principale pour l'export image
  const quoteCardRef = useRef(null)

  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
      {/* Hero */}
      <div className="text-center pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 max-w-[700px] mx-auto">
        {/* Badge drapeau + indicateur moment de la journée */}
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
          <div
            className="inline-flex items-center gap-[3px] px-4 py-1.5 rounded-full backdrop-blur-[10px]"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: CI_ORANGE }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full border border-gray-300"
              style={{ background: "#FFF" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: CI_GREEN }}
            />
            <span
              className="text-xs ml-2 font-medium"
              style={{
                color: textSecondary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Fierté ivoirienne
            </span>
          </div>

          {/* Badge moment de la journée */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-[10px]"
            style={{
              background: timePalette.gradientFrom,
              border: `1px solid ${glassBorder}`,
            }}
          >
            <span className="text-xs">{timePalette.emoji}</span>
            <span
              className="text-xs font-medium"
              style={{
                color: timePalette.accent,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {timePalette.label}
            </span>
          </div>
        </div>

        {/* Titre */}
        <h1
          className="text-3xl sm:text-[42px] lg:text-[52px] font-bold leading-[1.15] mb-4 sm:mb-5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Des citations qui{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${timePalette.accent}, ${timePalette.accentSecondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            inspirent
          </span>{" "}
          l&apos;Afrique
        </h1>

        {/* Sous-titre */}
        <p
          className="text-sm sm:text-base lg:text-[17px] leading-[1.7] mb-8 sm:mb-10 max-w-[520px] mx-auto"
          style={{
            color: textSecondary,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Découvrez la sagesse africaine et les paroles de grands leaders.
          Partagez l&apos;inspiration avec le monde entier.
        </p>

        {/* Filtres par catégorie */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <CategoryPills
            selected={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>
      </div>

      {/* Carte de citation principale */}
      {currentQuote && (
        <div className="max-w-[720px] mx-auto mb-10 sm:mb-16">
          <QuoteCard quote={currentQuote} large fadeState={fadeState} exportRef={quoteCardRef}>
            <QuoteActions
              onNewQuote={onNewQuote}
              onCopy={onCopy}
              onShare={onShare}
              onToggleFavorite={onToggleFavorite}
              onSpeak={onSpeak}
              onExportImage={() => onExportImage(quoteCardRef)}
              copied={copied}
              shared={shared}
              isFavorite={isFavorite}
              speaking={speaking}
              exporting={exporting}
              exported={exported}
            />
          </QuoteCard>
        </div>
      )}

      {/* Barre de statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-[720px] mx-auto mb-12 sm:mb-20">
        {[
          { value: totalQuotes, label: "Citations" },
          { value: categories.length - 1, label: "Catégories" },
          { value: "∞", label: "Inspiration" },
          { value: favoritesCount, label: "Favoris" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center py-4 sm:py-5 px-3 sm:px-4 rounded-2xl backdrop-blur-[10px]"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
            }}
          >
            <div
              className="text-2xl sm:text-[28px] font-bold"
              style={{
                color: i % 2 === 0 ? timePalette.accent : timePalette.accentSecondary,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-[10px] sm:text-xs mt-1"
              style={{
                color: textSecondary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Citations récentes */}
      {history.length > 1 && (
        <div className="mb-12 sm:mb-20">
          <SectionTitle
            title="Vues récemment"
            subtitle="Les dernières citations affichées"
          />
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5">
            {history.slice(1, 5).map((quote, i) => (
              <div
                key={i}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                <QuoteCard quote={quote} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
