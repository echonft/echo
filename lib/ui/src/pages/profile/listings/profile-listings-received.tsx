import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileListingsReceivedEmpty } from '@echo/ui/pages/profile/listings/profile-listings-received-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser | undefined
}

export const ProfileListingsReceived: FunctionComponent<Props> = ({ listings, user }) => {
  if (isEmpty(listings)) {
    return <ProfileListingsReceivedEmpty />
  }
  return <ListingRowsContainer listings={listings} user={user} />
}
