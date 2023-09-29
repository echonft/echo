import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { SizeLG } from '@echo/ui/constants/size'
import { head, isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  response: UserResponse
}

export const UserDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const { discord, wallets } = response
  return (
    <UserDetails
      discordUsername={discord.username}
      discordBannerColor={discord.bannerColor}
      discordBannerUrl={discord.bannerUrl}
      discordAvatarUrl={discord.avatarUrl}
      wallet={isNil(wallets) ? undefined : head(wallets)}
      size={SizeLG}
    />
  )
}
