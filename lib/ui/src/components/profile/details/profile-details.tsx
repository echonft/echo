import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture, type UserProfilePictureProps } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner, type UserBannerProps } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import type { Wallet } from '@echo/ui/types/model/wallet'
import type { FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {
  wallet: Wallet | undefined
}

export const ProfileDetails: FunctionComponent<Props> = ({
  discordUsername,
  discordBanner,
  discordId,
  discordAvatar,
  wallet,
  size
}) => {
  return (
    <UserDetailsLayout>
      <UserBanner discordId={discordId} discordBanner={discordBanner} />
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture
            discordUsername={discordUsername}
            discordId={discordId}
            discordAvatar={discordAvatar}
            size={size}
          />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={discordUsername} />
            {/*TODO I guess it should be a "link wallet" button if wallet is nil?*/}
            <HideIfNil checks={wallet} render={(wallet) => <UserWallet address={wallet.address} />} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
