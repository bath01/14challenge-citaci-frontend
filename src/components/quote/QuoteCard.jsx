import { CI_ORANGE, CI_GREEN } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"
import Avatar from "@/components/ui/Avatar"
import CategoryBadge from "@/components/ui/CategoryBadge"

/**
 * Carte de citation avec effet glassmorphism
 * Mode "large" pour la carte principale, mode compact pour les grilles
 */
export default function QuoteCard({
  quote,
  large = false,
  fadeState = "in",
  children,
}) {
  const { textPrimary, textSecondary, cardBg, cardBorder, glassBg, glassBorder } =
    useTheme()

  return (
    <div
      className={`relative rounded-2xl transition-all duration-500 ${large ? "px-5 py-8 sm:px-10 sm:py-12" : ""}`}
      style={{
        background: large ? glassBg : cardBg,
        backdropFilter: large ? "blur(24px)" : "blur(12px)",
        WebkitBackdropFilter: large ? "blur(24px)" : "blur(12px)",
        border: `1px solid ${large ? glassBorder : cardBorder}`,
        padding: large ? undefined : "28px 24px",
        opacity: large && fadeState === "out" ? 0 : 1,
        transform:
          large && fadeState === "out"
            ? "translateY(20px) scale(0.98)"
            : "translateY(0) scale(1)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Guillemet ouvrant */}
      <div
        className="leading-none"
        style={{
          fontSize: large ? 64 : 36,
          color: CI_ORANGE,
          opacity: 0.3,
          fontFamily: "Georgia, serif",
          marginBottom: large ? 16 : 8,
        }}
      >
        &ldquo;
      </div>

      {/* Texte de la citation */}
      <p
        className={`italic font-normal ${large ? "text-lg sm:text-2xl" : ""}`}
        style={{
          fontSize: large ? undefined : 16,
          lineHeight: 1.7,
          color: textPrimary,
          margin: `0 0 ${large ? 28 : 16}px`,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {quote.text}
      </p>

      {/* Auteur */}
      <div
        className="flex items-center gap-3"
        style={{ marginBottom: children ? 24 : 0 }}
      >
        <Avatar name={quote.author} size={large ? 44 : 36} />
        <div>
          <p
            className="font-semibold m-0"
            style={{
              fontSize: large ? 15 : 13,
              color: textPrimary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {quote.author}
          </p>
          <p
            className="m-0"
            style={{
              fontSize: large ? 13 : 11,
              color: textSecondary,
              marginTop: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {quote.role}
          </p>
        </div>
        <CategoryBadge category={quote.category} />
      </div>

      {/* Zone d'actions (boutons) injectée via children */}
      {children}

      {/* Guillemet fermant */}
      <div
        className="absolute leading-none"
        style={{
          bottom: large ? 36 : 20,
          right: large ? 32 : 20,
          fontSize: large ? 64 : 36,
          color: CI_GREEN,
          opacity: 0.2,
          fontFamily: "Georgia, serif",
        }}
      >
        &rdquo;
      </div>
    </div>
  )
}
