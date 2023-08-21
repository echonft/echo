import { User } from '../../../types/user'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface OffersFetcherProps {
  user: User
  onOffersError?: (error: Error) => unknown
}

export const UserOffersFetcher: FunctionComponent<PropsWithChildren<OffersFetcherProps>> = ({
  user,
  onOffersError
}) => {
  // TODO
  // const { data, error } = useUserOffers()
  //
  // // error handling
  // useEffect(() => {
  //   if (!isNil(error) && !isNil(onOffersError)) {
  //     onOffersError(error)
  //   }
  // }, [error, onOffersError])
  //
  // if (isNil(data)) {
  //   return null
  // }

  return <></>
  // {/* TODO */}
  // {/*<OffersProvided offers={data} user={user}/>*/}
}
