import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getListingTargetsCollections } from '@echo/model/helpers/listing/get-listing-targets-collections'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ListingCardSwitch } from '@echo/ui/components/listing/card/listing-card-switch'
import { nonEmptyReturn } from '@echo/utils/fp/non-empty-return'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingCard: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  const slug = pipe<[Listing], NonEmptyArray<Collection>, Collection, string>(
    nonEmptyReturn(getListingTargetsCollections),
    head,
    prop('slug')
  )(listing)
  return (
    <InternalLink path={linkProvider.collection.listing.get({ slug, listingId: listing.id })}>
      <ListingCardSwitch listing={listing} scaleDisabled={scaleDisabled} />
    </InternalLink>
  )
}
