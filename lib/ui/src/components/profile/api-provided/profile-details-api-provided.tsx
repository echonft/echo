import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import { type AuthUser } from '@echo/model/types/auth-user'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ProfileDetailsSkeleton } from '@echo/ui/components/profile/details/skeleton/profile-details-skeleton'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { SIZE_LG } from '@echo/ui/constants/size'
import { messages } from '@echo/ui/messages/en'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
import { NextIntlClientProvider } from 'next-intl'
import { head, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
}

export const ProfileDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return <ProfileDetailsSkeleton />
  }

  const { discord, wallets } = user
  const { avatarUrl, bannerUrl, bannerColor, username } = discord
  const wallet = head(wallets)
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <UserDetailsLayout>
        <UserBanner discordBannerUrl={bannerUrl} discordBannerColor={bannerColor} />
        <PaddedContainer>
          <UserPictureAndInfoLayout>
            <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} size={SIZE_LG} />
            <Web3Provider>
              <ConnectWallet
                fetcher={{ addWallet: addWallet, getNonce: getNonce, signNonce: signNonce }}
                provider={{ account: account, chain: chain }}
                token={user.sessionToken}
              />
            </Web3Provider>
            <UserInfoLayout>
              <UserDiscordTag discordUsername={username} />
              <HideIfNil checks={wallet} render={(wallet) => <UserWallet wallet={wallet} />} />
              <ShowIfNil checks={wallet}>
                <Web3Provider>
                  <ConnectWallet
                    token={user.sessionToken}
                    fetcher={{ addWallet, getNonce, signNonce }}
                    provider={{ account, chain }}
                  />
                </Web3Provider>
              </ShowIfNil>
            </UserInfoLayout>
          </UserPictureAndInfoLayout>
        </PaddedContainer>
      </UserDetailsLayout>
    </NextIntlClientProvider>
  )
}
