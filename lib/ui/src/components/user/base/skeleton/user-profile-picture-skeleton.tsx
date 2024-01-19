import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { type FunctionComponent } from 'react'

interface Props {
  size?: ProfilePictureSize
}
export const UserProfilePictureSkeleton: FunctionComponent<Props> = (props) => {
  return <ProfilePictureSkeleton {...props} />
}
