import { UserBanner, UserBannerProps } from './user-banner'
import { UserDiscordTag } from './user-discord-tag'
import { UserProfilePicture, UserProfilePictureProps } from './user-profile-picture'
import { SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {}

export const UserDetails: FunctionComponent<Props> = ({ discordUsername, discordBanner, discordId, discordAvatar }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <UserBanner discordId={discordId} discordBanner={discordBanner} />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'gap-8', 'items-end')}>
        <UserProfilePicture
          discordUsername={discordUsername}
          discordId={discordId}
          discordAvatar={discordAvatar}
          size={SizeLG}
        />
        <UserDiscordTag discordUsername={discordUsername} />
      </div>
    </div>
  )
}
