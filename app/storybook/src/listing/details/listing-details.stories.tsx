// noinspection JSUnusedGlobalSymbols

import { ListingRole } from '@echo/model/constants/listing-role'
import { ListingState } from '@echo/model/constants/listing-state'
import { shouldLockListing } from '@echo/model/helpers/listing/should-lock-listing'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Offer } from '@echo/model/types/offer/offer'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { ListingDetails as Component } from '@echo/ui/components/listing/details/listing-details'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, ifElse, pipe, values } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Creator' | 'Target' | 'None'
type ComponentType = FunctionComponent<{
  state: ListingState
  role: Role
  withOffers: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Details',
  args: {
    state: ListingState.Open,
    role: 'None',
    withOffers: false
  },
  argTypes: {
    role: {
      options: ['Creator', 'Target', 'None'],
      control: { type: 'radio' }
    },
    state: {
      options: values(ListingState),
      control: { type: 'select' }
    },
    withOffers: {
      control: 'boolean'
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ state, role, withOffers }) => {
    function setExpirationAndLocked(listing: Listing): Listing {
      if (listing.state === ListingState.Expired) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', expiredDate()), assoc('locked', true))(listing)
      }
      if (shouldLockListing(listing.state)) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('locked', true))(listing)
      }
      return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('locked', false))(listing)
    }

    function getOffers(): Offer[] {
      return ifElse(always(withOffers), getAllOfferMocks, always([]))()
    }

    function setRole(role: Role) {
      return function (listing: Listing): ListingWithRole {
        if (role === 'Creator') {
          return assoc<ListingRole, Listing, 'role'>('role', ListingRole.Creator, listing)
        }
        if (role === 'Target') {
          return assoc<ListingRole, Listing, 'role'>('role', ListingRole.Target, listing)
        }
        return assoc('role', undefined, listing)
      }
    }

    const renderedListing = pipe<[], Listing, Listing, Listing, ListingWithRole>(
      getListingMock,
      assoc('state', state),
      setExpirationAndLocked,
      setRole(role)
    )()
    return <Component listing={renderedListing} offers={getOffers()} />
  }
}
