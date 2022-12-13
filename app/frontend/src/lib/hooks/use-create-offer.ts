import { ApiRoutes, CreateOfferRequest, getApiRouteUrl, OfferResponse } from '@echo/api/dist/types'
import { fetcher } from '@lib/services/fetcher'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useCreateOffer(request: CreateOfferRequest | undefined) {
  const { data, error } = useSWR<OfferResponse, Error, [string, CreateOfferRequest] | undefined>(
    isNil(request) ? undefined : [getApiRouteUrl(ApiRoutes.OFFER), request],
    fetcher
  )
  return { offerId: data?.offerId, error }
}
