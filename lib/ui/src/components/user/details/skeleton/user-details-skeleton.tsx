import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/user/base/skeleton/user-profile-picture-skeleton'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/details/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/details/layout/user-picture-and-info-layout'
import { WalletConnectedButtonSkeleton } from '@echo/ui/components/wallet/skeleton/wallet-connected-button-skeleton'
import type { FunctionComponent } from 'react'

export const UserDetailsSkeleton: FunctionComponent = () => {
  return (
    <UserDetailsLayout>
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePictureSkeleton />
          <UserInfoLayout>
            <UserDiscordTagSkeleton />
            <WalletConnectedButtonSkeleton />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
