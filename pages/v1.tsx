import { useCallback, useEffect, useRef, useState } from 'react'

// this works in most bnr
const HomepageV1 = () => {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const [intersecting1, SetIntersecting1] = useState(false)
  const [intersecting2, SetIntersecting2] = useState(false)

  // memoized
  const callback1 = useCallback<IntersectionObserverCallback>(
    (entries): void => {
      const [e] = entries // there's only one

      if (e.isIntersecting) {
        SetIntersecting1(true)
      } else {
        SetIntersecting1(false)
      }
    },
    []
  )

  const callback2 = useCallback<IntersectionObserverCallback>(
    (entries): void => {
      const [e] = entries // there's only one

      if (e.isIntersecting) {
        SetIntersecting2(true)
      } else {
        SetIntersecting2(false)
      }
    },
    []
  )

  useEffect(() => {
    const observer1 = new IntersectionObserver(callback1, {
      rootMargin:
        typeof document !== 'undefined'
          ? `${
              document.getElementsByTagName('header')[0].clientHeight * -1
            }px 0px 0px 0px`
          : '0px',
    })

    const observer2 = new IntersectionObserver(callback2, {
      rootMargin:
        typeof document !== 'undefined'
          ? `${
              document.getElementsByTagName('header')[0].clientHeight * -1
            }px 0px 0px 0px`
          : '0px',
    })

    const refCurr1 = ref1.current
    if (refCurr1 === null) {
      return () => {
        return void 0
      }
    }
    observer1.observe(refCurr1)

    const refCurr2 = ref2.current
    if (refCurr2 === null) {
      return () => {
        return void 0
      }
    }
    observer2.observe(refCurr2)
    console.log('attach')

    // clean up
    return () => {
      observer1.unobserve(refCurr1)
      observer2.unobserve(refCurr2)
      console.log('detach')
    }
  }, [callback1])

  return (
    <div className="container">
      <header>
        {!intersecting1 && intersecting2
          ? 'The header is touching the target'
          : 'The header is not touching the target'}
        <span className="label">
          sentinel 1 intersecting the viewport:{' '}
          {intersecting1 ? 'true' : 'false'}
        </span>
        <span className="label">
          sentinel 2 intersecting the viewport:{' '}
          {intersecting2 ? 'true' : 'false'}
        </span>
      </header>
      <div className="red1">red 1</div>
      <div ref={ref1}>sentinel 1</div>
      <div ref={ref2} className="green2">
        green 2
      </div>
      <div>sentinel 2</div>
      <div className="blue3">blue 3</div>
    </div>
  )
}

export default HomepageV1
