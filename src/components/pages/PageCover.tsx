/**
 * PageCover.tsx - Page de Couverture / Intro
 * 
 * Contenu selon IMORIA_PRD.md :
 * - Photo circulaire de Freeway.jr
 * - Nom "Freeway.jr" + titre "Web Developer"
 * - Boutons : "Download CV", "Contact Me"
 * - Liens sociaux : LinkedIn, GitHub, etc.
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'

// ============================================
// Interfaces
// ============================================

interface PageCoverProps {
  name?: string
  title?: string
  avatarUrl?: string
  email?: string
  socials?: {
    linkedin?: string
    github?: string
  }
}

// ============================================
// Animations Framer Motion
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const avatarVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 200, 
      damping: 15,
      delay: 0.1 
    }
  }
}

// ============================================
// Composant PageCover
// ============================================

export const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(
  (
    {
      name = 'Freeway.jr',
      title = 'CTO & Tech Builder',
      avatarUrl = '/images/freeway.png',
      email = 'kyriamambu1@gmail.com',
      socials = {
        linkedin: 'https://www.linkedin.com/in/freeway-jr-za%C3%AFre-142052219/',
        github: 'https://github.com/Kyria-Zaire'
      }
    },
    ref
  ) => {
    return (
      <div 
        ref={ref} 
        className="bg-paper-texture w-full h-full overflow-hidden"
      >
        <motion.div 
          className="w-full h-full p-8 flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo IMORIA sur la couverture */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="font-heading text-lg font-semibold tracking-widest text-text-muted uppercase">
              Portfolio
            </span>
          </motion.div>

          {/* Avatar circulaire */}
          <motion.div 
            variants={avatarVariants}
            className="relative mb-6"
          >
            {/* Cercle lumineux derrière l'avatar */}
            <div className="absolute inset-0 bg-imoria-blue/20 rounded-full blur-xl scale-110" />
            
            {/* Container de l'avatar avec bordure */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-imoria-blue p-1 bg-white">
              <img
                src={avatarUrl}
                alt={`Photo de ${name}`}
                className="w-full h-full rounded-full object-cover bg-imoria-blue-50"
              />
            </div>

            {/* Badge de statut */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-imoria-blue rounded-full">
              <span className="text-white text-xs font-medium">Disponible</span>
            </div>
          </motion.div>

          {/* Nom */}
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2"
          >
            {name}
          </motion.h1>

          {/* Titre / Rôle */}
          <motion.p 
            variants={itemVariants}
            className="text-imoria-blue font-medium text-lg mb-6"
          >
            {title}
          </motion.p>

          {/* Description courte */}
          <motion.p 
            variants={itemVariants}
            className="text-text-secondary text-sm max-w-xs mb-8 leading-relaxed"
          >
            Passionné par le développement web et la création d'expériences 
            utilisateur uniques et mémorables.
          </motion.p>

          {/* Bouton Contact */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 
                         bg-imoria-blue text-white font-medium rounded-full
                         hover:bg-imoria-blue-dark transition-all duration-300
                         hover:scale-105 active:scale-95 shadow-lg shadow-imoria-blue/30"
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Liens sociaux */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-text-primary/5 text-text-secondary
                           hover:bg-imoria-blue hover:text-white transition-all duration-300
                           hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-text-primary/5 text-text-secondary
                           hover:bg-imoria-blue hover:text-white transition-all duration-300
                           hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
          </motion.div>

          {/* Indicateur "Tourner la page" */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-6 right-6 text-text-muted text-xs flex items-center gap-1"
          >
            <span>Tourner →</span>
          </motion.div>
        </motion.div>
      </div>
    )
  }
)

PageCover.displayName = 'PageCover'

export default PageCover

