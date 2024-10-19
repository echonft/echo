'use client'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { CreateListingNftsSelected } from '@echo/ui/components/listing/create/create-listing-nfts-selected'
import { CreateListingNftsSelection } from '@echo/ui/components/listing/create/create-listing-nfts-selection'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  locked: boolean
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateListingNfts: FunctionComponent<Props> = ({ nfts, selection, locked, onSelect, onUnselect }) => {
  if (locked) {
    return <CreateListingNftsSelected nfts={selection} />
  }
  return <CreateListingNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
}
