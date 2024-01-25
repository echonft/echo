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
  options?: {
    owner?: {
      hide?: boolean
      asLink?: boolean
    }
    style?: {
      hideOpenSeaLink?: boolean
      scaleDisabled?: boolean
      variant?: CardVariant
    }
  }
}

export const NftCard: FunctionComponent<NftCardProps> = (props) => {
  const { nft, options } = props
  return (
    <CardLayout>
      <NftCardPicture {...props} />
      <CardFooter
        title={nft.collection.name}
        subtitle={getTokenIdString(nft.tokenId, nft.collection.totalSupply)}
        variant={options?.style?.variant}
      />
    </CardLayout>
  )
}
