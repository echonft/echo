import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { validateOffer } from '@echo/frontend/lib/helpers/offer/validate-offer'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { isOfferReceiver } from '@echo/model/helpers/offer/is-offer-receiver'
import { isOfferSender } from '@echo/model/helpers/offer/is-offer-sender'
import { ProfileOfferDetails } from '@echo/ui/pages/profile/offer/profile-offer-details'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const offer = await findOfferById(id)
  if (isNil(offer) || (!isOfferSender(offer, user.username) && !isOfferReceiver(offer, user.username))) {
    notFound()
  }
  const updatedOffer = await validateOffer(offer)
  return <ProfileOfferDetails offer={updatedOffer} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
