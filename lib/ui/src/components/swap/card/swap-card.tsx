import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Swap } from '@echo/model/types/swap'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { SwapCardLayout } from '@echo/ui/components/swap/card/layout/swap-card-layout'
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
}

export const SwapCard: FunctionComponent<SwapCardProps> = (props) => {
  const { swap, options } = props
  const stack = pipe(getOfferItems, getNftStack)(swap)

  return (
    <SwapCardLayout swap={swap} options={options}>
      <StackLayout className={clsx(options?.asLink && 'group-hover:border-yellow-500')}>
        <SwapStackPicture stack={stack} swap={swap} scaleDisabled={options?.scaleDisabled} />
        <StackFooter
          title={stack.collection.name}
          subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
        />
      </StackLayout>
    </SwapCardLayout>
  )
}
