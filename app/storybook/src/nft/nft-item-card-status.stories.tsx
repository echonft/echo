import { NftItemCardStatus as Component } from '@echo/ui/components/nft/card/nft-item-card-status'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Item Card/Status',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Open: Story = {
  args: {
    status: 'OPEN',
    expired: false
  }
}

export const Expired: Story = {
  args: {
    status: 'CANCELLED',
    expired: true
  }
}

export const Fulfilled: Story = {
  args: {
    status: 'FULFILLED',
    expired: false
  }
}
