import { CI_ORANGE, CI_GREEN } from "@/data/constants"

/**
 * Badge coloré indiquant la catégorie d'une citation
 * Vert pour "Proverbes CI", orange pour les autres
 */
export default function CategoryBadge({ category }) {
  const isProverbesCI = category === "Proverbes CI"

  return (
    <span
      className="ml-auto rounded-full px-3 py-1 text-[11px] font-medium"
      style={{
        background: isProverbesCI ? `${CI_GREEN}18` : `${CI_ORANGE}15`,
        color: isProverbesCI ? CI_GREEN : CI_ORANGE,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {category}
    </span>
  )
}
