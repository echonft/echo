import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'
import { ProfileNftsSkeleton } from '@echo/ui/pages/profile/nfts/skeleton/profile-nfts-skeleton'

export default function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <ProfileNftsSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
