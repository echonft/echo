import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileListingsCreatedEmpty } from '@echo/ui/pages/profile/listings/profile-listings-created-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser | undefined
}

export const ProfileListingsCreated: FunctionComponent<Props> = ({ listings, user }) => {
  if (isEmpty(listings)) {
    return <ProfileListingsCreatedEmpty />
  }
  return <ListingRowsContainer listings={listings} user={user} />
}
