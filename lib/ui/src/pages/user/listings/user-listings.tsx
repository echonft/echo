import type { Username } from '@echo/model/types/username'
import { ListingCards } from '@echo/ui/components/listing/card/listing-cards'
import { UserListingsEmpty } from '@echo/ui/pages/user/listings/user-listings-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  username: Username
  listings: ListingWithRole[]
}

export const UserListings: FunctionComponent<Props> = ({ username, listings }) => {
  if (isEmpty(listings)) {
    return <UserListingsEmpty username={username} />
  }
  return <ListingCards listings={listings} />
}
