import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { setOfferRoleReceiver } from '@echo/ui/helpers/offer/set-offer-role-receiver'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const offers = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingOffersForReceiver,
    andThen(map(setOfferRoleReceiver))
  )(params)
  return <ProfileOffersReceivedApiProvided offers={offers} />
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
