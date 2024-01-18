import { Img } from '@echo/ui/components/base/img'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
}

export const ProfilePicture: FunctionComponent<Props> = ({ pictureUrl, alt }) => {
  return (
    <Img
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'h-40', 'w-40')}
      src={pictureUrl}
      alt={alt}
      width={160}
      height={160}
    />
  )
}
