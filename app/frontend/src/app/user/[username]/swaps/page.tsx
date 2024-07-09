import { linkProvider } from '@echo/api/routing/link-provider'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { Swap } from '@echo/model/types/swap'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserSwaps } from '@echo/ui/pages/user/swaps/user-swaps'
import { redirect } from 'next/navigation'
import { always, otherwise, pipe } from 'ramda'

async function render({ params: { username }, user }: PropsWithUser<NextParams<WithUsername>>) {
  if (user?.username === username) {
    redirect(linkProvider.profile.offers.get())
  }
  const swaps = (await pipe(
    getCompletedOffersForUser,
    otherwise(pipe(captureAndLogError, always([])))
  )(username)) as Swap[]
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_SWAPS}>
      <UserSwaps username={username} swaps={swaps} />
    </UserNavigationLayout>
  )
}

export default withUser(render)
