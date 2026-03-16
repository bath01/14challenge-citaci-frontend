import { categories } from "@/data/categories"
import { CI_ORANGE } from "@/data/constants"
import { useTheme } from "@/context/ThemeContext"

/**
 * Groupe de boutons pour filtrer par catégorie
 * Peut afficher le nombre de citations par catégorie via countFn
 */
export default function CategoryPills({ selected, onSelect, countFn = null }) {
  const { cardBorder, glassBg, textSecondary } = useTheme()

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = selected === category
        const label = countFn ? `${category} (${countFn(category)})` : category

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="rounded-3xl px-5 py-2 text-[13px] font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer"
            style={{
              border: isActive ? "none" : `1px solid ${cardBorder}`,
              background: isActive
                ? `linear-gradient(135deg, ${CI_ORANGE}, #FFa040)`
                : glassBg,
              color: isActive ? "#FFF" : textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
