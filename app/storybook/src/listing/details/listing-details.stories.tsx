// noinspection JSUnusedGlobalSymbols

import { ListingRole } from '@echo/model/constants/listing-role'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { ListingDetails as Component } from '@echo/ui/components/listing/details/listing-details'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, assoc, pipe, values } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  state: ListingState
  role: ListingRole | 'none'
  onClose: VoidFunction
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
    onClose: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ state, role, onClose }) => {
    const [listing, setListing] = useState<ListingWithRole>(assoc('role', undefined, listingMock))

    function setExpirationAndLocked(listing: ListingWithRole): ListingWithRole {
      if (listing.state === ListingState.Expired) {
        return (assoc('expiresAt', expiredDate()), assoc('locked', true))(listing)
      }
      if (listing.state !== ListingState.Open) {
        return pipe(assoc('expiresAt', notExpiredDate()), assoc('locked', true))(listing)
      }
      return pipe(assoc('expiresAt', notExpiredDate()), assoc('locked', false))(listing)
    }

    function setRole(listing: Listing): ListingWithRole {
      if (role === ListingRole.Creator) {
        return assoc('role', ListingRole.Creator, listing)
      }
      if (role === ListingRole.Target) {
        return assoc('role', ListingRole.Target, listing)
      }
      return assoc('role', undefined, listing)
    }

    useEffect(() => {
      setListing(pipe(assoc('state', state), setExpirationAndLocked, setRole))
    }, [state, role])

    return (
      <Component
        listing={listing}
        onUpdate={(listing) => {
          setListing(setRole(listing))
        }}
        onClose={onClose}
      />
    )
  }
}
