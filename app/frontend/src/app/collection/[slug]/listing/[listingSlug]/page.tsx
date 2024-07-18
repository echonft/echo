import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { getPendingOffersForListing } from '@echo/firestore/crud/listing/get-pending-offers-for-listing'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setListingRoleForUser } from '@echo/frontend/lib/helpers/listing/set-listing-role-for-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlugType } from '@echo/model/types/with-slug-type'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, map, otherwise, pipe, reject } from 'ramda'

async function render({
  params: { listingSlug },
  user
}: PropsWithUser<NextParams<WithSlugType<Record<'listingSlug', string>>>>) {
  const nfts = isNil(user)
    ? []
    : await pipe(getNftsForOwner, otherwise(pipe(captureAndLogError, always([]))))(user.username)
  const listing = await pipe(
    getListing,
    andThen(unlessNil(setListingRoleForUser(user, nfts))),
    otherwise(pipe(captureAndLogError, always(undefined)))
  )(listingSlug)
  if (isNil(listing)) {
    notFound()
  }
  const offers = await pipe(
    getPendingOffersForListing,
    andThen(
      pipe<[Offer[]], OfferWithRole[], OfferWithRole[]>(map(setOfferRoleForUser(user)), reject(propIsNil('role')))
    ),
    otherwise(pipe(captureAndLogError, always([])))
  )(listing)
  return (
    <NavigationSectionLayout>
      <ListingDetails listing={listing} offers={offers} />
    </NavigationSectionLayout>
  )
}

export default withUser(render)
