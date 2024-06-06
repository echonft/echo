import { linkProvider } from '@echo/api/routing/link-provider'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Swap } from '@echo/model/types/swap'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserSwaps } from '@echo/ui/pages/user/swaps/user-swaps'
import { redirect } from 'next/navigation'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithUsername>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.offers.get())
  }
  const swaps = (await getCompletedOffersForUser(username)) as Swap[]
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_SWAPS}>
      <UserSwaps username={username} swaps={swaps} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
