import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { getPendingOffersForListing } from '@echo/firestore/crud/listing/get-pending-offers-for-listing'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRoleForUser } from '@echo/frontend/lib/helpers/listing/set-listing-role-for-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { getListingPageLayoutBackground } from '@echo/ui/helpers/listing/get-listing-page-layout-background'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { notFound } from 'next/navigation'
import { andThen, filter, isNil, map, pathEq, pipe, reject } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithSlug>>

async function render({ params: { slug }, user }: Params) {
  const nfts = isNil(user) ? [] : await getNftsForOwner(user.username)
  const listing = await pipe(getListing, andThen(unlessNil(setListingRoleForUser(user, nfts))))(slug)
  if (isNil(listing)) {
    notFound()
  }
  const userTargetNfts = filter(pathEq(listing.target.collection.slug, ['collection', 'slug']), nfts)
  const offers = await pipe(
    getPendingOffersForListing,
    andThen(
      pipe<[Offer[]], OfferWithRole[], OfferWithRole[]>(map(setOfferRoleForUser(user)), reject(propIsNil('role')))
    )
  )(listing)
  return (
    <PageLayout user={user} background={getListingPageLayoutBackground(listing)}>
      <PaddedSectionLayout>
        <ListingDetails listing={listing} user={user} userTargetNfts={userTargetNfts} offers={offers} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
