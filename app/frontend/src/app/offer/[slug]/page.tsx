import { pathProvider } from '@echo/api/routing/path-provider'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithAuthUser } from '@echo/frontend/lib/types/props-with-auth-user'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { getOfferBackground } from '@echo/ui/helpers/offer/get-offer-background'
import { isOfferRoleUndefined } from '@echo/ui/helpers/offer/is-offer-role-undefined'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound, redirect } from 'next/navigation'
import { always, andThen, isNil, otherwise, pipe, unless } from 'ramda'

async function render({ params: { slug }, user }: PropsWithAuthUser<NextParams<WithSlug>>) {
  const offer = await pipe<
    [string],
    Promise<Nullable<Offer>>,
    Promise<Nullable<OfferWithRole>>,
    Promise<Nullable<OfferWithRole>>
  >(
    getOffer,
    andThen(unless(isNil, setOfferRoleForUser(user)) as (offer: Nullable<Offer>) => Nullable<OfferWithRole>),
    otherwise(pipe(captureAndLogError, always(undefined)))
  )(slug)
  if (isNil(offer)) {
    notFound()
  }
  if (offer.state === OFFER_STATE_COMPLETED) {
    redirect(pathProvider.swap.details.get({ slug }))
  }
  if (isOfferRoleUndefined(offer)) {
    notFound()
  }
  // TODO we should create a SwapDetails view which will be much simpler
  return (
    <PageLayout user={user} background={getOfferBackground(offer)}>
      <PaddedSectionLayout>
        <OfferDetails offer={offer} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withLoggedInUser(render)
