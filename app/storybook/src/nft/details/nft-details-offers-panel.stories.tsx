import { mockOffer } from '@echo/model'
import { NftDetailsOffersPanel as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

const metadata = {
  title: 'Nft/Details/Offers Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'offers'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offers: [
      assoc('expiresAt', dayjs().add(1, 'hour'), mockOffer),
      assoc('expiresAt', dayjs().add(6, 'hour'), mockOffer),
      assoc('expiresAt', dayjs().add(1, 'day'), mockOffer),
      assoc('expiresAt', dayjs().add(40, 'hour'), mockOffer)
    ]
  }
}

export const Empty: Story = {
  args: {
    offers: []
  }
}
