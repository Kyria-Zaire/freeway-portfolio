/**
 * PageProjects.tsx - Page Projets
 * 
 * Présentation verticale des réalisations principales
 * Yunicity, Kitty Octa, Aflora Photo
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  ExternalLink, 
  Github,
  Hammer
} from 'lucide-react'

// ============================================
// Données des projets
// ============================================

const projects = [
  {
    title: 'Yunicity',
    role: 'CTO & Founder',
    description: 'Réseau social local innovant pour la ville de Reims. En plein "build" pour reconnecter les quartiers.',
    demoUrl: 'https://yunicity-website.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=350&fit=crop',
    inBuild: true
  },
  {
    title: 'Yurpass',
    role: 'CTO & Founder',
    description: 'Site vitrine événementiel exclusif. Réservation d\'expériences privées et sélection de participants.',
    demoUrl: 'https://yurpass-events.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    imageUrl: '/images/yurpass-logo.png',
    inBuild: false,
    isLogo: true
  },
  {
    title: 'Kitty Octa',
    role: 'Lead Developer',
    description: 'Plateforme premium pour prestataire d\'événementiel. Focus UX et réservation fluide.',
    demoUrl: 'https://kitty-octa-llsf.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=350&fit=crop',
    inBuild: false
  },
  {
    title: 'Aflora Photo',
    role: 'Freelance Developer',
    description: 'Portfolio minimaliste et haute performance pour photographe professionnel.',
    demoUrl: 'https://aflora-photo.vercel.app',
    techStack: ['Next.js', 'Tailwind', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=350&fit=crop',
    inBuild: false
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
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const }
  }
}

// ============================================
// Composant ProjectCard compact
// ============================================

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <motion.div
    variants={itemVariants}
    className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
  >
    {/* Miniature du projet */}
    <div className={`relative w-24 h-16 sm:w-28 sm:h-18 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center ${project.isLogo ? 'bg-white p-2' : ''}`}>
      <img 
        src={project.imageUrl} 
        alt={project.title}
        className={project.isLogo ? "w-full h-full object-contain" : "w-full h-full object-cover"}
      />
      {/* Badge In Build */}
      {project.inBuild && (
        <div className="absolute top-1 left-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500 text-white text-[8px] font-bold rounded-full">
          <Hammer size={8} />
          <span>In Build</span>
        </div>
      )}
    </div>

    {/* Infos du projet */}
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <h3 
            className="font-bold text-text-primary leading-tight"
            style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}
          >
            {project.title}
          </h3>
          <p 
            className="text-imoria-blue font-medium"
            style={{ fontSize: 'clamp(9px, 2.5vw, 10px)' }}
          >
            {project.role}
          </p>
        </div>
        
        {/* Lien externe */}
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-imoria-blue-50 text-imoria-blue hover:bg-imoria-blue hover:text-white transition-colors flex-shrink-0"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Description */}
      <p 
        className="text-text-secondary leading-snug mb-2 line-clamp-2"
        style={{ fontSize: 'clamp(9px, 2.5vw, 11px)' }}
      >
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((tech) => (
          <span 
            key={tech}
            className="px-1.5 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: 'rgba(0, 163, 255, 0.08)',
              color: '#00A3FF',
              fontSize: 'clamp(7px, 2vw, 9px)'
            }}
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span 
            className="px-1.5 py-0.5 rounded-full font-medium text-text-muted"
            style={{ fontSize: 'clamp(7px, 2vw, 9px)' }}
          >
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
)

// ============================================
// Composant PageProjects
// ============================================

export const PageProjects = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-full h-full overflow-hidden"
      style={{ backgroundColor: '#FDFBF7' }}
    >
      <motion.div 
        className="w-full h-full p-5 sm:p-6 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-imoria-blue text-white">
            <Rocket size={18} />
          </div>
          <div>
            <h2 
              className="font-bold"
              style={{ 
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(18px, 4.5vw, 22px)',
                color: '#1a1a2e'
              }}
            >
              Mes Projets
            </h2>
            <p 
              className="text-text-secondary"
              style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}
            >
              Réalisations récentes & en cours
            </p>
          </div>
        </motion.div>

        {/* Liste des projets */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Footer - Lien GitHub */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 pt-3 border-t"
          style={{ borderColor: 'rgba(0, 163, 255, 0.15)' }}
        >
          <a
            href="https://github.com/Kyria-Zaire"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 
                       font-medium rounded-xl border
                       hover:bg-gray-50 transition-colors"
            style={{ 
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: '#1a1a2e',
              fontSize: 'clamp(11px, 3vw, 13px)'
            }}
          >
            <Github size={16} />
            Voir plus sur GitHub
          </a>
          <p 
            className="text-center text-text-muted mt-2"
            style={{ fontSize: 'clamp(9px, 2.2vw, 10px)' }}
          >
            🚀 D'autres projets en cours de développement...
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
})

PageProjects.displayName = 'PageProjects'

export default PageProjects
