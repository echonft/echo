import type { Nft } from '@echo/model/types/nft'
import { NftThumbnailTitleLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-title-layout'
import { NftThumbnailTitleCollectionName } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title-collection-name'
import { NftThumbnailTitleTokenId } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title-token-id'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailTitle: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftThumbnailTitleLayout>
      <NftThumbnailTitleCollectionName nft={nft} />
      <NftThumbnailTitleTokenId nft={nft} />
    </NftThumbnailTitleLayout>
  )
}
