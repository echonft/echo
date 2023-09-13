'use client'
import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { CollectionListingsEmpty } from '@echo/ui/components/collection/swap/empty/collection-listings-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { NavigationListings } from '@echo/ui/constants/navigation-item'
import { mapListing } from '@echo/ui/mappers/from-api/map-listing'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<ListingResponse>>
}

export const CollectionListingsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])
  const dataIsEmpty = isEmpty(mappedListings)

  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationListings}>
      <HideIf condition={dataIsEmpty}>
        <ListingRowsContainer listings={mappedListings} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <CollectionListingsEmpty />
      </ShowIf>
    </CollectionNavigationLayout>
  )
}
