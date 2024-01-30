import { ListingCardsContainer } from '@echo/ui/components/listing/card/layout/listing-cards-container'
import { ProfileExploreEmpty } from '@echo/ui/pages/profile/explore/profile-explore-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
}

export const ProfileExplore: FunctionComponent<Props> = ({ listings }) => {
  if (isEmpty(listings)) {
    return <ProfileExploreEmpty />
  }
  return <ListingCardsContainer listings={listings} />
}
