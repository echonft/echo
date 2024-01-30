'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftThumbnailLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-layout'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { NftThumbnailTitle } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  disabled?: boolean
}

export const NftThumbnail: FunctionComponent<Props> = ({ nft, disabled }) => {
  return (
    <NftThumbnailLayout disabled={disabled}>
      <NftThumbnailPicture nft={nft} />
      <NftThumbnailTitle nft={nft} />
    </NftThumbnailLayout>
  )
}
