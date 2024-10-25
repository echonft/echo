import type { UserProfile as UserProfileModel } from '@echo/model/types/user-profile'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
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
  const { discord, wallets, listingsCount, nftsCount, swapsCount, offersCount } = profile
  const { username, avatarUrl } = discord
  return (
    <ProfileLayout bannerUrl={avatarUrl}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={profile} />
          <UserProfileWallets wallets={wallets} />
        </UserProfileDetailsLayout>
      </Profile>
      <CountsDetails
        listingsCount={listingsCount}
        nftsCount={nftsCount}
        offersCount={offersCount}
        swapsCount={swapsCount}
      />
    </ProfileLayout>
  )
}
