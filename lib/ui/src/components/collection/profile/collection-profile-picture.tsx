import { ProfilePicture } from '@echo/ui/components/base/profile/profile-picture'
import { defaultCollectionProfilePictureUrl } from '@echo/ui/constants/default-collection-profile-picture-url'
import { Size } from '@echo/ui/constants/size'
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
    <ProfilePicture pictureUrl={pictureUrl ?? defaultCollectionProfilePictureUrl} alt={collectionName} size={Size.SM} />
  )
}
