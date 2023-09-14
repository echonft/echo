import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { getUserNavigationItems } from '@echo/ui/helpers/user/get-user-navigation-items'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { FunctionComponent, PropsWithChildren } from 'react'

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
    </NavigationLayout>
  )
}
