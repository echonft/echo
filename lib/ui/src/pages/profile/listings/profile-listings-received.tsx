import { ListingCardsContainer } from '@echo/ui/components/listing/card/layout/listing-cards-container'
import { ProfileListingsReceivedEmpty } from '@echo/ui/pages/profile/listings/profile-listings-received-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
}

export const ProfileListingsReceived: FunctionComponent<Props> = ({ listings }) => {
  if (isEmpty(listings)) {
    return <ProfileListingsReceivedEmpty />
  }
  return <ListingCardsContainer listings={listings} />
}
