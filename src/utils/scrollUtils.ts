/**
 * Fonction pour faire défiler la page vers une section spécifique avec une animation élégante
 * @param elementId - L'ID de l'élément vers lequel défiler
 * @param offset - Décalage en pixels par rapport au haut de l'élément (pour tenir compte des headers fixes)
 * @param duration - Durée de l'animation en millisecondes
 */
export const scrollToElement = (elementId: string, offset: number = 0, duration: number = 1000): void => {
  const targetElement = document.getElementById(elementId);
  
  if (!targetElement) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }

  // Ajouter une classe pour l'animation de surbrillance
  const highlightElement = () => {
    targetElement.classList.add('highlight-section');
    
    // Retirer la classe après l'animation
    setTimeout(() => {
      targetElement.classList.remove('highlight-section');
    }, 1500);
  };

  // Position de l'élément cible
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  
  // Position actuelle
  const startPosition = window.pageYOffset;
  
  // Distance à parcourir
  const distance = targetPosition - startPosition;
  
  // Fonction d'animation avec easing
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  let startTime: number | null = null;
  
  // Fonction d'animation
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Animation terminée, ajouter l'effet de surbrillance
      highlightElement();
    }
  };
  
  // Démarrer l'animation
  requestAnimationFrame(animation);
};
