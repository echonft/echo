import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { Size } from '@echo/ui/constants/size'
import { getProfilePictureHeightInPx } from '@echo/ui/helpers/get-profile-picture-height-in-px'
import { getProfilePictureWidthInPx } from '@echo/ui/helpers/get-profile-picture-width-in-px'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: Nullable<string>
  alt: string
  size?: Size
  border?: boolean
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  pictureUrl,
  alt,
  size = Size.LG,
  border = true
}) => {
  return (
    <SizeableImage
      className={clsx(
        'select-none',
        'bg-dark-500',
        'object-contain',
        size === Size.LG && ['h-40', 'w-40', 'rounded-2xl'],
        size === Size.MD && ['h-28', 'w-28', 'rounded-2xl'],
        size === Size.SM && ['h-[6.1875rem]', 'w-[5.875rem]', 'rounded-lg'],
        border && ['border-solid', 'border-3', 'border-yellow-500']
      )}
      src={pictureUrl}
      alt={alt}
      width={getProfilePictureWidthInPx(size)}
      height={getProfilePictureHeightInPx(size)}
    />
  )
}
