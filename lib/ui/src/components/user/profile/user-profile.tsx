import type { Counts } from '@echo/model/types/counts'
import type { User } from '@echo/model/types/user'
import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile/profile'
import { ProfileCounts } from '@echo/ui/components/base/profile/profile-counts'
import { WalletCopyToClipboardButton } from '@echo/ui/components/base/wallet/wallet-copy-to-clipboard-button'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import type { FunctionComponent } from 'react'

interface Props {
  counts: Counts
  user: User
}

export const UserProfile: FunctionComponent<Props> = ({
  counts: { listingsCount, nftsCount, swapsCount, offersCount },
  user
}) => {
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
      <ProfileCounts
        listingsCount={listingsCount}
        nftsCount={nftsCount}
        offersCount={offersCount}
        swapsCount={swapsCount}
      />
    </ProfileLayout>
  )
}
