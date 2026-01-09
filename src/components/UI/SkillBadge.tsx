/**
 * SkillBadge.tsx - Badge de Compétence avec Icône
 * 
 * Utilisé dans la grille de compétences de PageSkills
 * Design : Boîte blanche avec bordure bleue, hover effect
 * Supporte différentes catégories avec couleurs distinctes
 */

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

// ============================================
// Types de catégories
// ============================================

type SkillCategory = 'tech' | 'saas' | 'data'

const categoryStyles: Record<SkillCategory, { border: string; bg: string; iconBg: string; iconColor: string }> = {
  tech: {
    border: 'border-imoria-blue/20 hover:border-imoria-blue/50',
    bg: 'hover:bg-imoria-blue-50/50',
    iconBg: 'bg-imoria-blue-50',
    iconColor: 'text-imoria-blue'
  },
  saas: {
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    bg: 'hover:bg-emerald-50/50',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  data: {
    border: 'border-indigo-500/30 hover:border-indigo-500/60',
    bg: 'hover:bg-indigo-50/50',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  }
}

// ============================================
// Interfaces
// ============================================

export interface SkillBadgeProps {
  /** Nom de la compétence */
  name: string
  /** Icône Lucide */
  icon: LucideIcon
  /** Index pour l'animation stagger */
  index?: number
  /** Catégorie de compétence pour le style */
  category?: SkillCategory
}

// ============================================
// Variants d'animation
// ============================================

const badgeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.4,
      ease: 'easeOut'
    }
  })
}

// ============================================
// Composant SkillBadge
// ============================================

export const SkillBadge = ({ name, icon: Icon, index = 0, category = 'tech' }: SkillBadgeProps) => {
  const styles = categoryStyles[category]
  
  return (
    <motion.div
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center justify-center gap-2 p-3 
                 bg-white rounded-xl border ${styles.border} ${styles.bg}
                 transition-colors duration-300 cursor-default
                 shadow-sm hover:shadow-md`}
    >
      {/* Icône */}
      <div className={`p-2 rounded-lg ${styles.iconBg} ${styles.iconColor}`}>
        <Icon size={22} strokeWidth={1.5} />
      </div>
      
      {/* Nom */}
      <span className="font-body text-xs font-medium text-text-primary text-center">
        {name}
      </span>
    </motion.div>
  )
}

export default SkillBadge

