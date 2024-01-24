import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { type FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: string | undefined
  size?: ProfilePictureSize
  border?: boolean
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl,
  size = SIZE_LG,
  border = true
}) => {
  return (
    <ProfilePicture
      pictureUrl={pictureUrl ?? DEFAULT_COLLECTION_PROFILE_PICTURE_URL}
      alt={collectionName}
      size={size}
      border={border}
    />
  )
}
