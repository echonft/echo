import { createListing } from '@echo/api/services/fetcher/create-listing'
import { createOffer } from '@echo/api/services/fetcher/create-offer'
import { collections } from '@echo/api/services/providers/collections'
import { type AuthUser } from '@echo/model/types/auth-user'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewListingManager } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
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
        <NewOfferManager fetcher={{ createOffer }} user={user} />
        <NewListingManager fetcher={{ createListing }} provider={{ collections }} user={user} />
        <CalloutManager />
      </NavigationLayout>
    </NextIntlClientProvider>
  )
}
