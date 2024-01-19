import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { type FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordAvatarUrl: string
  size?: ProfilePictureSize
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordAvatarUrl,
  size
}) => {
  return <ProfilePicture pictureUrl={discordAvatarUrl} alt={discordUsername} size={size} />
}
