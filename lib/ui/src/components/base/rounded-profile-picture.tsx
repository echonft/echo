import { Img } from '@echo/ui/components/base/img'
import { SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { type ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface RoundedProfilePictureProps {
  pictureUrl: string
  alt: string
  size?: ProfilePictureSize
}

export const RoundedProfilePicture: FunctionComponent<RoundedProfilePictureProps> = ({
  pictureUrl,
  alt,
  size = SIZE_SM
}) => {
  return (
    <Img
      className={clsx('rounded-full')}
      src={pictureUrl}
      alt={alt}
      width={size === SIZE_MD ? 73 : 60}
      height={size === SIZE_MD ? 73 : 60}
    />
  )
}
