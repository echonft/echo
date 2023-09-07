import { getNftThumbnailSize } from '../../helpers/get-nft-thumbnail-size'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const nftThumbnailSizes = [SizeMD, SizeLG] as const
export type NftThumbnailSize = (typeof nftThumbnailSizes)[number]

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
