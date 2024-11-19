import type { User } from '@echo/model/types/user'
import { LogoutButton } from '@echo/ui/components/base/auth/logout-button'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile/profile'
import { WalletCopyToClipboardButton } from '@echo/ui/components/base/wallet/wallet-copy-to-clipboard-button'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: User
  listingsCount: number
  nftsCount: number
  offersCount: number
  swapsCount: number
}

export const AuthUserProfile: FunctionComponent<Props> = ({
  listingsCount,
  nftsCount,
  swapsCount,
  offersCount,
  user
}) => {
  const { discord } = user
  const { username, avatarUrl } = discord
  return (
    <ProfileLayout bannerUrl={avatarUrl}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={user} />
          <div className={clsx('flex', 'flex-row', 'h-max', 'w-max', 'gap-2.5')}>
            <WalletCopyToClipboardButton wallet={user.wallet} />
            <LogoutButton />
          </div>
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
