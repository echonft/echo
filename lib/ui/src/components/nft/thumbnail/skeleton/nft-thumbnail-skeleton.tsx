import { NftThumbnailLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-layout'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { NftThumbnailTitleLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-title-layout'
import { NftThumbnailTitleCollectionName } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title-collection-name'
import { NftThumbnailTitleTokenId } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title-token-id'
import type { FunctionComponent } from 'react'

export const NftThumbnailSkeleton: FunctionComponent = () => (
  <NftThumbnailLayout loading={true}>
    <NftThumbnailPictureLayout loading={true} />
    <NftThumbnailTitleLayout loading={true}>
      <NftThumbnailTitleCollectionName label={'Placeholder'} />
      <NftThumbnailTitleTokenId label={'#0000'} />
    </NftThumbnailTitleLayout>
  </NftThumbnailLayout>
)
