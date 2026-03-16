import { useTheme } from "@/context/ThemeContext"

/**
 * Titre de section réutilisable avec sous-titre optionnel
 */
export default function SectionTitle({ title, subtitle }) {
  const { textPrimary, textSecondary } = useTheme()

  return (
    <div className="mb-8">
      <h2
        className="text-[32px] font-bold mb-2"
        style={{
          color: textPrimary,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[15px] m-0"
          style={{
            color: textSecondary,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
