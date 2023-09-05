'use client'
import { CollectionNftsAndFiltersContainer } from '../collection-nfts-and-filters-container'
import { NftResponse } from '@echo/api'
import { getTraitsForNfts, mapNft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionNftsApiProvidedProps {
  collectionSlug: string
  responses: Array<Partial<NftResponse>>
  selectedNavigationItemId: 'items' | 'listings' | 'swaps'
}

export const CollectionNftsApiProvided: FunctionComponent<CollectionNftsApiProvidedProps> = ({
  collectionSlug,
  responses,
  selectedNavigationItemId
}) => {
  // TODO we might have to show the skeleton if this is slow
  const nfts = map(mapNft, responses)
  const traits = getTraitsForNfts(nfts)

  return (
    <CollectionNftsAndFiltersContainer
      collectionSlug={collectionSlug}
      selectedNavigationItemId={selectedNavigationItemId}
      nfts={nfts}
      traits={traits}
      // TODO
      onMakeOfferForNft={() => undefined}
    />
  )
}
