import { useCallback, useEffect, useRef } from 'react'
import { BareFetcher, Key, SWRConfiguration, SWRHook } from 'swr'

// This is an SWR middleware for keeping the data even if key changes.
export function laggy(useSWRNext: SWRHook) {
  return <Data, Error>(
    key: Key,
    fetcher: BareFetcher<Data> | null,
    config: SWRConfiguration<Data, Error, BareFetcher<Data>>
  ) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef<Data>()

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config)

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data
      }
    }, [swr.data])

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined
    }, [])

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data

    // Is it showing previous data?
    const isLagging = swr.data === undefined && laggyDataRef.current !== undefined

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy
    })
  }
}
