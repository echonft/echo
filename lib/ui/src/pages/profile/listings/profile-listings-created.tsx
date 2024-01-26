import { ListingCardsContainer } from '@echo/ui/components/listing/card/layout/listing-cards-container'
import { ProfileListingsCreatedEmpty } from '@echo/ui/pages/profile/listings/profile-listings-created-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
}

export const ProfileListingsCreated: FunctionComponent<Props> = ({ listings }) => {
  if (isEmpty(listings)) {
    return <ProfileListingsCreatedEmpty />
  }
  return <ListingCardsContainer listings={listings} />
}
