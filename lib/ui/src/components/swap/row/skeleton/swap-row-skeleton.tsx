import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { SwapRowIcon } from '@echo/ui/components/swap/row/swap-row-icon'
import { ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const SwapRowSkeleton: FunctionComponent = () => {
  return (
    <SwapRowLayout>
      <CardsLayout>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </CardsLayout>
      <SwapRowIcon />
      <CardsLayout alignment={ALIGNMENT_RIGHT}>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </CardsLayout>
    </SwapRowLayout>
  )
}
