import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { UserListingsEmpty } from '@echo/ui/pages/user/listings/user-listings-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  listings: Listing[]
  user: AuthUser | undefined
}

export const UserListings: FunctionComponent<Props> = ({ username, listings, user }) => {
  if (isEmpty(listings)) {
    return <UserListingsEmpty username={username} />
  }
  return <ListingRowsContainer listings={listings} user={user} />
}
