import { delayPromise } from '../../utils/delay-promise'
import { getAllOffers } from '../model/offer'
import { Offer } from '@echo/ui-model'
import useSWR from 'swr'

export const useGetUserOffers = () =>
  useSWR<Offer[], Error, string>(`useGetUserOffers`, () => delayPromise(Promise.resolve(getAllOffers())), {
    suspense: true
  })
