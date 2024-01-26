import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ListingCardSwitch } from '@echo/ui/components/listing/card/listing-card-switch'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingCard: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  return (
    <InternalLink path={linkProvider.listing.details.get({ listingId: listing.id })}>
      <ListingCardSwitch listing={listing} scaleDisabled={scaleDisabled} />
    </InternalLink>
  )
}
