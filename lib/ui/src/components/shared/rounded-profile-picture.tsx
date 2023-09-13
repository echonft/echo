import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export interface RoundedProfilePictureProps {
  pictureUrl: URL
  alt?: string
  size?: ProfilePictureSize
}

export const RoundedProfilePicture: FunctionComponent<RoundedProfilePictureProps> = ({ pictureUrl, alt }) => {
  return (
    <img
      className={clsx('rounded-full', 'h-[3.75rem]', 'w-[3.75rem]')}
      src={pictureUrl.href}
      alt={alt}
      width={60}
      height={60}
    />
  )
}
