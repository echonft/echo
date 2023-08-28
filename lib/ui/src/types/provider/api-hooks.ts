import { UpdateOfferAction } from '@echo/api-public'
import { Offer } from '@echo/ui-model'
import { SWRResponse } from 'swr'

export interface ApiHooks {
  useGetUserOffers: () => SWRResponse<Offer[], Error>
  useGetOffer: (offerId: string) => SWRResponse<Offer, Error>
  useUpdateOffer: (offerId: string, action: UpdateOfferAction) => SWRResponse<Offer, Error>
}
