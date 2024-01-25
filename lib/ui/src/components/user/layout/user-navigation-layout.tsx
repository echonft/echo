import { createOffer } from '@echo/api/services/fetchers/create-offer'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { getUserNavigationItems } from '@echo/ui/helpers/user/get-user-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username: string
  activeNavigationItem: NavigationItemId
}
export const UserNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  username,
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getUserNavigationItems(username)} activeNavigationItem={activeNavigationItem}>
      {children}
      <NewOfferManager fetcher={{ createOffer }} />
    </NavigationLayout>
  )
}
