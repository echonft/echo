'use client'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { SwapStackPicture } from '@echo/ui/components/swap/card/swap-stack-picture'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { head, type NonEmptyArray, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface SwapCardProps {
  swap: Swap
  onSelect?: (slug: Lowercase<string>) => void
}

export const SwapCard: FunctionComponent<SwapCardProps> = ({ swap, onSelect }) => {
  const item = pipe<[Swap], NonEmptyArray<NftItem>, NftItem>(swapSenderNftItems, head)(swap)

  return (
    <StackLayout
      onClick={() => {
        onSelect?.(swap.slug)
      }}
    >
      <SwapStackPicture pictureUrl={item.token.pictureUrl} label={nftLabel(item.token)} />
      <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
    </StackLayout>
  )
}
