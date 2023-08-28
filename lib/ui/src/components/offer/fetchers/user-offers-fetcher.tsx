import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { OffersProvided } from '../offers-provided'
import { User } from '@echo/ui-model'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

export interface OffersFetcherProps {
  user: User
  onOffersError?: (error: Error) => unknown
}

export const UserOffersFetcher: FunctionComponent<PropsWithChildren<OffersFetcherProps>> = ({
  user,
  onOffersError
}) => {
  const { useGetUserOffers } = useApiHooks()
  const { data, error } = useGetUserOffers()

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onOffersError)) {
      onOffersError(error)
    }
  }, [error, onOffersError])

  if (isNil(data)) {
    return null
  }

  return <OffersProvided offers={data} user={user} />
}
