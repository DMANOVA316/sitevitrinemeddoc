import * as React from "react"

// Point de rupture définissant la largeur maximale pour un écran mobile
const MOBILE_BREAKPOINT = 768

/**
 * Hook personnalisé pour détecter si l'écran est en mode mobile
 * 
 * @returns {boolean} Indique si l'écran est considéré comme mobile
 * @description Utilise l'API matchMedia pour suivre dynamiquement la largeur de l'écran
 */
export function useIsMobile() {
  // État pour stocker si l'écran est mobile, initialement indéfini
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Effet pour mettre à jour l'état mobile lors du redimensionnement de la fenêtre
  React.useEffect(() => {
    // Créer un media query pour suivre la largeur de l'écran
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Fonction de mise à jour de l'état mobile
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Ajouter un écouteur pour les changements de taille d'écran
    mql.addEventListener("change", onChange)
    
    // Définir l'état initial
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Nettoyer l'écouteur d'événement à la destruction du composant
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Retourner un booléen indiquant si l'écran est mobile
  return !!isMobile
}
