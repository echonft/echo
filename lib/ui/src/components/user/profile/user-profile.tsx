import type { User } from '@echo/model/types/user'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import type { FunctionComponent } from 'react'

interface Props {
  listingsCount: number
  nftsCount: number
  offersCount: number
  swapsCount: number
  user: User
}

export const UserProfile: FunctionComponent<Props> = ({ listingsCount, nftsCount, swapsCount, offersCount, user }) => {
  const { discord } = user
  const { username, avatarUrl } = discord
  return (
    <ProfileLayout bannerUrl={avatarUrl}>
      <PaddedLayout>
        <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
          <UserProfileDetailsLayout>
            <UserTag user={user} />
            <WalletConnectedButton wallet={user.wallet} />
          </UserProfileDetailsLayout>
        </Profile>
      </PaddedLayout>
      <CountsDetails
        listingsCount={listingsCount}
        nftsCount={nftsCount}
        offersCount={offersCount}
        swapsCount={swapsCount}
      />
    </ProfileLayout>
  )
}
