import { SizeLG, SizeMD } from '../../../constants/size'
import { getNftThumbnailSize } from '../../../helpers/nft/get-nft-thumbnail-size'
import { NftThumbnailSize } from '../../../types/nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL
  size?: NftThumbnailSize
  alt: string | undefined
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ pictureUrl, size = SizeLG, alt }) => {
  return (
    <img
      className={clsx(size === SizeLG && ['w-52', 'h-52'], size === SizeMD && ['w-32', 'h-32'], 'select-none')}
      src={pictureUrl.href}
      alt={alt}
      width={getNftThumbnailSize(size)}
      height={getNftThumbnailSize(size)}
    />
  )
}
