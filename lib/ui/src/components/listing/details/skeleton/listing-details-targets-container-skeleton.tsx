import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/shared/skeleton/swap-direction-header-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsTargetsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton />
      <NftsLayout alignment={ALIGNMENT_CENTER}>
        <NftCardSkeleton />
      </NftsLayout>
    </div>
  )
}
