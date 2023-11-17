'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftCardLayout } from '@echo/ui/components/nft/card/layout/nft-card-layout'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { NftCardTitle } from '@echo/ui/components/nft/card/nft-card-title'
import type { NftCardVariant } from '@echo/ui/types/nft-card-variant'
import { type FunctionComponent } from 'react'

export interface NftCardProps {
  nft: Nft
  variant?: NftCardVariant
  hideOwner?: boolean
  hideLink?: boolean
}

export const NftCard: FunctionComponent<NftCardProps> = ({ nft, variant, hideOwner, hideLink }) => {
  return (
    <NftCardLayout>
      <NftCardPicture nft={nft} hideOwner={hideOwner} hideLink={hideLink} />
      <NftCardTitle nft={nft} variant={variant} />
    </NftCardLayout>
  )
}
