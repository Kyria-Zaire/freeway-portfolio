/**
 * MobilePortfolio.tsx - Version Mobile du Portfolio
 * 
 * Alternative élégante au Book Flip pour les écrans < 768px
 * Affiche les pages en liste verticale scrollable
 */

import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  FolderGit2,
  Heart 
} from 'lucide-react'
import { 
  PageCover, 
  PageExperience, 
  PageEducation, 
  PageSkills, 
  PageProjects 
} from './pages'

// ============================================
// Configuration des sections
// ============================================

const sections = [
  { id: 'intro', title: 'Intro', icon: null, component: PageCover },
  { id: 'experience', title: 'Expérience', icon: Briefcase, component: PageExperience },
  { id: 'education', title: 'Éducation', icon: GraduationCap, component: PageEducation },
  { id: 'skills', title: 'Compétences', icon: Rocket, component: PageSkills },
  { id: 'projects', title: 'Projets', icon: FolderGit2, component: PageProjects }
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const scrollIndicatorVariants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  }
}

// ============================================
// Composant MobilePortfolio
// ============================================

export const MobilePortfolio = () => {
  return (
    <div className="min-h-screen bg-book-bg">
      {/* Header fixe */}
      <header className="sticky top-0 z-50 bg-book-bg/95 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <h1 className="font-heading text-2xl font-bold text-white text-center tracking-tight">
          <span className="text-imoria-blue">IM</span>ORIA
        </h1>
      </header>

      {/* Contenu scrollable */}
      <motion.main
        className="px-4 py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Indicateur de scroll */}
        <motion.div 
          className="flex flex-col items-center text-white/40 mb-4"
          variants={scrollIndicatorVariants}
          animate="animate"
        >
          <span className="text-xs mb-1">Scroll pour explorer</span>
          <ChevronDown size={20} />
        </motion.div>

        {/* Sections empilées */}
        {sections.map((section, index) => {
          const SectionComponent = section.component
          const Icon = section.icon
          
          return (
            <motion.section
              key={section.id}
              id={section.id}
              variants={cardVariants}
              className="relative"
            >
              {/* Badge de section (sauf pour l'intro) */}
              {Icon && (
                <div className="absolute -top-3 left-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-imoria-blue rounded-full shadow-lg">
                    <Icon size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{section.title}</span>
                  </div>
                </div>
              )}

              {/* Carte de contenu */}
              <div className="bg-paper rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
                {/* Rendu du composant de page */}
                <div className="h-full">
                  {section.id === 'intro' ? (
                    <SectionComponent 
                      name="Freeway.jr"
                      title="Web Developer"
                      email="contact@freeway.dev"
                      // cvUrl="/cv-freeway.pdf" // supprimé car non supporté
                      socials={{
                        linkedin: 'https://linkedin.com/in/freeway',
                        github: 'https://github.com/freeway',
                        // twitter: 'https://twitter.com/freeway' // supprimé car non supporté
                      }}
                    />
                  ) : (
                    <SectionComponent />
                  )}
                </div>
              </div>

              {/* Indicateur de progression */}
              {index < sections.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-imoria-blue/50 to-transparent" />
                </div>
              )}
            </motion.section>
          )
        })}

        {/* Footer */}
        <motion.footer 
          variants={cardVariants}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <span>Créé avec</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>par</span>
            <span className="text-imoria-blue font-semibold">Freeway.jr</span>
          </div>
          <p className="text-white/30 text-xs mt-2">
            © {new Date().getFullYear()} IMORIA Portfolio
          </p>
          
          {/* Indicateur version mobile */}
          <p className="text-white/20 text-xs mt-4">
            📱 Version Mobile • Passez sur desktop pour l'expérience Book Flip
          </p>
        </motion.footer>
      </motion.main>
    </div>
  )
}

export default MobilePortfolio

