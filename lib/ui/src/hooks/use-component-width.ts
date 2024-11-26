import { isNil } from 'ramda'
import { useLayoutEffect, useRef, useState } from 'react'

export function useComponentWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (!isNil(ref.current)) {
      setWidth(ref.current.getBoundingClientRect().width)
    }
  }, [])

  return { ref, width }
}
