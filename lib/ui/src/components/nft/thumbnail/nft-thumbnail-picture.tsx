import { Img } from '@echo/ui/components/base/img'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { getNftThumbnailSize } from '@echo/ui/helpers/nft/get-nft-thumbnail-size'
import type { NftThumbnailSize } from '@echo/ui/types/nft-thumbnail-size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL | string
  alt: string
  size?: NftThumbnailSize
  disabled?: boolean
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ pictureUrl, size = SizeLG, alt, disabled }) => {
  return (
    <Img
      className={clsx(
        size === SizeLG && ['w-52', 'h-52'],
        size === SizeMD && ['w-32', 'h-32'],
        'select-none',
        disabled && 'grayscale'
      )}
      src={pictureUrl}
      alt={alt}
      width={getNftThumbnailSize(size)}
      height={getNftThumbnailSize(size)}
    />
  )
}
