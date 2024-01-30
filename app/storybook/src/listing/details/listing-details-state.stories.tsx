// noinspection JSUnusedGlobalSymbols

import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { ListingDetailsState as Component } from '@echo/ui/components/listing/details/listing-details-state'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Details/State',
  component: Component,
  args: {
    expired: false,
    readOnly: false
  },
  argTypes: {
    readOnly: {
      defaultValue: false,
      control: 'boolean'
    },
    expired: {
      defaultValue: false,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: 'expiresAt'
    }
  }
}

export default metadata

export const State: StoryObj<typeof Component> = {
  render: ({ expired, readOnly }) => (
    <Component expired={expired} expiresAt={expired ? expiredDate() : notExpiredDate()} readOnly={readOnly} />
  )
}
