import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: Nullable<string>
  alt: string
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ pictureUrl, alt }) => {
  return (
    <SizeableImage
      className={clsx(
        'select-none',
        'bg-dark-500',
        'object-contain',
        'border-solid',
        'border-3',
        'border-yellow-500',
        'h-28',
        'w-28',
        'rounded-2xl'
      )}
      src={pictureUrl}
      alt={alt}
      width={112}
      height={112}
    />
  )
}
