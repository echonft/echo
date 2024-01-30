import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import { validateOffer } from '@echo/frontend/lib/helpers/offer/validate-offer'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { Offer } from '@echo/model/types/offer'
import { isOfferRoleUndefined } from '@echo/ui/helpers/offer/is-offer-role-undefined'
import { ProfileOfferDetails } from '@echo/ui/pages/profile/offer/profile-offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const offer = await pipe<[string], Promise<Offer | undefined>, Promise<OfferWithRole | undefined>>(
    findOfferById,
    andThen(unlessNil(pipe(validateOffer, andThen(setOfferRoleForUser(user)))))
  )(id)

  if (isNil(offer) || isOfferRoleUndefined(offer)) {
    notFound()
  }
  return <ProfileOfferDetails offer={offer} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
