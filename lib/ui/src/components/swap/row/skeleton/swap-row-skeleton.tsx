import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import type { FunctionComponent } from 'react'

export const SwapRowSkeleton: FunctionComponent = () => {
  return (
    <SwapRowLayout>
      <NftsLayout>
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
      </NftsLayout>
      <OfferRowSwapIcon />
      <NftsLayout>
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
      </NftsLayout>
    </SwapRowLayout>
  )
}
