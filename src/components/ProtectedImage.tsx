import { useState, useEffect, ImgHTMLAttributes } from 'react'

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  overlayClassName?: string
  containerClassName?: string
  showBlobUrl?: boolean
}

export default function ProtectedImage({
  src,
  alt,
  className = '',
  overlayClassName = '',
  containerClassName = '',
  showBlobUrl = true,
  ...props
}: ProtectedImageProps) {
  const [protectedSrc, setProtectedSrc] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    let blobUrlCreated: string | null = null

    if (!showBlobUrl || !src || src.startsWith('data:') || src.startsWith('blob:')) {
      setProtectedSrc(src)
      setLoading(false)
      return
    }

    // Convert static asset URL to in-memory Blob URL to hide disk path from raw source code
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('Image fetch failed')
        return res.blob()
      })
      .then((blob) => {
        if (isMounted) {
          blobUrlCreated = URL.createObjectURL(blob)
          setProtectedSrc(blobUrlCreated)
          setLoading(false)
        }
      })
      .catch(() => {
        // Fallback to original src if blob creation fails (e.g., cross-origin constraint)
        if (isMounted) {
          setProtectedSrc(src)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
      if (blobUrlCreated) {
        URL.revokeObjectURL(blobUrlCreated)
      }
    }
  }, [src, showBlobUrl])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className={`relative overflow-hidden select-none ${containerClassName}`}
      onContextMenu={handleContextMenu}
    >
      {/* Dynamic Image or Loading Skeleton */}
      {loading ? (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${className}`} />
      ) : (
        <img
          {...props}
          src={protectedSrc || src}
          alt={alt}
          draggable={false}
          onContextMenu={handleContextMenu}
          onDragStart={(e) => e.preventDefault()}
          referrerPolicy="no-referrer"
          className={`select-none pointer-events-auto ${className}`}
          style={{
            WebkitUserDrag: 'none',
            userSelect: 'none',
            ...props.style,
          } as React.CSSProperties}
        />
      )}

      {/* Transparent Protective Shield Layer */}
      <div
        aria-hidden="true"
        onContextMenu={handleContextMenu}
        className={`absolute inset-0 z-10 bg-transparent select-none pointer-events-auto ${overlayClassName}`}
      />
    </div>
  )
}
