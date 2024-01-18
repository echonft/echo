// noinspection JSUnusedGlobalSymbols

import { NewListingModalTargetRowQuantitySelector as Component } from '@echo/ui/components/listing/new/new-listing-modal-target-row-quantity-selector'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Target Row/Quantity Selector',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(1)
    return <Component {...args} quantity={quantity} onQuantityChange={setQuantity} />
  },
  args: {
    isMutating: false
  }
}

export const Mutating: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(2)
    return <Component {...args} quantity={quantity} onQuantityChange={setQuantity} />
  },
  args: {
    isMutating: true
  }
}
