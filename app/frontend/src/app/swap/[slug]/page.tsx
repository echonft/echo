import { linkProvider } from '@echo/api/routing/link-provider'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { WithSlug } from '@echo/model/types/with-slug'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { PAGE_LAYOUT_BG_GREEN_GRADIENT } from '@echo/ui/constants/page-layout-background'
import { notFound, redirect } from 'next/navigation'
import { always, assoc, isNil, otherwise, pipe } from 'ramda'

async function render({ params: { slug } }: PropsWithUser<NextParams<WithSlug>>) {
  const offer = await pipe(getOffer, otherwise(pipe(captureAndLogError, always(undefined))))(slug)
  if (isNil(offer)) {
    notFound()
  }
  if (offer.state !== OFFER_STATE_COMPLETED) {
    // user will be redirected to login if they are not logged in anyway
    redirect(linkProvider.offer.details.get({ slug }))
  }
  return (
    <PageLayout background={PAGE_LAYOUT_BG_GREEN_GRADIENT}>
      <PaddedSectionLayout>
        <OfferDetails offer={assoc('role', undefined, offer)} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
