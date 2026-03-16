import { CI_ORANGE } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"

/**
 * Bouton d'action utilisé dans les cartes de citation
 * (nouvelle citation, copier, partager, favori)
 */
export default function ActionButton({ icon, label, onClick, primary = false, active = false }) {
  const { cardBorder, glassBg, textSecondary } = useTheme()

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer hover:brightness-105 active:scale-[0.97]"
      style={{
        flex: primary ? 1 : "none",
        border: `1px solid ${active ? CI_ORANGE : cardBorder}`,
        background: primary
          ? `linear-gradient(135deg, ${CI_ORANGE}, #FFa040)`
          : active
            ? `${CI_ORANGE}12`
            : glassBg,
        color: primary ? "#FFF" : active ? CI_ORANGE : textSecondary,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span className="text-base">{icon}</span> {label}
    </button>
  )
}
