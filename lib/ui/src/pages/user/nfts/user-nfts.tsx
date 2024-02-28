'use client'
import { type Nft } from '@echo/model/types/nft'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftGroups } from '@echo/ui/components/nft/group/selectable-nft-groups'
import { UserNftsCreateOfferButton } from '@echo/ui/pages/user/nfts/user-nfts-create-offer-button'
import { UserNftsEmpty } from '@echo/ui/pages/user/nfts/user-nfts-empty'
import { UserNftsTraitFilterPanel } from '@echo/ui/pages/user/nfts/user-nfts-trait-filter-panel'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isEmpty, pipe, tap } from 'ramda'
import { useState } from 'react'

interface Props<T extends Nft> {
  nfts: T[]
  isAuthUser: boolean
}

export const UserNfts = <T extends Nft>({ nfts, isAuthUser }: Props<T>) => {
  const [collectionFilteredNfts, setCollectionFilteredNfts] = useState(nfts)
  const [filteredNfts, setFilteredNfts] = useState(nfts)
  const [selection, setSelection] = useState<SelectableNft[]>([])

  const onCreateOffer = (_nft?: SelectableNft) => {
    // if (isNonEmptyArray(nfts)) {
    //   setReceiverItems(map(mapNftToItem, nfts))
    //   openNewOfferModal()
    // }
  }

  if (isEmpty(nfts)) {
    return <UserNftsEmpty />
  }

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <UserNftsCreateOfferButton
          isAuthUser={isAuthUser}
          count={selection.length}
          onClick={() => {
            onCreateOffer()
          }}
        />
        <CollectionFilterPanel
          nfts={nfts}
          onNftsFiltered={pipe(tap(setCollectionFilteredNfts), tap(setFilteredNfts))}
        />
        <UserNftsTraitFilterPanel
          show={collectionFilteredNfts.length !== nfts.length}
          nfts={collectionFilteredNfts}
          onNftsFiltered={setFilteredNfts}
        />
      </NftFiltersPanelsLayout>
      <SelectableNftGroups
        options={{ owner: { hide: true } }}
        style={{ collapsible: true }}
        nfts={filteredNfts}
        onAction={onCreateOffer}
        onSelectionUpdate={setSelection}
      />
    </NftsAndFiltersLayout>
  )
}
