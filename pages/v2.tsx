import { useCallback, useEffect, useRef, useState } from 'react'

// this works in Chrome only
const HomepageV2 = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const [intersecting, SetIntersecting] = useState(false)
  const [visible, setVisible] = useState(false)

  // memoized
  const callback = useCallback<IntersectionObserverCallback>(
    (entries): void => {
      const [e] = entries // there's only one

      if (e.isIntersecting && !e.isVisible) {
        setText('The header is touching the target')
      } else {
        setText('The header is not touching the target')
      }

      if (e.isIntersecting) {
        SetIntersecting(true)
      } else {
        SetIntersecting(false)
      }

      if (e.isVisible) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      //root: document.getElementsByTagName('header')[0],
      rootMargin:
        typeof document !== 'undefined'
          ? `${
              document.getElementsByTagName('header')[0].clientHeight * -1
            }px 0px 0px 0px`
          : '0px',
      trackVisibility: true,
      delay: 100,
    })

    const refCurr = ref.current
    if (refCurr === null) {
      return () => {
        return void 0
      }
    }
    observer.observe(refCurr)

    console.log('attach')

    // clean up
    return () => {
      observer.unobserve(refCurr)
      console.log('detach')
    }
  }, [callback])

  return (
    <div className="container">
      <header>
        {text}
        <span className="label">
          intersecting the viewport: {intersecting ? 'true' : 'false'}
        </span>
        <span className="label">visible: {visible ? 'true' : 'false'}</span>
      </header>
      <div className="red1">red 1</div>
      <div ref={ref} className="green2">
        green 2
      </div>
      <div className="blue3">blue 3</div>
    </div>
  )
}

export default HomepageV2
