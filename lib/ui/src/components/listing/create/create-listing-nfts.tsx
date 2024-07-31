'use client'
import { type OwnedNft } from '@echo/model/types/nft'
import { CreateListingNftsSelected } from '@echo/ui/components/listing/create/create-listing-nfts-selected'
import { CreateListingNftsSelection } from '@echo/ui/components/listing/create/create-listing-nfts-selection'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  readOnly: boolean
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateListingNfts: FunctionComponent<Props> = ({ nfts, selection, readOnly, onSelect, onUnselect }) => {
  if (readOnly) {
    return <CreateListingNftsSelected nfts={selection} />
  }
  return <CreateListingNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
}
