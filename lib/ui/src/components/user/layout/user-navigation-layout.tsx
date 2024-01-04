import { createOffer } from '@echo/api/services/fetcher/create-offer'
import { type AuthUser } from '@echo/model/types/auth-user'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { getUserNavigationItems } from '@echo/ui/helpers/user/get-user-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username: string
  activeNavigationItem: NavigationItemId
  user: AuthUser | undefined
}
export const UserNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  username,
  activeNavigationItem,
  user,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getUserNavigationItems(username)} activeNavigationItem={activeNavigationItem}>
      {children}
      <NewOfferManager fetcher={{ createOffer }} user={user} />
      <CalloutManager />
    </NavigationLayout>
  )
}
