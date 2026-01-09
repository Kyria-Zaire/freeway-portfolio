/**
 * PageExperience.tsx - Page 2 : Expériences Professionnelles
 * 
 * Affiche une timeline verticale des postes occupés
 * Utilise le composant TimelineItem pour chaque entrée
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { TimelineItem } from '../UI'

// ============================================
// Données des expériences réelles
// ============================================

const experiences = [
  {
    date: '2025 - Présent',
    title: 'CTO & Tech Builder',
    subtitle: 'Yunicity / Yurpass',
    description: 'Direction technique de l\'écosystème SAAS Yunicity à Reims. Architecture des applications mobiles réseau social local et événementiel privé.',
    isCurrent: true
  },
  {
    date: '2024',
    title: 'Data Analyst & BI Developer',
    subtitle: 'Supplay (Siège Social)',
    description: 'Freelance Data & BI. Création de solutions de DataViz et analyse décisionnelle pour le leader de l\'intérim.',
    isCurrent: false
  },
  {
    date: '2023',
    title: 'Développeur Front-end',
    subtitle: 'Agence Pulsi',
    description: 'Développement d\'interfaces web modernes et interactives.',
    isCurrent: false
  }
]

// ============================================
// Variants d'animation
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// ============================================
// Composant PageExperience
// ============================================

export const PageExperience = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="bg-paper-texture w-full h-full overflow-hidden">
      <motion.div 
        className="w-full h-full p-6 md:p-8 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête de la page */}
        <motion.header variants={headerVariants} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-imoria-blue text-white">
              <Briefcase size={20} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Expérience
            </h2>
          </div>
          <p className="text-text-secondary text-sm ml-12">
            Mon parcours professionnel
          </p>
        </motion.header>

        {/* Timeline des expériences */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              date={exp.date}
              title={exp.title}
              subtitle={exp.subtitle}
              description={exp.description}
              index={index}
              isLast={index === experiences.length - 1}
              isCurrent={exp.isCurrent}
            />
          ))}
        </div>

        {/* Footer de page */}
        <motion.div 
          variants={headerVariants}
          className="mt-4 pt-3 border-t border-gray-100"
        >
          <p className="text-text-muted text-xs text-center flex items-center justify-center gap-1">
            <MapPin size={12} />
            Basé à Reims, France
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
})

PageExperience.displayName = 'PageExperience'

export default PageExperience

