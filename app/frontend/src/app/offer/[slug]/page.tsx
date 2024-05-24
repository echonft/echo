import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { getOfferPageLayoutBackground } from '@echo/ui/helpers/offer/get-offer-page-layout-background'
import { isOfferRoleUndefined } from '@echo/ui/helpers/offer/is-offer-role-undefined'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe, unless } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<WithSlug>>

async function render({ params: { slug }, user }: Params) {
  const offer = await pipe<[string], Promise<Nullable<Offer>>, Promise<Nullable<OfferWithRole>>>(
    getOffer,
    andThen(unless(isNil, setOfferRoleForUser(user)) as (offer: Nullable<Offer>) => Nullable<OfferWithRole>)
  )(slug)
  if (isNil(offer) || (offer.state !== OFFER_STATE_COMPLETED && isOfferRoleUndefined(offer))) {
    notFound()
  }
  return (
    <PageLayout user={user} background={getOfferPageLayoutBackground(offer)}>
      <PaddedSectionLayout>
        <OfferDetails offer={offer} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
