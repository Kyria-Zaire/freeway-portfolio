/**
 * PageSkills.tsx - Page 4 : Compétences & Services
 * 
 * Profil CTO & Tech Builder
 * Section Skills : Grille d'icônes par catégorie
 * Section Services : Cartes des services proposés
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { 
  // Code2,
  Database, 
  Globe,
  Smartphone,
  Server,
  Layers,
  // Icônes SaaS & Architecture
  Zap,
  CreditCard,
  Shield,
  Cloud,
  // Icônes Data & BI
  BarChart3,
  PieChart,
  TableProperties,
  // Icônes pour les services
  Lightbulb,
  Rocket,
  Users,
  LineChart
} from 'lucide-react'
import { SkillBadge, ServiceCard } from '../UI'

// ============================================
// Données des compétences par catégorie
// ============================================

const skillGroups = [
  {
    title: 'Tech Stack',
    category: 'tech' as const,
    skills: [
      { name: 'React Native', icon: Smartphone },
      { name: 'TypeScript', icon: Layers },
      { name: 'Node.js', icon: Server },
      { name: 'Next.js', icon: Globe }
    ]
  },
  {
    title: 'SaaS & Architecture',
    category: 'saas' as const,
    skills: [
      { name: 'Multi-tenant', icon: Zap },
      { name: 'Stripe API', icon: CreditCard },
      { name: 'Auth (Clerk)', icon: Shield },
      { name: 'Cloud Infra', icon: Cloud }
    ]
  },
  {
    title: 'Data & BI',
    category: 'data' as const,
    skills: [
      { name: 'Power BI', icon: BarChart3 },
      { name: 'DataViz', icon: PieChart },
      { name: 'SQL', icon: Database },
      { name: 'ETL', icon: TableProperties }
    ]
  }
]

// ============================================
// Données des services
// ============================================

const services = [
  {
    title: 'SaaS Builder',
    description: 'Création d\'écosystèmes scalables de A à Z.',
    icon: Zap
  },
  {
    title: 'CTO as a Service',
    description: 'Pilotage technique et management d\'équipe.',
    icon: Users
  },
  {
    title: 'Data Analysis',
    description: 'Transformation des données en dashboards décisionnels.',
    icon: LineChart
  },
  {
    title: 'Mobile Dev',
    description: 'Apps natives fluides avec React Native.',
    icon: Smartphone
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
      staggerChildren: 0.05,
      delayChildren: 0.1
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

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.4 }
  }
}

// ============================================
// Composant PageSkills
// ============================================

export const PageSkills = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="bg-paper-texture w-full h-full overflow-hidden">
      <motion.div 
        className="w-full h-full p-6 md:p-8 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ======================================
            Section Skills (Haut) - Par catégories
            ====================================== */}
        <motion.section variants={headerVariants} className="mb-4">
          {/* En-tête */}
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-imoria-blue text-white">
              <Rocket size={20} />
            </div>
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Compétences
            </h2>
          </div>

          {/* Groupes de compétences */}
          <div className="space-y-3">
            {skillGroups.map((group, groupIndex) => (
              <motion.div 
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                {/* Titre du groupe */}
                <h3 className={`font-body text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${
                  group.category === 'tech' ? 'text-imoria-blue' :
                  group.category === 'saas' ? 'text-emerald-600' :
                  'text-indigo-600'
                }`}>
                  {group.title}
                </h3>
                
                {/* Grille de compétences */}
                <div className="grid grid-cols-4 gap-1.5">
                  {group.skills.map((skill, index) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      index={(groupIndex * 4) + index}
                      category={group.category}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Séparateur */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-imoria-blue/30 to-transparent my-2" />

        {/* ======================================
            Section Services (Bas)
            ====================================== */}
        <motion.section variants={sectionVariants} className="flex-1">
          {/* En-tête */}
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-imoria-blue" />
            <h3 className="font-heading text-base font-semibold text-text-primary">
              Services
            </h3>
          </div>

          {/* Grille de services */}
          <div className="grid grid-cols-2 gap-1.5">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.div 
          variants={headerVariants}
          className="mt-3 pt-2 border-t border-gray-100 text-center"
        >
          <p className="text-text-muted text-xs">
            🚀 Prêt à scaler votre projet ?
            <span className="text-imoria-blue font-medium ml-1">Let's build →</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
})

PageSkills.displayName = 'PageSkills'

export default PageSkills

