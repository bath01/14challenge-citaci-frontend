import { CI_ORANGE, CI_GREEN } from "@/data/constants"

/**
 * Avatar circulaire avec les initiales de l'auteur
 * dégradé aux couleurs ivoiriennes
 */
export default function Avatar({ name, size = 36 }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")

  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${CI_ORANGE}, ${CI_GREEN})`,
        fontSize: size > 40 ? 15 : 12,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {initials}
    </div>
  )
}
