import { clsx } from 'clsx'
import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface NftThumbnailPictureProps {
  title: string | undefined
  tokenId: bigint
  pictureUrl: URL
}

export const NftThumbnailPicture: FunctionComponent<NftThumbnailPictureProps> = ({ tokenId, title, pictureUrl }) => {
  return (
    <Image
      className={clsx('w-52', 'h-52', 'rounded-t-2xl')}
      src={pictureUrl.href}
      alt={title ?? tokenId.toString()}
      width={208}
      height={208}
    />
  )
}
