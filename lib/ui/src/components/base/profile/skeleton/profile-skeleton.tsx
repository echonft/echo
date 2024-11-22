import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { ProfileCountsSkeleton } from '@echo/ui/components/base/profile/skeleton/profile-counts-skeleton'
import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile/skeleton/profile-picture-skeleton'
import type { FunctionComponent } from 'react'

export const ProfileSkeleton: FunctionComponent = () => {
  return (
    <ProfileLayout>
      <ProfilePictureSkeleton />
      <ProfileCountsSkeleton />
    </ProfileLayout>
  )
}
