import type { Listing } from '@echo/model/types/listing'
import { ListingOfferUserDetailsRounded } from '@echo/ui/components/user/listing-offer/listing-offer-user-details-rounded'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
  // TODO remove and use ListingWithRole
  show: boolean
}

export const ListingDetailsModalCreator: FunctionComponent<Props> = ({ listing, show }) => {
  if (show) {
    return <ListingOfferUserDetailsRounded user={listing.creator} />
  }
  return null
}
