import { DefaultCollectionProfilePicture } from '@echo/ui/components/base/svg/default-collection-profile-picture'
import { ProfilePicture } from '@echo/ui/components/shared/profile-picture'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { getProfilePictureSize } from '@echo/ui/helpers/get-profile-picture-size'
import { type ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: string | undefined
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
