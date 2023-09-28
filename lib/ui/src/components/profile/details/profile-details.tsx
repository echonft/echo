import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture, type UserProfilePictureProps } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner, type UserBannerProps } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { Wallet } from '@echo/ui/types/model/wallet'
import type { FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {
  wallet: Wallet | undefined
  user: AuthUser
}

export const ProfileDetails: FunctionComponent<Props> = ({
  discordUsername,
  discordBannerUrl,
  discordBannerColor,
  discordAvatarUrl,
  wallet,
  size,
  user
}) => {
  return (
    <UserDetailsLayout>
      <UserBanner discordBannerUrl={discordBannerUrl} discordBannerColor={discordBannerColor} />
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={discordUsername} discordAvatarUrl={discordAvatarUrl} size={size} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={discordUsername} />
            <HideIfNil checks={wallet} render={(wallet) => <UserWallet address={wallet.address} />} />
            <ShowIfNil checks={wallet}>
              <Web3Provider>
                <ConnectWallet token={user.sessionToken} />
              </Web3Provider>
            </ShowIfNil>
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
