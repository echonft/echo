import { ProfileDetailsLayout } from '@echo/ui/components/base/profile/layout/profile-details-layout'
import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { type ProfilePictureProps } from '@echo/ui/components/base/profile/profile-picture'
import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile/skeleton/profile-picture-skeleton'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  picture?: Pick<ProfilePictureProps, 'size' | 'border'>
}

export const ProfileSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({ picture, children }) => {
  return (
    <ProfileLayout>
      <ProfileDetailsLayout>
        <ProfilePictureSkeleton size={picture?.size} border={picture?.border} />
        {children}
      </ProfileDetailsLayout>
    </ProfileLayout>
  )
}
