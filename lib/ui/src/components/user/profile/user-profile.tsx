import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import type { User } from '@echo/model/types/user'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { Profile } from '@echo/ui/components/base/profile'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import type { FunctionComponent } from 'react'

interface Props {
  address: Address
  chain?: Chain
  listingsCount: number
  nftsCount: number
  offersCount: number
  swapsCount: number
  user: User
}

export const UserProfile: FunctionComponent<Props> = ({
  address,
  chain,
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
          <WalletConnectedButton address={address} chain={chain} />
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
