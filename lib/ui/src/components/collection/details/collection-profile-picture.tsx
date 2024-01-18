import { DefaultCollectionProfilePicture } from '@echo/ui/components/base/svg/default-collection-profile-picture'
import { ProfilePicture } from '@echo/ui/components/shared/profile-picture'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: string | undefined
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl
}) => {
  if (isNil(pictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'h-40', 'w-40')}
        width={160}
        height={160}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={collectionName} />
}
