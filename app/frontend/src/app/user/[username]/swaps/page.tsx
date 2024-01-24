import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { redirect } from 'next/navigation'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'username', string>>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.swaps.get())
  }
  const offers = await getCompletedOffersForUser(username)
  return <UserSwapsApiProvided username={username} offers={offers} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
