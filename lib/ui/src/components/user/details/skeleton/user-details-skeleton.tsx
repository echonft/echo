import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile/skeleton/profile-picture-skeleton'
import { WalletCopyToClipboardButtonSkeleton } from '@echo/ui/components/base/wallet/skeleton/wallet-copy-to-clipboard-button-skeleton'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import { type FunctionComponent } from 'react'

export const UserDetailsSkeleton: FunctionComponent = () => {
  return (
    <UserDetailsLayout>
      <ProfilePictureSkeleton />
      <UserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTagSkeleton />
        <WalletCopyToClipboardButtonSkeleton />
      </UserDetailsDiscordTagAndWalletLayout>
    </UserDetailsLayout>
  )
}
