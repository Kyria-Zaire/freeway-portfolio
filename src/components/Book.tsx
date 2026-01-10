/**
 * Book.tsx - IMORIA Kindle-Like Experience
 * * VERSION GOLD MASTER
 * - Typescript Clean (Zéro erreur)
 * - Swipe Mobile Prioritaire (Framer Motion)
 * - Gestion des dimensions optimisée
 */

import { useRef, useState, useCallback, useEffect, forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Volume2, VolumeX } from 'lucide-react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Types
// ============================================

interface PageProps {
  children: ReactNode
  pageNumber?: number
  totalPages?: number
}

interface BookProps {
  children: ReactNode
  disableFlip?: boolean
  setDisableFlip?: (v: boolean) => void
}

interface FlipEvent {
  data: number
}

interface PageFlipRef {
  pageFlip: () => {
    flipNext: () => void
    flipPrev: () => void
    turnToPage: (page: number) => void
    getPageCount: () => number
    getCurrentPageIndex: () => number
  }
}

// ============================================
// Hook : Dimensions PLEIN ÉCRAN
// ============================================

interface FullScreenDimensions {
  width: number
  height: number
  isMobile: boolean
}

const useFullScreenBook = (): FullScreenDimensions => {
  const [dims, setDims] = useState<FullScreenDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 400,
    height: typeof window !== 'undefined' ? window.innerHeight : 700,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  })

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const isMobileDevice = vw < 768

      if (isMobileDevice) {
        // MOBILE : 100% de l'écran
        setDims({
          width: vw,
          height: vh,
          isMobile: true,
        })
      } else {
        // DESKTOP : Optimisé double page
        const targetHeight = vh * 0.95
        const aspectRatio = 0.68
        let pageWidth = targetHeight * aspectRatio
        
        const maxPageWidth = (vw - 40) / 2
        if (pageWidth > maxPageWidth) {
          pageWidth = maxPageWidth
        }

        setDims({
          width: Math.round(pageWidth),
          height: Math.round(pageWidth / aspectRatio),
          isMobile: false,
        })
      }
    }

    calculate()
    window.addEventListener('resize', calculate)
    
    return () => {
      window.removeEventListener('resize', calculate)
    }
  }, [])

  return dims
}

// ============================================
// Composant Page
// ============================================

export const Page = forwardRef<HTMLDivElement, PageProps>(({ children, pageNumber, totalPages = 6 }, ref) => {
  return (
    <div 
      ref={ref} 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#FDFBF7' }}
      data-page={pageNumber}
    >
      {/* Indicateur de page */}
      {pageNumber && (
        <div 
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium z-20 pointer-events-none"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            color: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {pageNumber}/{totalPages}
        </div>
      )}
      
      {/* Ombre reliure */}
      <div className="absolute left-0 top-0 bottom-0 w-[2vw] max-w-3 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />
      
      {/* Contenu - pointer-events auto pour interactions (liens, boutons) */}
      <div
        className="w-full h-full overflow-y-auto overflow-x-hidden"
        style={{
          fontSize: 'clamp(12px, 3.5vw, 16px)',
          pointerEvents: 'auto' // Permet clics sur liens/boutons
        }}
      >
        {children}
      </div>
    </div>
  )
})

Page.displayName = 'Page'
export const PageComponent = Page

// ============================================
// Composant Book (Main)
// ============================================

