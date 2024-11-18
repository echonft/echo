import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import { WalletCopyToClipboardButtonSkeleton } from '@echo/ui/components/wallet/skeleton/wallet-copy-to-clipboard-button-skeleton'
import { Size } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

export const UserDetailsSkeleton: FunctionComponent = () => {
  return (
    <UserDetailsLayout>
      <ProfilePictureSkeleton size={Size.MD} />
      <UserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTagSkeleton />
        <WalletCopyToClipboardButtonSkeleton />
      </UserDetailsDiscordTagAndWalletLayout>
    </UserDetailsLayout>
  )
}
