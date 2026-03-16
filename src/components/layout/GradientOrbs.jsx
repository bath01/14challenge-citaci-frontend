import { CI_ORANGE, CI_GREEN } from "@/data/constants"

/**
 * Orbes de dégradé décoratifs en arrière-plan (orange en haut, vert en bas)
 */
export default function GradientOrbs() {
  return (
    <>
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${CI_ORANGE}22 0%, transparent 70%)`,
          top: -200,
          right: -100,
        }}
      />
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${CI_GREEN}18 0%, transparent 70%)`,
          bottom: -150,
          left: -100,
        }}
      />
    </>
  )
}
