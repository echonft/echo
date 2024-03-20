import type { Nft } from '@echo/model/types/nft'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { PICTURE_SIZE_MD } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftThumbnailPictureLayout>
      <Image
        className={clsx('select-none')}
        src={addPictureSizeToUrl(nft.pictureUrl, PICTURE_SIZE_MD)}
        alt={nft.tokenId.toString()}
        width={PICTURE_SIZE_MD}
        height={PICTURE_SIZE_MD}
        quality={100}
        crossOrigin={'anonymous'}
      />
    </NftThumbnailPictureLayout>
  )
}