export const Book = ({ children, disableFlip = false }: BookProps) => {
  const bookRef = useRef<PageFlipRef>(null)
  const { width, height, isMobile } = useFullScreenBook()
  
  const [currentPage, setCurrentPage] = useState(0)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [showUI, setShowUI] = useState(true)

  // Auto-hide UI mobile
  useEffect(() => {
    if (!isMobile) return
    const timer = setTimeout(() => setShowUI(false), 3000)
    return () => clearTimeout(timer)
  }, [isMobile])

  // Gestion Son
  const playSound = useCallback(() => {
    if (!isSoundEnabled) return
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      const now = ctx.currentTime
      
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        const t = i / data.length
        data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * 0.1 * Math.exp(-t * 4)
      }
      
      const src = ctx.createBufferSource()
      src.buffer = buf
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 600
      const gain = ctx.createGain()
      gain.gain.value = 0.3
      
      src.connect(filter).connect(gain).connect(ctx.destination)
      src.start(now)
      setTimeout(() => ctx.close(), 150)
    } catch { /* ignore */ }
  }, [isSoundEnabled])

  const onFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data)
    playSound()
    if (isMobile) setShowUI(true)
  }, [playSound, isMobile])

  const handleTap = useCallback(() => {
    if (isMobile) setShowUI(prev => !prev)
  }, [isMobile])

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        width: '100vw',
        height: '100dvh',
        backgroundColor: isMobile ? '#FDFBF7' : '#1A1A2E',
        overscrollBehaviorX: 'none', // Empêche le swipe-back natif
        userSelect: isMobile ? 'none' : 'auto', // Désactive sélection texte sur mobile
        WebkitUserSelect: isMobile ? 'none' : 'auto'
      } as React.CSSProperties}
      onClick={handleTap}
    >
      {/* Bouton Son */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setIsSoundEnabled(p => !p) }}
              className="p-2 rounded-full text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full flex items-center justify-center">
        {!isMobile && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{
              top: '2.5%', bottom: '2.5%', width: '8px',
              background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)',
              filter: 'blur(2px)'
            }}
          />
        )}

        {/* WRAPPER SWIPE - Conteneur relatif pour l'overlay */}
        <div
          className="relative"
          style={{
            width: isMobile ? '100%' : 'auto',
            height: isMobile ? '100%' : 'auto'
          }}
        >
          {/* OVERLAY SWIPE - Capture UNIQUEMENT les pans, laisse passer les clics */}
          {isMobile && (
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 999,
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                // Transparent mais capture les gestes
                background: 'transparent'
              } as React.CSSProperties}
              onPanEnd={(_event, info) => {
                // Swipe mobile avec détection velocity + offset
                if (!bookRef.current) return;

                const distance = info.offset.x;
                const velocity = info.velocity.x;
                const currentIndex = bookRef.current.pageFlip().getCurrentPageIndex();

                // Log pour débogage mobile
                console.log('Swipe détecté - Distance X:', distance, 'Velocity X:', velocity, 'Page actuelle:', currentIndex);

                // Détection swipe DROITE (retour arrière)
                const isSwipeRight = distance > 30 || velocity > 500;
                // Détection swipe GAUCHE (avancer)
                const isSwipeLeft = distance < -30 || velocity < -500;

                if (isSwipeRight && currentIndex > 0) {
                  console.log('→ flipPrev() - Swipe droite détecté');
                  setTimeout(() => {
                    bookRef.current?.pageFlip().flipPrev();
                  }, 10);
                } else if (isSwipeLeft) {
                  console.log('← flipNext() - Swipe gauche détecté');
                  setTimeout(() => {
                    bookRef.current?.pageFlip().flipNext();
                  }, 10);
                }
              }}
              onTap={(e) => {
                // Laisse passer les taps vers le contenu en dessous
                e.stopPropagation();
              }}
            />
          )}

          <HTMLFlipBook
            ref={bookRef}
            width={width}
            height={height}
            size="fixed"
            minWidth={280}
            maxWidth={width}
            minHeight={400}
            maxHeight={height}
            maxShadowOpacity={isMobile ? 0.1 : 0.35}
            showCover={true}
            mobileScrollSupport={false}
            onFlip={onFlip}
            className="shadow-2xl"
            style={{ margin: '0 auto', pointerEvents: 'auto' }} // Reçoit les événements
            startPage={0}
            drawShadow={!isMobile}
            flippingTime={isMobile ? 400 : 600}
            usePortrait={isMobile} // Mobile: 1 page, Desktop: 2 pages
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={!isMobile} // PC: souris active, Mobile: désactivé (géré par Motion)
            swipeDistance={isMobile ? 0 : 30} // PC: swipe natif 30px, Mobile: géré par Motion
            showPageCorners={!isMobile}
            disableFlipByClick={isMobile || disableFlip}
          >
            {children}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Aide visuelle Swipe (Mobile) */}
      {isMobile && currentPage === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <motion.p 
            animate={{ x: [-5, 5, -5] }}
            transition={{ repeat: 3, duration: 0.8 }}
            className="text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            ← Swipe pour tourner →
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}

export default Book
