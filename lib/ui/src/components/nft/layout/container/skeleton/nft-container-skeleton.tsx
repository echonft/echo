import { NftThumbnailSkeleton } from '../../../thumbnail/skeleton/nft-thumbnail-skeleton'
import { NftsLayout } from '../../nfts-layout'
import { FunctionComponent } from 'react'

export const NftContainerSkeleton: FunctionComponent = () => {
  return (
    <NftsLayout>
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
    </NftsLayout>
  )
}
