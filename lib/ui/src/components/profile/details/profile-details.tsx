import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
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
import { ReactNode } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {
  wallet: Wallet | undefined
  renderWalletConnect?: () => ReactNode
}

export const ProfileDetails: FunctionComponent<Props> = ({
  discordUsername,
  discordBannerUrl,
  discordBannerColor,
  discordAvatarUrl,
  wallet,
  size,
  renderWalletConnect
}) => {
  return (
    <UserDetailsLayout>
      <UserBanner discordBannerUrl={discordBannerUrl} discordBannerColor={discordBannerColor} />
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={discordUsername} discordAvatarUrl={discordAvatarUrl} size={size} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={discordUsername} />
            {/*TODO I guess it should be a "link wallet" button if wallet is nil?*/}
            <HideIfNil checks={wallet} render={(wallet) => <UserWallet address={wallet.address} />} />
            <ShowIfNil checks={wallet}>
              <HideIfNil checks={renderWalletConnect} render={(renderWalletConnect) => renderWalletConnect()} />
            </ShowIfNil>
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
