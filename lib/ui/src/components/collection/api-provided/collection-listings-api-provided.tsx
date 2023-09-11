'use client'
import { NavigationListings } from '../../../constants/navigation-item'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { ListingRowsContainer } from '../../listing/layout/container/listing-rows-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import { CollectionListingsEmpty } from '../swap/empty/collection-listings-empty'
import type { ListingResponse } from '@echo/api/types'
import { mapListing } from '@echo/ui-model'
import { isEmpty, map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

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
