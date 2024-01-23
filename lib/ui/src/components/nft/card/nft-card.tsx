'use client'
import { type Nft } from '@echo/model/types/nft'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import type { CardVariant } from '@echo/ui/types/card-variant'
import { type FunctionComponent } from 'react'

export interface NftCardProps {
  nft: Nft
  variant?: CardVariant
  hideOwner?: boolean
  hideLink?: boolean
  scaleDisabled?: boolean
}

export const NftCard: FunctionComponent<NftCardProps> = ({ nft, variant, hideOwner, hideLink, scaleDisabled }) => {
  return (
    <CardLayout>
      <NftCardPicture nft={nft} hideOwner={hideOwner} hideLink={hideLink} scaleDisabled={scaleDisabled} />
      <CardFooter
        title={nft.collection.name}
        subtitle={getTokenIdString(nft.tokenId, nft.collection.totalSupply)}
        variant={variant}
      />
    </CardLayout>
  )
}
