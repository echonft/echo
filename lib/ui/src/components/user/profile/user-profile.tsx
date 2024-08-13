import type { UserProfile as UserProfileModel } from '@echo/model/types/user-profile'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile'
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
    <ProfileLayout bannerUrl={avatarUrl} bannerColor={bannerColor}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={profile} />
          <UserProfileWallets wallets={wallets} />
        </UserProfileDetailsLayout>
      </Profile>
    </ProfileLayout>
  )
}
