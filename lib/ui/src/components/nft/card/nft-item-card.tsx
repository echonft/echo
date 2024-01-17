'use client'
import type { ListingState } from '@echo/model/types/listing-state'
import { type Nft } from '@echo/model/types/nft'
import type { OfferState } from '@echo/model/types/offer-state'
import { NftCardLayout } from '@echo/ui/components/nft/card/layout/nft-card-layout'
import { NftCardTitle } from '@echo/ui/components/nft/card/nft-card-title'
import { NftItemCardPicture } from '@echo/ui/components/nft/card/nft-item-card-picture'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  status: OfferState | ListingState
  hideOwner?: boolean
  expired?: boolean
}

export const NftItemCard: FunctionComponent<Props> = ({ nft, status, hideOwner, expired }) => {
  return (
    <NftCardLayout>
      <NftItemCardPicture nft={nft} hideOwner={hideOwner} status={status} expired={expired} />
      <NftCardTitle nft={nft} />
    </NftCardLayout>
  )
}
