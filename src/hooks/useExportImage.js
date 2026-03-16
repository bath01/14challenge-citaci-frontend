import { useState, useCallback } from "react"
import html2canvas from "html2canvas"

/**
 * Gère l'export d'un élément DOM en image téléchargeable
 */
export function useExportImage(resetDelay = 2000) {
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  /**
   * Capture un élément DOM et déclenche le téléchargement en PNG
   */
  const exportAsImage = useCallback(
    async (elementRef, filename = "citaci-quote.png") => {
      if (!elementRef?.current || exporting) return

      setExporting(true)
      try {
        const canvas = await html2canvas(elementRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          logging: false,
        })

        const link = document.createElement("a")
        link.download = filename
        link.href = canvas.toDataURL("image/png")
        link.click()

        setExported(true)
        setTimeout(() => setExported(false), resetDelay)
      } catch (error) {
        console.error("Erreur lors de l'export image :", error)
      } finally {
        setExporting(false)
      }
    },
    [exporting, resetDelay]
  )

  return { exporting, exported, exportAsImage }
}
