'use client'
import { type Nft } from '@echo/model/types/nft'
import { CreateListingNftsSelected } from '@echo/ui/components/listing/create/create-listing-nfts-selected'
import { CreateListingNftsSelection } from '@echo/ui/components/listing/create/create-listing-nfts-selection'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'

interface Props<T extends Nft> {
  nfts: T[]
  selection: SelectableNft[]
  readOnly: boolean
  onSelect?: (nft: SelectableNft) => unknown
  onUnselect?: (nft: SelectableNft) => unknown
}

export const CreateListingNfts = <T extends Nft>({ nfts, selection, readOnly, onSelect, onUnselect }: Props<T>) => {
  if (readOnly) {
    return <CreateListingNftsSelected nfts={selection} />
  }
  return <CreateListingNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
}
