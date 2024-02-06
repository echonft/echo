import { ProfileSkeleton } from '@echo/ui/components/base/profile-skeleton'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import { WalletConnectedButtonSkeleton } from '@echo/ui/components/wallet/skeleton/wallet-connected-button-skeleton'
import type { FunctionComponent } from 'react'

export const UserProfileSkeleton: FunctionComponent = () => {
  return (
    <ProfileSkeleton>
      <UserProfileDetailsLayout>
        <UserDiscordTagSkeleton />
        <WalletConnectedButtonSkeleton />
      </UserProfileDetailsLayout>
    </ProfileSkeleton>
  )
}
