import { ApiRoutes, CreateOfferRequest, OfferResponse } from '@echo/api/dist/types'
import { fetcher } from '@lib/services/fetcher'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useCreateOffer(request: CreateOfferRequest | undefined) {
  const { data, error } = useSWR<OfferResponse, Error, [ApiRoutes, CreateOfferRequest] | undefined>(
    !isNil(request) ? [ApiRoutes.OFFER, request] : undefined,
    fetcher
  )
  return { offerId: data?.offerId, error }
}
