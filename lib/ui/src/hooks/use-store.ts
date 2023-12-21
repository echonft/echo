import { useEffect, useState } from 'react'

/**
 * Hook to use store with SSR
 * See https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#usage-in-nextjs
 */
export const useStore = <T, F>(store: (callback: (state: T) => unknown) => unknown, callback: (state: T) => F) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
