'use client'
import { CollectionNftsAndFiltersContainer } from '../collection-nfts-and-filters-container'
import { NftResponse } from '@echo/api'
import { getTraitsForNfts, mapNft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<NftResponse>>
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  // TODO we might have to show the skeleton if this is slow
  const mappedNfts = useMemo(() => map(mapNft, responses), [responses])
  const traits = useMemo(() => getTraitsForNfts(mappedNfts), [mappedNfts])

  return (
    <CollectionNftsAndFiltersContainer
      collectionSlug={collectionSlug}
      nfts={mappedNfts}
      traits={traits}
      // TODO
      onMakeOfferForNft={() => undefined}
    />
  )
}
