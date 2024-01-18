import { ProfilePicture } from '@echo/ui/components/shared/profile-picture'
import { type FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordAvatarUrl: string
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordAvatarUrl
}) => {
  return <ProfilePicture pictureUrl={discordAvatarUrl} alt={discordUsername} />
}
