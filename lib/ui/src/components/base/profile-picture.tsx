import { SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
  size?: ProfilePictureSize
}

export const ProfilePicture: FunctionComponent<Props> = ({ pictureUrl, alt, size = SIZE_MD }) => {
  return (
    <Image
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SIZE_MD && ['h-40', 'w-40'],
        size === SIZE_SM && ['h-28', 'w-28']
      )}
      src={pictureUrl}
      alt={alt}
      width={size === SIZE_MD ? 160 : 112}
      height={size === SIZE_MD ? 160 : 112}
    />
  )
}
