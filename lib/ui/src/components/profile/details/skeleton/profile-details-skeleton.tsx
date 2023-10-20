import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { UserWalletSkeleton } from '@echo/ui/components/shared/skeleton/user-wallet-skeleton'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { SizeLG } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

export const ProfileDetailsSkeleton: FunctionComponent = () => {
  return (
    <UserDetailsLayout>
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePictureSkeleton size={SizeLG} />
          <UserInfoLayout>
            <UserDiscordTagSkeleton />
            <UserWalletSkeleton />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
