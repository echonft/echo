import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { getOfferPageLayoutBackground } from '@echo/ui/helpers/offer/get-offer-page-layout-background'
import { isOfferRoleUndefined } from '@echo/ui/helpers/offer/is-offer-role-undefined'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe, unless } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const offer = await pipe<[string], Promise<Nullable<Offer>>, Promise<Nullable<OfferWithRole>>>(
    findOfferById,
    andThen(unless(isNil, setOfferRoleForUser(user)) as (offer: Nullable<Offer>) => Nullable<OfferWithRole>)
  )(id)
  if (isNil(offer) || (offer.state !== OFFER_STATE_COMPLETED && isOfferRoleUndefined(offer))) {
    notFound()
  }
  return (
    <PageLayout user={user} background={getOfferPageLayoutBackground(offer)}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <OfferDetails offer={offer} />
        </DetailsPaddedContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
