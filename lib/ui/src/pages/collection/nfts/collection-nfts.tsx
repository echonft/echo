'use client'
import { type Nft } from '@echo/model/types/nft'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftGroups } from '@echo/ui/components/nft/group/selectable-nft-groups'
import { CreateOfferButton } from '@echo/ui/components/nft/selection/create-offer-button'
import { groupNftsByOwner } from '@echo/ui/helpers/nft/group/group-nfts-by-owner'
import { CollectionNftsEmpty } from '@echo/ui/pages/collection/nfts/collection-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isEmpty } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nfts: Nft[]
}

export const CollectionNfts: FunctionComponent<Props> = ({ nfts }) => {
  const [filteredNfts, setFilteredNfts] = useState(nfts)
  const [selection, setSelection] = useState<SelectableNft[]>([])

  const onCreateOffer = (_nft?: SelectableNft) => {
    // if (isNonEmptyArray(nfts)) {
    //   setReceiverItems(map(mapNftToItem, nfts))
    //   openNewOfferModal()
    // }
  }

  if (isEmpty(nfts)) {
    return <CollectionNftsEmpty />
  }

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <CreateOfferButton
          count={selection.length}
          onClick={() => {
            onCreateOffer()
          }}
        />
        <TraitFilterPanel nfts={nfts} onNftsFiltered={setFilteredNfts} />
      </NftFiltersPanelsLayout>
      <SelectableNftGroups
        nfts={filteredNfts}
        groupBy={groupNftsByOwner}
        onAction={onCreateOffer}
        onSelectionUpdate={setSelection}
      />
    </NftsAndFiltersLayout>
  )
}
