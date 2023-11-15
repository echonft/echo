import { Img } from '@echo/ui/components/base/img'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
}

export const ItemThumbnailPicture: FunctionComponent<Props> = ({ pictureUrl, alt }) => {
  return <Img className={clsx('select-none', 'rounded-2xl')} src={pictureUrl} alt={alt} width={128} height={128} />
}
