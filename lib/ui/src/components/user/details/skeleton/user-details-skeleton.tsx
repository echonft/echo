import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import { WalletConnectedButtonSkeleton } from '@echo/ui/components/wallet/skeleton/wallet-connected-button-skeleton'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

export const UserDetailsSkeleton: FunctionComponent = () => {
  return (
    <UserDetailsLayout>
      <ProfilePictureSkeleton size={SIZE_MD} />
      <UserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTagSkeleton />
        <WalletConnectedButtonSkeleton />
      </UserDetailsDiscordTagAndWalletLayout>
    </UserDetailsLayout>
  )
}
