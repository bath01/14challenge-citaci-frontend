import { CI_ORANGE, CI_WHITE, CI_GREEN } from "@/data/constants"

/**
 * Barre aux couleurs du drapeau ivoirien (orange, blanc, vert)
 */
export default function FlagBar({ width = 32, height = 4 }) {
  return (
    <div
      className="flex overflow-hidden rounded-sm"
      style={{ width, height, border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="flex-1" style={{ background: CI_ORANGE }} />
      <div className="flex-1" style={{ background: CI_WHITE }} />
      <div className="flex-1" style={{ background: CI_GREEN }} />
    </div>
  )
}
