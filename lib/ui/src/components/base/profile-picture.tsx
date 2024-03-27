import { PICTURE_SIZE_LG, PICTURE_SIZE_MD } from '@echo/ui/constants/picture-size'
import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { getProfilePictureHeightInPx } from '@echo/ui/helpers/get-profile-picture-height-in-px'
import { getProfilePictureWidthInPx } from '@echo/ui/helpers/get-profile-picture-width-in-px'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: string
  alt: string
  size?: ProfilePictureSize
  border?: boolean
}

function getPictureSize(size: ProfilePictureSize) {
  switch (size) {
    case SIZE_LG:
      return PICTURE_SIZE_LG
    case SIZE_MD:
    case SIZE_SM:
      return PICTURE_SIZE_MD
  }
}
export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  pictureUrl,
  alt,
  size = SIZE_LG,
  border = true
}) => {
  return (
    <Image
      className={clsx(
        'select-none',
        'bg-dark-500',
        'object-contain',
        size === SIZE_LG && ['h-40', 'w-40', 'rounded-2xl'],
        size === SIZE_MD && ['h-28', 'w-28', 'rounded-2xl'],
        size === SIZE_SM && ['h-[6.1875rem]', 'w-[5.875rem]', 'rounded-lg'],
        border && ['border-solid', 'border-3', 'border-yellow-500']
      )}
      src={addPictureSizeToUrl(pictureUrl, getPictureSize(size))}
      alt={alt}
      width={getProfilePictureWidthInPx(size)}
      height={getProfilePictureHeightInPx(size)}
      quality={100}
    />
  )
}
