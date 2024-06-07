import type { Nft } from '@echo/model/types/nft'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { PICTURE_SIZE_MD } from '@echo/ui/constants/picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftThumbnailPictureLayout>
      <SizeableImage
        className={clsx('select-none')}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={PICTURE_SIZE_MD}
        height={PICTURE_SIZE_MD}
        crossOrigin={'anonymous'}
      />
    </NftThumbnailPictureLayout>
  )
}
