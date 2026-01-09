/**
 * PageFrontCover.tsx - Couverture du Livre IMORIA
 * 
 * Page 0 : Le livre fermé
 * Logo officiel centré avec effet glow
 */

import { forwardRef } from 'react'
import { BookOpen } from 'lucide-react'

export const PageFrontCover = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="relative w-full h-full overflow-hidden"
      style={{ 
        backgroundColor: '#1A1A2E',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(0, 163, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 163, 255, 0.05) 0%, transparent 40%)
        `,
        boxShadow: `
          inset -4px 0 8px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.05),
          4px 0 12px rgba(0, 0, 0, 0.4),
          8px 4px 20px rgba(0, 0, 0, 0.3)
        `
      }}
    >
      {/* Bordure droite - Simulation reliure */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-3 sm:w-4"
        style={{
          background: 'linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)',
          borderLeft: '1px solid rgba(255,255,255,0.05)'
        }}
      />

      {/* Contenu centré */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        
        {/* Badge */}
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <span
            className="px-4 py-1.5 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0, 163, 255, 0.15)',
              color: 'rgba(0, 163, 255, 0.8)',
              fontSize: 'clamp(9px, 2.2vw, 11px)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.1em'
            }}
          >
            WEB DEVELOPER
          </span>
        </div>

        {/* Logo IMORIA */}
        <div 
          className="mb-6"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 163, 255, 0.4)) drop-shadow(0 0 60px rgba(0, 163, 255, 0.2))'
          }}
        >
          <img 
            src="/images/logo-imoria.png" 
            alt="IMORIA Logo"
            style={{
              width: 'clamp(280px, 70vw, 500px)',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Ligne décorative */}
        <div 
          className="w-24 h-0.5 mb-6"
          style={{ backgroundColor: 'rgba(0, 163, 255, 0.5)' }}
        />

        {/* Sous-titre */}
        <p
          className="text-center mb-12"
          style={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 'clamp(12px, 3.5vw, 16px)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Portfolio 2026 — Freeway.jr
        </p>

        {/* Invitation à ouvrir */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center">
          <BookOpen size={28} style={{ color: 'rgba(0, 163, 255, 0.7)' }} className="mb-3" />
          <p
            style={{ 
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.15em'
            }}
          >
            Swipe ou cliquez pour ouvrir →
          </p>
        </div>
      </div>

      {/* Coins décoratifs */}
      <div 
        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2"
        style={{ borderColor: 'rgba(0, 163, 255, 0.2)' }}
      />
      <div 
        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2"
        style={{ borderColor: 'rgba(0, 163, 255, 0.2)' }}
      />
    </div>
  )
})

PageFrontCover.displayName = 'PageFrontCover'

export default PageFrontCover
