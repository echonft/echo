import { NftThumbnailSize, nftThumbnailSize } from './nft-thumbnail-size'
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
  title,
  pictureUrl,
  size = NftThumbnailSize.LARGE
}) => {
  return (
    <img
      className={clsx(
        size === NftThumbnailSize.LARGE && ['w-52', 'h-52'],
        size === NftThumbnailSize.MEDIUM && ['w-32', 'h-32'],
        'rounded-t-2xl',
        'select-none'
      )}
      src={pictureUrl.href}
      alt={alt ?? tokenId.toString()}
      width={nftThumbnailSize(size)}
      height={nftThumbnailSize(size)}
    />
  )
}
