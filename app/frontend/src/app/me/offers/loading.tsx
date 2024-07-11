import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

export default function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <CardsSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
