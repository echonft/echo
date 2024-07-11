import type { Swap } from '@echo/model/types/swap'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { SwapCard, type SwapCardProps } from '@echo/ui/components/swap/card/swap-card'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SwapCardProps, 'options'> {
  swaps: Swap[]
}

export const SwapCards: FunctionComponent<Props> = ({ swaps, options }) => {
  return (
    <CardsLayout>
      {map(
        (swap) => (
          <SwapCard key={swap.slug} swap={swap} options={options} />
        ),
        swaps
      )}
    </CardsLayout>
  )
}
