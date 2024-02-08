import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { ProfileDetailsLayout } from '@echo/ui/components/base/layout/profile-details-layout'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { ProfileBanner } from '@echo/ui/components/base/profile-banner'
import { type ProfilePictureProps } from '@echo/ui/components/base/profile-picture'
import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  picture?: Pick<ProfilePictureProps, 'size' | 'border'>
}
export const ProfileSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({ picture, children }) => {
  return (
    <ProfileLayout>
      <ProfileBanner />
      <PaddedContainer>
        <ProfileDetailsLayout>
          <ProfilePictureSkeleton size={picture?.size} border={picture?.border} />
          {children}
        </ProfileDetailsLayout>
      </PaddedContainer>
    </ProfileLayout>
  )
}
