'use client'
import { type Nft } from '@echo/model/types/nft'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftGroups } from '@echo/ui/components/nft/group/selectable-nft-groups'
import { CreateListingButton } from '@echo/ui/components/nft/selection/create-listing-button'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { groupNftsByOwner } from '@echo/ui/helpers/nft/group/group-nfts-by-owner'
import { ProfileNftsEmpty } from '@echo/ui/pages/profile/nfts/profile-nfts-empty'
import { ProfileNftsTraitFilterPanel } from '@echo/ui/pages/profile/nfts/profile-nfts-trait-filter-panel'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isEmpty, pipe, tap } from 'ramda'
import { useState } from 'react'

interface Props<T extends Nft> {
  nfts: T[]
}

export const ProfileNfts = <T extends Nft>({ nfts }: Props<T>) => {
  const [collectionFilteredNfts, setCollectionFilteredNfts] = useState(nfts)
  const [filteredNfts, setFilteredNfts] = useState(nfts)
  const [selection, setSelection] = useState<SelectableNft[]>([])
  const collectionFilterSelected = collectionFilteredNfts.length !== nfts.length
  const onCreateListing = (_nft?: SelectableNft) => {
    // if (isNonEmptyArray(nfts)) {
    //   setReceiverItems(map(mapNftToItem, nfts))
    //   openNewOfferModal()
    // }
  }

  if (isEmpty(nfts)) {
    return <ProfileNftsEmpty />
  }

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <CreateListingButton
          count={selection.length}
          onClick={() => {
            onCreateListing()
          }}
        />
        <CollectionFilterPanel
          nfts={nfts}
          onNftsFiltered={pipe(tap(setCollectionFilteredNfts), tap(setFilteredNfts))}
        />
        <ProfileNftsTraitFilterPanel
          show={collectionFilterSelected}
          nfts={collectionFilteredNfts}
          onNftsFiltered={setFilteredNfts}
        />
      </NftFiltersPanelsLayout>
      <SelectableNftGroups
        nfts={filteredNfts}
        groupBy={collectionFilterSelected ? groupNftsByOwner : groupNftsByCollection}
        options={{ owner: { hide: true } }}
        style={{ collapsible: !collectionFilterSelected }}
        onAction={onCreateListing}
        onSelectionUpdate={setSelection}
      />
    </NftsAndFiltersLayout>
  )
}
