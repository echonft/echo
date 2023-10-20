import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/shared/skeleton/swap-direction-header-skeleton'
import { AlignmentCenter } from '@echo/ui/constants/alignment'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const OfferDetailsItemsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton />
      <NftsLayout alignment={AlignmentCenter}>
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
      </NftsLayout>
    </div>
  )
}
