import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { UpdateOfferAction } from '@echo/api-public'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect } from 'react'

export interface UpdateOfferFetcherProps {
  offerId: string
  updateAction: UpdateOfferAction
  onOfferUpdated?: () => unknown
  onOfferUpdateError?: (error: Error) => unknown
}

export const UpdateOfferFetcher: FunctionComponent<UpdateOfferFetcherProps> = ({
  offerId,
  updateAction,
  onOfferUpdated,
  onOfferUpdateError
}) => {
  const { useUpdateOffer } = useApiHooks()
  const { data, error } = useUpdateOffer(offerId, updateAction)

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onOfferUpdateError)) {
      onOfferUpdateError(error)
    }
  }, [error, onOfferUpdateError])

  // data handling
  useEffect(() => {
    if (!isNil(data) && !isNil(onOfferUpdated)) {
      onOfferUpdated()
    }
  }, [data, onOfferUpdated])

  // No components here, just a fetcher
  return null
}
