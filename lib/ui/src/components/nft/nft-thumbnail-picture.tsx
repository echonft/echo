import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailPictureProps {
  tokenId: number
  pictureUrl: URL
  alt: string | undefined
}

export const NftThumbnailPicture: FunctionComponent<NftThumbnailPictureProps> = ({ tokenId, alt, pictureUrl }) => {
  return (
    <img
      className={clsx('w-52', 'h-52', 'rounded-t-2xl', 'select-none')}
      src={pictureUrl.href}
      alt={alt ?? tokenId.toString()}
      width={208}
      height={208}
    />
  )
}
