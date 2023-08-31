'use client'
import { CollectionNftsAndFiltersContainer } from './collection-nfts-and-filters-container'
import { filterNftsByTraits, Nft, NftTraits } from '@echo/ui-model'
import { FunctionComponent, useState } from 'react'

interface Props {
  nfts: Nft[]
  traits: NftTraits
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionNfts: FunctionComponent<Props> = ({ nfts, traits, onMakeOfferForNft }) => {
  const [traitsFilter, setTraitsFilter] = useState<NftTraits>()

  return (
    <CollectionNftsAndFiltersContainer
      nfts={filterNftsByTraits(nfts, traitsFilter)}
      traits={traits}
      isFetchingNfts={false}
      onMakeOfferForNft={onMakeOfferForNft}
      onTraitSelectionUpdate={(selection) => {
        setTraitsFilter(selection)
      }}
    />
  )
}
