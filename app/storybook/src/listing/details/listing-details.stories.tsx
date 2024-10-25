// noinspection JSUnusedGlobalSymbols

import { ListingRole } from '@echo/model/constants/listing-role'
import { ListingState } from '@echo/model/constants/listing-state'
import { shouldLockListing } from '@echo/model/helpers/listing/should-lock-listing'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import {
  ListingDetails as Component,
  type ListingDetailsProps
} from '@echo/ui/components/listing/details/listing-details'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, assoc, pipe, values } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<ListingDetailsProps, 'onUpdate'> {
  state: ListingState
  role: ListingRole | 'none'
}

type ComponentType = FunctionComponent<Props>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Details',
  args: {
    state: ListingState.Open,
    role: 'none'
  },
  argTypes: {
    role: {
      options: pipe(values, append('none'))(ListingRole),
      control: { type: 'radio' }
    },
    state: {
      options: values(ListingState),
      control: { type: 'select' }
    },
    onUpdate: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['onUpdate']
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ state, role, onUpdate }) => {
    function setExpirationAndLocked(listing: Listing): Listing {
      if (listing.state === ListingState.Expired) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', expiredDate()), assoc('locked', true))(listing)
      }
      if (shouldLockListing(listing.state)) {
        return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('locked', true))(listing)
      }
      return pipe<[Listing], Listing, Listing>(assoc('expiresAt', notExpiredDate()), assoc('locked', false))(listing)
    }

    function setRole(role: ListingRole | 'none') {
      return function (listing: Listing): ListingWithRole {
        if (role === ListingRole.Creator) {
          return assoc('role', ListingRole.Creator, listing)
        }
        if (role === ListingRole.Target) {
          return assoc('role', ListingRole.Target, listing)
        }
        return assoc('role', undefined, listing)
      }
    }

    const renderedListing = pipe<[Listing], Listing, Listing, ListingWithRole>(
      assoc('state', state),
      setExpirationAndLocked,
      setRole(role)
    )(listingMock)
    return <Component listing={renderedListing} onUpdate={onUpdate} />
  }
}
