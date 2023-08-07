import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: URL
  alt?: string
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ pictureUrl, alt }) => {
  return (
    <img
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
      src={pictureUrl.href}
      alt={alt}
      width={160}
      height={160}
    />
  )
}
