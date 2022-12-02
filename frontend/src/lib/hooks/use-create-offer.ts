import { ApiRoutes, OfferResponse } from '@echo/api/dist/types'
import { NewOffer } from '@echo/model'
import { fetcher } from '@lib/services/fetcher'
import useSWR from 'swr'

export function useCreateOffer(request: NewOffer | undefined) {
  const { data, error } = useSWR<OfferResponse, Error>(
    request
      ? [
          ApiRoutes.OFFER,
          {
            type: request.type,
            userId: request.owner.id,
            collectionId: request.collection.discordId,
            ownerItems: JSON.stringify(request.ownerItems),
            counterpartyItems: JSON.stringify(request.counterpartyItems)
          }
        ]
      : undefined,
    fetcher
  )
  return { offerId: data?.offerId, error }
}
