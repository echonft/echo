import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailPictureProps {
  title: string | undefined
  tokenId: number
  pictureUrl: URL
}

export const NftThumbnailPicture: FunctionComponent<NftThumbnailPictureProps> = ({ tokenId, title, pictureUrl }) => {
  return (
    <img
      className={clsx('w-52', 'h-52', 'rounded-t-2xl', 'select-none')}
      src={pictureUrl.href}
      alt={title ?? tokenId.toString()}
      width={208}
      height={208}
    />
  )
}
