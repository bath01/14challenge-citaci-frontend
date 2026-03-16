import { useTheme } from "@/context/ThemeContext"
import FlagBar from "@/components/ui/FlagBar"

/**
 * Pied de page avec logo et mention du challenge
 */
export default function Footer() {
  const { textSecondary, cardBorder } = useTheme()

  return (
    <footer
      className="relative z-[1] mt-12 px-4 sm:px-8 lg:px-12 py-6 sm:py-8"
      style={{ borderTop: `1px solid ${cardBorder}` }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <FlagBar width={24} />
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            CitaCI
          </span>
        </div>
        <p
          className="text-[10px] sm:text-xs m-0 text-center"
          style={{
            color: textSecondary,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Challenge 14-14-14 — Jour 1 — Mars 2026 — Fait avec fierté en Côte
          d&apos;Ivoire
        </p>
      </div>
    </footer>
  )
}
