import { DefaultCollectionProfilePicture } from './svg/default-collection-profile-picture'
import { clsx } from 'clsx'
import Image from 'next/image'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  name: string
  src: string | undefined
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ name, src }) => {
  if (isNil(src)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
        width={160}
        height={160}
      />
    )
  }
  return (
    <Image
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
      src={src}
      alt={name}
      width={160}
      height={160}
    />
  )
}
