import { ListingCards } from '@echo/ui/components/listing/card/listing-cards'
import { ProfileListingsEmpty } from '@echo/ui/pages/profile/listings/profile-listings-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
}

export const ProfileListings: FunctionComponent<Props> = ({ listings }) => {
  if (isEmpty(listings)) {
    return <ProfileListingsEmpty />
  }
  return <ListingCards listings={listings} />
}
