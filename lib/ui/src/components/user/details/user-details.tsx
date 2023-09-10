import { HideIfNil } from '../../base/utils/hide-if-nil'
import { PaddedContainer } from '../../layout/padded-container'
import { UserDiscordTag } from '../../shared/user-discord-tag'
import { UserProfilePicture, UserProfilePictureProps } from '../../shared/user-profile-picture'
import { UserWallet } from '../../shared/user-wallet'
import { UserDetailsLayout } from '../layout/user-details-layout'
import { UserInfoLayout } from '../layout/user-info-layout'
import { UserPictureAndInfoLayout } from '../layout/user-picture-and-info-layout'
import { UserBanner, UserBannerProps } from './user-banner'
import { Wallet } from '@echo/ui-model'
import { FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {
  wallet: Wallet | undefined
}

export const UserDetails: FunctionComponent<Props> = ({
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
            <HideIfNil checks={wallet} render={() => <UserWallet address={wallet!.address} />} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
