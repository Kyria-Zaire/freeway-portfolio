/**
 * PageEndCover.tsx - Quatrième de Couverture
 * 
 * Dernière page du livre (dos)
 * Logo en signature avec opacité réduite
 */

import { forwardRef } from 'react'
import { Heart, ArrowLeft } from 'lucide-react'

export const PageEndCover = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="relative w-full h-full overflow-hidden"
      style={{ 
        backgroundColor: '#1A1A2E',
        backgroundImage: `
          radial-gradient(circle at 80% 80%, rgba(0, 163, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 20% 20%, rgba(0, 163, 255, 0.05) 0%, transparent 40%)
        `,
        boxShadow: `
          inset 4px 0 8px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.05),
          -4px 0 12px rgba(0, 0, 0, 0.4),
          -8px 4px 20px rgba(0, 0, 0, 0.3)
        `
      }}
    >
      {/* Bordure gauche - Simulation reliure */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-3 sm:w-4"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)',
          borderRight: '1px solid rgba(255,255,255,0.05)'
        }}
      />

      {/* Contenu centré */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        
        {/* Logo IMORIA - Version signature avec opacité réduite */}
        <div 
          className="mb-6"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0, 163, 255, 0.3))',
            opacity: 0.7
          }}
        >
          <img 
            src="/images/logo-imoria.png" 
            alt="IMORIA Logo"
            style={{
              width: 'clamp(150px, 40vw, 250px)',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Ligne décorative */}
        <div 
          className="w-20 h-0.5 mb-6"
          style={{ backgroundColor: 'rgba(0, 163, 255, 0.4)' }}
        />

        {/* Message de remerciement */}
        <p
          className="text-center mb-4"
          style={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 'clamp(11px, 3vw, 14px)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Merci d'avoir exploré mon portfolio
        </p>

        {/* Créé avec amour */}
        <div 
          className="flex items-center justify-center gap-2 mb-8"
          style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'clamp(11px, 2.8vw, 13px)' }}
        >
          <span>Créé avec</span>
          <Heart size={14} className="text-red-500 fill-red-500" />
          <span>par</span>
          <span style={{ color: '#00A3FF', fontWeight: 600 }}>Freeway.jr</span>
        </div>

        {/* Indication retour */}
        <div 
          className="flex items-center gap-2"
          style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 'clamp(10px, 2.5vw, 12px)' }}
        >
          <ArrowLeft size={14} />
          <span>← Swipe pour revenir</span>
        </div>

        {/* Copyright */}
        <p 
          className="absolute bottom-6"
          style={{ 
            color: 'rgba(255, 255, 255, 0.25)',
            fontSize: 'clamp(9px, 2.2vw, 11px)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          © {new Date().getFullYear()} IMORIA Portfolio
        </p>
      </div>

      {/* Coins décoratifs (miroir) */}
      <div 
        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2"
        style={{ borderColor: 'rgba(0, 163, 255, 0.2)' }}
      />
      <div 
        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2"
        style={{ borderColor: 'rgba(0, 163, 255, 0.2)' }}
      />
    </div>
  )
})

PageEndCover.displayName = 'PageEndCover'

export default PageEndCover
