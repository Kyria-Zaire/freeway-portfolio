/**
 * ServiceCard.tsx - Carte de Service
 * 
 * Utilisé dans la section Services de PageSkills
 * Design : Carte avec icône, titre et description
 */

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

// ============================================
// Interfaces
// ============================================

export interface ServiceCardProps {
  /** Titre du service */
  title: string
  /** Description courte */
  description: string
  /** Icône Lucide */
  icon: LucideIcon
  /** Index pour l'animation stagger */
  index?: number
}

// ============================================
// Variants d'animation
// ============================================

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + index * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const
    }
  })
}

// ============================================
// Composant ServiceCard
// ============================================

export const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  index = 0 
}: ServiceCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4 }}
      className="flex items-start gap-3 p-3 rounded-xl bg-white/80 
                 border border-gray-100 hover:border-imoria-blue/30
                 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Icône */}
      <div className="shrink-0 p-2 rounded-lg bg-imoria-blue text-white">
        <Icon size={18} strokeWidth={2} />
      </div>
      
      {/* Contenu */}
      <div className="min-w-0">
        <h4 className="font-heading text-sm font-semibold text-text-primary mb-0.5">
          {title}
        </h4>
        <p className="font-body text-xs text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default ServiceCard

