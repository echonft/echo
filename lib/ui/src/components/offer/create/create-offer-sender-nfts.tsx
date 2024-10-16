'use client'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { CreateOfferSenderNftsSelected } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selected'
import { CreateOfferSenderNftsSelection } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selection'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  readOnly: boolean
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateOfferSenderNfts: FunctionComponent<Props> = ({
  nfts,
  selection,
  readOnly,
  onSelect,
  onUnselect
}) => {
  if (readOnly) {
    return <CreateOfferSenderNftsSelected nfts={selection} />
  }
  return (
    <CreateOfferSenderNftsSelection nfts={nfts} selection={selection} onSelect={onSelect} onUnselect={onUnselect} />
  )
}
