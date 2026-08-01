import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, X } from 'lucide-react'

export default function ProtectionGuard() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Right-click context menu is disabled.')

  useEffect(() => {
    // Prevent Right Click / Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setAlertMessage('Right-click context menu is disabled to protect content and assets.')
      setShowAlert(true)
    }

    // Prevent Inspect / View Source Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      // Shortcuts: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (ctrlOrCmd && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S'))
      ) {
        e.preventDefault()
        setAlertMessage('Developer Tools and View Source shortcuts are disabled.')
        setShowAlert(true)
      }
    }

    // Prevent Image Drag & Drop globally
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
      }
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('dragstart', handleDragStart)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  // Auto-hide notification after 3.5 seconds
  useEffect(() => {
    if (!showAlert) return
    const timer = setTimeout(() => {
      setShowAlert(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [showAlert])

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-slate-900/95 px-4 py-3 text-xs font-medium text-white shadow-2xl backdrop-blur-md md:text-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <ShieldAlert size={16} />
          </span>
          <p className="max-w-xs leading-snug">{alertMessage}</p>
          <button
            onClick={() => setShowAlert(false)}
            className="ml-2 rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
