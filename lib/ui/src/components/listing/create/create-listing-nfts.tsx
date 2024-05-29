'use client'
import { type Nft } from '@echo/model/types/nft'
import { CreateListingNftsSelected } from '@echo/ui/components/listing/create/create-listing-nfts-selected'
import { CreateListingNftsSelection } from '@echo/ui/components/listing/create/create-listing-nfts-selection'
import type { Selectable } from '@echo/ui/types/selectable'

interface Props<T extends Nft> {
  nfts: T[]
  selection: Selectable<Nft>[]
  readOnly: boolean
  onSelect?: (nft: Selectable<Nft>) => unknown
  onUnselect?: (nft: Selectable<Nft>) => unknown
}

export const CreateListingNfts = <T extends Nft>({ nfts, selection, readOnly, onSelect, onUnselect }: Props<T>) => {
  if (readOnly) {
    return <CreateListingNftsSelected nfts={selection} />
  }
  return <CreateListingNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
}
