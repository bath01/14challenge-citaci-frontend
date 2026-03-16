import { useTheme } from "@/context/ThemeContext"

/**
 * Orbes de dégradé décoratifs en arrière-plan
 * Les couleurs s'adaptent au moment de la journée
 */
export default function GradientOrbs() {
  const { timePalette } = useTheme()

  return (
    <>
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-colors duration-[3000ms]"
        style={{
          background: `radial-gradient(circle, ${timePalette.accent}22 0%, transparent 70%)`,
          top: -200,
          right: -100,
        }}
      />
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-colors duration-[3000ms]"
        style={{
          background: `radial-gradient(circle, ${timePalette.accentSecondary}18 0%, transparent 70%)`,
          bottom: -150,
          left: -100,
        }}
      />
    </>
  )
}
