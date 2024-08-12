import type { UserProfile as UserProfileModel } from '@echo/model/types/user-profile'
import { Profile } from '@echo/ui/components/base/profile'
import { ProfileBackgroundBanner } from '@echo/ui/components/base/profile-background-banner'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserProfileWallets } from '@echo/ui/components/user/profile/user-profile-wallets'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import type { FunctionComponent } from 'react'

interface Props {
  profile: UserProfileModel
}

export const UserProfile: FunctionComponent<Props> = ({ profile }) => {
  const { discord, wallets } = profile
  const { bannerColor, username, avatarUrl } = discord
  return (
    <ProfileBackgroundBanner bannerUrl={avatarUrl} bannerColor={bannerColor}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={profile} />
          <UserProfileWallets wallets={wallets} />
        </UserProfileDetailsLayout>
      </Profile>
    </ProfileBackgroundBanner>
  )
}
