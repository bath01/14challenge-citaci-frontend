import { useTheme } from "@/context/ThemeContext"
import ActionButton from "@/components/ui/ActionButton"

/**
 * Barre d'actions sous une citation :
 * nouvelle citation, écouter, copier, exporter image, partager, favori
 */
export default function QuoteActions({
  onNewQuote,
  onCopy,
  onShare,
  onToggleFavorite,
  onSpeak,
  onExportImage,
  copied,
  shared,
  isFavorite,
  speaking,
  exported,
  exporting,
}) {
  const { cardBorder } = useTheme()

  return (
    <div
      className="flex flex-wrap gap-2 sm:gap-2.5 pt-5"
      style={{ borderTop: `1px solid ${cardBorder}` }}
    >
      <ActionButton icon="↻" label="Nouvelle" onClick={onNewQuote} primary />
      <ActionButton
        icon={speaking ? "◼" : "🔊"}
        label={speaking ? "Stop" : "Écouter"}
        onClick={onSpeak}
        active={speaking}
      />
      <ActionButton
        icon="✎"
        label={copied ? "Copié !" : "Copier"}
        onClick={onCopy}
        active={copied}
      />
      <ActionButton
        icon="📷"
        label={exported ? "Exporté !" : exporting ? "Export..." : "Image"}
        onClick={onExportImage}
        active={exported}
      />
      <ActionButton
        icon="↗"
        label={shared ? "Partagé !" : "Partager"}
        onClick={onShare}
        active={shared}
      />
      <ActionButton
        icon={isFavorite ? "★" : "☆"}
        label={isFavorite ? "Retiré" : "Favori"}
        onClick={onToggleFavorite}
        active={isFavorite}
      />
    </div>
  )
}
