/**
 * Utilitaire pour gérer le défilement vers les ancres lors de la navigation
 * 
 * Ce fichier contient des fonctions pour détecter les ancres dans les URL
 * et faire défiler la page vers les éléments correspondants de manière fluide.
 */

/**
 * Fonction pour détecter et gérer le défilement vers les ancres après la navigation
 * Cette fonction doit être appelée après chaque changement de route
 */
export const handleAnchorScroll = (): void => {
  // Récupérer le hash de l'URL (partie après le #)
  const hash = window.location.hash;
  
  // Si aucun hash n'est présent, ne rien faire
  if (!hash) return;
  
  // Extraire l'ID de l'élément cible (sans le #)
  const targetId = hash.substring(1);
  
  // Trouver l'élément cible dans le DOM
  const targetElement = document.getElementById(targetId);
  
  // Si l'élément n'existe pas, ne rien faire
  if (!targetElement) return;
  
  // Attendre un court instant pour s'assurer que la page est complètement chargée
  setTimeout(() => {
    // Calculer la position de défilement
    const offset = 80; // Offset pour tenir compte du header fixe
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    // Faire défiler la page vers l'élément cible avec une animation fluide
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Ajouter un effet de surbrillance à l'élément cible
    targetElement.classList.add('highlight-section');
    
    // Retirer l'effet de surbrillance après l'animation
    setTimeout(() => {
      targetElement.classList.remove('highlight-section');
    }, 1500);
  }, 100);
};

/**
 * Hook personnalisé pour gérer le défilement vers les ancres
 * Ce hook doit être utilisé dans le composant App ou dans un composant de layout
 */
export const setupAnchorScrolling = (): void => {
  // Ajouter un écouteur d'événements pour détecter les changements de hash
  window.addEventListener('hashchange', handleAnchorScroll);
  
  // Gérer le défilement initial si un hash est présent dans l'URL
  if (window.location.hash) {
    handleAnchorScroll();
  }
};
