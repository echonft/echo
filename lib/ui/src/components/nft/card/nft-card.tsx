'use client'
import { type Nft } from '@echo/model/types/nft/nft'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { type FunctionComponent } from 'react'

export interface NftCardProps {
  nft: Nft
  options?: {
    owner?: {
      hide?: boolean
      asLink?: boolean
    }
    style?: {
      hideOpenSeaLink?: boolean
      scaleDisabled?: boolean
    }
  }
}

export const NftCard: FunctionComponent<NftCardProps> = (props) => {
  const { nft } = props
  return (
    <CardLayout>
      <NftCardPicture {...props} />
      <CardFooter title={nft.collection.name} subtitle={nft.tokenIdLabel} />
    </CardLayout>
  )
}
