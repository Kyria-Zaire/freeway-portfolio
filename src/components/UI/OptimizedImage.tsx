/**
 * OptimizedImage.tsx - Composant d'Image Optimisée
 * 
 * Gère automatiquement :
 * - Lazy loading natif
 * - Format WebP avec fallback
 * - Dimensions responsive
 * - Placeholder blur pendant le chargement
 */

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ============================================
// Interfaces
// ============================================

export interface OptimizedImageProps {
  /** URL de l'image (supporte WebP auto si disponible) */
  src: string
  /** Texte alternatif (obligatoire pour l'accessibilité) */
  alt: string
  /** Largeur de l'image */
  width?: number
  /** Hauteur de l'image */
  height?: number
  /** Classes Tailwind additionnelles */
  className?: string
  /** Priorité de chargement (true = eager, false = lazy) */
  priority?: boolean
  /** Afficher un placeholder blur pendant le chargement */
  showPlaceholder?: boolean
}

// ============================================
// Helper : Convertir URL en WebP si possible
// ============================================

const getOptimizedSrc = (src: string): { webp: string; fallback: string } => {
  // Si c'est déjà un WebP, pas de changement
  if (src.endsWith('.webp')) {
    return { webp: src, fallback: src }
  }
  
  // Si c'est une URL Unsplash, ajouter les paramètres d'optimisation
  if (src.includes('unsplash.com')) {
    const optimizedUrl = src.includes('?') 
      ? `${src}&fm=webp&q=80` 
      : `${src}?fm=webp&q=80`
    return { webp: optimizedUrl, fallback: src }
  }
  
  // Pour les autres URLs, essayer de servir WebP
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  return { webp: webpSrc, fallback: src }
}

// ============================================
// Composant OptimizedImage
// ============================================

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  showPlaceholder = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  const { webp, fallback } = getOptimizedSrc(src)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder blur pendant le chargement */}
      {showPlaceholder && !isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          className="absolute inset-0 bg-gradient-to-br from-imoria-blue-100 to-imoria-blue-50 animate-pulse"
        />
      )}

      {/* Image avec support WebP */}
      <picture>
        {/* Source WebP (format moderne, plus léger) */}
        <source srcSet={webp} type="image/webp" />
        
        {/* Fallback pour navigateurs anciens */}
        <motion.img
          src={hasError ? fallback : webp}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${className}`}
        />
      </picture>

      {/* Message d'erreur si l'image ne charge pas */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Image non disponible
        </div>
      )}
    </div>
  )
}

export default OptimizedImage

