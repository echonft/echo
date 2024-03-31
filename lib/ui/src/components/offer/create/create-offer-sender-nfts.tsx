'use client'
import { type Nft } from '@echo/model/types/nft'
import { CreateOfferSenderNftsSelected } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selected'
import { CreateOfferSenderNftsSelection } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selection'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'

interface Props<T extends Nft> {
  nfts: T[]
  selection: SelectableNft[]
  readOnly: boolean
  onSelect?: (nft: SelectableNft) => unknown
  onUnselect?: (nft: SelectableNft) => unknown
}

export const CreateOfferSenderNfts = <T extends Nft>({ nfts, selection, readOnly, onSelect, onUnselect }: Props<T>) => {
  if (readOnly) {
    return <CreateOfferSenderNftsSelected nfts={selection} />
  }
  return (
    <CreateOfferSenderNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
  )
}
