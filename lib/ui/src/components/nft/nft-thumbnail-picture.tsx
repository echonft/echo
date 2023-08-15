import { SizeLG, SizeMD } from '../../types/size'
import { getNftThumbnailSize, NftThumbnailSize } from './nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailPictureProps {
  tokenId: number
  pictureUrl: URL
  size?: NftThumbnailSize
  alt: string | undefined
}

export const NftThumbnailPicture: FunctionComponent<NftThumbnailPictureProps> = ({
  tokenId,
  pictureUrl,
  size = SizeLG,
  alt
}) => {
  return (
    <img
      className={clsx(
        size === SizeLG && ['w-52', 'h-52'],
        size === SizeMD && ['w-32', 'h-32'],
        'rounded-t-2xl',
        'select-none'
      )}
      src={pictureUrl.href}
      alt={alt ?? tokenId.toString()}
      width={getNftThumbnailSize(size)}
      height={getNftThumbnailSize(size)}
    />
  )
}
