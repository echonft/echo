import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { getProfileNavigationItems } from '@echo/ui/helpers/profile/get-profile-navigation-items'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
  user: AuthUser
}
export const ProfileNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  user,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getProfileNavigationItems()} activeNavigationItem={activeNavigationItem}>
      {children}
      <section>
        <NewOfferSliderManager user={user} />
      </section>
    </NavigationLayout>
  )
}
