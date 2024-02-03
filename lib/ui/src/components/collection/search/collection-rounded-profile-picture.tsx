import { RoundedProfilePicture } from '@echo/ui/components/base/rounded-profile-picture'
import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: Nullable<string>
}

export const CollectionRoundedProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl
}) => {
  return (
    <RoundedProfilePicture pictureUrl={pictureUrl ?? DEFAULT_COLLECTION_PROFILE_PICTURE_URL} alt={collectionName} />
  )
}
