'use client'
import { type Nft } from '@echo/model/types/nft/nft'
import { NftThumbnailLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-layout'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { NftThumbnailTitle } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnail: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftThumbnailLayout>
      <NftThumbnailPicture nft={nft} />
      <NftThumbnailTitle nft={nft} />
    </NftThumbnailLayout>
  )
}
