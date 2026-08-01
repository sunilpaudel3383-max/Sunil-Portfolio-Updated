import { useEffect, useState, type CSSProperties } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  style?: CSSProperties
  initialDelay?: number
  charDelay?: number
  duration?: number
}

export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        // Absolute index of each character within the line (spaces included),
        // so the left-to-right stagger matches the original formula.
        let absIndex = 0

        return (
          <span key={lineIndex} className="block">
            {words.map((word, wordIndex) => {
              const wordSpan = (
                // Each word is an inline-block group that never breaks mid-word;
                // the regular space between words stays a soft-wrap opportunity.
                <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
                  {word.split('').map((char) => {
                    const delay =
                      lineIndex * line.length * charDelay + absIndex * charDelay
                    absIndex += 1
                    return (
                      <span
                        key={absIndex}
                        className="inline-block"
                        style={{
                          opacity: animate ? 1 : 0,
                          transform: animate
                            ? 'translateX(0)'
                            : 'translateX(-18px)',
                          transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
                          transitionDelay: `${delay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              )

              // Account for the space character in the stagger timing, then
              // render it as a real breakable space between word groups.
              absIndex += 1
              return wordIndex < words.length - 1 ? (
                <span key={`wrap-${wordIndex}`}>
                  {wordSpan}{' '}
                </span>
              ) : (
                wordSpan
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
