import type { Collection } from '@echo/model/types/collection'
import type { Counts } from '@echo/model/types/counts'
import type { OwnedNft } from '@echo/model/types/nft'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { CollectionNavigation } from '@echo/ui/pages/collection/collection-navigation'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  collection: Collection
  counts: Counts
  listings: ListingWithRole[]
  nfts: OwnedNft[]
  offers: OfferWithRole[]
  swaps: SwapWithRole[]
}

export const CollectionPage: FunctionComponent<Props> = ({ collection, counts, listings, nfts, offers, swaps }) => {
  return (
    <NavigationLayout>
      <SectionLayout>
        <CollectionDetails collection={mergeLeft(collection, counts)} />
      </SectionLayout>
      <NavigationSectionLayout>
        <CollectionNavigation collection={collection} listings={listings} nfts={nfts} offers={offers} swaps={swaps} />
      </NavigationSectionLayout>
    </NavigationLayout>
  )
}
