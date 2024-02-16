import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { ProfileDetailsLayout } from '@echo/ui/components/base/layout/profile-details-layout'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { ProfileBanner, type ProfileBannerProps } from '@echo/ui/components/base/profile-banner'
import { ProfilePicture, type ProfilePictureProps } from '@echo/ui/components/base/profile-picture'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  banner: ProfileBannerProps
  picture: ProfilePictureProps
}
export const Profile: FunctionComponent<PropsWithChildren<Props>> = ({ banner, picture, children }) => {
  const { bannerUrl, bannerColor } = banner
  const { pictureUrl, alt, size = SIZE_LG, border } = picture
  return (
    <ProfileLayout>
      <ProfileBanner bannerColor={bannerColor} bannerUrl={bannerUrl} />
      <PaddedContainer>
        <ProfileDetailsLayout>
          <ProfilePicture pictureUrl={pictureUrl} alt={alt} size={size} border={border} />
          {children}
        </ProfileDetailsLayout>
      </PaddedContainer>
    </ProfileLayout>
  )
}
