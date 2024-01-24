import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { getProfilePictureHeightInPx } from '@echo/ui/helpers/get-profile-picture-height-in-px'
import { getProfilePictureWidthInPx } from '@echo/ui/helpers/get-profile-picture-width-in-px'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
  size?: ProfilePictureSize
  border?: boolean
}

export const ProfilePicture: FunctionComponent<Props> = ({ pictureUrl, alt, size = SIZE_LG, border = true }) => {
  return (
    <Image
      className={clsx(
        size === SIZE_LG && ['h-40', 'w-40', 'rounded-2xl'],
        size === SIZE_MD && ['h-28', 'w-28', 'rounded-2xl'],
        size === SIZE_SM && ['h-[6.1875rem]', 'w-[5.875rem]', 'rounded-lg'],
        border && ['border-solid', 'border-3', 'border-yellow-500']
      )}
      src={pictureUrl}
      alt={alt}
      width={getProfilePictureWidthInPx(size)}
      height={getProfilePictureHeightInPx(size)}
    />
  )
}
