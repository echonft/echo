import { DefaultCollectionProfilePicture } from '@echo/ui/components/base/svg/default-collection-profile-picture'
import { ProfilePicture } from '@echo/ui/components/shared/profile-picture'
import { SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: string | undefined
  size?: ProfilePictureSize
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl,
  size = SIZE_MD
}) => {
  if (isNil(pictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx(
          'rounded-2xl',
          'border-solid',
          'border-3',
          'border-yellow-500',
          size === SIZE_MD && ['h-40', 'w-40'],
          size === SIZE_SM && ['h-28', 'w-28']
        )}
        width={size === SIZE_MD ? 160 : 112}
        height={size === SIZE_MD ? 160 : 112}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={collectionName} size={size} />
}
