import { type Wallet } from '@echo/model/types/wallet'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture, type UserProfilePictureProps } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner, type UserBannerProps } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { type FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {
  wallet: Wallet | undefined
}

export const UserDetails: FunctionComponent<Props> = ({
  discordUsername,
  discordBannerColor,
  discordBannerUrl,
  discordAvatarUrl,
  wallet,
  size
}) => {
  return (
    <UserDetailsLayout>
      <UserBanner discordBannerColor={discordBannerColor} discordBannerUrl={discordBannerUrl} />
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={discordUsername} discordAvatarUrl={discordAvatarUrl} size={size} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={discordUsername} />
            <HideIfNil checks={wallet} render={(wallet) => <UserWallet wallet={wallet} />} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
