import { type UserProfile } from '@echo/model/types/user-profile'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { SIZE_LG } from '@echo/ui/constants/size'
import { head, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: UserProfile
}

export const UserDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallets } = user
  return (
    <UserDetails
      discordUsername={discord.username}
      bannerColor={discord.bannerColor}
      bannerUrl={discord.bannerUrl}
      discordAvatarUrl={discord.avatarUrl}
      wallet={isNil(wallets) ? undefined : head(wallets)}
      size={SIZE_LG}
    />
  )
}
