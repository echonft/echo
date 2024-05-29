'use client'
import { type Nft } from '@echo/model/types/nft'
import { CreateOfferSenderNftsSelected } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selected'
import { CreateOfferSenderNftsSelection } from '@echo/ui/components/offer/create/create-offer-sender-nfts-selection'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selection: Nft[]
  readOnly: boolean
  onSelect?: (nft: Nft) => unknown
  onUnselect?: (nft: Nft) => unknown
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
