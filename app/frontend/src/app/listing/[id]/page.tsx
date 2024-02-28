import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getPendingOffersForListing } from '@echo/firestore/crud/listing/get-pending-offers-for-listing'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRoleForUser } from '@echo/frontend/lib/helpers/listing/set-listing-role-for-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { WithId } from '@echo/model/types/with-id'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { getListingPageLayoutBackground } from '@echo/ui/helpers/listing/get-listing-page-layout-background'
import { ListingDetailsPage } from '@echo/ui/pages/listing/listing-details-page'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { notFound } from 'next/navigation'
import { andThen, filter, isNil, map, path, pipe, reject } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithId>>
async function render({ params: { id }, user }: Params) {
  const listing = await pipe(findListingById)(id)
  if (isNil(listing)) {
    notFound()
  }
  const nfts = isNil(user) ? [] : await getNftsForOwner(user.username)
  const listingWithRole = setListingRoleForUser(user, nfts)(listing)
  const listingTargets = getListingTargetsCollectionIds(listing)
  const userTargetNfts = filter(
    pipe<[Nft], string, boolean>(nonNullableReturn(path(['collection', 'id'])), isIn(listingTargets)),
    nfts
  )
  const offers = await pipe(
    getPendingOffersForListing,
    andThen(
      pipe<[Offer[]], OfferWithRole[], OfferWithRole[]>(map(setOfferRoleForUser(user)), reject(propIsNil('role')))
    )
  )(listing)
  return (
    <PageLayout user={user} background={getListingPageLayoutBackground(listing)}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <ListingDetailsPage listing={listingWithRole} user={user} userTargetNfts={userTargetNfts} offers={offers} />
        </DetailsPaddedContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
