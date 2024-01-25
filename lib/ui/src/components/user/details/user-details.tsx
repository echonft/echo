import type { UserProfile } from '@echo/model/types/user-profile'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { UserDiscordTag } from '@echo/ui/components/user/base/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/user/base/user-profile-picture'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/details/layout/user-info-layout'
import { UserDetailsWallets } from '@echo/ui/components/user/details/user-details-wallets'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { type FunctionComponent } from 'react'

interface Props {
  user: UserProfile
}

export const UserDetails: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallets } = user
  const { bannerUrl, bannerColor, username, avatarUrl } = discord
  return (
    <UserDetailsLayout bannerUrl={bannerUrl} bannerColor={bannerColor}>
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={username} />
            <UserDetailsWallets wallets={wallets} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
