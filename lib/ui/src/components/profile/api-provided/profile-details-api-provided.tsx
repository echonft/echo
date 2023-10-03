import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { SizeLG } from '@echo/ui/constants/size'
import { messages } from '@echo/ui/messages/en'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { NextIntlClientProvider } from 'next-intl'
import { head } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const ProfileDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallets } = user
  const { avatarUrl, bannerUrl, bannerColor, username } = discord
  const wallet = head(wallets)
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <UserDetailsLayout>
        <UserBanner discordBannerUrl={bannerUrl} discordBannerColor={bannerColor} />
        <PaddedContainer>
          <UserPictureAndInfoLayout>
            <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} size={SizeLG} />
            <UserInfoLayout>
              <UserDiscordTag discordUsername={username} />
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
    </NextIntlClientProvider>
  )
}
