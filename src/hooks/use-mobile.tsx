
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialisation côté client uniquement pour éviter les erreurs SSR
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Utiliser matchMedia pour de meilleures performances
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Pour les navigateurs modernes qui supportent addEventListener
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize)
    } else {
      // Fallback pour les anciens navigateurs
      window.addEventListener("resize", handleResize)
    }
    
    // S'assurer que l'état initial est correct
    handleResize()
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize)
      } else {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return isMobile
}

// Ajouter aussi un hook pour différentes tailles d'écran
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState({
    isXs: false,  // < 576px
    isSm: false,  // >= 576px
    isMd: false,  // >= 768px
    isLg: false,  // >= 992px
    isXl: false,  // >= 1200px
    is2xl: false, // >= 1400px
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      const width = window.innerWidth
      setBreakpoint({
        isXs: width < 576,
        isSm: width >= 576 && width < 768,
        isMd: width >= 768 && width < 992,
        isLg: width >= 992 && width < 1200,
        isXl: width >= 1200 && width < 1400,
        is2xl: width >= 1400,
      })
    }
    
    window.addEventListener("resize", handleResize)
    handleResize()
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return breakpoint
}
