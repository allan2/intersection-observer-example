import { useCallback, useEffect, useRef, useState } from 'react'

// Defining the root margin is making sure intersecting is properly set to false when exiting the div.

// The problem is that the callback is only called when the target is intersecting, i.e. enters the viewport.
// The logic to see if it is touching the header doesn't get called while you're scrolling through the intersecting part.

// Refreshing the page while the target is intersecting the header works. But scrolling does not.

const Homepage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const [intersecting, SetIntersecting] = useState(false)

  // memoized
  const callback = useCallback<IntersectionObserverCallback>(
    (entries: IntersectionObserverEntry[]): void => {
      const [e] = entries // there's only one

      console.log(e.boundingClientRect)

      const headerHeight =
        document.getElementsByTagName('header')[0].clientHeight

      const targetTop = e.boundingClientRect.top
      const targetBottom = e.boundingClientRect.bottom

      if (targetBottom <= headerHeight) {
        // leaving
        if (e.target.textContent) {
          setText('The header is past the target')
        }
      } else if (targetTop <= headerHeight) {
        // intersected
        if (e.target.textContent) {
          setText('The header is touching the target')
        }
      } else {
        setText('The header is not touching the target')
      }

      if (e.isIntersecting) {
        SetIntersecting(true)
      } else {
        SetIntersecting(false)
      }
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: document.getElementById('container'),
      rootMargin:
        typeof document !== 'undefined'
          ? `${
              document.getElementsByTagName('header')[0].clientHeight * -1
            }px 0px 0px 0px`
          : '0px',
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
        <span className="intersecting">
          intersecting the viewport: {intersecting ? 'true' : 'false'}
        </span>
      </header>
      <div className="red1">red 1</div>
      <div ref={ref} className="green2">
        green 2
      </div>
      <div className="blue3">blue 3</div>
    </div>
  )
}

export default Homepage
