/**
 * PageContact.tsx - Page de Contact IMORIA
 * 
 * Page entière dédiée au formulaire de contact
 * Design épuré et professionnel avec animations
 */

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'

export const PageContact = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-8" style={{ backgroundColor: '#FDFBF7' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 6vw, 32px)', color: '#1a1a2e' }}>
          Contact
        </h2>
        <p className="text-gray-600" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
          Retrouvez-moi sur mes réseaux ou contactez-moi directement !
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Email direct */}
        <a 
          href="mailto:kyriamambu1@gmail.com"
          className="flex items-center justify-center gap-2 mb-2 transition-colors hover:opacity-80"
          style={{ color: '#00A3FF', fontSize: 'clamp(14px, 3vw, 18px)' }}
        >
          <Mail size={20} />
          kyriamambu1@gmail.com
        </a>

        {/* Liens sociaux */}
        <div className="flex items-center justify-center gap-6">
          <motion.a
            href="https://www.linkedin.com/in/freeway-jr-za%C3%AFre-142052219/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(0, 163, 255, 0.1)', color: '#00A3FF' }}
            title="LinkedIn"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/Kyria-Zaire"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(0, 163, 255, 0.1)', color: '#00A3FF' }}
            title="GitHub"
          >
            <Github size={24} />
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 pt-4 border-t"
        style={{ borderColor: 'rgba(0, 163, 255, 0.15)' }}
      >
        <p className="flex items-center justify-center gap-1 mt-3 text-gray-400" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
          <MapPin size={12} />
          Reims, France
        </p>
      </motion.div>
    </div>
  )
}

export default PageContact
