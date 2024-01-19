import { type AuthUser } from '@echo/model/types/auth-user'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { head, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
}

export const ProfileDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return <UserDetailsSkeleton />
  }

  const { discord, wallets } = user
  return (
    <UserDetails
      discordUsername={discord.username}
      bannerColor={discord.bannerColor}
      bannerUrl={discord.bannerUrl}
      discordAvatarUrl={discord.avatarUrl}
      wallet={isNil(wallets) ? undefined : head(wallets)}
    />
  )
}
