// noinspection JSUnusedGlobalSymbols

import { ListingDetailsState as Component } from '@echo/ui/components/listing/details/listing-details-state'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const metadata: Meta<typeof Component> = {
  title: 'Listing/Details/State',
  component: Component,
  argTypes: {},
  parameters: {
    controls: {
      exclude: 'expiresAt'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const State: Story = {
  render: ({ expired, readOnly }) => (
    <Component expired={expired} expiresAt={expired ? EXPIRED_DATE : NOT_EXPIRED_DATE} readOnly={readOnly} />
  ),
  args: {
    expired: false,
    readOnly: false
  }
}
