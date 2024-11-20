import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { WalletCopyToClipboardButtonSkeleton } from '@echo/ui/components/base/wallet/skeleton/wallet-copy-to-clipboard-button-skeleton'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import type { FunctionComponent } from 'react'

export const UserProfileSkeleton: FunctionComponent = () => {
  return (
    <ProfileLayout>
      <UserProfileDetailsLayout>
        <UserDiscordTagSkeleton />
        <WalletCopyToClipboardButtonSkeleton />
      </UserProfileDetailsLayout>
    </ProfileLayout>
  )
}
