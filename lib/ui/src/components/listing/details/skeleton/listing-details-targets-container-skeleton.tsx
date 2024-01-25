import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/base/swap-direction-header-skeleton'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsTargetsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton />
      <CardsLayout alignment={ALIGNMENT_CENTER}>
        <NftCardSkeleton />
      </CardsLayout>
    </div>
  )
}
