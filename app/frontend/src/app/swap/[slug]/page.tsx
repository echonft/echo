import { pathProvider } from '@echo/api/routing/path-provider'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { getOfferBackground } from '@echo/ui/helpers/offer/get-offer-background'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import { notFound, redirect } from 'next/navigation'
import { always, andThen, assoc, isNil, otherwise, pipe } from 'ramda'

async function render({
  params: { idContract },
  user
}: PropsWithUser<NextParams<Record<'idContract', Lowercase<HexString>>>>) {
  const offer = await pipe(
    getOfferByIdContract,
    andThen(unlessNil(setOfferRoleForUser(user))),
    otherwise(pipe(captureAndLogError, always(undefined)))
  )(idContract)
  if (isNil(offer)) {
    notFound()
  }
  if (offer.state !== OFFER_STATE_COMPLETED) {
    redirect(pathProvider.user.offer.get({ username: offer.sender.username, idContract: offer.idContract }))
  }
  return (
    <PaddedSectionLayout background={getOfferBackground(offer)}>
      <OfferDetails offer={assoc('role', undefined, offer)} />
    </PaddedSectionLayout>
  )
}

export default withUser(render)
