// noinspection JSUnusedGlobalSymbols

import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { LISTING_ROLE_CREATOR, LISTING_ROLE_TARGET } from '@echo/model/constants/listing-role'
import {
  LISTING_STATE_EXPIRED,
  LISTING_STATE_OPEN,
  LISTING_STATES,
  READ_ONLY_LISTING_STATES
} from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingRole } from '@echo/model/types/listing-role'
import type { ListingState } from '@echo/model/types/listing-state'
import type { Offer } from '@echo/model/types/offer'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'
import { getListingPageLayoutBackground } from '@echo/ui/helpers/listing/get-listing-page-layout-background'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, ifElse, includes, map, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Creator' | 'Target' | 'None'
type ComponentType = FunctionComponent<{
  state: ListingState
  role: Role
  withOffers: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Pages/Listing/Details'
}

export default metadata

export const Page: StoryObj<ComponentType> = {
  args: {
    state: LISTING_STATE_OPEN,
    role: 'None',
    withOffers: false
  },
  argTypes: {
    role: {
      options: ['Creator', 'Target', 'None'],
      control: { type: 'radio' }
    },
    state: {
      options: LISTING_STATES,
      control: { type: 'select' }
    },
    withOffers: {
      control: 'boolean'
    }
  },
  render: ({ state, role, withOffers }) => {
    function setExpirationAndReadOnly(listing: Listing): Listing {
      if (listing.state === LISTING_STATE_EXPIRED) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', expiredDate()), assoc('readOnly', true))(listing)
      }
      if (includes(listing.state, READ_ONLY_LISTING_STATES)) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', true))(listing)
      }
      return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', false))(listing)
    }

    function getOffers(): OfferWithRole[] {
      return ifElse(
        always(withOffers),
        pipe(getAllOfferMocks, map<Offer, OfferWithRole>(assoc('role', undefined))),
        always([])
      )()
    }

    function setRole(role: Role) {
      return function (listing: Listing): ListingWithRole {
        if (role === 'Creator') {
          return assoc<ListingRole, Listing, 'role'>('role', LISTING_ROLE_CREATOR, listing)
        }
        if (role === 'Target') {
          return assoc<ListingRole, Listing, 'role'>('role', LISTING_ROLE_TARGET, listing)
        }
        return assoc('role', undefined, listing)
      }
    }

    const renderedListing = pipe<[], Listing, Listing, Listing, ListingWithRole>(
      getListingMock,
      assoc('state', state),
      setExpirationAndReadOnly,
      setRole(role)
    )()
    const user =
      role === 'Creator'
        ? getUserDocumentDataMockByUsername(userMockJohnnyUsername())
        : getUserDocumentDataMockByUsername(userMockCrewUsername())
    return (
      <PageLayout user={user} background={getListingPageLayoutBackground(renderedListing)} excludeProviders={true}>
        <PaddedSectionLayout>
          <ListingDetails listing={renderedListing} user={user} offers={getOffers()} />
        </PaddedSectionLayout>
      </PageLayout>
    )
  }
}

export const Loading: StoryObj<ComponentType> = {
  render: () => (
    <PageLayout>
      <PaddedSectionLayout>
        <ListingDetailsSkeleton />
      </PaddedSectionLayout>
    </PageLayout>
  )
}
