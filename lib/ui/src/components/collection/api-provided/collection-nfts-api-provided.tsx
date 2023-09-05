'use client'
import { CollectionNftsAndFiltersContainer, NAVIGATION_ITEM_IDS } from '../collection-nfts-and-filters-container'
import { NftResponse } from '@echo/api'
import { getTraitsForNfts, mapNft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionNftsApiProvidedProps {
  collectionSlug: string
  nftResponses: Array<Partial<NftResponse>>
  selectedNavigationItemId: (typeof NAVIGATION_ITEM_IDS)[number]
}

export const CollectionNftsApiProvided: FunctionComponent<CollectionNftsApiProvidedProps> = ({
  collectionSlug,
  nftResponses,
  selectedNavigationItemId
}) => {
  // TODO we might have to show the skeleton if this is slow
  const nfts = map(mapNft, nftResponses)
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
