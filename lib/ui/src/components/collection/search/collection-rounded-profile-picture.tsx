import { DefaultCollectionProfilePicture } from '../../base/svg/default-collection-profile-picture'
import { RoundedProfilePicture } from '../../shared/rounded-profile-picture'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionProfilePictureProps {
  collectionName: string
  pictureUrl: URL | undefined
}

export const CollectionRoundedProfilePicture: FunctionComponent<CollectionProfilePictureProps> = ({
  collectionName,
  pictureUrl
}) => {
  if (isNil(pictureUrl)) {
    return (
      <DefaultCollectionProfilePicture
        className={clsx('rounded-full', 'h-[3.75rem]', 'w-[3.75rem]')}
        width={60}
        height={60}
      />
    )
  }
  return <RoundedProfilePicture pictureUrl={pictureUrl} alt={collectionName} />
}
