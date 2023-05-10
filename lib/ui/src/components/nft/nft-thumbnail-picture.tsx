import { clsx } from 'clsx'
import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface NftThumbnailPictureProps {
  name: string
  src: string
}

export const NftThumbnailPicture: FunctionComponent<NftThumbnailPictureProps> = ({ name, src }) => {
  return <Image className={clsx('w-52', 'h-52', 'rounded-t-2xl')} src={src} alt={name} width={208} height={208} />
}
