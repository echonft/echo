import { SizeLG, SizeMD } from '../../../constants/size'
import { getProfilePictureSize } from '../../../helpers/get-profile-picture-size'
import { ProfilePictureSize } from '../../../types/profile-picture-size'
import { DefaultCollectionProfilePicture } from '../../base/svg/default-collection-profile-picture'
import { ProfilePicture } from '../../shared/profile-picture'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: URL | undefined
  size: ProfilePictureSize
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl,
  size
}) => {
  if (isNil(pictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx(
          'rounded-2xl',
          'border-solid',
          'border-3',
          'border-yellow-500',
          size === SizeLG && ['h-40', 'w-40'],
          size === SizeMD && ['h-[7.5rem]', 'w-[7.5rem]']
        )}
        width={getProfilePictureSize(size)}
        height={getProfilePictureSize(size)}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={collectionName} size={size} />
}
