import { Img } from '@echo/ui/components/base/img'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { getProfilePictureSize } from '@echo/ui/helpers/get-profile-picture-size'
import { type ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: string
  alt: string
  size: ProfilePictureSize
}

export const ProfilePicture: FunctionComponent<Props> = ({ pictureUrl, alt, size = SIZE_LG }) => {
  return (
    <Img
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SIZE_LG && ['h-40', 'w-40'],
        size === SIZE_MD && ['h-[7.5rem]', 'w-[7.5rem]']
      )}
      src={pictureUrl}
      alt={alt}
      width={getProfilePictureSize(size)}
      height={getProfilePictureSize(size)}
    />
  )
}
