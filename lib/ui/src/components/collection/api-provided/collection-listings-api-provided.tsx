'use client'
import { CollectionListingsContainer } from '../collection-listings-container'
import { ListingResponse } from '@echo/api'
import { mapListing } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<ListingResponse>>
}

export const CollectionListingsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  // TODO we might have to show the skeleton if this is slow
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])

  return <CollectionListingsContainer collectionSlug={collectionSlug} listings={mappedListings} />
}
