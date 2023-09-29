import { NewListingSliderTargetRow as Component } from '@echo/ui/components/listing/new/new-listing-slider-target-row'
import { getCollectionById } from '@mocks/model/collection'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Target Row',
  component: Component
}

export default metadata
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    collectionName: collection.name,
    bannerUrl: collection.bannerUrl?.href,
    pictureUrl: collection.profilePictureUrl.href,
    quantity: 1
  },
  render: (args) => {
    const [quantity, setQuantity] = useState<number>(args.quantity)
    return <Component {...args} quantity={quantity} onQuantityChange={setQuantity} />
  }
}
