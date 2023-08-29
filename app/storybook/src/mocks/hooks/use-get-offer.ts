import { delayPromise } from '../../utils/delay-promise'
import { useDb } from './use-db'
import { Offer } from '@echo/ui-model'
import useSWR from 'swr'

export const useGetOffer = (offerId: string) => {
  const { offer } = useDb()
  return useSWR<Offer, Error, string>(`useGetOffer-${offerId}`, () => delayPromise(Promise.resolve(offer.data!)), {
    suspense: true
  })
}
