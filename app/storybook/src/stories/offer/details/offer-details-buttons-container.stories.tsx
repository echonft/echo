import { OfferDetailsButtonsContainer as Component, OfferState } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Buttons Container',
  component: Component,
  argTypes: {
    state: {
      defaultValue: OfferState.OPEN,
      options: [OfferState.OPEN, OfferState.ACCEPTED],
      control: { type: 'radio' }
    },
    hasApprovedNFTs: { defaultValue: false, control: 'boolean' },
    nftsCount: { control: { type: 'range', min: 1, max: 2, step: 1 } }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: OfferState.OPEN,
    hasApprovedNFTs: false,
    nftsCount: 1
  }
}
