import { ProfileDetails } from '@echo/ui/components/profile/details/profile-details'
import { SizeLG } from '@echo/ui/constants/size'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { head, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const ProfileDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallets } = user
  const { avatarUrl, bannerUrl, bannerColor, username } = discord
  return (
    <ProfileDetails
      discordUsername={username}
      discordBannerUrl={bannerUrl}
      discordBannerColor={bannerColor}
      discordAvatarUrl={avatarUrl}
      wallet={isNil(wallets) ? undefined : head(wallets)}
      size={SizeLG}
      renderWalletConnect={renderWalletConnect}
    />
  )
}
