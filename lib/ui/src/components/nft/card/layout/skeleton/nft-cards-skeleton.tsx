import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import type { Alignment } from '@echo/ui/types/alignment'
import { map, range } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  alignment?: Alignment
  quantity?: number
}
export const NftCardsSkeleton: FunctionComponent<Props> = ({ alignment, quantity = 3 }) => {
  return (
    <CardsLayout alignment={alignment}>
      {map(
        (index) => (
          <NftCardSkeleton key={index} />
        ),
        range(0, quantity)
      )}
    </CardsLayout>
  )
}
