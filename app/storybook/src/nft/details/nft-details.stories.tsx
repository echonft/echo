import { mockOffer, mockOwnedNft } from '@echo/model'
import { NftDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

const metadata = {
  title: 'Pages/Nft Details',
  component: Component,
  argTypes: {
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft', 'offers']
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft: mockOwnedNft,
    offers: [
      assoc('expiresAt', dayjs().add(1, 'hour'), mockOffer),
      assoc('expiresAt', dayjs().add(6, 'hour'), mockOffer),
      assoc('expiresAt', dayjs().add(1, 'day'), mockOffer),
      assoc('expiresAt', dayjs().add(40, 'hour'), mockOffer)
    ]
  }
}

export const NoOffers: Story = {
  args: {
    nft: mockOwnedNft,
    offers: []
  }
}
