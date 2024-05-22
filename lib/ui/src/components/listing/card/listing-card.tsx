import { linkProvider } from '@echo/api/routing/link-provider'
import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ListingCardSwitch } from '@echo/ui/components/listing/card/listing-card-switch'
import { type FunctionComponent } from 'react'

export interface ListingCardProps {
  listing: Listing
  options?: {
    scaleDisabled?: boolean
  }
}

export const ListingCard: FunctionComponent<ListingCardProps> = ({ listing, options }) => {
  return (
    <InternalLink path={linkProvider.listing.details.get({ listingSlug: listing.slug })}>
      <ListingCardSwitch listing={listing} scaleDisabled={options?.scaleDisabled} />
    </InternalLink>
  )
}
