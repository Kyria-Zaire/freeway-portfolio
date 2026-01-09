/**
 * PageContact.tsx - Page de Contact IMORIA
 * 
 * Page entière dédiée au formulaire de contact
 * Design épuré et professionnel avec animations
 */

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { 
  Send, 
  Loader2, 
  Mail, 
  Linkedin, 
  Github,
  CheckCircle2,
  MapPin
} from 'lucide-react'

export const PageContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Adresse email invalide.');
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message
        },
        publicKey
      );

      if (result.status === 200) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg("L'envoi a échoué. Réessayez ou contactez-moi directement.");
      }
    } catch (err) {
      setErrorMsg("L'envoi a échoué. Réessayez ou contactez-moi directement.");
      console.error('Erreur EmailJS:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/freeway-jr-za%C3%AFre-142052219/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Kyria-Zaire', label: 'GitHub' },
  ]

  return (
    <div 
      className="w-full h-full flex flex-col p-6 sm:p-8"
      style={{ backgroundColor: '#FDFBF7' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 
          className="font-bold mb-2"
          style={{ 
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(24px, 6vw, 32px)',
            color: '#1a1a2e'
          }}
        >
          Contact Me
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}
        >
          Une idée de projet ? Discutons-en !
        </p>
      </motion.div>

      {/* Formulaire ou Message de succès */}
      <div className="flex-1 flex flex-col justify-center">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center p-6 rounded-2xl"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
            </motion.div>
            <h3 
              className="font-bold mb-2"
              style={{ 
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(18px, 5vw, 22px)',
                color: '#166534'
              }}
            >
              Message Envoyé ! ✨
            </h3>
            <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#15803d' }}>
              Merci ! Je vous répondrai dans les 24h.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-5"
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            {errorMsg && (
              <div className="text-red-500 text-center mb-2" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>{errorMsg}</div>
            )}
            {/* Nom */}
            <div>
              <label 
                htmlFor="name" 
                className="block mb-1.5 font-medium text-gray-700"
                style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jean Dupont"
                className="w-full rounded-xl border-2 transition-all duration-200 outline-none"
                style={{
                  padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)',
                  fontSize: 'clamp(13px, 3.2vw, 15px)',
                  borderColor: 'rgba(0, 163, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00A3FF'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 163, 255, 0.2)'}
                onMouseDown={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-1.5 font-medium text-gray-700"
                style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jean@example.com"
                className="w-full rounded-xl border-2 transition-all duration-200 outline-none"
                style={{
                  padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)',
                  fontSize: 'clamp(13px, 3.2vw, 15px)',
                  borderColor: 'rgba(0, 163, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00A3FF'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 163, 255, 0.2)'}
                onMouseDown={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
            </div>

            {/* Message */}
            <div>
              <label 
                htmlFor="message" 
                className="block mb-1.5 font-medium text-gray-700"
                style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Décrivez votre projet..."
                rows={4}
                className="w-full rounded-xl border-2 transition-all duration-200 outline-none resize-none"
                style={{
                  padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)',
                  fontSize: 'clamp(13px, 3.2vw, 15px)',
                  borderColor: 'rgba(0, 163, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00A3FF'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 163, 255, 0.2)'}
                onMouseDown={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
            </div>

            {/* Bouton Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                padding: 'clamp(12px, 3vw, 16px)',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                backgroundColor: isSubmitting ? '#7dd3fc' : '#00A3FF',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Envoyer le message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>

      {/* Footer - Infos de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 pt-4 border-t"
        style={{ borderColor: 'rgba(0, 163, 255, 0.15)' }}
      >
        {/* Email direct */}
        <a 
          href="mailto:kyriamambu1@gmail.com"
          className="flex items-center justify-center gap-2 mb-4 transition-colors hover:opacity-80"
          style={{ color: '#00A3FF', fontSize: 'clamp(12px, 3vw, 14px)' }}
        >
          <Mail size={16} />
          kyriamambu1@gmail.com
        </a>

        {/* Liens sociaux */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full transition-colors"
              style={{ 
                backgroundColor: 'rgba(0, 163, 255, 0.1)',
                color: '#00A3FF'
              }}
              title={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Location discrète */}
        <p 
          className="flex items-center justify-center gap-1 mt-3 text-gray-400"
          style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}
        >
          <MapPin size={12} />
          Reims, France
        </p>
      </motion.div>
    </div>
  )
}

export default PageContact

