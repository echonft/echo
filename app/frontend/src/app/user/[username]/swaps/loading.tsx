import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

export default function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <CardsSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
