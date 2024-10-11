'use client'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Swap } from '@echo/model/types/swap'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { SwapStackPicture } from '@echo/ui/components/swap/card/swap-stack-picture'
import { getNftStackFromNfts } from '@echo/ui/helpers/nft/get-nft-stack-from-nfts'
import { clsx } from 'clsx'
import { pipe } from 'ramda'
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
  const stack = pipe(getOfferItems, getNftStackFromNfts)(swap)
  return (
    <StackLayout
      className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
      onClick={() => {
        onSelect?.(swap)
      }}
    >
      <SwapStackPicture stack={stack} swap={swap} scaleDisabled={options?.scaleDisabled} />
      <StackFooter title={stack.collection.name} subtitle={stack.tokenId} />
    </StackLayout>
  )
}
