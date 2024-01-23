import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { redirect } from 'next/navigation'

async function render({ params: { username } }: NextParams<Record<'username', string>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
  if (user?.username === username) {
    redirect(linkProvider.profile.swaps.get())
  }
  const offers = await getOffersForUser(
    username,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <UserSwapsApiProvided username={username} offers={offers} />
}

export default withLocale(render)
