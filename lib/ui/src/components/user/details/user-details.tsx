import { HideIfNil } from '../../base/utils/hide-if-nil'
import { PaddedContainer } from '../../layout/padded-container'
import { UserDiscordTag } from '../../shared/user-discord-tag'
import { UserProfilePicture, UserProfilePictureProps } from '../../shared/user-profile-picture'
import { UserWallet } from '../../shared/user-wallet'
import { UserBanner, UserBannerProps } from './user-banner'
import { Wallet } from '@echo/ui-model'
import { clsx } from 'clsx'
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
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <UserBanner discordId={discordId} discordBanner={discordBanner} />
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'gap-8', 'items-end')}>
          <UserProfilePicture
            discordUsername={discordUsername}
            discordId={discordId}
            discordAvatar={discordAvatar}
            size={size}
          />
          <div className={clsx('flex', 'flex-col', 'self-stretch', 'justify-center', 'gap-2.5')}>
            <UserDiscordTag discordUsername={discordUsername} />
            <HideIfNil checks={wallet} render={() => <UserWallet address={wallet!.address} />} />
          </div>
        </div>
      </PaddedContainer>
    </div>
  )
}
