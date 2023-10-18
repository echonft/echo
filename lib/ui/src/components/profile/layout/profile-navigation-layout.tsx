import { type AuthUser } from '@echo/model/types/auth-user'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { getProfileNavigationItems } from '@echo/ui/helpers/profile/get-profile-navigation-items'
import { messages } from '@echo/ui/messages/en'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

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
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <NavigationLayout navigationItems={getProfileNavigationItems()} activeNavigationItem={activeNavigationItem}>
        {children}
        <NewOfferSliderManager user={user} />
      </NavigationLayout>
    </NextIntlClientProvider>
  )
}
