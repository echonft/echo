'use client'
import { type Nft } from '@echo/model/types/nft'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { Color } from '@echo/ui/constants/color'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { isNil, pick } from 'ramda'
import { type FunctionComponent } from 'react'

export interface NftCardProps {
  nft: Nft
  options?: {
    borderColor?: Color.Yellow
    owner?: {
      hide?: boolean
      asLink?: boolean
    }
  }
}

export const NftCard: FunctionComponent<NftCardProps> = (props) => {
  const { nft, options } = props
  return (
    <CardLayout options={isNil(options?.borderColor) ? undefined : pick(['borderColor'], options)}>
      <NftCardPicture {...props} />
      <CardFooter title={nft.collection.name} subtitle={nftLabel(nft)} />
    </CardLayout>
  )
}
