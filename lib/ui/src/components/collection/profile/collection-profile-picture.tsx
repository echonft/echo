import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import { SIZE_SM } from '@echo/ui/constants/size'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: Nullable<string>
}

export const CollectionProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl
}) => {
  return (
    <ProfilePicture
      pictureUrl={pictureUrl ?? DEFAULT_COLLECTION_PROFILE_PICTURE_URL}
      alt={collectionName}
      size={SIZE_SM}
    />
  )
}
