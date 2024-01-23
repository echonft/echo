import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { getProfilePictureHeightInPx } from '@echo/ui/helpers/get-profile-picture-height-in-px'
import { getProfilePictureWidthInPx } from '@echo/ui/helpers/get-profile-picture-width-in-px'
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
