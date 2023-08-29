import { delayPromise } from '../../utils/delay-promise'
import { useDb } from './use-db'
import { useEffect } from 'react'
import useSWR from 'swr'

export const useUpdateOffer = (offerId: string, action: number) => {
  const { offer } = useDb()
  useEffect(() => {
    if (action === 0) {
      offer.setData((oldValue) => ({ ...oldValue, state: 'CANCELLED' }))
    }
    if (action === 1) {
      offer.setData((oldValue) => ({ ...oldValue, state: 'REJECTED' }))
    }
    if (action === 2) {
      offer.setData((oldValue) => ({ ...oldValue, state: 'ACCEPTED' }))
    }
    if (action === 3) {
      offer.setData((oldValue) => ({ ...oldValue, state: 'COMPLETED' }))
    }
  }, [action])
  return useSWR<string, Error, string>(`useUpdateOffer-${offerId}`, () => delayPromise(Promise.resolve(offerId)), {
    suspense: true
  })
}
