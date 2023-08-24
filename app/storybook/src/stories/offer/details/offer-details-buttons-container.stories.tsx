import { OfferDetailsButtonsContainer as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Buttons Container',
  component: Component,
  argTypes: {
    state: {
      defaultValue: 'OPEN',
      options: ['OPEN', 'ACCEPTED'],
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
    state: 'OPEN',
    hasApprovedNFTs: false,
    nftsCount: 1
  }
}
