import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { isUserOfferReceiver } from '../../../helpers/is-user-offer-receiver'
import { OfferDetailsProvided } from '../details/offer-details-provided'
import { Offer, User } from '@echo/ui-model'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback, useEffect } from 'react'

export interface OfferDetailsFetcherProps {
  offerId?: string
  initialOffer?: Offer
  user: User
  onOfferError?: (error: Error) => unknown
}

export const OfferDetailsFetcher: FunctionComponent<OfferDetailsFetcherProps> = ({
  offerId,
  initialOffer,
  user,
  onOfferError
}) => {
  const { useGetOffer } = useApiHooks()
  // Need to force unwrap offerId ?? offer?.id as one has to be defined
  const { data, error, mutate } = useGetOffer((offerId ?? offer?.id)!, initialOffer)

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onOfferError)) {
      onOfferError(error)
    }
  }, [error, onOfferError])

  const onOfferUpdated = useCallback(async () => {
    await mutate()
  }, [mutate])

  if (isNil(data)) {
    return null
  }
  if (!isNil(data)) {
    return (
      <OfferDetailsProvided
        offer={data}
        isReceiving={isUserOfferReceiver(user, data)}
        onOfferUpdated={onOfferUpdated}
      />
    )
  }
}
