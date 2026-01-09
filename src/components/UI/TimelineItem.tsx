/**
 * TimelineItem.tsx - Composant de Timeline Réutilisable
 * 
 * Utilisé pour les pages Experience et Education
 * Design : Point bleu + ligne verticale + contenu à droite
 */

import { motion } from 'framer-motion'

// ============================================
// Interfaces
// ============================================

export interface TimelineItemProps {
  /** Date ou période (ex: "2022 - Present") */
  date: string
  /** Titre principal (ex: "Senior Web Developer") */
  title: string
  /** Sous-titre (ex: "Tech Company Inc.") */
  subtitle: string
  /** Description du poste ou du diplôme */
  description: string
  /** Index pour l'animation stagger */
  index?: number
  /** Est-ce le dernier élément ? (pour masquer la ligne) */
  isLast?: boolean
  /** Poste actuel ? (affiche badge "Current" + animation pulsation) */
  isCurrent?: boolean
}

// ============================================
// Variants d'animation Framer Motion
// ============================================

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}

// ============================================
// Composant TimelineItem
// ============================================

export const TimelineItem = ({
  date,
  title,
  subtitle,
  description,
  index = 0,
  isLast = false,
  isCurrent = false
}: TimelineItemProps) => {
  return (
    <motion.div
      className="relative flex gap-4"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* Colonne gauche : Point + Ligne */}
      <div className="flex flex-col items-center">
        {/* Point bleu IMORIA */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-imoria-blue/30 rounded-full blur-sm scale-150" />
          {/* Point principal */}
          <div className={`relative w-3.5 h-3.5 bg-imoria-blue rounded-full border-2 border-white shadow-sm z-10 ${isCurrent ? 'ring-2 ring-imoria-blue/50 ring-offset-1' : ''}`} />
        </div>
        
        {/* Ligne verticale */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-imoria-blue/40 to-imoria-blue/10 mt-2" />
        )}
      </div>

      {/* Colonne droite : Contenu */}
      <div className="flex-1 pb-6">
        {/* Badges de date + Current */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium text-imoria-blue bg-imoria-blue-50 rounded-full">
            {date}
          </span>
          {isCurrent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-white bg-green-500 rounded-full uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="font-heading text-lg font-semibold text-text-primary leading-tight">
          {title}
        </h3>

        {/* Sous-titre (Entreprise / Université) */}
        <p className="text-imoria-blue font-medium text-sm mt-0.5 mb-2">
          {subtitle}
        </p>

        {/* Description - taille réduite sur mobile */}
        <p className="font-body text-text-secondary text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default TimelineItem

