import { type UserProfile } from '@echo/model/types/user-profile'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

interface Props {
  user: UserProfile
}

export const UserDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  const { discord } = user
  return (
    <UserDetails
      discordUsername={discord.username}
      discordBannerColor={discord.bannerColor}
      discordBannerUrl={discord.bannerUrl}
      discordAvatarUrl={discord.avatarUrl}
      size={SIZE_LG}
    />
  )
}
