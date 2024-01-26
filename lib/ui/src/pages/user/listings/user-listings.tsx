import { ListingCardsContainer } from '@echo/ui/components/listing/card/layout/listing-cards-container'
import { UserListingsEmpty } from '@echo/ui/pages/user/listings/user-listings-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  listings: ListingWithRole[]
}

export const UserListings: FunctionComponent<Props> = ({ username, listings }) => {
  if (isEmpty(listings)) {
    return <UserListingsEmpty username={username} />
  }
  return <ListingCardsContainer listings={listings} />
}
