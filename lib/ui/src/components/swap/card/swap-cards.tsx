'use client'
import type { Swap } from '@echo/model/types/swap'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { SwapCard } from '@echo/ui/components/swap/card/swap-card'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  swaps: Swap[]
  onSelect?: (slug: Lowercase<string>) => void
}

export const SwapCards: FunctionComponent<Props> = ({ swaps, onSelect }) => {
  return (
    <CardsLayout>
      {map(
        (swap) => (
          <SwapCard key={swap.slug} swap={swap} onSelect={onSelect} />
        ),
        swaps
      )}
    </CardsLayout>
  )
}
