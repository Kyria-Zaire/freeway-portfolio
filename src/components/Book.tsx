/**
 * Book.tsx - IMORIA Kindle-Like Experience
 * 
 * VERSION ULTRA-IMMERSIVE
 * 
 * Mobile : Le livre = L'écran (100vw x 100vh)
 * Desktop : Double-page occupant 95% de la hauteur
 * 
 * Zéro marge, zéro padding, zéro espace perdu.
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Volume2, VolumeX } from 'lucide-react'
import type { ReactNode, ForwardedRef } from 'react'
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
      const isMobile = vw < 768

      if (isMobile) {
        // =============================================
        // MOBILE : 100% de l'écran, ZÉRO MARGE
        // =============================================
        setDims({
          width: vw,
          height: vh,
          isMobile: true,
        })
      } else {
        // =============================================
        // DESKTOP : 95% de la hauteur, double-page
        // =============================================
        const targetHeight = vh * 0.95
        const aspectRatio = 0.68 // Ratio page (largeur/hauteur)
        let pageWidth = targetHeight * aspectRatio
        
        // S'assurer que 2 pages tiennent dans la largeur
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
    window.addEventListener('orientationchange', calculate)
    
    return () => {
      window.removeEventListener('resize', calculate)
      window.removeEventListener('orientationchange', calculate)
    }
  }, [])

  return dims
}

// ============================================
// Composant Page
// ============================================

export const Page = ({ children, pageNumber, totalPages = 6 }: PageProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div 
      ref={ref} 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#FDFBF7' }}
      data-page={pageNumber}
    >
      {/* Indicateur de page intégré - toujours visible */}
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
      
      {/* Contenu avec police responsive en vw */}
      <div 
        className="w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ fontSize: 'clamp(12px, 3.5vw, 16px)' }}
      >
        {children}
      </div>
    </div>
  )
}

import { forwardRef } from 'react'
export const PageComponent = forwardRef(Page)

// ============================================
// Composant Book PLEIN ÉCRAN
// ============================================

export const Book = ({ children }: BookProps) => {
  const bookRef = useRef<PageFlipRef>(null)
  const { width, height, isMobile } = useFullScreenBook()
  
  const [currentPage, setCurrentPage] = useState(0)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [showUI, setShowUI] = useState(true)

  // Auto-hide UI sur mobile après 3s
  useEffect(() => {
    if (!isMobile) return
    
    const timer = setTimeout(() => setShowUI(false), 3000)
    return () => clearTimeout(timer)
  }, [isMobile])

  // Son page flip
  const playSound = useCallback(() => {
    if (!isSoundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const now = ctx.currentTime
      
      // Swoosh
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
    } catch { /* silent */ }
  }, [isSoundEnabled])

  const onFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data)
    playSound()
    if (isMobile) setShowUI(true)
  }, [playSound, isMobile])

  // Toggle UI sur tap (mobile)
  const handleTap = useCallback(() => {
    if (isMobile) setShowUI(prev => !prev)
  }, [isMobile])

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ 
        width: '100vw', 
        height: '100dvh',
        backgroundColor: isMobile ? '#FDFBF7' : '#1A1A2E'
      }}
      onClick={handleTap}
    >
      {/* ==========================================
          BOUTON SON (en haut à droite)
          ========================================== */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
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

      {/* ==========================================
          LIVRE - PLEIN ÉCRAN
          ========================================== */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Reliure centrale (Desktop) */}
        {!isMobile && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{
              top: '2.5%',
              bottom: '2.5%',
              width: '8px',
              background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)',
              filter: 'blur(2px)'
            }}
          />
        )}

        {/* @ts-expect-error - Types incomplets */}
        <HTMLFlipBook
          ref={bookRef}
          width={width}
          height={height}
          size="fixed"
          minWidth={280}
          maxWidth={isMobile ? width : width}
          minHeight={400}
          maxHeight={height}
          maxShadowOpacity={isMobile ? 0.1 : 0.35}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className=""
          style={{}}
          startPage={0}
          drawShadow={!isMobile}
          flippingTime={isMobile ? 400 : 600}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={isMobile ? 15 : 30}
          showPageCorners={!isMobile}
          disableFlipByClick={isMobile}
        >
          {children}
        </HTMLFlipBook>
      </div>


      {/* Indicateur Swipe (Mobile) - Affiché brièvement */}
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
