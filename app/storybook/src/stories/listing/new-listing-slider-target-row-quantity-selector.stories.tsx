import { NewListingSliderTargetRowQuantitySelector as Component } from '@echo/ui/components/listing/new/new-listing-slider-target-row-quantity-selector'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Target Row Quantity Selector',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1)
    return <Component quantity={quantity} onQuantityChange={setQuantity} />
  }
}
