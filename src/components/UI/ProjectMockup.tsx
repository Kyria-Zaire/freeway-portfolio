/**
 * ProjectMockup.tsx - Affichage Premium d'un Projet
 * 
 * Simule un écran MacBook/iMac avec l'image du projet
 * Overlay au survol avec nom du projet et lien GitHub
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

// ============================================
// Interfaces
// ============================================

export interface ProjectMockupProps {
  /** Titre du projet */
  title: string
  /** URL de l'image du projet */
  imageUrl: string
  /** Lien vers la démo */
  demoUrl?: string
  /** Lien vers le code source */
  sourceUrl?: string
  /** Description courte */
  description?: string
}

// ============================================
// Variants d'animation
// ============================================

const containerVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' as const }
  }
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.1, duration: 0.3 }
  }
}

// ============================================
// Composant ProjectMockup
// ============================================

export const ProjectMockup = ({
  title,
  imageUrl,
  demoUrl,
  sourceUrl,
  description
}: ProjectMockupProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative w-full"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Frame MacBook Style */}
      <div className="relative bg-gray-800 rounded-xl p-2 shadow-xl">
        {/* Barre supérieure (caméra + boutons) */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-700 rounded-t-lg">
          {/* Boutons fenêtre */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          
          {/* Caméra */}
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          
          {/* Spacer */}
          <div className="w-12" />
        </div>

        {/* Écran / Image du projet */}
        <div className="relative aspect-video bg-gray-900 rounded-b-lg overflow-hidden">
          {/* Image du projet */}
          <img
            src={imageUrl}
            alt={`Screenshot de ${title}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay au survol */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent 
                           flex flex-col items-center justify-end p-4"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div 
                  variants={contentVariants}
                  className="text-center"
                >
                  {/* Titre du projet */}
                  <h4 className="font-heading text-lg font-bold text-white mb-1">
                    {title}
                  </h4>
                  
                  {/* Description */}
                  {description && (
                    <p className="text-white/70 text-xs mb-3 max-w-xs">
                      {description}
                    </p>
                  )}

                  {/* Boutons d'action */}
                  <div className="flex items-center justify-center gap-2">
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 
                                   bg-imoria-blue text-white text-xs font-medium rounded-full
                                   hover:bg-imoria-blue-dark transition-colors"
                      >
                        <ExternalLink size={12} />
                        Demo
                      </a>
                    )}
                    {sourceUrl && (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 
                                   bg-white/20 text-white text-xs font-medium rounded-full
                                   hover:bg-white/30 transition-colors backdrop-blur-sm"
                      >
                        <Github size={12} />
                        Code
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pied du MacBook */}
      <div className="mx-auto w-1/3 h-1 bg-gray-700 rounded-b-lg" />
      <div className="mx-auto w-2/5 h-1.5 bg-gray-600 rounded-b-xl" />
    </motion.div>
  )
}

export default ProjectMockup

