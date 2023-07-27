import { DefaultCollectionProfilePicture } from './svg/default-collection-profile-picture'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  collectionName: string
  profilePictureUrl: URL | undefined
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ collectionName, profilePictureUrl }) => {
  if (isNil(profilePictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
        width={160}
        height={160}
      />
    )
  }
  return (
    <img
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
      src={profilePictureUrl.href}
      alt={collectionName}
      width={160}
      height={160}
    />
  )
}
