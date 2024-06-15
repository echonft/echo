import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'
import { UserNftsSkeleton } from '@echo/ui/pages/user/nfts/skeleton/user-nfts-skeleton'

export default function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <UserNftsSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
