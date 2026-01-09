/**
 * PageEducation.tsx - Page 3 : Formation & Diplômes
 * 
 * Affiche une timeline verticale des formations
 * Design miroir de PageExperience pour cohérence
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, Code2 } from 'lucide-react'
import { TimelineItem } from '../UI'

// ============================================
// Données des formations réelles
// ============================================

const education = [
  {
    date: '2023',
    title: 'Licence Développeur Web',
    subtitle: 'CESI École Supérieure du Numérique',
    description: 'Spécialisation en développement d\'applications, architecture logicielle et méthodes agiles.',
    icon: 'graduation' as const
  },
  {
    date: '2016 - 2022',
    title: 'Développeur Full-Stack Autodidacte',
    subtitle: 'Apprentissage & Mentorat',
    description: 'Apprentissage intensif et mentorat. Développement de projets personnels et maîtrise des fondamentaux du web bien avant le cursus académique.',
    icon: 'autodidact' as const
  }
]

// ============================================
// Certifications
// ============================================

const certifications = [
  { name: 'AWS Cloud Practitioner', year: '2023' },
  { name: 'Meta Front-End Developer', year: '2022' },
  { name: 'Google UX Design', year: '2021' }
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
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const certVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5 + index * 0.1,
      duration: 0.3
    }
  })
}

// ============================================
// Composant PageEducation
// ============================================

export const PageEducation = forwardRef<HTMLDivElement>((_, ref) => {
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
              <GraduationCap size={20} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Éducation
            </h2>
          </div>
          <p className="text-text-secondary text-sm ml-12">
            Formation académique & parcours autodidacte
          </p>
        </motion.header>

        {/* Timeline des formations */}
        <div className="flex-1 overflow-y-auto pr-2">
          {education.map((edu, index) => (
            <div key={index} className="relative">
              {/* Icône distinctive pour chaque type de formation */}
              {edu.icon === 'autodidact' && (
                <div className="absolute -left-1 top-0 p-1 rounded-full bg-amber-100 text-amber-600 z-20">
                  <Code2 size={12} />
                </div>
              )}
              <TimelineItem
                date={edu.date}
                title={edu.title}
                subtitle={edu.subtitle}
                description={edu.description}
                index={index}
                isLast={index === education.length - 1}
              />
            </div>
          ))}
          
          {/* Note de passion */}
          <motion.p 
            variants={headerVariants}
            className="text-center text-text-muted text-xs mt-4 italic"
          >
            Plus de 8 ans de passion pour le code 💻
          </motion.p>
        </div>

        {/* Section Certifications */}
        <motion.div variants={headerVariants} className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-imoria-blue" />
            <h3 className="font-heading text-sm font-semibold text-text-primary">
              Certifications
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <motion.span
                key={index}
                variants={certVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 
                           bg-white rounded-full border border-imoria-blue/20
                           text-xs font-medium text-text-primary
                           hover:border-imoria-blue/50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-imoria-blue" />
                {cert.name}
                <span className="text-text-muted">({cert.year})</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
})

PageEducation.displayName = 'PageEducation'

export default PageEducation

