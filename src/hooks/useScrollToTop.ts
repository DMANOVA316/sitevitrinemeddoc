import { useEffect } from 'react';

/**
 * Hook personnalisé qui fait défiler la page vers le haut lors du montage du composant
 */
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
};

export default useScrollToTop;
