import { type Wallet } from '@echo/model/types/wallet'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { UserDiscordTag } from '@echo/ui/components/user/base/user-discord-tag'
import { UserProfilePicture, type UserProfilePictureProps } from '@echo/ui/components/user/base/user-profile-picture'
import {
  UserDetailsLayout,
  type UserDetailsLayoutProps
} from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/details/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import { type FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserDetailsLayoutProps {
  wallet: Wallet | undefined
}

export const UserDetails: FunctionComponent<Props> = ({
  discordUsername,
  bannerColor,
  bannerUrl,
  discordAvatarUrl,
  wallet
}) => {
  return (
    <UserDetailsLayout bannerUrl={bannerUrl} bannerColor={bannerColor}>
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={discordUsername} discordAvatarUrl={discordAvatarUrl} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={discordUsername} />
            <HideIfNil checks={wallet} render={(wallet) => <WalletConnectedButton wallet={wallet} />} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
