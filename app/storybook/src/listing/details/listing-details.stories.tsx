// noinspection JSUnusedGlobalSymbols

import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_OPEN,
  LISTING_STATES
} from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { ListingDetails as Component } from '@echo/ui/components/listing/details/listing-details'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, ifElse, pipe, propEq } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Record<'state', ListingState> & Record<'isCreator', boolean>>
const DEFAULT_STATE: ListingState = LISTING_STATE_OPEN
const DEFAULT_IS_CREATOR = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const user = getAuthUserMockByUsername(listing.creator.username)
function cancelListing(_args: CancelListingArgs) {
  return delayPromise(
    Promise.resolve({
      listing: assoc('state', LISTING_STATE_CANCELLED, listing)
    }),
    800
  )
}

const metadata: Meta<ComponentType> = {
  title: 'Listing/Details',
  args: {
    state: DEFAULT_STATE,
    isCreator: DEFAULT_IS_CREATOR
  },
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: LISTING_STATES,
      control: { type: 'radio' }
    },
    isCreator: {
      defaultValue: DEFAULT_IS_CREATOR,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ state, isCreator }) => {
    const renderedListing = pipe(
      assoc('state', state),
      ifElse(
        propEq(LISTING_STATE_EXPIRED, 'state'),
        assoc('expiresAt', EXPIRED_DATE),
        assoc('expiresAt', NOT_EXPIRED_DATE)
      )
    )(listing) as Listing
    return <Component listing={renderedListing} user={isCreator ? user : undefined} fetcher={{ cancelListing }} />
  }
}
