import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture, type UserProfilePictureProps } from '@echo/ui/components/shared/user-profile-picture'
import { UserBanner, type UserBannerProps } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { type FunctionComponent } from 'react'

interface Props extends UserProfilePictureProps, UserBannerProps {}

export const UserDetails: FunctionComponent<Props> = ({
  discordUsername,
  discordBannerColor,
  discordBannerUrl,
  discordAvatarUrl,
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
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
