'use client'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Swap } from '@echo/model/types/swap/swap'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { SwapStackPicture } from '@echo/ui/components/swap/card/swap-stack-picture'
import { clsx } from 'clsx'
import { head, type NonEmptyArray, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

export interface SwapCardProps {
  swap: Swap
  options?: {
    asLink?: boolean
    scaleDisabled?: boolean
  }
  onSelect?: (swap: Swap) => unknown
}

export const SwapCard: FunctionComponent<SwapCardProps> = ({ swap, options, onSelect }) => {
  const item = pipe<[Swap], NonEmptyArray<NftItem>, NftItem>(swapSenderNftItems, head)(swap)
  return (
    <StackLayout
      className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
      onClick={() => {
        onSelect?.(swap)
      }}
    >
      <SwapStackPicture
        chain={item.token.contract.chain}
        pictureUrl={item.token.pictureUrl}
        tokenIdLabel={item.token.tokenIdLabel}
        scaleDisabled={options?.scaleDisabled}
      />
      <StackFooter title={item.token.collection.name} subtitle={item.token.tokenIdLabel} />
    </StackLayout>
  )
}
