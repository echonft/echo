import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { CardSkeleton } from '@echo/ui/components/base/card/skeleton/card-skeleton'
import type { Alignment } from '@echo/ui/types/alignment'
import { type FunctionComponent } from 'react'

interface Props {
  alignment?: Alignment
}

export const CardsSkeleton: FunctionComponent<Props> = ({ alignment }) => {
  return (
    <CardsLayout alignment={alignment}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </CardsLayout>
  )
}
