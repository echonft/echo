import type { UserProfile as UserProfileModel } from '@echo/model/types/user-profile'
import { LogoutButtonManager } from '@echo/ui/components/auth/logout-button-manager'
import { Profile } from '@echo/ui/components/base/profile'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserDiscordTag } from '@echo/ui/components/user/profile/user-discord-tag'
import { UserProfileWallets } from '@echo/ui/components/user/profile/user-profile-wallets'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  profile: UserProfileModel
}

export const AuthUserProfile: FunctionComponent<Props> = ({ profile }) => {
  const { discord, wallets } = profile
  const { bannerUrl, bannerColor, username, avatarUrl } = discord
  return (
    <Profile banner={{ bannerUrl, bannerColor }} picture={{ pictureUrl: avatarUrl, alt: username }}>
      <UserProfileDetailsLayout>
        <UserDiscordTag discordUsername={username} />
        <div className={clsx('flex', 'flex-row', 'h-max', 'w-max', 'gap-2.5')}>
          <UserProfileWallets wallets={wallets} />
          <LogoutButtonManager />
        </div>
      </UserProfileDetailsLayout>
    </Profile>
  )
}
