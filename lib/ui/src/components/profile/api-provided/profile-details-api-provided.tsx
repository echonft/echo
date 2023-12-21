import { type AuthUser } from '@echo/model/types/auth-user'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ProfileDetailsSkeleton } from '@echo/ui/components/profile/details/skeleton/profile-details-skeleton'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { UserBanner } from '@echo/ui/components/user/details/user-banner'
import { UserDetailsLayout } from '@echo/ui/components/user/layout/user-details-layout'
import { UserInfoLayout } from '@echo/ui/components/user/layout/user-info-layout'
import { UserPictureAndInfoLayout } from '@echo/ui/components/user/layout/user-picture-and-info-layout'
import { SIZE_LG } from '@echo/ui/constants/size'
import { messages } from '@echo/ui/messages/en'
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
            <UserInfoLayout>
              <UserDiscordTag discordUsername={username} />
              <HideIfNil checks={wallet} render={(wallet) => <UserWallet wallet={wallet} />} />
            </UserInfoLayout>
          </UserPictureAndInfoLayout>
        </PaddedContainer>
      </UserDetailsLayout>
    </NextIntlClientProvider>
  )
}
