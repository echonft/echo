import type { Nft } from '@echo/model/types/nft'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { classes } from '@echo/ui/helpers/classes'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftThumbnailPictureLayout>
      <Image
        className={classes('select-none')}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={128}
        height={128}
      />
    </NftThumbnailPictureLayout>
  )
}
