import { type AuthUser } from '@echo/model/types/auth-user'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ProfileDetailsSkeleton } from '@echo/ui/components/profile/details/skeleton/profile-details-skeleton'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
}

export const ProfileDetailsApiProvided: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return <ProfileDetailsSkeleton />
  }

  const { discord } = user
  const { avatarUrl, bannerUrl, bannerColor, username } = discord
  return (
    <UserDetailsLayout bannerUrl={bannerUrl} bannerColor={bannerColor}>
      <PaddedContainer>
        <UserPictureAndInfoLayout>
          <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} />
          <UserInfoLayout>
            <UserDiscordTag discordUsername={username} />
          </UserInfoLayout>
        </UserPictureAndInfoLayout>
      </PaddedContainer>
    </UserDetailsLayout>
  )
}
