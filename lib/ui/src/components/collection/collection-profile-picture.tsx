import { ProfilePicture } from '../base/profile-picture'
import { DefaultCollectionProfilePicture } from '../base/svg/default-collection-profile-picture'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: URL | undefined
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl
}) => {
  if (isNil(pictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
        width={160}
        height={160}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={collectionName} />
}
