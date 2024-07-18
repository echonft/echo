'use client'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Swap } from '@echo/model/types/swap'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { SwapStackPicture } from '@echo/ui/components/swap/card/swap-stack-picture'
import { getNftStack } from '@echo/ui/helpers/nft/get-nft-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
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
  const stack = pipe(getOfferItems, getNftStack)(swap)
  return (
    <StackLayout
      className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
      onClick={() => {
        onSelect?.(swap)
      }}
    >
      <SwapStackPicture stack={stack} swap={swap} scaleDisabled={options?.scaleDisabled} />
      <StackFooter
        title={stack.collection.name}
        subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
      />
    </StackLayout>
  )
}
