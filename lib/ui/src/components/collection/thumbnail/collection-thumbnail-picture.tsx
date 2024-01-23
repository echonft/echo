import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
}

export const CollectionThumbnailPicture: FunctionComponent<Props> = ({ pictureUrl, alt }) => {
  return <Image className={clsx('select-none', 'rounded-2xl')} src={pictureUrl} alt={alt} width={208} height={208} />
}
