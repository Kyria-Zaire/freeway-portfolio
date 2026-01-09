/**
 * useMediaQuery.ts - Hook pour détecter les breakpoints
 * 
 * Permet de gérer le responsive et d'afficher
 * différentes versions de l'UI selon la taille d'écran
 */

import { useState, useEffect } from 'react'

/**
 * Hook personnalisé pour détecter les media queries
 * @param query - Media query CSS (ex: "(min-width: 768px)")
 * @returns boolean - true si la query match
 */
export const useMediaQuery = (query: string): boolean => {
  // État initial basé sur le SSR (assume desktop)
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Mettre à jour l'état initial
    setMatches(mediaQuery.matches)

    // Callback pour les changements
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Écouter les changements
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

/**
 * Hook pour détecter si on est sur mobile (< 768px)
 */
export const useIsMobile = (): boolean => {
  return !useMediaQuery('(min-width: 768px)')
}

/**
 * Hook pour détecter si on est sur tablette (768px - 1024px)
 */
export const useIsTablet = (): boolean => {
  const isAboveMobile = useMediaQuery('(min-width: 768px)')
  const isBelowDesktop = !useMediaQuery('(min-width: 1024px)')
  return isAboveMobile && isBelowDesktop
}

/**
 * Hook pour détecter si on est sur desktop (>= 1024px)
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1024px)')
}

export default useMediaQuery

