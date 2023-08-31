import { Offer } from '@echo/ui-model'
import { SWRResponse } from 'swr'

export interface ApiHooks {
  // Offer
  useGetUserOffers: () => SWRResponse<Offer[], Error>
  useGetOffer: (offerId: string, initialOffer?: Offer) => SWRResponse<Offer, Error>
  useUpdateOffer: (offerId: string, action: number) => SWRResponse<string, Error>
}
