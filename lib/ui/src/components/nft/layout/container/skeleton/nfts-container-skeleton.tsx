import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import type { FunctionComponent } from 'react'

export const NftsContainerSkeleton: FunctionComponent = () => {
  return (
    <NftsLayout>
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
    </NftsLayout>
  )
}
