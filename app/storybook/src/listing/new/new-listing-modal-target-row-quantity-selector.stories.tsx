import { NewListingModalTargetRowQuantitySelector as Component } from '@echo/ui/components/listing/new/new-listing-modal-target-row-quantity-selector'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Target Row',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const QuantitySelector: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1)
    return <Component quantity={quantity} onQuantityChange={setQuantity} />
  }
}
