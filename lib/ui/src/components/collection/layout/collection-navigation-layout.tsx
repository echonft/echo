import { createOfferFetcher } from '@echo/api/services/fetcher/create-offer-fetcher'
import { type AuthUser } from '@echo/model/types/auth-user'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { getCollectionNavigationItems } from '@echo/ui/helpers/collection/get-collection-navigation-items'
import { messages } from '@echo/ui/messages/en'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  slug: string
  activeNavigationItem: NavigationItemId
  user: AuthUser | undefined
}
export const CollectionNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  slug,
  activeNavigationItem,
  user,
  children
}) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <NavigationLayout
        navigationItems={getCollectionNavigationItems(slug)}
        activeNavigationItem={activeNavigationItem}
      >
        {children}
        <NewOfferSliderManager createOfferFetcher={createOfferFetcher} user={user} />
        <CalloutManager />
      </NavigationLayout>
    </NextIntlClientProvider>
  )
}
