import type { User } from '@echo/model/types/user'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile/profile'
import { WalletCopyToClipboardButton } from '@echo/ui/components/base/wallet/wallet-copy-to-clipboard-button'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import type { FunctionComponent } from 'react'

interface Props {
  listingsCount: number
  nftsCount: number
  offersCount: number
  swapsCount: number
  user: User
}

export const UserProfile: FunctionComponent<Props> = ({ listingsCount, nftsCount, swapsCount, offersCount, user }) => {
  const { discord, username } = user
  const { avatarUrl } = discord
  return (
    <ProfileLayout bannerUrl={avatarUrl}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={user} />
          <WalletCopyToClipboardButton wallet={user.wallet} />
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
