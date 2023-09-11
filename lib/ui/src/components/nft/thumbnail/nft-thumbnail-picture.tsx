import { SizeLG, SizeMD } from '../../../constants/size'
import { getNftThumbnailSize } from '../../../helpers/nft/get-nft-thumbnail-size'
import { NftThumbnailSize } from '../../../types/nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL
  alt: string | undefined
  size?: NftThumbnailSize
  disabled?: boolean
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ pictureUrl, size = SizeLG, alt, disabled }) => {
  return (
    <img
      className={clsx(
        size === SizeLG && ['w-52', 'h-52'],
        size === SizeMD && ['w-32', 'h-32'],
        'select-none',
        disabled && 'grayscale'
      )}
      src={pictureUrl.href}
      alt={alt}
      width={getNftThumbnailSize(size)}
      height={getNftThumbnailSize(size)}
    />
  )
}
